import { ComponentsObject, HeaderObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import HeaderItem from '../../components/HeaderItem';

// 模拟组件对象
const mockComponents: ComponentsObject = {
  examples: {
    ApiKeyExample: {
      value: 'api-key-12345'
    },
    ContentTypeExample: {
      value: 'application/json'
    },
    AcceptExample: {
      value: 'application/json, text/plain, */*'
    }
  }
};

const meta = {
  title: 'Components/HeaderItem',
  component: HeaderItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'HTTP头部的名称'
    },
    required: {
      control: 'boolean',
      description: '该头部是否是必需的'
    },
    schema: {
      control: 'object',
      description: '头部值的模式'
    },
    description: {
      control: 'text',
      description: '头部的描述信息'
    },
    deprecated: {
      control: 'boolean',
      description: '该头部是否已废弃'
    },
    examples: {
      control: 'object',
      description: '头部值的示例'
    },
    style: {
      control: 'text',
      description: '头部值的序列化风格'
    },
    explode: {
      control: 'boolean',
      description: '数组和对象是否展开为多个参数'
    }
  },
} satisfies Meta<typeof HeaderItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的字符串头部
export const BasicStringHeader: Story = {
  args: {
    name: 'X-API-Key',
    required: true,
    schema: {
      type: 'string',
      description: 'API密钥用于认证请求'
    },
    description: '用于API访问认证的密钥。所有API请求都必须包含此头部。'
  }
};

// 带枚举值的头部
export const HeaderWithEnum: Story = {
  args: {
    name: 'Accept',
    required: true,
    schema: {
      type: 'string',
      enum: ['application/json', 'application/xml', 'text/plain'],
      default: 'application/json'
    },
    description: '指定客户端期望的响应内容类型。'
  }
};

// 整数类型的头部
export const IntegerHeader: Story = {
  args: {
    name: 'X-Rate-Limit-Limit',
    schema: {
      type: 'integer',
      format: 'int32',
      minimum: 1,
      maximum: 1000
    },
    description: '当前速率限制窗口内允许的最大请求数。'
  }
};

// 带格式的日期时间头部
export const DateTimeHeader: Story = {
  args: {
    name: 'X-Request-Time',
    schema: {
      type: 'string',
      format: 'date-time'
    },
    description: '请求发起的ISO 8601格式日期和时间。'
  }
};

// 带示例的头部
export const HeaderWithExamples: Story = {
  args: {
    name: 'Content-Type',
    required: true,
    schema: {
      type: 'string',
      pattern: '^application\\/[a-zA-Z0-9\\.\\+]+$'
    },
    description: '请求的媒体类型。',
    examples: {
      json: {
        value: 'application/json',
        summary: 'JSON格式'
      },
      xml: {
        value: 'application/xml',
        summary: 'XML格式'
      },
      formData: {
        value: 'application/x-www-form-urlencoded',
        summary: 'URL编码的表单数据'
      }
    } as HeaderObject['examples']
  }
};

// 数组类型头部
export const ArrayHeader: Story = {
  args: {
    name: 'X-Forwarded-For',
    schema: {
      type: 'array',
      items: {
        type: 'string',
        format: 'ipv4'
      }
    },
    style: 'simple',
    explode: false,
    description: '客户端IP地址列表，由代理服务器添加。'
  }
};

// 对象类型头部
export const ObjectHeader: Story = {
  args: {
    name: 'X-Device-Info',
    schema: {
      type: 'object',
      properties: {
        os: {
          type: 'string',
          description: '操作系统'
        },
        version: {
          type: 'string',
          description: '系统版本'
        },
        browser: {
          type: 'string',
          description: '浏览器名称'
        }
      },
      required: ['os', 'browser']
    },
    style: 'simple',
    explode: true,
    description: '设备信息对象，包含操作系统、版本和浏览器信息。'
  }
};

// 废弃的头部
export const DeprecatedHeader: Story = {
  args: {
    name: 'X-Authentication-Token',
    deprecated: true,
    required: false,
    schema: {
      type: 'string'
    },
    description: '已废弃的认证方式。请使用Authorization头部代替。'
  }
};

// 带默认值的头部
export const HeaderWithDefault: Story = {
  args: {
    name: 'X-Request-ID',
    schema: {
      type: 'string',
      format: 'uuid',
      default: '00000000-0000-0000-0000-000000000000'
    },
    description: '请求的唯一标识符。如未提供，将使用默认值。'
  }
};

// 带约束的头部
export const HeaderWithConstraints: Story = {
  args: {
    name: 'X-Pagination-Page',
    schema: {
      type: 'integer',
      minimum: 1,
      maximum: 100,
      default: 1
    },
    description: '当前请求的页码，范围为1到100。'
  }
};
