import { StatusCode } from "@/registry/default/ui/status-code";

export default function StatusCodeDemo() {
  const statusCodes = {
    "1xx 信息响应": [100, 101, 102],
    "2xx 成功": [200, 201, 202, 204, 206],
    "3xx 重定向": [301, 302, 304, 307, 308],
    "4xx 客户端错误": [400, 401, 403, 404, 409, 422],
    "5xx 服务器错误": [500, 501, 502, 503, 504]
  };

  return (
    <div className="space-y-6 min-w-md">
      {Object.entries(statusCodes).map(([category, codes]) => (
        <div key={category}>
          <h4 className="text-sm font-medium mb-3">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {codes.map((code) => (
              <StatusCode key={code} code={code} />
            ))}
          </div>
        </div>
      ))}

      <div>
        <h4 className="text-sm font-medium mb-3">不同尺寸</h4>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">小尺寸:</span>
            <StatusCode code={200} size="small" />
            <StatusCode code={404} size="small" />
            <StatusCode code={500} size="small" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">中等尺寸:</span>
            <StatusCode code={200} size="medium" />
            <StatusCode code={404} size="medium" />
            <StatusCode code={500} size="medium" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">在 API 文档中使用</h4>
        <div className="space-y-2 p-3 border rounded-lg bg-neutral-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <StatusCode code={200} />
            <span className="text-sm">请求成功</span>
          </div>
          <div className="flex items-center gap-3">
            <StatusCode code={400} />
            <span className="text-sm">请求参数错误</span>
          </div>
          <div className="flex items-center gap-3">
            <StatusCode code={401} />
            <span className="text-sm">未授权访问</span>
          </div>
          <div className="flex items-center gap-3">
            <StatusCode code={500} />
            <span className="text-sm">服务器内部错误</span>
          </div>
        </div>
      </div>
    </div>
  );
}
