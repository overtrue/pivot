import { PythonGenerator } from "@/registry/pivot/python-generator";

export default function PythonGeneratorDemo() {
  // 用户认证 API 示例
  const authParams = {
    endpoint: "https://api.example.com/v1/auth/login",
    method: "POST" as const,
    parameters: [],
    requestBodyExample: {
      email: "user@example.com",
      password: "SecurePass123",
      rememberMe: true
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", format: "email" },
              password: { type: "string", minLength: 8 },
              rememberMe: { type: "boolean", default: false }
            }
          }
        }
      },
      required: true
    }
  };

  // 数据分析 API 示例
  const analyticsParams = {
    endpoint: "https://api.example.com/v1/analytics/reports",
    method: "GET" as const,
    parameters: [
      {
        name: "startDate",
        in: "query" as const,
        required: true,
        schema: { type: "string", format: "date" }
      },
      {
        name: "endDate",
        in: "query" as const,
        required: true,
        schema: { type: "string", format: "date" }
      },
      {
        name: "metrics",
        in: "query" as const,
        required: false,
        schema: {
          type: "array",
          items: { type: "string", enum: ["views", "clicks", "conversions", "revenue"] }
        }
      },
      {
        name: "groupBy",
        in: "query" as const,
        required: false,
        schema: { type: "string", enum: ["day", "week", "month"] }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBodyExample: null,
    requestBody: undefined
  };

  // 机器学习模型预测 API 示例
  const mlPredictionParams = {
    endpoint: "https://api.example.com/v1/ml/predict",
    method: "POST" as const,
    parameters: [
      {
        name: "model-version",
        in: "header" as const,
        required: false,
        schema: { type: "string", default: "v1.0" }
      },
      {
        name: "X-API-Key",
        in: "header" as const,
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBodyExample: {
      features: {
        age: 35,
        income: 75000,
        creditScore: 720,
        employmentYears: 8,
        hasProperty: true
      },
      options: {
        includeConfidence: true,
        explainPrediction: false
      }
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["features"],
            properties: {
              features: {
                type: "object",
                description: "输入特征数据",
                properties: {
                  age: { type: "integer", minimum: 18, maximum: 100 },
                  income: { type: "number", minimum: 0 },
                  creditScore: { type: "integer", minimum: 300, maximum: 850 },
                  employmentYears: { type: "number", minimum: 0 },
                  hasProperty: { type: "boolean" }
                }
              },
              options: {
                type: "object",
                description: "预测选项",
                properties: {
                  includeConfidence: { type: "boolean", default: false },
                  explainPrediction: { type: "boolean", default: false }
                }
              }
            }
          }
        }
      },
      required: true
    }
  };

  // 批量数据处理 API 示例
  const batchProcessParams = {
    endpoint: "https://api.example.com/v1/data/batch-process",
    method: "POST" as const,
    parameters: [
      {
        name: "async",
        in: "query" as const,
        required: false,
        schema: { type: "boolean", default: true }
      },
      {
        name: "priority",
        in: "query" as const,
        required: false,
        schema: { type: "string", enum: ["low", "normal", "high"], default: "normal" }
      },
      {
        name: "Authorization",
        in: "header" as const,
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBodyExample: {
      operation: "transform",
      inputFormat: "csv",
      outputFormat: "json",
      data: [
        { id: 1, name: "Alice", score: 95 },
        { id: 2, name: "Bob", score: 87 },
        { id: 3, name: "Charlie", score: 92 }
      ],
      transformations: [
        { type: "filter", condition: "score > 90" },
        { type: "sort", field: "score", order: "desc" }
      ]
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["operation", "data"],
            properties: {
              operation: { type: "string", enum: ["transform", "validate", "aggregate"] },
              inputFormat: { type: "string", enum: ["csv", "json", "xml"] },
              outputFormat: { type: "string", enum: ["csv", "json", "xml"] },
              data: {
                type: "array",
                items: { type: "object" },
                maxItems: 1000
              },
              transformations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: { type: "string" },
                    condition: { type: "string" },
                    field: { type: "string" },
                    order: { type: "string", enum: ["asc", "desc"] }
                  }
                }
              }
            }
          }
        }
      },
      required: true
    }
  };

  // 图像处理 API 示例
  const imageProcessParams = {
    endpoint: "https://api.example.com/v1/images/process",
    method: "POST" as const,
    parameters: [
      {
        name: "format",
        in: "query" as const,
        required: false,
        schema: { type: "string", enum: ["jpeg", "png", "webp"], default: "jpeg" }
      },
      {
        name: "quality",
        in: "query" as const,
        required: false,
        schema: { type: "integer", minimum: 1, maximum: 100, default: 80 }
      },
      {
        name: "X-Processing-Token",
        in: "header" as const,
        required: true,
        schema: { type: "string" }
      }
    ],
    requestBodyExample: {
      imageUrl: "https://example.com/images/sample.jpg",
      operations: [
        { type: "resize", width: 800, height: 600 },
        { type: "filter", name: "brightness", value: 1.2 },
        { type: "crop", x: 100, y: 100, width: 400, height: 300 }
      ],
      metadata: {
        preserveExif: false,
        addWatermark: true,
        watermarkText: "© Example Corp"
      }
    },
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["imageUrl", "operations"],
            properties: {
              imageUrl: { type: "string", format: "uri" },
              operations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: { type: "string", enum: ["resize", "crop", "filter", "rotate"] },
                    width: { type: "integer" },
                    height: { type: "integer" },
                    x: { type: "integer" },
                    y: { type: "integer" },
                    name: { type: "string" },
                    value: { type: "number" },
                    angle: { type: "number" }
                  }
                }
              },
              metadata: {
                type: "object",
                properties: {
                  preserveExif: { type: "boolean", default: true },
                  addWatermark: { type: "boolean", default: false },
                  watermarkText: { type: "string" }
                }
              }
            }
          }
        }
      },
      required: true
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户认证 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户登录接口的 Python requests 代码生成
        </p>
        <PythonGenerator params={authParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据分析 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          包含多个查询参数的数据分析接口 Python 代码
        </p>
        <PythonGenerator params={analyticsParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">机器学习预测 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          ML 模型预测接口的 Python 代码，包含复杂的特征数据
        </p>
        <PythonGenerator params={mlPredictionParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">批量数据处理 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          大数据批量处理接口的 Python 代码生成
        </p>
        <PythonGenerator params={batchProcessParams} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">图像处理 API</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          图像处理和变换接口的 Python 代码生成
        </p>
        <PythonGenerator params={imageProcessParams} />
      </div>
    </div>
  );
}
