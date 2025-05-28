"use client";

import { CopyButton } from "@/registry/pivot/copy-button";

export default function CopyButtonDemo() {
  const codeExample = `curl -X GET "https://api.example.com/users" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`;

  const jsonExample = `{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}`;

  return (
    <div className="space-y-4 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">简单文本复制</h4>
        <div className="flex items-center gap-2">
          <CopyButton text="Hello World" />
          <span className="text-sm text-muted-foreground">复制简单文本</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">复制代码示例</h4>
        <div className="relative">
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded text-sm overflow-x-auto">
            <code>{codeExample}</code>
          </pre>
          <div className="absolute top-2 right-2">
            <CopyButton text={codeExample} />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">复制 JSON 数据</h4>
        <div className="relative">
          <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded text-sm overflow-x-auto">
            <code>{jsonExample}</code>
          </pre>
          <div className="absolute top-2 right-2">
            <CopyButton text={jsonExample} />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">不同尺寸</h4>
        <div className="flex items-center gap-3">
          <CopyButton text="Small" size="sm" />
          <CopyButton text="Default" />
          <CopyButton text="Large" size="lg" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">自定义样式</h4>
        <div className="flex items-center gap-2">
          <CopyButton
            text="Custom style"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
          />
        </div>
      </div>
    </div>
  );
}
