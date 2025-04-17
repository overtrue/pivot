import { ComponentsObject, HeaderObject, LinkObject, MediaTypeObject, ResponseObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import ResponseItem from '../../components/ResponseItem';

const meta = {
  title: 'Components/ResponseItem',
  component: ResponseItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    code: {
      control: 'text',
      description: 'HTTP响应状态码'
    },
    response: {
      control: 'object',
      description: '响应对象或引用'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象，用于解析引用'
    }
  },
} satisfies Meta<typeof ResponseItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 模拟组件对象，用于解析引用
const mockComponents: ComponentsObject = {
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
    User: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        status: { type: 'string', enum: ['active', 'inactive'] }
      },
      required: ['id', 'username'],
      description: '用户信息模型'
    }
  },
  responses: {
    NotFound: {
      description: '请求的资源未找到',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          },
          examples: {
            notFound: {
              value: {
                code: 404,
                message: '请求的资源不存在'
              }
            }
          }
        }
      }
    },
    Unauthorized: {
      description: '未授权访问',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          },
          examples: {
            invalidToken: {
              value: {
                code: 401,
                message: '无效的访问令牌'
              }
            }
          }
        }
      }
    }
  }
};

// 基本成功响应
export const SuccessResponse: Story = {
  args: {
    code: '200',
    response: {
      description: '操作成功完成'
    } as ResponseObject
  }
};

// 带内容的成功响应
export const SuccessWithContent: Story = {
  args: {
    code: '200',
    response: {
      description: '成功获取用户信息',
      content: {
        'application/json': {
          schema: {
            type: 'object',
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
              createdAt: {
                type: 'string',
                format: 'date-time'
              }
            },
            required: ['id', 'username']
          } as any,
          examples: {
            user: {
              value: {
                id: 10,
                username: '张三',
                email: 'zhangsan@example.com',
                createdAt: '2023-01-15T08:30:00Z'
              }
            }
          }
        } as MediaTypeObject
      }
    } as ResponseObject
  }
};

// 带头部的响应
export const ResponseWithHeaders: Story = {
  args: {
    code: '201',
    response: {
      description: '资源创建成功',
      headers: {
        'Location': {
          description: '新创建资源的URI',
          schema: {
            type: 'string',
            format: 'uri'
          },
          example: 'https://api.example.com/users/12345'
        } as HeaderObject,
        'X-Request-ID': {
          description: '请求跟踪ID',
          schema: {
            type: 'string',
            format: 'uuid'
          },
          example: '5a8c1f5e-2c5a-42e9-a6a1-2e4c2d4c6e8e'
        } as HeaderObject
      },
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'integer', format: 'int64' },
              message: { type: 'string' }
            }
          } as any,
          examples: {
            creation: {
              value: {
                id: 12345,
                message: '用户创建成功'
              }
            }
          }
        } as MediaTypeObject
      }
    } as ResponseObject
  }
};

// 带链接的响应
export const ResponseWithLinks: Story = {
  args: {
    code: '200',
    response: {
      description: '成功获取订单信息',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              customerId: { type: 'string' },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    productId: { type: 'string' },
                    quantity: { type: 'integer' }
                  }
                }
              },
              status: { type: 'string' }
            }
          } as any,
          examples: {
            order: {
              value: {
                id: 'order-12345',
                customerId: 'cust-6789',
                items: [
                  { productId: 'prod-101', quantity: 2 },
                  { productId: 'prod-205', quantity: 1 }
                ],
                status: 'processing'
              }
            }
          }
        } as MediaTypeObject
      },
      links: {
        'getCustomer': {
          operationId: 'getCustomer',
          parameters: {
            customerId: '$response.body#/customerId'
          },
          description: '获取订单客户的详细信息'
        } as LinkObject,
        'getOrderItems': {
          operationId: 'getOrderItems',
          parameters: {
            orderId: '$response.body#/id'
          },
          description: '获取订单中所有商品的详细信息'
        } as LinkObject
      }
    } as ResponseObject
  }
};

// 错误响应
export const ErrorResponse: Story = {
  args: {
    code: '400',
    response: {
      description: '请求参数错误',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string'
              },
              details: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    field: { type: 'string' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          } as any,
          examples: {
            validationError: {
              value: {
                error: '验证失败',
                details: [
                  { field: 'email', message: '必须是有效的电子邮件地址' },
                  { field: 'password', message: '长度必须至少为8个字符' }
                ]
              }
            }
          }
        } as MediaTypeObject
      }
    } as ResponseObject
  }
};

// 完整复杂响应
export const ComplexResponse: Story = {
  args: {
    code: '200',
    response: {
      description: '成功获取详细报告',
      headers: {
        'X-Rate-Limit-Remaining': {
          description: '剩余的API请求次数',
          schema: {
            type: 'integer'
          },
          example: 99
        } as HeaderObject,
        'X-Rate-Limit-Reset': {
          description: '速率限制重置时间',
          schema: {
            type: 'string',
            format: 'date-time'
          },
          example: '2023-12-31T23:59:59Z'
        } as HeaderObject
      },
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              data: {
                type: 'object',
                additionalProperties: true
              },
              generatedAt: { type: 'string', format: 'date-time' }
            }
          } as any,
          examples: {
            report: {
              value: {
                id: 'report-xyz-789',
                name: '年度销售报告',
                data: {
                  totalSales: 1250000,
                  topProducts: [
                    { id: 'prod-123', name: '产品A', sales: 500000 },
                    { id: 'prod-456', name: '产品B', sales: 350000 }
                  ],
                  regions: {
                    north: 450000,
                    south: 300000,
                    east: 250000,
                    west: 250000
                  }
                },
                generatedAt: '2023-12-15T10:30:00Z'
              }
            }
          }
        } as MediaTypeObject,
        'application/pdf': {
          schema: {
            type: 'string',
            format: 'binary'
          } as any
        } as MediaTypeObject,
        'text/csv': {
          schema: {
            type: 'string'
          } as any
        } as MediaTypeObject
      },
      links: {
        'downloadPdf': {
          operationId: 'downloadReport',
          parameters: {
            reportId: '$response.body#/id',
            format: 'pdf'
          },
          description: '下载报告的PDF版本'
        } as LinkObject,
        'downloadCsv': {
          operationId: 'downloadReport',
          parameters: {
            reportId: '$response.body#/id',
            format: 'csv'
          },
          description: '下载报告的CSV版本'
        } as LinkObject
      }
    } as ResponseObject
  }
};

// 引用响应
export const ReferencedResponse: Story = {
  args: {
    code: '404',
    response: {
      $ref: '#/components/responses/NotFound'
    },
    components: mockComponents
  }
};

// 无内容响应
export const NoContentResponse: Story = {
  args: {
    code: '204',
    response: {
      description: '请求成功处理，无返回内容'
    } as ResponseObject
  }
};
