"use client";

import { NavigationSidebar } from "@/registry/pivot/navigation-sidebar";
import type { ParameterLocation } from "@/types/project";
import type { OpenAPIV3 } from 'openapi-types';

export default function NavigationSidebarDemo() {
  const mockOpenApi: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
      title: "示例 API",
      version: "1.0.0",
      description: "这是一个示例 API 文档"
    },
    paths: {
      "/users": {
        get: {
          operationId: "getUsers",
          summary: "获取用户列表",
          description: "获取所有用户的列表",
          tags: ["用户管理"],
          responses: {
            "200": {
              description: "成功返回用户列表"
            }
          }
        },
        post: {
          operationId: "createUser",
          summary: "创建用户",
          description: "创建一个新用户",
          tags: ["用户管理"],
          responses: {
            "201": {
              description: "用户创建成功"
            }
          }
        }
      },
      "/users/{id}": {
        get: {
          operationId: "getUserById",
          summary: "获取用户详情",
          description: "根据 ID 获取用户详细信息",
          tags: ["用户管理"],
          parameters: [
            {
              name: "id",
              in: "path" as ParameterLocation,
              required: true,
              schema: { type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType }
            }
          ],
          responses: {
            "200": {
              description: "成功返回用户详情"
            }
          }
        },
        put: {
          operationId: "updateUser",
          summary: "更新用户",
          description: "更新用户信息",
          tags: ["用户管理"],
          responses: {
            "200": {
              description: "用户更新成功"
            }
          }
        },
        delete: {
          operationId: "deleteUser",
          summary: "删除用户",
          description: "删除指定用户",
          tags: ["用户管理"],
          responses: {
            "204": {
              description: "用户删除成功"
            }
          }
        }
      },
      "/orders": {
        get: {
          operationId: "getOrders",
          summary: "获取订单列表",
          description: "获取所有订单",
          tags: ["订单管理"],
          responses: {
            "200": {
              description: "成功返回订单列表"
            }
          }
        },
        post: {
          operationId: "createOrder",
          summary: "创建订单",
          description: "创建新订单",
          tags: ["订单管理"],
          responses: {
            "201": {
              description: "订单创建成功"
            }
          }
        }
      }
    },
    tags: [
      {
        name: "用户管理",
        description: "用户相关的 API 操作"
      },
      {
        name: "订单管理",
        description: "订单相关的 API 操作"
      }
    ],
    components: {
      schemas: {
        User: {
          type: "object" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
          properties: {
            id: { type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType },
            name: { type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType },
            email: { type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType }
          }
        },
        Order: {
          type: "object" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType,
          properties: {
            id: { type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType },
            userId: { type: "string" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType },
            amount: { type: "number" as const as OpenAPIV3.NonArraySchemaObjectType | OpenAPIV3.ArraySchemaObjectType }
          }
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-3">API 导航侧边栏</h4>
        <p className="text-sm text-muted-foreground mb-4">
          用于导航的侧边栏组件。
        </p>
        <div className="border rounded-lg h-[500px] overflow-hidden bg-background">
          <NavigationSidebar
            openapi={mockOpenApi}
            activePath="/users"
            activeMethod="get"
            onSelectOperation={(path, method, operation) => {
              console.log("选择操作:", { path, method, operation });
            }}
            onSelectSchema={(schemaName) => {
              console.log("选择 Schema:", schemaName);
            }}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
