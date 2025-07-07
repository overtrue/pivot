import { ExternalDocsDisplay } from "@/registry/default/ui/external-docs-display";

export default function ExternalDocsDisplayDemo() {
  const externalDocs = {
    description: "API 完整文档",
    url: "https://docs.example.com/api",
  };

  const externalDocsWithoutDescription = {
    url: "https://github.com/example/api",
  };

  return (
    <div className="space-y-4 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-2">带描述的外部文档</h4>
        <ExternalDocsDisplay externalDocs={externalDocs} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">仅链接的外部文档</h4>
        <ExternalDocsDisplay externalDocs={externalDocsWithoutDescription} />
      </div>
    </div>
  );
}
