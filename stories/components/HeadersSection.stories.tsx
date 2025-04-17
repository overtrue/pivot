import { ComponentsObject, HeaderObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import HeadersSection from '../../components/HeadersSection';

const meta = {
  title: 'Components/HeadersSection',
  component: HeadersSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    headers: {
      control: 'object',
      description: '头部对象映射'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象，用于解析引用'
    }
  },
} satisfies Meta<typeof HeadersSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// 模拟组件对象
const mockComponents: ComponentsObject = {
  headers: {
    RateLimitHeader: {
      description: '每小时可以发送的请求数量',
      schema: {
        type: 'integer',
        format: 'int32'
      }
    },
    ExpiresAfterHeader: {
      description: '令牌过期时间',
      schema: {
        type: 'string',
        format: 'date-time'
      }
    }
  }
};

// 基本头部
export const BasicHeaders: Story = {
  args: {
    headers: {
      'X-Rate-Limit': {
        description: '每小时可以发送的请求数量',
        schema: {
          type: 'integer',
          format: 'int32'
        }
      },
      'X-Expires-After': {
        description: '令牌过期时间',
        schema: {
          type: 'string',
          format: 'date-time'
        }
      }
    } as Record<string, HeaderObject>,
    components: mockComponents
  }
};

// 带必填项的头部
export const RequiredHeaders: Story = {
  args: {
    headers: {
      'X-API-Key': {
        description: 'API密钥，用于认证',
        required: true,
        schema: {
          type: 'string'
        }
      },
      'X-Request-ID': {
        description: '用于跟踪的请求ID',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid'
        }
      },
      'Accept-Language': {
        description: '首选语言',
        required: false,
        schema: {
          type: 'string',
          default: 'zh-CN'
        }
      }
    } as Record<string, HeaderObject>,
    components: mockComponents
  }
};

// 带废弃标记的头部
export const DeprecatedHeaders: Story = {
  args: {
    headers: {
      'X-Old-API-Key': {
        description: '旧版API密钥（已废弃）',
        deprecated: true,
        schema: {
          type: 'string'
        }
      },
      'X-API-Key': {
        description: '新版API密钥',
        schema: {
          type: 'string'
        }
      }
    } as Record<string, HeaderObject>,
    components: mockComponents
  }
};

// 带示例的头部
export const HeadersWithExamples: Story = {
  args: {
    headers: {
      'X-Rate-Limit': {
        description: '每小时可以发送的请求数量',
        schema: {
          type: 'integer',
          format: 'int32'
        },
        examples: {
          basic: {
            summary: '基本套餐',
            value: 100
          },
          pro: {
            summary: '专业套餐',
            value: 1000
          },
          enterprise: {
            summary: '企业套餐',
            value: 10000
          }
        }
      },
      'X-API-Version': {
        description: 'API版本',
        schema: {
          type: 'string'
        },
        examples: {
          v1: {
            summary: '版本1',
            value: 'v1'
          },
          v2: {
            summary: '版本2',
            value: 'v2'
          }
        }
      }
    } as Record<string, HeaderObject>,
    components: mockComponents
  }
};

// 引用头部
export const ReferencedHeaders: Story = {
  args: {
    headers: {
      'X-Rate-Limit': {
        $ref: '#/components/headers/RateLimitHeader'
      },
      'X-Expires-After': {
        $ref: '#/components/headers/ExpiresAfterHeader'
      },
      'X-Custom-Header': {
        description: '自定义头部',
        schema: {
          type: 'string'
        }
      }
    },
    components: mockComponents
  }
};

// 各种类型的头部
export const MixedHeaderTypes: Story = {
  args: {
    headers: {
      'X-Integer-Header': {
        description: '整数类型的头部',
        schema: {
          type: 'integer',
          format: 'int32',
          minimum: 1,
          maximum: 100
        }
      },
      'X-String-Header': {
        description: '字符串类型的头部',
        schema: {
          type: 'string',
          minLength: 3,
          maxLength: 50
        }
      },
      'X-Boolean-Header': {
        description: '布尔类型的头部',
        schema: {
          type: 'boolean'
        }
      },
      'X-Array-Header': {
        description: '数组类型的头部',
        schema: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        style: 'simple'
      }
    } as Record<string, HeaderObject>,
    components: mockComponents
  }
};
