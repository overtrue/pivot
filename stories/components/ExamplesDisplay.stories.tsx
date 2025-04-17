import { ComponentsObject, ExampleObject, ReferenceObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import ExamplesDisplay from '../../components/ExamplesDisplay';

const meta = {
  title: 'Components/ExamplesDisplay',
  component: ExamplesDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    examples: {
      control: 'object',
      description: '示例对象映射'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象，用于解析引用'
    }
  },
} satisfies Meta<typeof ExamplesDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// 模拟组件对象，包含引用示例
const mockComponents: ComponentsObject = {
  examples: {
    userExample: {
      summary: '用户对象示例',
      description: '包含完整用户信息的示例对象',
      value: {
        id: '1234567890',
        username: 'johndoe',
        firstName: '约翰',
        lastName: '多伊',
        email: 'john.doe@example.com',
        phone: '+86 13800138000',
        createdAt: '2023-01-15T08:30:00Z'
      }
    },
    productExample: {
      summary: '产品对象示例',
      description: '包含产品详情的示例对象',
      value: {
        id: 'prod-12345',
        name: '高级智能手机',
        price: 4999.99,
        category: '电子产品',
        tags: ['智能手机', '高端', '5G'],
        inStock: true
      }
    },
    errorExample: {
      summary: '错误响应示例',
      description: 'API返回的标准错误格式',
      value: {
        code: 'INVALID_PARAMETER',
        message: '请求包含无效参数',
        details: [
          {
            field: 'email',
            message: '邮箱格式不正确'
          }
        ]
      }
    }
  }
};

// 基本示例
export const BasicExamples: Story = {
  args: {
    examples: {
      'example1': {
        summary: '示例1',
        description: '这是第一个基本示例',
        value: {
          id: 1,
          name: '示例项目',
          active: true
        }
      },
      'example2': {
        summary: '示例2',
        value: {
          id: 2,
          name: '另一个示例',
          active: false
        }
      }
    } as Record<string, ExampleObject>
  }
};

// 包含不同数据类型的示例
export const DifferentDataTypes: Story = {
  args: {
    examples: {
      'stringExample': {
        summary: '字符串示例',
        value: 'Hello, World!'
      },
      'numberExample': {
        summary: '数字示例',
        value: 42.5
      },
      'booleanExample': {
        summary: '布尔值示例',
        value: true
      },
      'arrayExample': {
        summary: '数组示例',
        value: [1, 2, 3, 4, 5]
      },
      'objectExample': {
        summary: '对象示例',
        value: {
          key1: 'value1',
          key2: 'value2'
        }
      },
      'nullExample': {
        summary: 'Null示例',
        value: null
      }
    } as Record<string, ExampleObject>
  }
};

// 复杂数据示例
export const ComplexExamples: Story = {
  args: {
    examples: {
      'order': {
        summary: '订单示例',
        description: '包含多个商品的订单示例',
        value: {
          orderId: 'ORD-2023-12345',
          customer: {
            id: 'CUST-5678',
            name: '张三',
            email: 'zhang.san@example.com'
          },
          items: [
            {
              productId: 'PROD-001',
              name: '机械键盘',
              quantity: 1,
              price: 499.99
            },
            {
              productId: 'PROD-002',
              name: '无线鼠标',
              quantity: 2,
              price: 129.99
            }
          ],
          shipping: {
            address: {
              street: '科技园路88号',
              city: '深圳市',
              province: '广东省',
              postalCode: '518057'
            },
            method: '快递',
            cost: 15.00
          },
          total: 774.97,
          status: '已付款',
          createdAt: '2023-06-15T14:30:45Z'
        }
      },
      'report': {
        summary: '报表数据示例',
        description: '包含图表数据的月度销售报表',
        value: {
          reportId: 'REP-2023-07',
          title: '2023年7月销售报表',
          period: {
            start: '2023-07-01',
            end: '2023-07-31'
          },
          metrics: {
            totalSales: 128765.45,
            totalOrders: 1432,
            averageOrderValue: 89.92
          },
          topProducts: [
            { name: '产品A', sales: 45320.75, units: 520 },
            { name: '产品B', sales: 32150.50, units: 310 },
            { name: '产品C', sales: 28760.20, units: 280 }
          ],
          salesByRegion: {
            '华东': 45678.90,
            '华南': 38765.40,
            '华北': 24567.80,
            '西部': 19753.35
          },
          graphData: {
            labels: ['周1', '周2', '周3', '周4'],
            values: [32450.75, 29876.50, 35421.80, 31016.40]
          }
        }
      }
    } as Record<string, ExampleObject>
  }
};

// 带描述的示例
export const ExamplesWithDescriptions: Story = {
  args: {
    examples: {
      'example1': {
        summary: '成功响应',
        description: '当API请求成功时返回的标准响应格式。包含状态码、消息和请求的数据。',
        value: {
          status: 'success',
          code: 200,
          message: '请求成功',
          data: {
            id: '12345',
            name: '测试数据'
          }
        }
      },
      'example2': {
        summary: '验证错误',
        description: '当请求参数验证失败时返回的错误响应。包含详细的错误信息和字段验证失败的原因。',
        value: {
          status: 'error',
          code: 400,
          message: '请求参数验证失败',
          errors: [
            {
              field: 'email',
              message: '邮箱格式不正确'
            },
            {
              field: 'password',
              message: '密码长度必须至少为8个字符'
            }
          ]
        }
      }
    } as Record<string, ExampleObject>
  }
};

// 引用示例
export const ReferencedExamples: Story = {
  args: {
    examples: {
      'user': {
        $ref: '#/components/examples/userExample'
      } as ReferenceObject,
      'product': {
        $ref: '#/components/examples/productExample'
      } as ReferenceObject,
      'error': {
        $ref: '#/components/examples/errorExample'
      } as ReferenceObject,
      'local': {
        summary: '本地示例',
        description: '直接定义的示例（非引用）',
        value: {
          message: '这是直接定义的示例，不是引用'
        }
      }
    } as Record<string, ExampleObject | ReferenceObject>,
    components: mockComponents
  }
};
