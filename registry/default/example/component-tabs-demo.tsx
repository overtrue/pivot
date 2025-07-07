"use client";

import { ComponentTabs } from "@/registry/default/ui/component-tabs";
import { useState } from "react";

export default function ComponentTabsDemo() {
  // 定义组件类型
  type ComponentType =
    | "schemas"
    | "responses"
    | "parameters"
    | "examples"
    | "requestBodies"
    | "headers"
    | "securitySchemes"
    | "links"
    | "callbacks";

  // 电商 API 组件标签页状态
  const [ecommerceActiveType, setEcommerceActiveType] = useState<ComponentType>("schemas");

  // 用户管理 API 组件标签页状态
  const [userActiveType, setUserActiveType] = useState<ComponentType>("responses");

  // 支付 API 组件标签页状态
  const [paymentActiveType, setPaymentActiveType] = useState<ComponentType>("requestBodies");

  // 内容管理 API 组件标签页状态
  const [contentActiveType, setContentActiveType] = useState<ComponentType>("parameters");

  // 电商 API 可用组件类型
  const ecommerceTypes: ComponentType[] = [
    "schemas",
    "responses",
    "parameters",
    "examples",
    "requestBodies",
    "headers",
    "securitySchemes"
  ];

  // 用户管理 API 可用组件类型
  const userManagementTypes: ComponentType[] = [
    "schemas",
    "responses",
    "parameters",
    "examples",
    "securitySchemes"
  ];

  // 支付 API 可用组件类型
  const paymentTypes: ComponentType[] = [
    "schemas",
    "responses",
    "requestBodies",
    "examples",
    "securitySchemes",
    "headers"
  ];

  // 内容管理 API 可用组件类型
  const contentTypes: ComponentType[] = [
    "schemas",
    "responses",
    "parameters",
    "examples",
    "requestBodies"
  ];

  // 完整的 API 文档组件类型
  const fullApiTypes: ComponentType[] = [
    "schemas",
    "responses",
    "parameters",
    "examples",
    "requestBodies",
    "headers",
    "securitySchemes",
    "links",
    "callbacks"
  ];

  // 简化的 API 文档组件类型
  const simpleApiTypes: ComponentType[] = [
    "schemas",
    "responses",
    "examples"
  ];

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">电商 API 组件标签页</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商平台 API 的组件分类，包含商品、订单、支付等相关的数据模型和响应
        </p>
        <ComponentTabs
          availableTypes={ecommerceTypes}
          activeType={ecommerceActiveType}
          onSelectType={setEcommerceActiveType}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户管理 API 组件标签页</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户管理系统的 API 组件，专注于用户认证、权限管理和个人资料相关功能
        </p>
        <ComponentTabs
          availableTypes={userManagementTypes}
          activeType={userActiveType}
          onSelectType={setUserActiveType}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付 API 组件标签页</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付处理系统的 API 组件，包含支付方式、交易记录和安全认证相关定义
        </p>
        <ComponentTabs
          availableTypes={paymentTypes}
          activeType={paymentActiveType}
          onSelectType={setPaymentActiveType}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">内容管理 API 组件标签页</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          内容管理系统的 API 组件，涵盖文章、媒体文件和分类管理相关功能
        </p>
        <ComponentTabs
          availableTypes={contentTypes}
          activeType={contentActiveType}
          onSelectType={setContentActiveType}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">完整 API 文档组件标签页</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业级 API 文档的完整组件分类，包含所有 OpenAPI 3.0 规范支持的组件类型
        </p>
        <ComponentTabs
          availableTypes={fullApiTypes}
          activeType={ecommerceActiveType}
          onSelectType={setEcommerceActiveType}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">简化 API 文档组件标签页</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          轻量级 API 文档的基础组件分类，适用于简单的 REST API 文档展示
        </p>
        <ComponentTabs
          availableTypes={simpleApiTypes}
          activeType={userActiveType}
          onSelectType={setUserActiveType}
        />
      </div>
    </div>
  );
}
