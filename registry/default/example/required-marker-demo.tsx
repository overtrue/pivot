"use client";

import { RequiredMarker } from "@/registry/default/ui/required-marker";

export default function RequiredMarkerDemo() {
  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户注册表单必需字段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户注册时的必需字段标记，确保用户提供关键信息
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">邮箱地址</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">用户名</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">密码</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">手机号码</span>
            <RequiredMarker />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">API 请求参数必需标记</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 文档中的必需参数标记，帮助开发者识别必需字段
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">userId</span>
            <RequiredMarker />
            <span className="text-xs text-neutral-500">- 用户唯一标识符</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">Authorization</span>
            <RequiredMarker />
            <span className="text-xs text-neutral-500">- Bearer Token 认证头</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">Content-Type</span>
            <RequiredMarker />
            <span className="text-xs text-neutral-500">- 请求内容类型</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">产品信息必需字段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商产品创建时的必需信息标记
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">产品名称</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">产品价格</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">产品分类</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">库存数量</span>
            <RequiredMarker />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付信息必需字段</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付处理时的必需信息标记，确保支付安全
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">支付金额</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">货币类型</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">支付方式</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">订单号</span>
            <RequiredMarker />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件上传必需参数</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传接口的必需参数标记
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">file</span>
            <RequiredMarker />
            <span className="text-xs text-neutral-500">- 上传的文件内容</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">filename</span>
            <RequiredMarker />
            <span className="text-xs text-neutral-500">- 文件名称</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">fileType</span>
            <RequiredMarker />
            <span className="text-xs text-neutral-500">- 文件类型</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业认证必需信息</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业用户认证时的必需信息标记
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">企业名称</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">统一社会信用代码</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">法人代表</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">营业执照</span>
            <RequiredMarker />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据分析查询必需参数</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          数据分析 API 的必需查询参数标记
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">startDate</span>
            <RequiredMarker />
            <span className="text-xs text-neutral-500">- 查询开始日期</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">endDate</span>
            <RequiredMarker />
            <span className="text-xs text-neutral-500">- 查询结束日期</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono">metrics</span>
            <RequiredMarker />
            <span className="text-xs text-neutral-500">- 分析指标类型</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">系统配置必需项</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          系统配置更新时的必需配置项标记
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">系统名称</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">管理员邮箱</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">数据库连接</span>
            <RequiredMarker />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">安全密钥</span>
            <RequiredMarker />
          </div>
        </div>
      </div>
    </div>
  );
}
