import { ComponentsObject, ResponseObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import ResponseGroup from '../../components/ResponseGroup';

const meta = {
  title: 'Components/ResponseGroup',
  component: ResponseGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    status: {
      control: 'text',
      description: 'HTTP响应状态码'
    },
    response: {
      control: 'object',
      description: '响应对象'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象，用于解析引用'
    }
  },
} satisfies Meta<typeof ResponseGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 模拟组件对象
const mockComponents: ComponentsObject = {
  schemas: {
    User: {
      type: 'object',
      properties: {
        id: { type: 'integer', format: 'int64' },
        username: { type: 'string' },
        email: { type: 'string', format: 'email' }
      },
      required: ['id', 'username']
    },
    Error: {
      type: 'object',
      properties: {
        code: { type: 'integer', format: 'int32' },
        message: { type: 'string' }
      },
      required: ['code', 'message']
    }
  }
};

// 基本成功响应
export const SuccessResponse: Story = {
  args: {
    status: '200',
    response: {
      description: '操作成功完成',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                format: 'int64'
              },
              name: {
                type: 'string'
              },
              status: {
                type: 'string',
                enum: ['active', 'inactive']
              }
            }
          },
          example: {
            id: 123,
            name: '测试项目',
            status: 'active'
          }
        }
      }
    } as ResponseObject
  }
};

// 带引用的响应
export const ResponseWithReference: Story = {
  args: {
    status: '200',
    response: {
      description: '成功获取用户信息',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User'
          },
          example: {
            id: 10,
            username: '张三',
            email: 'zhangsan@example.com'
          }
        }
      }
    } as ResponseObject,
    components: mockComponents
  }
};

// 带头部的响应
export const ResponseWithHeaders: Story = {
  args: {
    status: '201',
    response: {
      description: '资源创建成功',
      headers: {
        'Location': {
          description: '新创建资源的URI',
          schema: {
            type: 'string',
            format: 'uri'
          }
        },
        'X-Request-ID': {
          description: '请求跟踪ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        },
        'X-Rate-Limit-Remaining': {
          description: '剩余的API请求次数',
          schema: {
            type: 'integer'
          }
        }
      },
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'integer', format: 'int64' },
              message: { type: 'string' }
            }
          },
          example: {
            id: 12345,
            message: '用户创建成功'
          }
        }
      }
    } as ResponseObject
  }
};

// 多内容类型响应
export const MultipleContentTypeResponse: Story = {
  args: {
    status: '200',
    response: {
      description: '资源数据',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              data: { type: 'object', additionalProperties: true }
            }
          },
          example: {
            id: 'data-123',
            name: '示例数据',
            data: { key1: 'value1', key2: 'value2' }
          }
        },
        'application/xml': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              data: { type: 'object', additionalProperties: true }
            }
          }
        },
        'text/csv': {
          schema: {
            type: 'string'
          }
        },
        'application/pdf': {
          schema: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    } as ResponseObject
  }
};

// 错误响应
export const ErrorResponse: Story = {
  args: {
    status: '400',
    response: {
      description: '请求参数错误',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          },
          example: {
            code: 400,
            message: '请求参数验证失败'
          }
        }
      }
    } as ResponseObject,
    components: mockComponents
  }
};

// 服务器错误响应
export const ServerErrorResponse: Story = {
  args: {
    status: '500',
    response: {
      description: '服务器内部错误',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          },
          example: {
            code: 500,
            message: '服务器处理请求时发生内部错误'
          }
        }
      }
    } as ResponseObject,
    components: mockComponents
  }
};

// 无内容响应
export const NoContentResponse: Story = {
  args: {
    status: '204',
    response: {
      description: '请求成功处理，无返回内容'
    } as ResponseObject
  }
};

// 带数组的响应
export const ArrayResponse: Story = {
  args: {
    status: '200',
    response: {
      description: '项目列表',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' }
              }
            }
          },
          example: [
            { id: 1, name: '项目A', createdAt: '2023-01-15T10:30:00Z' },
            { id: 2, name: '项目B', createdAt: '2023-02-20T14:45:00Z' },
            { id: 3, name: '项目C', createdAt: '2023-03-25T09:15:00Z' }
          ]
        }
      }
    } as ResponseObject
  }
};
