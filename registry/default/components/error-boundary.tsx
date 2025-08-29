"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * 错误边界组件
 * 捕获子组件中的 JavaScript 错误，记录错误并显示备用 UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误到错误报告服务
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // 更新状态以包含错误信息
    this.setState({
      error,
      errorInfo,
    });

    // 调用可选的错误处理回调
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // 如果提供了自定义的 fallback 组件，使用它
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      // 默认的错误 UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="max-w-md w-full space-y-4">
            <div className="flex items-center justify-center">
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">出现了一些问题</h2>
              <p className="text-sm text-muted-foreground">
                应用程序遇到了意外错误。请尝试刷新页面或联系支持团队。
              </p>
            </div>

            {/* 错误详情（开发环境显示） */}
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 p-4 bg-muted/50 rounded-lg">
                <summary className="cursor-pointer text-sm font-medium">
                  错误详情
                </summary>
                <div className="mt-2 space-y-2">
                  <div className="text-xs">
                    <strong>错误信息:</strong>
                    <pre className="mt-1 p-2 bg-background rounded text-destructive overflow-x-auto">
                      {this.state.error.message}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div className="text-xs">
                      <strong>组件栈:</strong>
                      <pre className="mt-1 p-2 bg-background rounded text-muted-foreground overflow-x-auto max-h-48 overflow-y-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                  {this.state.error.stack && (
                    <div className="text-xs">
                      <strong>错误栈:</strong>
                      <pre className="mt-1 p-2 bg-background rounded text-muted-foreground overflow-x-auto max-h-48 overflow-y-auto">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex gap-2 justify-center">
              <Button onClick={this.reset} variant="default" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                重试
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
              >
                刷新页面
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook 版本的错误边界（用于函数组件）
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: (error: Error, reset: () => void) => ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...(props as any)} ref={ref} />
      </ErrorBoundary>
    );
  });

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * OpenAPI 特定的错误边界
 */
export function OpenAPIErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="max-w-md w-full space-y-4">
            <div className="flex items-center justify-center">
              <div className="p-3 bg-yellow-500/10 rounded-full">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">OpenAPI 规范解析错误</h2>
              <p className="text-sm text-muted-foreground">
                无法正确解析 OpenAPI 规范。请检查规范格式是否正确。
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-xs font-mono text-destructive">
                {error.message}
              </p>
            </div>

            <div className="flex gap-2 justify-center">
              <Button onClick={reset} variant="default" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                重试
              </Button>
            </div>
          </div>
        </div>
      )}
      onError={(error, errorInfo) => {
        console.error("OpenAPI Error:", error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}