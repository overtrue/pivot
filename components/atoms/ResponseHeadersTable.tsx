import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  ComponentsObject,
  HeaderObject,
  ReferenceObject,
} from "@/types/openapi";
import React from "react";
import { resolveRef } from "../../utils/resolveRef";
import DescriptionDisplay from "./DescriptionDisplay";

interface ResponseHeadersTableProps {
  headers: Record<string, HeaderObject | ReferenceObject>;
  components?: ComponentsObject;
}

/**
 * 响应头部表格组件，负责展示API响应的头部信息
 */
const ResponseHeadersTable: React.FC<ResponseHeadersTableProps> = ({
  headers,
  components,
}) => {
  const { t } = useI18n();

  if (!headers || Object.keys(headers).length === 0) {
    return null;
  }

  return (
    <div className="border dark:border-neutral-700 rounded overflow-hidden">
      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
        <thead className="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              {t("Name")}
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              {t("Description")}
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              {t("Type")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
          {Object.entries(headers).map(([name, header]) => {
            const headerRef = header as HeaderObject | ReferenceObject;
            const headerObj =
              "$ref" in headerRef
                ? resolveRef<HeaderObject>(
                    headerRef,
                    components,
                    "headers",
                  ) || { description: t("Reference Object") }
                : (headerRef as HeaderObject);

            return (
              <tr key={name}>
                <td className="px-3 py-2 text-sm font-mono dark:text-neutral-300">
                  {name}
                </td>
                <td className="px-3 py-2 text-sm dark:text-neutral-300">
                  {headerObj.description && (
                    <DescriptionDisplay description={headerObj.description} />
                  )}
                </td>
                <td className="px-3 py-2 text-sm dark:text-neutral-300">
                  {headerObj.schema && "type" in headerObj.schema
                    ? headerObj.schema.type
                    : t("Unknown")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResponseHeadersTable;
