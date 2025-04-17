import { ComponentsObject, ParameterObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import ParametersSection from '../../components/ParametersSection';

const meta = {
  title: 'Components/ParametersSection',
  component: ParametersSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    parameters: {
      control: 'object',
      description: '参数对象数组'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象，用于解析引用'
    }
  },
} satisfies Meta<typeof ParametersSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// 模拟组件对象
const mockComponents: ComponentsObject = {
  parameters: {
    LimitParam: {
      name: 'limit',
      in: 'query',
      description: '每页返回的结果数量',
      required: false,
      schema: {
        type: 'integer',
        format: 'int32',
        default: 20,
        minimum: 1,
        maximum: 100
      }
    },
    OffsetParam: {
      name: 'offset',
      in: 'query',
      description: '结果的起始位置',
      required: false,
      schema: {
        type: 'integer',
        format: 'int32',
        default: 0,
        minimum: 0
      }
    },
    ApiKeyHeader: {
      name: 'X-API-Key',
      in: 'header',
      description: 'API密钥，用于认证',
      required: true,
      schema: {
        type: 'string'
      }
    }
  }
};

// 路径参数
export const PathParameters: Story = {
  args: {
    parameters: [
      {
        name: 'petId',
        in: 'path',
        description: '宠物的唯一标识符',
        required: true,
        schema: {
          type: 'integer',
          format: 'int64'
        }
      },
      {
        name: 'userId',
        in: 'path',
        description: '用户的唯一标识符',
        required: true,
        schema: {
          type: 'integer',
          format: 'int64'
        }
      }
    ] as ParameterObject[],
    components: mockComponents
  }
};

// 查询参数
export const QueryParameters: Story = {
  args: {
    parameters: [
      {
        name: 'status',
        in: 'query',
        description: '宠物状态过滤条件',
        required: false,
        schema: {
          type: 'string',
          enum: ['available', 'pending', 'sold'],
          default: 'available'
        }
      },
      {
        name: 'tags',
        in: 'query',
        description: '标签过滤条件',
        required: false,
        schema: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        style: 'form',
        explode: true
      },
      {
        name: 'limit',
        in: 'query',
        description: '返回结果数量限制',
        required: false,
        schema: {
          type: 'integer',
          format: 'int32',
          default: 20,
          minimum: 1,
          maximum: 100
        }
      }
    ] as ParameterObject[],
    components: mockComponents
  }
};

// 头部参数
export const HeaderParameters: Story = {
  args: {
    parameters: [
      {
        name: 'X-API-Key',
        in: 'header',
        description: 'API密钥，用于认证',
        required: true,
        schema: {
          type: 'string'
        }
      },
      {
        name: 'X-Request-ID',
        in: 'header',
        description: '用于跟踪的请求ID',
        required: false,
        schema: {
          type: 'string',
          format: 'uuid'
        }
      },
      {
        name: 'Accept-Language',
        in: 'header',
        description: '首选语言',
        required: false,
        schema: {
          type: 'string',
          default: 'zh-CN',
          enum: ['zh-CN', 'en-US', 'ja-JP', 'ko-KR', 'fr-FR', 'de-DE']
        }
      }
    ] as ParameterObject[],
    components: mockComponents
  }
};

// Cookie参数
export const CookieParameters: Story = {
  args: {
    parameters: [
      {
        name: 'session_id',
        in: 'cookie',
        description: '会话标识符',
        required: true,
        schema: {
          type: 'string'
        }
      },
      {
        name: 'preferences',
        in: 'cookie',
        description: '用户偏好设置',
        required: false,
        schema: {
          type: 'string'
        }
      }
    ] as ParameterObject[],
    components: mockComponents
  }
};

// 混合参数类型
export const MixedParameterTypes: Story = {
  args: {
    parameters: [
      {
        name: 'orderId',
        in: 'path',
        description: '订单ID',
        required: true,
        schema: {
          type: 'integer',
          format: 'int64'
        }
      },
      {
        name: 'include',
        in: 'query',
        description: '要包含的关联资源',
        required: false,
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['items', 'customer', 'payment', 'shipping']
          }
        },
        style: 'form',
        explode: true
      },
      {
        name: 'X-Tenant-ID',
        in: 'header',
        description: '多租户应用中的租户ID',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ] as ParameterObject[],
    components: mockComponents
  }
};

// 参数引用
export const ReferencedParameters: Story = {
  args: {
    parameters: [
      {
        $ref: '#/components/parameters/LimitParam'
      },
      {
        $ref: '#/components/parameters/OffsetParam'
      },
      {
        $ref: '#/components/parameters/ApiKeyHeader'
      },
      {
        name: 'id',
        in: 'path',
        description: '资源ID',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    components: mockComponents
  }
};
