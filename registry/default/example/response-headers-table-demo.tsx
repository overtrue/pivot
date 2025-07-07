import { ResponseHeadersTable } from "@/registry/default/ui/response-headers-table";

export default function ResponseHeadersTableDemo() {
  const headers = {
    "Content-Type": {
      description: "The MIME type of the response content",
      schema: { type: "string" as const },
      required: true
    },
    "X-Rate-Limit": {
      description: "Number of requests allowed per hour",
      schema: { type: "integer" as const },
      required: false
    },
    "X-Request-ID": {
      description: "Unique identifier for the request",
      schema: { type: "string" as const, format: "uuid" as const },
      required: false
    },
    "Cache-Control": {
      description: "Caching directives for the response",
      schema: { type: "string" as const },
      required: false
    }
  };

  return (
    <div className="space-y-4 min-w-md">
      <ResponseHeadersTable headers={headers} />
    </div>
  );
}
