"use client";

import { ConstValue } from "@/registry/pivot/const-value";
import { DefaultValueDisplay } from "@/registry/pivot/default-value-display";
import { DeprecatedBadge } from "@/registry/pivot/deprecated-badge";
import { DescriptionDisplay } from "@/registry/pivot/description-display";
import { EnumValues } from "@/registry/pivot/enum-values";
import { FormatBadge } from "@/registry/pivot/format-badge";
import { InLabel } from "@/registry/pivot/in-label";
import { MethodLabel } from "@/registry/pivot/method-label";
import { ParameterDescription } from "@/registry/pivot/parameter-description";
import { ParameterGroup } from "@/registry/pivot/parameter-group";
import { ParameterName } from "@/registry/pivot/parameter-name";
import { PathSegment } from "@/registry/pivot/path-segment";
import { RequiredBadge } from "@/registry/pivot/required-badge";
import { RequiredMarker } from "@/registry/pivot/required-marker";
import { SchemeType } from "@/registry/pivot/scheme-type";
import { SectionTitle } from "@/registry/pivot/section-title";
import { StatusCode } from "@/registry/pivot/status-code";
import { StyleBadge } from "@/registry/pivot/style-badge";
import { TypeIndicator } from "@/registry/pivot/type-indicator";
import { ValueDisplay } from "@/registry/pivot/value-display";
import { VersionBadge } from "@/registry/pivot/version-badge";
import { WebhookLabel } from "@/registry/pivot/webhook-label";
import { useState } from "react";

