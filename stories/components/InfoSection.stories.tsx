import { InfoObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import InfoSection from '../../components/InfoSection';

const meta = {
  title: 'Components/InfoSection',
  component: InfoSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    info: {
      control: 'object',
      description: 'OpenAPI信息对象'
    }
  },
} satisfies Meta<typeof InfoSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本信息
export const BasicInfo: Story = {
  args: {
    info: {
      title: '宠物商店 API',
      version: '1.0.0',
      description: '这是一个用于管理宠物商店的示例API。'
    } as InfoObject
  }
};

// 完整信息
export const CompleteInfo: Story = {
  args: {
    info: {
      title: '电子商务平台 API',
      version: '2.1.3',
      description: `
# 电子商务平台 API

这是一个功能完整的电子商务平台API，提供了产品、订单、用户和支付等管理功能。

## 主要功能

* 产品管理
* 订单处理
* 用户管理
* 支付处理
* 库存管理
* 配送跟踪

详细的API使用说明，请参考我们的[开发者文档](https://developer.example.com)。
      `,
      termsOfService: 'https://example.com/terms',
      contact: {
        name: '开发者支持团队',
        url: 'https://example.com/support',
        email: 'api-support@example.com'
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
      }
    } as InfoObject
  }
};

// 仅有标题和版本
export const MinimalInfo: Story = {
  args: {
    info: {
      title: '用户认证 API',
      version: '0.9.1'
    } as InfoObject
  }
};

// 带联系信息
export const InfoWithContact: Story = {
  args: {
    info: {
      title: '数据分析 API',
      version: '1.5.0',
      description: '提供数据分析和报表生成功能的API',
      contact: {
        name: '分析团队',
        email: 'analytics@example.com'
      }
    } as InfoObject
  }
};

// 带许可证信息
export const InfoWithLicense: Story = {
  args: {
    info: {
      title: '内容管理 API',
      version: '3.0.1',
      description: '用于管理网站内容的API',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    } as InfoObject
  }
};

// 带服务条款
export const InfoWithTerms: Story = {
  args: {
    info: {
      title: '支付处理 API',
      version: '2.0.0',
      description: '安全的支付处理系统API',
      termsOfService: 'https://example.com/payment-terms'
    } as InfoObject
  }
};

// 带Markdown格式的描述
export const InfoWithMarkdown: Story = {
  args: {
    info: {
      title: '文档管理 API',
      version: '1.2.0',
      description: `
# 文档管理 API

这是我们的文档管理API的详细说明。

## 认证

所有API请求都需要通过Bearer令牌进行认证：

\`\`\`
Authorization: Bearer YOUR_TOKEN
\`\`\`

## 速率限制

* 基础计划: 100次请求/分钟
* 专业计划: 1000次请求/分钟
* 企业计划: 无限制

## 数据格式

API支持以下数据格式:

1. JSON (默认)
2. XML (需要在Accept头部指定)

了解更多请查看我们的[API指南](https://docs.example.org/guide)。
      `
    } as InfoObject
  }
};
