import { ComponentsObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import SchemaDisplay from '../../components/SchemaDisplay';

// 模拟组件对象，用于解析引用
const mockComponents: ComponentsObject = {
  schemas: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' }
      },
      required: ['id', 'name'],
      description: '用户对象'
    },
    Pet: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        name: { type: 'string' },
        type: { type: 'string', enum: ['cat', 'dog', 'bird'] },
        owner: { $ref: '#/components/schemas/User' }
      },
      required: ['id'],
      description: '宠物对象'
    },
    Address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        zipCode: { type: 'string' }
      },
      description: '地址对象'
    },
    Error: {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' }
      },
      required: ['code', 'message'],
      description: '错误响应'
    },
    ArrayOfStrings: {
      type: 'array',
      items: { type: 'string' },
      description: '字符串数组'
    },
    ArrayOfObjects: {
      type: 'array',
      items: { $ref: '#/components/schemas/User' },
      description: '用户对象数组'
    },
    ComplexObject: {
      type: 'object',
      properties: {
        basic: { type: 'string' },
        user: { $ref: '#/components/schemas/User' },
        pets: {
          type: 'array',
          items: { $ref: '#/components/schemas/Pet' }
        },
        address: { $ref: '#/components/schemas/Address' },
        tags: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      description: '包含多种嵌套内容的复杂对象'
    },
    CompositionSchema: {
      allOf: [
        { $ref: '#/components/schemas/User' },
        {
          type: 'object',
          properties: {
            extraField: { type: 'string' }
          }
        }
      ],
      description: '使用allOf组合的模式'
    }
  }
};

const meta = {
  title: 'Components/SchemaDisplay',
  component: SchemaDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    schema: {
      control: { type: 'object' },
      description: '要显示的模式对象'
    },
    components: {
      control: { type: 'object' },
      description: 'OpenAPI组件对象'
    },
    currentDepth: {
      control: { type: 'number' },
      description: '当前嵌套深度'
    },
    maxDepth: {
      control: { type: 'number' },
      description: '最大嵌套深度'
    }
  },
} satisfies Meta<typeof SchemaDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本类型示例
export const StringSchema: Story = {
  args: {
    schema: {
      type: 'string',
      description: '字符串类型',
      example: 'example value'
    },
    components: mockComponents,
    currentDepth: 0
  }
};

export const NumberSchema: Story = {
  args: {
    schema: {
      type: 'number',
      format: 'float',
      minimum: 0,
      maximum: 100,
      description: '数字类型',
      example: 42.5
    },
    components: mockComponents,
    currentDepth: 0
  }
};

export const IntegerSchema: Story = {
  args: {
    schema: {
      type: 'integer',
      format: 'int32',
      minimum: 1,
      maximum: 10,
      description: '整数类型',
      example: 5
    },
    components: mockComponents,
    currentDepth: 0
  }
};

export const BooleanSchema: Story = {
  args: {
    schema: {
      type: 'boolean',
      description: '布尔类型',
      default: false
    },
    components: mockComponents,
    currentDepth: 0
  }
};

export const EnumSchema: Story = {
  args: {
    schema: {
      type: 'string',
      enum: ['pending', 'approved', 'rejected'],
      description: '枚举类型',
      example: 'approved'
    },
    components: mockComponents,
    currentDepth: 0
  }
};

// 对象类型示例
export const ObjectSchema: Story = {
  args: {
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        name: { type: 'string' },
        age: { type: 'integer', minimum: 0 },
        email: { type: 'string', format: 'email' }
      },
      required: ['id', 'name'],
      description: '基本对象类型'
    },
    components: mockComponents,
    currentDepth: 0
  }
};

// 数组类型示例
export const ArrayOfPrimitives: Story = {
  args: {
    schema: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      maxItems: 10,
      description: '字符串数组'
    },
    components: mockComponents,
    currentDepth: 0
  }
};

export const ArrayOfObjects: Story = {
  args: {
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' }
        }
      },
      description: '对象数组'
    },
    components: mockComponents,
    currentDepth: 0
  }
};

// 引用类型示例
export const ReferenceSchema: Story = {
  args: {
    schema: { $ref: '#/components/schemas/User' },
    components: mockComponents,
    currentDepth: 0
  }
};

// 复杂嵌套示例
export const ComplexNestedSchema: Story = {
  args: {
    schema: { $ref: '#/components/schemas/ComplexObject' },
    components: mockComponents,
    currentDepth: 0
  }
};

// 组合类型示例
export const AllOfComposition: Story = {
  args: {
    schema: {
      allOf: [
        { $ref: '#/components/schemas/User' },
        {
          type: 'object',
          properties: {
            extraField: { type: 'string' }
          }
        }
      ],
      description: 'allOf组合示例'
    },
    components: mockComponents,
    currentDepth: 0
  }
};

export const AnyOfComposition: Story = {
  args: {
    schema: {
      anyOf: [
        { $ref: '#/components/schemas/User' },
        { $ref: '#/components/schemas/Pet' }
      ],
      description: 'anyOf组合示例'
    },
    components: mockComponents,
    currentDepth: 0
  }
};

export const OneOfComposition: Story = {
  args: {
    schema: {
      oneOf: [
        { $ref: '#/components/schemas/User' },
        { $ref: '#/components/schemas/Error' }
      ],
      description: 'oneOf组合示例'
    },
    components: mockComponents,
    currentDepth: 0
  }
};

// 异常情况示例
export const EmptySchema: Story = {
  args: {
    schema: {},
    components: mockComponents,
    currentDepth: 0
  }
};

export const InvalidReference: Story = {
  args: {
    schema: { $ref: '#/components/schemas/NonExistent' },
    components: mockComponents,
    currentDepth: 0
  }
};
