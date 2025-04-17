import { ComponentsObject, LinkObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import LinksSection from '../../components/LinksSection';

const meta = {
  title: 'Components/LinksSection',
  component: LinksSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    links: {
      control: 'object',
      description: '链接对象映射'
    },
    components: {
      control: 'object',
      description: 'OpenAPI组件对象，用于解析引用'
    }
  },
} satisfies Meta<typeof LinksSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// 模拟组件对象
const mockComponents: ComponentsObject = {
  links: {
    GetUserByUserId: {
      operationId: 'getUser',
      parameters: {
        userId: '$response.body#/id'
      },
      description: '通过用户ID获取用户详情'
    },
    GetOrdersByUserId: {
      operationId: 'getOrders',
      parameters: {
        userId: '$response.body#/id'
      },
      description: '获取用户的所有订单'
    }
  }
};

// 基本链接
export const BasicLinks: Story = {
  args: {
    links: {
      GetPetById: {
        operationId: 'getPetById',
        parameters: {
          petId: '$response.body#/id'
        },
        description: '通过宠物ID获取宠物详情'
      },
      DeletePet: {
        operationId: 'deletePet',
        parameters: {
          petId: '$response.body#/id'
        },
        description: '删除指定ID的宠物'
      }
    } as Record<string, LinkObject>,
    components: mockComponents
  }
};

// 引用链接
export const ReferencedLinks: Story = {
  args: {
    links: {
      GetUser: {
        $ref: '#/components/links/GetUserByUserId'
      },
      GetOrders: {
        $ref: '#/components/links/GetOrdersByUserId'
      },
      UpdateUser: {
        operationId: 'updateUser',
        parameters: {
          userId: '$response.body#/id'
        },
        description: '更新用户信息'
      }
    },
    components: mockComponents
  }
};

// 带请求体的链接
export const LinksWithRequestBody: Story = {
  args: {
    links: {
      UpdatePet: {
        operationId: 'updatePet',
        parameters: {
          petId: '$response.body#/id'
        },
        requestBody: '$response.body',
        description: '使用返回的宠物数据更新宠物信息'
      },
      ClonePet: {
        operationId: 'addPet',
        requestBody: '$response.body',
        description: '克隆宠物（创建一个具有相同属性的新宠物）'
      }
    } as Record<string, LinkObject>,
    components: mockComponents
  }
};

// 带服务器的链接
export const LinksWithServer: Story = {
  args: {
    links: {
      GetExternalPet: {
        operationId: 'getPetById',
        parameters: {
          petId: '$response.body#/id'
        },
        server: {
          url: 'https://petstore.external-api.com/v2',
          description: '外部宠物商店API'
        },
        description: '从外部API获取宠物详情'
      },
      GetLocalPet: {
        operationId: 'getPetById',
        parameters: {
          petId: '$response.body#/id'
        },
        description: '从本地API获取宠物详情'
      }
    } as Record<string, LinkObject>,
    components: mockComponents
  }
};

// 带表达式的链接
export const LinksWithExpressions: Story = {
  args: {
    links: {
      GetRelatedPets: {
        operationId: 'findPetsByTags',
        parameters: {
          tags: '$response.body#/tags'
        },
        description: '查找具有相同标签的相关宠物'
      },
      GetPetsByStatus: {
        operationId: 'findPetsByStatus',
        parameters: {
          status: '$response.body#/status'
        },
        description: '查找具有相同状态的宠物'
      }
    } as Record<string, LinkObject>,
    components: mockComponents
  }
};

// 完整示例
export const CompleteExample: Story = {
  args: {
    links: {
      GetPetById: {
        operationId: 'getPetById',
        parameters: {
          petId: '$response.body#/id'
        },
        description: '获取宠物详情'
      },
      UpdatePet: {
        operationId: 'updatePet',
        parameters: {
          petId: '$response.body#/id'
        },
        requestBody: '$response.body',
        description: '更新宠物信息'
      },
      DeletePet: {
        operationId: 'deletePet',
        parameters: {
          petId: '$response.body#/id'
        },
        description: '删除宠物'
      },
      GetOwner: {
        operationId: 'getUser',
        parameters: {
          userId: '$response.body#/ownerId'
        },
        description: '获取宠物主人的详细信息'
      },
      GetRelatedPets: {
        operationId: 'findPetsByTags',
        parameters: {
          tags: '$response.body#/tags'
        },
        description: '查找具有相同标签的相关宠物'
      },
      GetExternalData: {
        operationId: 'getPetExternalData',
        parameters: {
          petId: '$response.body#/id'
        },
        server: {
          url: 'https://pet-external-data.example.com/api',
          description: '宠物外部数据API'
        },
        description: '从外部源获取宠物额外数据'
      }
    } as Record<string, LinkObject>,
    components: mockComponents
  }
};
