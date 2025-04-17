import { ComponentsObject, RequestBodyObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import RequestBodySection from '../../components/RequestBodySection';

const meta = {
  title: 'Components/RequestBodySection',
  component: RequestBodySection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    requestBody: {
      control: 'object',
      description: '请求体对象'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象，用于解析引用'
    }
  },
} satisfies Meta<typeof RequestBodySection>;

export default meta;
type Story = StoryObj<typeof meta>;

// 模拟组件对象
const mockComponents: ComponentsObject = {
  schemas: {
    Pet: {
      type: 'object',
      required: ['name'],
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          readOnly: true
        },
        name: {
          type: 'string',
          example: '小狗'
        },
        category: {
          type: 'string',
          enum: ['狗', '猫', '鸟', '鱼', '其他']
        },
        tags: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        status: {
          type: 'string',
          enum: ['available', 'pending', 'sold'],
          description: '宠物的状态'
        }
      }
    },
    User: {
      type: 'object',
      required: ['username', 'email'],
      properties: {
        id: {
          type: 'integer',
          format: 'int64'
        },
        username: {
          type: 'string'
        },
        email: {
          type: 'string',
          format: 'email'
        },
        password: {
          type: 'string',
          format: 'password',
          writeOnly: true
        }
      }
    }
  }
};

// 基本请求体
export const BasicRequestBody: Story = {
  args: {
    requestBody: {
      description: '要创建的宠物对象',
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Pet'
          }
        }
      }
    } as RequestBodyObject,
    components: mockComponents
  }
};

// 多种内容类型
export const MultipleContentTypes: Story = {
  args: {
    requestBody: {
      description: '要创建的宠物对象，支持多种格式',
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Pet'
          }
        },
        'application/xml': {
          schema: {
            $ref: '#/components/schemas/Pet'
          }
        },
        'application/x-www-form-urlencoded': {
          schema: {
            $ref: '#/components/schemas/Pet'
          }
        }
      }
    } as RequestBodyObject,
    components: mockComponents
  }
};

// 带示例的请求体
export const RequestBodyWithExample: Story = {
  args: {
    requestBody: {
      description: '要创建的宠物对象，包含示例',
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Pet'
          },
          example: {
            name: '小白',
            category: '狗',
            tags: ['可爱', '友好'],
            status: 'available'
          }
        }
      }
    } as RequestBodyObject,
    components: mockComponents
  }
};

// 非必填请求体
export const OptionalRequestBody: Story = {
  args: {
    requestBody: {
      description: '可选的用户更新信息',
      required: false,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: '用户显示名称'
              },
              avatar: {
                type: 'string',
                format: 'uri',
                description: '用户头像URL'
              },
              bio: {
                type: 'string',
                description: '用户简介'
              }
            }
          }
        }
      }
    } as RequestBodyObject,
    components: mockComponents
  }
};

// 引用请求体
export const ReferencedRequestBody: Story = {
  args: {
    requestBody: {
      $ref: '#/components/schemas/User'
    },
    components: mockComponents
  }
};

// 复杂嵌套请求体
export const ComplexNestedRequestBody: Story = {
  args: {
    requestBody: {
      description: '创建订单请求',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['customerId', 'items'],
            properties: {
              customerId: {
                type: 'integer',
                format: 'int64',
                description: '客户ID'
              },
              items: {
                type: 'array',
                description: '订单项目',
                items: {
                  type: 'object',
                  required: ['productId', 'quantity'],
                  properties: {
                    productId: {
                      type: 'integer',
                      format: 'int64',
                      description: '产品ID'
                    },
                    quantity: {
                      type: 'integer',
                      minimum: 1,
                      description: '数量'
                    },
                    unitPrice: {
                      type: 'number',
                      format: 'float',
                      description: '单价（可选，如未提供将使用当前价格）'
                    }
                  }
                },
                minItems: 1
              },
              shippingAddress: {
                type: 'object',
                properties: {
                  street: {
                    type: 'string'
                  },
                  city: {
                    type: 'string'
                  },
                  state: {
                    type: 'string'
                  },
                  zipCode: {
                    type: 'string'
                  },
                  country: {
                    type: 'string'
                  }
                },
                required: ['street', 'city', 'zipCode', 'country']
              },
              notes: {
                type: 'string',
                description: '订单备注'
              }
            }
          },
          example: {
            customerId: 12345,
            items: [
              {
                productId: 987,
                quantity: 2
              },
              {
                productId: 654,
                quantity: 1,
                unitPrice: 29.99
              }
            ],
            shippingAddress: {
              street: '中关村大街1号',
              city: '北京',
              state: '北京市',
              zipCode: '100080',
              country: '中国'
            },
            notes: '请在周末送货'
          }
        }
      }
    } as RequestBodyObject,
    components: mockComponents
  }
};
