"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// 通用的加载组件
const LoadingComponent = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
      <p className="text-sm text-muted-foreground">Loading component...</p>
    </div>
  </div>
);

// 错误组件
const ErrorComponent = ({ componentName }: { componentName: string }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h3 className="text-lg font-medium text-destructive mb-2">
        Component Not Found
      </h3>
      <p className="text-sm text-muted-foreground">
        Demo component &quot;{componentName}&quot; does not exist.
      </p>
    </div>
  </div>
);

interface DemoPageProps {
  params: Promise<{
    component: string;
  }>;
}

function DemoPageContent({ component }: { component: string }) {
  const [componentExists, setComponentExists] = useState<boolean | null>(null);

  useEffect(() => {
    // 直接尝试导入组件，所有组件都在 example 目录下
    import(`@/registry/default/example/${component}`)
      .then(() => setComponentExists(true))
      .catch(() => setComponentExists(false));
  }, [component]);

  // 加载状态
  if (componentExists === null) {
    return <LoadingComponent />;
  }

  // 组件不存在
  if (!componentExists) {
    return <ErrorComponent componentName={component} />;
  }

  // 动态导入组件
  const DemoComponent = dynamic(
    () => import(`@/registry/default/example/${component}`),
    {
      loading: LoadingComponent,
      ssr: false,
    }
  );

  return (
    <div className="w-full h-screen bg-background">
      <DemoComponent />
    </div>
  );
}

export default function DemoPage({ params }: DemoPageProps) {
  const [component, setComponent] = useState<string | null>(null);

  useEffect(() => {
    // 处理 async params
    params.then(({ component }) => {
      setComponent(component);
    });
  }, [params]);

  if (!component) {
    return <LoadingComponent />;
  }

  return <DemoPageContent component={component} />;
}
