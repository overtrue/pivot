import { ComponentsObject, ExampleObject, StyleType } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import ParameterItem from '../../components/ParameterItem';

const meta = {
  title: 'Components/ParameterItem',
  component: ParameterItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'text',
      description: '参数名称'
    },
    in: {
      control: 'select',
      options: ['path', 'query', 'header', 'cookie'],
      description: '参数所在位置'
    },
    required: {
      control: 'boolean',
      description: '参数是否必需'
    },
    description: {
      control: 'text',
      description: '参数描述'
    },
    deprecated: {
      control: 'boolean',
      description: '参数是否已废弃'
    },
    schema: {
      control: 'object',
      description: '参数的模式定义'
    },
    style: {
      control: 'select',
      options: ['form', 'spaceDelimited', 'pipeDelimited', 'deepObject', 'matrix', 'label', 'simple'],
      description: '参数序列化样式'
    },
    explode: {
      control: 'boolean',
      description: '是否为数组和对象使用爆炸形式'
    },
    examples: {
      control: 'object',
      description: '参数示例'
    }
  },
} satisfies Meta<typeof ParameterItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 模拟组件对象
const mockComponents: ComponentsObject = {
  examples: {
    petExample: {
      summary: '宠物ID示例',
      value: '12345'
    },
    multipleIdsExample: {
      summary: '多个ID示例',
      value: '1,2,3,4,5'
    },
    userLocationExample: {
      summary: '用户位置示例',
      value: {
        lat: 31.2304,
        lng: 121.4737
      }
    }
  }
};

// 路径参数
export const PathParameter: Story = {
  args: {
    name: 'id',
    in: 'path',
    required: true,
    description: '要获取的资源唯一标识符',
    schema: {
      type: 'string',
      pattern: '^[a-zA-Z0-9-]+$',
      minLength: 3,
      maxLength: 50
    }
  }
};

// 数字类型路径参数
export const NumericPathParameter: Story = {
  args: {
    name: 'petId',
    in: 'path',
    required: true,
    description: '要获取的宠物ID',
    schema: {
      type: 'integer',
      format: 'int64',
      minimum: 1
    },
    examples: {
      basic: {
        summary: '基本示例',
        value: 123
      },
      premium: {
        summary: '高级宠物ID',
        value: 999
      }
    } as Record<string, ExampleObject>
  }
};

// 查询参数
export const QueryParameter: Story = {
  args: {
    name: 'limit',
    in: 'query',
    required: false,
    description: '每页返回的结果数量',
    schema: {
      type: 'integer',
      format: 'int32',
      minimum: 1,
      maximum: 100,
      default: 20
    }
  }
};

// 带枚举的查询参数
export const EnumQueryParameter: Story = {
  args: {
    name: 'status',
    in: 'query',
    required: false,
    description: '按状态筛选结果',
    schema: {
      type: 'string',
      enum: ['available', 'pending', 'sold'],
      default: 'available'
    }
  }
};

// 带格式的查询参数
export const FormattedQueryParameter: Story = {
  args: {
    name: 'createdAt',
    in: 'query',
    required: false,
    description: '筛选在指定日期之后创建的资源',
    schema: {
      type: 'string',
      format: 'date',
      example: '2023-01-15'
    }
  }
};

// 数组查询参数
export const ArrayQueryParameter: Story = {
  args: {
    name: 'tags',
    in: 'query',
    required: false,
    description: '按标签筛选结果',
    schema: {
      type: 'array',
      items: {
        type: 'string'
      },
      example: ['pet', 'dog', 'labrador']
    },
    style: 'form' as StyleType,
    explode: true
  }
};

// 带样式的数组查询参数
export const StyleArrayParameter: Story = {
  args: {
    name: 'ids',
    in: 'query',
    required: false,
    description: '按ID列表筛选结果',
    schema: {
      type: 'array',
      items: {
        type: 'integer'
      }
    },
    style: 'pipeDelimited' as StyleType,
    explode: false,
    examples: {
      smallList: {
        summary: '少量ID',
        value: [1, 2, 3]
      },
      largeList: {
        summary: '大量ID',
        value: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]
      }
    } as Record<string, ExampleObject>
  }
};

// 对象查询参数
export const ObjectQueryParameter: Story = {
  args: {
    name: 'location',
    in: 'query',
    required: false,
    description: '按地理位置筛选结果',
    schema: {
      type: 'object',
      properties: {
        lat: {
          type: 'number',
          format: 'float',
          minimum: -90,
          maximum: 90
        },
        lng: {
          type: 'number',
          format: 'float',
          minimum: -180,
          maximum: 180
        },
        radius: {
          type: 'number',
          format: 'float',
          minimum: 0,
          default: 10
        }
      },
      required: ['lat', 'lng']
    },
    style: 'deepObject' as StyleType,
    explode: true
  }
};

// 头部参数
export const HeaderParameter: Story = {
  args: {
    name: 'X-Api-Version',
    in: 'header',
    required: true,
    description: 'API版本号',
    schema: {
      type: 'string',
      pattern: '^\\d+\\.\\d+\\.\\d+$',
      example: '1.0.0'
    }
  }
};

// 废弃的参数
export const DeprecatedParameter: Story = {
  args: {
    name: 'page',
    in: 'query',
    required: false,
    deprecated: true,
    description: '请求的页码（已废弃，请使用offset和limit参数代替）',
    schema: {
      type: 'integer',
      minimum: 1,
      default: 1
    }
  }
};

// Cookie参数
export const CookieParameter: Story = {
  args: {
    name: 'sessionId',
    in: 'cookie',
    required: false,
    description: '会话标识符',
    schema: {
      type: 'string'
    }
  }
};

// 复杂布尔逻辑参数
export const BooleanLogicParameter: Story = {
  args: {
    name: 'filter',
    in: 'query',
    required: false,
    description: '复杂筛选条件',
    schema: {
      type: 'string',
      description: '使用AND、OR、NOT等操作符组合多个筛选条件',
      example: 'status:active AND (role:admin OR role:editor) AND NOT deleted:true'
    }
  }
};