export default function TestPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMediaType, setActiveMediaType] = useState<string | null>(
    "application/json",
  );
  const [activeTab, setActiveTab] = useState<any>("schemas");

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Pivot 组件测试</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Status Code 组件</h2>
          <div className="flex items-center gap-4 mb-4">
            <StatusCode code={200} />
            <StatusCode code={404} />
            <StatusCode code={500} />
          </div>
          <div className="flex items-center gap-4">
            <StatusCode code={200} size="medium" />
            <StatusCode code={404} size="medium" />
            <StatusCode code={500} size="medium" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Method Label 组件</h2>
          <div className="flex items-center gap-4 mb-4">
            <MethodLabel method="GET" />
            <MethodLabel method="POST" />
            <MethodLabel method="PUT" />
            <MethodLabel method="DELETE" />
            <MethodLabel method="PATCH" />
          </div>
          <div className="flex items-center gap-4">
            <MethodLabel method="GET" variant="compact" />
            <MethodLabel method="POST" variant="compact" />
            <MethodLabel method="PUT" variant="compact" />
            <MethodLabel method="DELETE" variant="compact" />
            <MethodLabel method="PATCH" variant="compact" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Type Indicator 组件</h2>
          <div className="flex items-center gap-4 mb-4">
            <TypeIndicator type="string" />
            <TypeIndicator type="number" />
            <TypeIndicator type="integer" />
            <TypeIndicator type="boolean" />
            <TypeIndicator type="array" />
            <TypeIndicator type="object" />
            <TypeIndicator type="null" />
          </div>
          <div className="flex items-center gap-4">
            <TypeIndicator type="string" theme="success" />
            <TypeIndicator type="number" theme="primary" />
            <TypeIndicator type="boolean" theme="warning" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Badge 组件</h2>
          <div className="flex items-center gap-4 mb-4">
            <RequiredBadge />
            <DeprecatedBadge />
            <VersionBadge version="1.0.0" />
            <WebhookLabel />
          </div>
          <div className="flex items-center gap-4">
            <RequiredBadge>必填</RequiredBadge>
            <DeprecatedBadge>已废弃</DeprecatedBadge>
            <VersionBadge version="2.1.3" />
            <WebhookLabel>Webhook 端点</WebhookLabel>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Format Badge 组件</h2>
          <div className="flex items-center gap-4 mb-4">
            <FormatBadge format="email" />
            <FormatBadge format="date" />
            <FormatBadge format="uuid" />
            <FormatBadge format="int32" />
            <FormatBadge format="binary" />
            <FormatBadge format="password" />
          </div>
          <div className="flex items-center gap-4">
            <FormatBadge format="email" theme="success" />
            <FormatBadge format="date" theme="secondary" />
            <FormatBadge format="int32" theme="primary" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Style Badge 组件</h2>
          <div className="flex items-center gap-4">
            <StyleBadge style="form" />
            <StyleBadge style="simple" />
            <StyleBadge style="matrix" />
            <StyleBadge style="label" />
            <StyleBadge style="spaceDelimited" />
            <StyleBadge style="pipeDelimited" />
            <StyleBadge style="deepObject" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Scheme Type 组件</h2>
          <div className="flex items-center gap-4">
            <SchemeType type="apiKey" />
            <SchemeType type="http" />
            <SchemeType type="oauth2" />
            <SchemeType type="openIdConnect" />
            <SchemeType type="mutualTLS" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">In Label 组件</h2>
          <div className="flex items-center gap-4">
            <InLabel type="query" />
            <InLabel type="path" />
            <InLabel type="header" />
            <InLabel type="cookie" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Parameter 组件</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Parameter Name</h3>
              <div className="flex items-center gap-4">
                <ParameterName name="userId" />
                <ParameterName name="deprecated_field" deprecated />
                <ParameterName name="active" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Parameter Description
              </h3>
              <ParameterDescription description="The unique identifier for the user account" />
              <ParameterDescription description="Whether the user account is currently active" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Path Segment 组件</h2>
          <div className="flex items-center gap-1">
            <PathSegment path="/api" />
            <PathSegment path="/users" />
            <PathSegment path="/" />
            <PathSegment path="{userId}" isParameter />
            <PathSegment path="/profile" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Required Marker 组件</h2>
          <div className="flex items-center gap-4 mb-4">
            <span>
              Name <RequiredMarker />
            </span>
            <span>
              Email <RequiredMarker />
            </span>
            <span>
              Password <RequiredMarker title="This field is required" />
            </span>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Section Title 组件</h2>
          <div className="space-y-2">
            <SectionTitle title="默认标题 (h4)" />
            <SectionTitle title="大标题 (h2)" level="h2" />
            <SectionTitle title="小标题 (h5)" level="h5" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Description Display 组件
          </h2>
          <DescriptionDisplay description="这是一个描述文本，展示如何显示组件的描述信息。" />
          <DescriptionDisplay description="支持多行文本和长描述内容的显示。" />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Value Display 组件</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">基本值</h3>
              <div className="flex items-center gap-4">
                <ValueDisplay value="Hello World" />
                <ValueDisplay value={42} />
                <ValueDisplay value={true} />
                <ValueDisplay value={null} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">复杂对象</h3>
              <ValueDisplay value={{ name: "John", age: 30, active: true }} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Default Value Display 组件
          </h2>
          <div className="space-y-4">
            <DefaultValueDisplay value="admin" />
            <DefaultValueDisplay value={0} label="起始值" />
            <DefaultValueDisplay value={{ timeout: 30 }} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Const Value 组件</h2>
          <div className="space-y-4">
            <ConstValue value="ADMIN" />
            <ConstValue value={42} />
            <ConstValue value={{ type: "user", role: "admin" }} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Enum Values 组件</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">字符串枚举</h3>
              <EnumValues values={["pending", "approved", "rejected"]} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">数字枚举</h3>
              <EnumValues values={[1, 2, 3, 5, 8, 13]} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">混合枚举</h3>
              <EnumValues values={["active", 1, true, "inactive", 0, false]} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">综合示例</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <MethodLabel method="POST" />
                <PathSegment path="/api/users/" />
                <PathSegment path="{id}" isParameter />
                <StatusCode code={200} />
              </div>
              <div className="flex items-center gap-2">
                <ParameterName name="id" />
                <RequiredMarker />
                <InLabel type="path" />
                <TypeIndicator type="integer" />
              </div>
              <ParameterDescription description="用户的唯一标识符" />
            </div>

            <div className="p-4 border rounded-lg space-y-2">
              <SectionTitle title="认证信息" />
              <div className="flex items-center gap-2">
                <SchemeType type="oauth2" />
                <RequiredBadge />
              </div>
              <DescriptionDisplay description="需要 OAuth 2.0 授权才能访问此端点" />
            </div>

            <div className="p-4 border rounded-lg space-y-2">
              <SectionTitle title="请求参数" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ParameterName name="name" />
                  <RequiredMarker />
                  <TypeIndicator type="string" />
                  <FormatBadge format="email" />
                  <InLabel type="query" />
                </div>
                <DefaultValueDisplay value="guest" />
                <EnumValues values={["admin", "user", "guest"]} />
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <WebhookLabel />
                <PathSegment path="/webhooks/events" />
                <VersionBadge version="2.0" />
              </div>
              <DescriptionDisplay description="Webhook 事件通知端点" />
              <ConstValue value="webhook_event" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Parameter Group</h3>
              <div className="space-y-4">
                <ParameterGroup
                  inType="query"
                  parameters={[
                    { name: "limit", required: false, type: "integer" },
                    { name: "offset", required: false, type: "integer" },
                    { name: "search", required: false, type: "string" },
                  ]}
                />
                <ParameterGroup
                  inType="path"
                  parameters={[
                    { name: "id", required: true, type: "string" },
                    { name: "version", required: true, type: "string" },
                  ]}
                />
                <ParameterGroup
                  inType="header"
                  parameters={[
                    { name: "Authorization", required: true, type: "string" },
                    { name: "Content-Type", required: false, type: "string" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
