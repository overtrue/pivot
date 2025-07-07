import { TermsOfService } from "@/registry/default/ui/terms-of-service";

export default function TermsOfServiceDemo() {
  // 电商平台服务条款
  const ecommerceTerms = "https://ecommerce.example.com/terms-of-service";

  // 金融服务条款
  const financeTerms = "https://fintech.example.com/legal/terms";

  // SaaS 平台服务协议
  const saasTerms = "https://saas.example.com/legal/service-agreement";

  // 开发者平台条款
  const developerTerms = "https://developer.example.com/terms";

  // 企业级 API 服务条款
  const enterpriseTerms = "https://enterprise.example.com/legal/api-terms";

  // 移动应用服务条款
  const mobileTerms = "https://mobile.example.com/terms";

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">电商平台服务条款</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          电商平台的用户服务协议，包含交易规则、退换货政策和争议解决机制
        </p>
        <TermsOfService url={ecommerceTerms} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">金融服务条款</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          金融科技平台的服务条款，包含资金安全、合规要求和风险披露
        </p>
        <TermsOfService url={financeTerms} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">SaaS 平台服务协议</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          软件即服务平台的使用协议，包含订阅条款、数据处理和服务级别协议
        </p>
        <TermsOfService url={saasTerms} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">开发者平台条款</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          API 开发者平台的使用条款，包含开发规范、应用审核和分成政策
        </p>
        <TermsOfService url={developerTerms} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">企业级 API 服务条款</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          企业级 API 服务的商业条款，包含 SLA 保证、技术支持和商业授权
        </p>
        <TermsOfService url={enterpriseTerms} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">移动应用服务条款</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          移动应用的用户协议，包含应用权限、内容政策和用户行为规范
        </p>
        <TermsOfService url={mobileTerms} />
      </div>
    </div>
  );
}
