import { CurlGenerator } from "@/registry/pivot/curl-generator";

export default function CurlGeneratorDemo() {
  const params = {
    endpoint: "https://api.example.com/users",
    method: "POST" as const,
    parameters: [
      {
        name: "page",
        in: "query" as const,
        required: false,
        schema: { type: "integer" }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" }
            }
          }
        }
      },
      required: true
    },
    requestBodyExample: {
      name: "张三",
      email: "zhangsan@example.com"
    }
  };

  return (
    <div className="space-y-4 min-w-md">
      <CurlGenerator params={params} />
    </div>
  );
}
