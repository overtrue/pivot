import { ParameterGroup, type Parameter } from "@/registry/pivot/parameter-group";

export default function ParameterGroupDemo() {
  // 查询参数示例
  const queryParameters: Parameter[] = [
    {
      name: "limit",
      required: false,
      type: "number" as const
    },
    {
      name: "offset",
      required: false,
      type: "number" as const
    },
    {
      name: "search",
      required: false,
      type: "string" as const
    },
    {
      name: "status",
      required: false,
      type: "string" as const
    }
  ];

  // 路径参数示例
  const pathParameters: Parameter[] = [
    {
      name: "userId",
      required: true,
      type: "string" as const
    },
    {
      name: "organizationId",
      required: true,
      type: "string" as const
    }
  ];

  // 请求头参数示例
  const headerParameters: Parameter[] = [
    {
      name: "Authorization",
      required: true,
      type: "string" as const
    },
    {
      name: "X-API-Version",
      required: false,
      type: "string" as const
    },
    {
      name: "X-Request-ID",
      required: false,
      type: "string" as const
    }
  ];

  // Cookie 参数示例
  const cookieParameters: Parameter[] = [
    {
      name: "session_id",
      required: true,
      type: "string" as const
    },
    {
      name: "csrf_token",
      required: false,
      type: "string" as const
    }
  ];

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">查询参数组</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用于筛选和分页的查询参数
        </p>
        <ParameterGroup
          inType="query"
          parameters={queryParameters}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">路径参数组</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          URL 路径中的必需参数
        </p>
        <ParameterGroup
          inType="path"
          parameters={pathParameters}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">请求头参数组</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          HTTP 请求头中的参数
        </p>
        <ParameterGroup
          inType="header"
          parameters={headerParameters}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Cookie 参数组</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          Cookie 中传递的参数
        </p>
        <ParameterGroup
          inType="cookie"
          parameters={cookieParameters}
        />
      </div>
    </div>
  );
}
