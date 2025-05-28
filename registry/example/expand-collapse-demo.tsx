"use client";

import { ExpandCollapse } from "@/registry/pivot/expand-collapse";
import { useState } from "react";

export default function ExpandCollapseDemo() {
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(true);
  const [isExpanded3, setIsExpanded3] = useState(false);

  return (
    <div className="space-y-4 min-w-md">
      <div className="p-4 border rounded-lg">
        <ExpandCollapse
          isExpanded={isExpanded1}
          onToggle={() => setIsExpanded1(!isExpanded1)}
          label="Toggle Details"
        />
        {isExpanded1 && (
          <div className="mt-2 p-3 bg-neutral-50 dark:bg-neutral-800 rounded text-sm">
            这里是展开后显示的内容。可以包含任何详细信息。
          </div>
        )}
      </div>

      <div className="p-4 border rounded-lg">
        <ExpandCollapse
          isExpanded={isExpanded2}
          onToggle={() => setIsExpanded2(!isExpanded2)}
          expandedLabel="Hide Advanced Options"
          collapsedLabel="Show Advanced Options"
        />
        {isExpanded2 && (
          <div className="mt-2 p-3 bg-neutral-50 dark:bg-neutral-800 rounded text-sm">
            <h4 className="font-medium mb-2">高级选项</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                启用调试模式
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                显示详细日志
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border rounded-lg">
        <ExpandCollapse
          isExpanded={isExpanded3}
          onToggle={() => setIsExpanded3(!isExpanded3)}
          expandedLabel="收起"
          collapsedLabel="展开"
        />
        {isExpanded3 && (
          <div className="mt-2 p-3 bg-neutral-50 dark:bg-neutral-800 rounded text-sm">
            <p>这是一个简单的展开/收起示例。</p>
            <p>可以用于显示或隐藏额外的内容。</p>
          </div>
        )}
      </div>
    </div>
  );
}
