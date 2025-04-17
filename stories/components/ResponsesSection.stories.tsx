import { ComponentsObject, ResponsesObjectMap } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import ResponsesSection from '../../components/ResponsesSection';

const meta = {
  title: 'Components/ResponsesSection',
  component: ResponsesSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    responses: {
      control: 'object',
      description: '响应对象映射'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象，用于解析引用'
    }
  },
} satisfies Meta<typeof ResponsesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// 模拟组件对象
const mockComponents: ComponentsObject = {
  schemas: {
    Pet: {
      type: 'object',
      required: ['id', 'name'],
      properties: {
        id: {
          type: 'integer',
          format: 'int64'
        },
        name: {
          type: 'string'
        },
        tag: {
          type: 'string'
        },
        status: {
          type: 'string',
          enum: ['available', 'pending', 'sold']
        }
      }
    },
    Error: {
      type: 'object',
      properties: {
        code: {
          type: 'integer',
          format: 'int32'
        },
        message: {
          type: 'string'
        }
      }
    }
  }
};

// 基本响应
export const BasicResponses: Story = {
  args: {
    responses: {
      '200': {
        description: '成功获取资源',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          }
        }
      },
      '400': {
        description: '无效的请求',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      '404': {
        description: '资源未找到',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      }
    } as ResponsesObjectMap,
    components: mockComponents
  }
};

// 带默认响应
export const WithDefaultResponse: Story = {
  args: {
    responses: {
      '200': {
        description: '成功获取资源',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          }
        }
      },
      'default': {
        description: '出错响应',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      }
    } as ResponsesObjectMap,
    components: mockComponents
  }
};

// 多种状态码
export const MultipleStatusCodes: Story = {
  args: {
    responses: {
      '200': {
        description: '成功获取资源',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          }
        }
      },
      '201': {
        description: '资源创建成功',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          }
        }
      },
      '301': {
        description: '资源已永久移动',
        headers: {
          'Location': {
            description: '新的资源位置',
            schema: {
              type: 'string',
              format: 'uri'
            }
          }
        }
      },
      '400': {
        description: '无效的请求',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      '404': {
        description: '资源未找到',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      '500': {
        description: '服务器内部错误',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      }
    } as ResponsesObjectMap,
    components: mockComponents
  }
};

// 带头部信息的响应
export const ResponsesWithHeaders: Story = {
  args: {
    responses: {
      '200': {
        description: '成功获取资源',
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
        },
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          }
        }
      },
      '400': {
        description: '无效的请求',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      }
    } as ResponsesObjectMap,
    components: mockComponents
  }
};

// 多种内容类型
export const MultipleContentTypes: Story = {
  args: {
    responses: {
      '200': {
        description: '成功获取资源',
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
      }
    } as ResponsesObjectMap,
    components: mockComponents
  }
};

// 带示例的响应
export const ResponsesWithExamples: Story = {
  args: {
    responses: {
      '200': {
        description: '成功获取资源',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            },
            example: {
              id: 1,
              name: '小狗',
              tag: '宠物',
              status: 'available'
            }
          }
        }
      },
      '404': {
        description: '资源未找到',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            example: {
              code: 404,
              message: '未找到指定ID的宠物'
            }
          }
        }
      }
    } as ResponsesObjectMap,
    components: mockComponents
  }
};
