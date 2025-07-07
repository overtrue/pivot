import { DescriptionDisplay } from "@/registry/default/ui/description-display";

export default function DescriptionDisplayDemo() {
  const description = `这是一个**示例描述**，支持 Markdown 格式。

可以包含：
- 列表项目
- **粗体文本**
- *斜体文本*
- \`代码片段\`

还可以包含链接：[示例链接](https://example.com)`;

  return (
    <div className="space-y-4 min-w-md">
      <DescriptionDisplay description={description} />
    </div>
  );
}
