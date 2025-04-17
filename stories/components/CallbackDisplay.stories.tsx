import { CallbackObject, ComponentsObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import CallbackDisplay from '../../components/CallbackDisplay';

const meta = {
  title: 'Components/CallbackDisplay',
  component: CallbackDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'text',
      description: '回调的名称'
    },
    callback: {
      control: 'object',
      description: '回调对象或引用对象'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象，用于解析引用'
    }
  },
} satisfies Meta<typeof CallbackDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// OpenAPI组件对象，包含回调和路径项引用的解析
const mockComponents: ComponentsObject = {
  callbacks: {
    myCallback: {
      '{$request.body#/callbackUrl}': {
        post: {
          summary: '回调的POST操作',
          description: '当订单状态变更时，服务器将调用此回调。',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    orderStatus: {
                      type: 'string',
                      enum: ['placed', 'approved', 'delivered']
                    },
                    orderId: {
                      type: 'string'
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time'
                    }
                  },
                  required: ['orderStatus', 'orderId', 'timestamp']
                }
              }
            }
          },
          responses: {
            '200': {
              description: '回调成功处理',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      received: {
                        type: 'boolean'
                      },
                      message: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    statusCallback: {
      '{$request.body#/statusUrl}': {
        put: {
          summary: '状态更新回调',
          description: '当资源状态发生变化时，将调用此回调。',
          parameters: [
            {
              name: 'Authorization',
              in: 'header',
              description: '认证令牌',
              required: true,
              schema: {
                type: 'string'
              }
            }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['pending', 'processing', 'completed', 'failed']
                    },
                    resourceId: {
                      type: 'string'
                    },
                    details: {
                      type: 'object',
                      additionalProperties: true
                    }
                  },
                  required: ['status', 'resourceId']
                }
              }
            }
          },
          responses: {
            '204': {
              description: '回调处理成功，无内容返回'
            }
          }
        }
      }
    }
  },
  pathItems: {
    webhookPathItem: {
      post: {
        operationId: 'webhookCallback',
        summary: '处理webhook回调',
        description: '接收并处理来自API的webhook回调请求',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  event: {
                    type: 'string'
                  },
                  payload: {
                    type: 'object',
                    additionalProperties: true
                  }
                },
                required: ['event', 'payload']
              }
            }
          }
        },
        responses: {
          '200': {
            description: '成功接收回调',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    received: {
                      type: 'boolean',
                      default: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// 基本回调示例
export const BasicCallback: Story = {
  args: {
    name: 'orderCallback',
    callback: {
      '{$request.body#/callbackUrl}': {
        post: {
          summary: '订单状态更新回调',
          description: '每当订单状态变更时，服务端将调用此回调URL发送状态更新信息。',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: '订单ID'
                    },
                    status: {
                      type: 'string',
                      enum: ['created', 'processing', 'shipped', 'delivered', 'cancelled'],
                      description: '订单状态'
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                      description: '状态变更时间'
                    }
                  },
                  required: ['id', 'status', 'timestamp']
                }
              }
            }
          },
          responses: {
            '200': {
              description: '回调处理成功',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      received: {
                        type: 'boolean'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } as CallbackObject
  }
};

// 多路径回调示例
export const MultiPathCallback: Story = {
  args: {
    name: 'userEvents',
    callback: {
      '{$request.body#/profileUrl}': {
        put: {
          summary: '个人资料更新回调',
          description: '当用户个人资料被更新时，服务器会调用此回调。',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: {
                      type: 'string'
                    },
                    updatedFields: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: '个人资料更新回调处理成功'
            }
          }
        }
      },
      '{$request.body#/preferencesUrl}': {
        put: {
          summary: '偏好设置更新回调',
          description: '当用户偏好设置被更新时，服务器会调用此回调。',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    userId: {
                      type: 'string'
                    },
                    preferences: {
                      type: 'object',
                      additionalProperties: true
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: '偏好设置更新回调处理成功'
            }
          }
        }
      }
    } as CallbackObject
  }
};

// 多方法回调示例
export const MultiMethodCallback: Story = {
  args: {
    name: 'paymentEvents',
    callback: {
      '{$request.body#/paymentWebhook}': {
        post: {
          summary: '创建支付事件',
          description: '当创建新支付时，服务器会调用此回调。',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    paymentId: {
                      type: 'string'
                    },
                    amount: {
                      type: 'number'
                    },
                    status: {
                      type: 'string',
                      enum: ['pending', 'completed', 'failed']
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: '成功接收支付创建事件'
            }
          }
        },
        put: {
          summary: '更新支付事件',
          description: '当支付状态更新时，服务器会调用此回调。',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    paymentId: {
                      type: 'string'
                    },
                    status: {
                      type: 'string',
                      enum: ['pending', 'completed', 'failed']
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time'
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: '成功接收支付更新事件'
            }
          }
        },
        delete: {
          summary: '取消支付事件',
          description: '当支付被取消时，服务器会调用此回调。',
          parameters: [
            {
              name: 'paymentId',
              in: 'query',
              required: true,
              schema: {
                type: 'string'
              }
            },
            {
              name: 'reason',
              in: 'query',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: '成功接收支付取消事件'
            }
          }
        }
      }
    } as CallbackObject
  }
};

// 引用回调示例
export const ReferencedCallback: Story = {
  args: {
    name: 'webhook',
    callback: {
      $ref: '#/components/callbacks/myCallback'
    },
    components: mockComponents
  }
};

// 带引用路径项的回调示例
export const CallbackWithReferencedPathItem: Story = {
  args: {
    name: 'webhookCallback',
    callback: {
      '{$request.body#/webhookUrl}': {
        $ref: '#/components/pathItems/webhookPathItem'
      }
    },
    components: mockComponents
  }
};
