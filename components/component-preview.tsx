import { Index } from "@/__registry__";
import { ComponentWrapper } from "@/components/component-wrapper";
import { Icons } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import * as React from "react";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  align?: "center" | "start" | "end";
  preview?: boolean;
}

// 需要使用 iframe 的组件列表（主要是布局组件和有特殊定位需求的组件）
const IFRAME_COMPONENTS = [
  'navigation-sidebar',
  'navigation-sidebar-demo',
  'operation-detailed-layout',
  'operation-detailed-layout-demo',
  'operation-list-layout',
  'operation-list-layout-demo',
  'resizable-sidebar',
  'resizable-sidebar-demo',
  // 可以根据需要添加更多
];

export function ComponentPreview({
  name,
  children,
  className,
  preview = false,
  ...props
}: ComponentPreviewProps) {
  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  const shouldUseIframe = IFRAME_COMPONENTS.includes(name);

  const Preview = React.useMemo(() => {
    // 如果需要使用 iframe，则渲染 iframe
    if (shouldUseIframe) {
      return (
        <div className="w-full h-128 rounded-lg border overflow-hidden bg-background">
          <iframe
            src={`/demo/${name}`}
            className="w-full h-full border-0"
            title={`${name} Demo`}
            loading="lazy"
          />
        </div>
      );
    }

    // 否则使用原来的直接渲染方式
    const Component = Index[name]?.component;

    if (!Component) {
      console.error(`Component with name "${name}" not found in registry.`);
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name, shouldUseIframe]);

  return (
    <div
      className={cn(
        "relative my-4 flex flex-col space-y-2 lg:max-w-[120ch]",
        className,
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        {!preview && (
          <div className="flex items-center justify-between pb-3">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="preview"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </div>
        )}
        <TabsContent value="preview" className="relative rounded-md">
          {shouldUseIframe ? (
            // 对于 iframe 组件，不使用 ComponentWrapper，因为它们已经有自己的容器
            <div className="relative rounded-xl border bg-background">
              <React.Suspense
                fallback={
                  <div className="flex items-center justify-center h-96">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icons.spinner className="mr-2 size-4 animate-spin" />
                      Loading...
                    </div>
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          ) : (
            // 对于普通组件，继续使用 ComponentWrapper
            <ComponentWrapper name={name}>
              <React.Suspense
                fallback={
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icons.spinner className="mr-2 size-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </ComponentWrapper>
          )}
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
