import { cn } from "@/lib/utils";
import React from "react";
import { PathSegment } from "@/registry/pivot/path-segment";

interface OperationPathProps {
  path: string;
  className?: string;
}

/**
 * 将一个完整的 OpenAPI 路径分割为多个 PathSegment 组件
 * 自动识别路径中的参数（形如 {param}）并高亮显示
 */
const OperationPath = React.forwardRef<HTMLDivElement, OperationPathProps>(
  ({ path, className }, ref) => {
    // 将路径按照 / 分割，但保留 /
    const segments = path.split(/(?=\/)/g);

    // 检测路径中的参数模式 {param}
    const isParameterSegment = (segment: string) => {
      return /{([^}]+)}/.test(segment);
    };

    // 将路径中的 {param} 替换为高亮显示
    const renderSegment = (segment: string, index: number) => {
      const isParam = isParameterSegment(segment);

      if (isParam) {
        // 拆分包含参数的片段
        const parts = segment.split(/{([^}]+)}/);

        return (
          <React.Fragment key={index}>
            {parts.map((part, partIndex) => {
              if (partIndex % 2 === 0) {
                // 非参数部分
                return part ? (
                  <PathSegment key={`${index}-${partIndex}`} path={part} />
                ) : null;
              } else {
                // 参数部分
                return (
                  <PathSegment
                    key={`${index}-${partIndex}`}
                    path={`{${part}}`}
                    isParameter
                  />
                );
              }
            })}
          </React.Fragment>
        );
      }

      // 普通路径片段
      return <PathSegment key={index} path={segment} />;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center text-neutral-600 dark:text-neutral-400",
          className,
        )}
      >
        {segments.map((segment, index) => renderSegment(segment, index))}
      </div>
    );
  },
);

OperationPath.displayName = "OperationPath";

export { OperationPath };
