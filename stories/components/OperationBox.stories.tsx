import { ComponentsObject, OperationObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import OperationBox from '../../components/OperationBox';

const meta = {
  title: 'Components/OperationBox',
  component: OperationBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    path: {
      control: 'text',
      description: '操作路径'
    },
    method: {
      control: 'select',
      options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
      description: 'HTTP方法'
    },
    operation: {
      control: 'object',
      description: '操作对象'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象，用于解析引用'
    }
  },
} satisfies Meta<typeof OperationBox>;

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

// 基本GET操作
export const BasicGetOperation: Story = {
  args: {
    path: '/pets/{petId}',
    method: 'GET',
    operation: {
      tags: ['宠物'],
      summary: '通过ID获取宠物信息',
      description: '返回单个宠物的详细信息',
      operationId: 'getPetById',
      parameters: [
        {
          name: 'petId',
          in: 'path',
          description: '要获取的宠物ID',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64'
          }
        }
      ],
      responses: {
        '200': {
          description: '成功操作',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            }
          }
        },
        '400': {
          description: '无效的ID',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        '404': {
          description: '找不到宠物',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    } as OperationObject,
    components: mockComponents
  }
};

// POST操作
export const PostOperation: Story = {
  args: {
    path: '/pets',
    method: 'POST',
    operation: {
      tags: ['宠物'],
      summary: '添加新宠物',
      description: '向商店添加新宠物',
      operationId: 'addPet',
      requestBody: {
        description: '需要添加的宠物',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          }
        }
      },
      responses: {
        '201': {
          description: '成功创建',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            }
          }
        },
        '400': {
          description: '无效输入',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    } as OperationObject,
    components: mockComponents
  }
};

// PUT操作
export const PutOperation: Story = {
  args: {
    path: '/pets/{petId}',
    method: 'PUT',
    operation: {
      tags: ['宠物'],
      summary: '更新宠物信息',
      description: '更新现有宠物的信息',
      operationId: 'updatePet',
      parameters: [
        {
          name: 'petId',
          in: 'path',
          description: '要更新的宠物ID',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64'
          }
        }
      ],
      requestBody: {
        description: '更新后的宠物对象',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Pet'
            }
          }
        }
      },
      responses: {
        '200': {
          description: '成功操作',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pet'
              }
            }
          }
        },
        '400': {
          description: '无效的ID',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        '404': {
          description: '找不到宠物',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    } as OperationObject,
    components: mockComponents
  }
};

// DELETE操作
export const DeleteOperation: Story = {
  args: {
    path: '/pets/{petId}',
    method: 'DELETE',
    operation: {
      tags: ['宠物'],
      summary: '删除宠物',
      description: '删除指定ID的宠物',
      operationId: 'deletePet',
      parameters: [
        {
          name: 'petId',
          in: 'path',
          description: '要删除的宠物ID',
          required: true,
          schema: {
            type: 'integer',
            format: 'int64'
          }
        }
      ],
      responses: {
        '204': {
          description: '成功删除'
        },
        '400': {
          description: '无效的ID',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        '404': {
          description: '找不到宠物',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    } as OperationObject,
    components: mockComponents
  }
};

// 带安全要求的操作
export const OperationWithSecurity: Story = {
  args: {
    path: '/pets',
    method: 'GET',
    operation: {
      tags: ['宠物'],
      summary: '获取所有宠物',
      description: '返回所有宠物的列表',
      operationId: 'getAllPets',
      parameters: [
        {
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
        {
          name: 'offset',
          in: 'query',
          description: '跳过的结果数量',
          required: false,
          schema: {
            type: 'integer',
            format: 'int32',
            default: 0,
            minimum: 0
          }
        }
      ],
      responses: {
        '200': {
          description: '成功操作',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Pet'
                }
              }
            }
          }
        },
        '401': {
          description: '未授权',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      },
      security: [
        {
          'petstore_auth': ['read:pets']
        }
      ]
    } as OperationObject,
    components: mockComponents
  }
};

// 带外部文档的操作
export const OperationWithExternalDocs: Story = {
  args: {
    path: '/pets/findByStatus',
    method: 'GET',
    operation: {
      tags: ['宠物'],
      summary: '按状态查找宠物',
      description: '返回符合状态条件的宠物列表',
      operationId: 'findPetsByStatus',
      externalDocs: {
        description: '了解更多关于宠物状态',
        url: 'https://example.com/pet-statuses'
      },
      parameters: [
        {
          name: 'status',
          in: 'query',
          description: '状态过滤条件',
          required: true,
          schema: {
            type: 'string',
            enum: ['available', 'pending', 'sold'],
            default: 'available'
          }
        }
      ],
      responses: {
        '200': {
          description: '成功操作',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Pet'
                }
              }
            }
          }
        },
        '400': {
          description: '无效的状态值',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    } as OperationObject,
    components: mockComponents
  }
};

// 废弃的操作
export const DeprecatedOperation: Story = {
  args: {
    path: '/pets/findByTags',
    method: 'GET',
    operation: {
      tags: ['宠物'],
      summary: '按标签查找宠物',
      description: '返回符合标签条件的宠物列表',
      operationId: 'findPetsByTags',
      deprecated: true,
      parameters: [
        {
          name: 'tags',
          in: 'query',
          description: '标签过滤条件',
          required: true,
          schema: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          style: 'form',
          explode: true
        }
      ],
      responses: {
        '200': {
          description: '成功操作',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Pet'
                }
              }
            }
          }
        },
        '400': {
          description: '无效的标签值',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    } as OperationObject,
    components: mockComponents
  }
};
