import { SectionTitle } from "@/registry/default/ui/section-title";

export default function SectionTitleDemo() {
  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">API 概览章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 文档的概览部分，介绍 API 的基本信息和使用说明
        </p>
        <SectionTitle title="API 概览" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">认证授权章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          详细说明 API 的认证和授权机制
        </p>
        <SectionTitle title="认证与授权" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">用户管理 API 章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户相关的 API 端点和操作说明
        </p>
        <SectionTitle title="用户管理" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">电商产品 API 章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商平台的产品管理相关接口
        </p>
        <SectionTitle title="产品管理" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">订单处理 API 章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          订单创建、查询和状态管理相关接口
        </p>
        <SectionTitle title="订单处理" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付系统 API 章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付处理和交易管理相关接口
        </p>
        <SectionTitle title="支付系统" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件上传 API 章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件和媒体资源管理相关接口
        </p>
        <SectionTitle title="文件管理" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据分析 API 章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          数据统计和分析报表相关接口
        </p>
        <SectionTitle title="数据分析" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">通知系统 API 章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          消息推送和通知管理相关接口
        </p>
        <SectionTitle title="通知系统" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">系统配置 API 章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          系统设置和配置管理相关接口
        </p>
        <SectionTitle title="系统配置" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">错误处理章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 错误代码和处理说明
        </p>
        <SectionTitle title="错误处理" />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">SDK 和工具章节标题</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          开发工具和 SDK 使用说明
        </p>
        <SectionTitle title="SDK 和工具" />
      </div>
    </div>
  );
}
