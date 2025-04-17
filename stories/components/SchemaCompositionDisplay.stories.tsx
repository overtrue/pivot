import { ComponentsObject, ReferenceObject, SchemaObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import SchemaCompositionDisplay from '../../components/SchemaCompositionDisplay';

const meta = {
  title: 'Components/SchemaCompositionDisplay',
  component: SchemaCompositionDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    keyword: {
      control: 'select',
      options: ['allOf', 'anyOf', 'oneOf', 'not'],
      description: '模式组合关键字'
    },
    subschemas: {
      control: 'object',
      description: '子模式数组'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象'
    },
    currentDepth: {
      control: 'number',
      description: '当前嵌套深度'
    }
  },
} satisfies Meta<typeof SchemaCompositionDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础组件对象
const baseComponents: ComponentsObject = {
  schemas: {
    Error: {
      type: 'object',
      properties: {
        code: { type: 'integer', format: 'int32' },
        message: { type: 'string' }
      },
      required: ['code', 'message'],
      description: '错误响应模型'
    },
    Pet: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        name: { type: 'string' },
        tag: { type: 'string' }
      },
      required: ['id', 'name']
    }
  }
};

// AllOf 示例
export const AllOfExample: Story = {
  args: {
    keyword: 'allOf',
    subschemas: [
      {
        type: 'object',
        properties: {
          id: { type: 'integer', format: 'int64' },
          name: { type: 'string' }
        },
        required: ['id'],
        description: '基础身份信息'
      },
      {
        type: 'object',
        properties: {
          address: { type: 'string' },
          phone: { type: 'string', pattern: '^\\+[0-9]{1,3} [0-9]{4,14}$' }
        },
        description: '联系方式信息'
      },
      { $ref: '#/components/schemas/Pet' } as ReferenceObject
    ],
    components: baseComponents,
    currentDepth: 0
  }
};

// AnyOf 示例
export const AnyOfExample: Story = {
  args: {
    keyword: 'anyOf',
    subschemas: [
      {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' }
        },
        required: ['email'],
        description: '邮箱联系方式'
      },
      {
        type: 'object',
        properties: {
          name: { type: 'string' },
          phone: { type: 'string', pattern: '^\\+[0-9]{1,3} [0-9]{4,14}$' }
        },
        required: ['phone'],
        description: '电话联系方式'
      }
    ],
    components: baseComponents,
    currentDepth: 0
  }
};

// OneOf 示例
export const OneOfExample: Story = {
  args: {
    keyword: 'oneOf',
    subschemas: [
      {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['personal'] },
          name: { type: 'string' },
          personalId: { type: 'string' }
        },
        required: ['type', 'personalId'],
        description: '个人账户'
      },
      {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['business'] },
          name: { type: 'string' },
          companyId: { type: 'string' },
          taxId: { type: 'string' }
        },
        required: ['type', 'companyId'],
        description: '企业账户'
      },
      { $ref: '#/components/schemas/Error' } as ReferenceObject
    ],
    components: baseComponents,
    currentDepth: 0
  }
};

// Not 示例
export const NotExample: Story = {
  args: {
    keyword: 'not',
    subschemas: [
      {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['admin'] },
          superAdmin: { type: 'boolean' }
        },
        required: ['type'],
        description: '管理员账户类型（排除）'
      }
    ],
    components: baseComponents,
    currentDepth: 0
  }
};

// 深度嵌套示例
export const NestedExample: Story = {
  args: {
    keyword: 'allOf',
    subschemas: [
      {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'integer', minimum: 0 }
        },
        required: ['name'],
        description: '基本用户信息'
      },
      {
        anyOf: [
          {
            type: 'object',
            properties: {
              role: { type: 'string', enum: ['admin'] },
              permissions: { type: 'array', items: { type: 'string' } }
            },
            required: ['role'],
            description: '管理员角色'
          },
          {
            type: 'object',
            properties: {
              role: { type: 'string', enum: ['user'] },
              subscription: { type: 'string', enum: ['free', 'premium', 'enterprise'] }
            },
            required: ['role'],
            description: '普通用户角色'
          }
        ] as SchemaObject[]
      } as SchemaObject
    ],
    components: baseComponents,
    currentDepth: 0
  }
};

// 引用组合示例
export const ReferencesExample: Story = {
  args: {
    keyword: 'oneOf',
    subschemas: [
      { $ref: '#/components/schemas/Pet' } as ReferenceObject,
      { $ref: '#/components/schemas/Error' } as ReferenceObject,
      {
        type: 'object',
        properties: {
          type: { type: 'string', const: 'custom' },
          data: { type: 'object', additionalProperties: true }
        },
        required: ['type', 'data'],
        description: '自定义数据类型'
      }
    ],
    components: baseComponents,
    currentDepth: 0
  }
};
