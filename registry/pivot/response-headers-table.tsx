import { cn } from "@/lib/utils";
import React from "react";
import { DescriptionDisplay } from "./description-display";

interface HeaderObject {
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: any;
}

interface ResponseHeadersTableProps {
  headers: Record<string, HeaderObject>;
  className?: string;
}

/**
 * 响应头部表格组件，负责展示API响应的头部信息
 */
const ResponseHeadersTable = React.forwardRef<
  HTMLDivElement,
  ResponseHeadersTableProps
>(({ headers, className }, ref) => {
  if (!headers || Object.keys(headers).length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "border dark:border-neutral-700 rounded overflow-hidden",
        className,
      )}
    >
      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
        <thead className="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Description
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
          {Object.entries(headers).map(([name, header]) => (
            <tr key={name}>
              <td className="px-3 py-2 text-sm font-mono dark:text-neutral-300">
                {name}
              </td>
              <td className="px-3 py-2 text-sm dark:text-neutral-300">
                {header.description && (
                  <DescriptionDisplay description={header.description} />
                )}
              </td>
              <td className="px-3 py-2 text-sm dark:text-neutral-300">
                {header.schema?.type || "Unknown"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

ResponseHeadersTable.displayName = "ResponseHeadersTable";

export { ResponseHeadersTable, type HeaderObject };
