import { ServerObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import LinkItem from '../../components/LinkItem';

const meta = {
  title: 'Components/LinkItem',
  component: LinkItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'text',
      description: '链接的名称'
    },
    operationId: {
      control: 'text',
      description: '目标操作的ID'
    },
    operationRef: {
      control: 'text',
      description: '目标操作的引用'
    },
    parameters: {
      control: 'object',
      description: '链接参数映射'
    },
    requestBody: {
      control: 'object',
      description: '请求体表达式或值'
    },
    description: {
      control: 'text',
      description: '链接描述'
    },
    server: {
      control: 'object',
      description: '链接特定的服务器对象'
    }
  },
} satisfies Meta<typeof LinkItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的操作ID链接
export const BasicOperationIdLink: Story = {
  args: {
    name: 'getOrderById',
    operationId: 'getOrder',
    description: '获取当前订单的详细信息'
  }
};

// 基本的操作引用链接
export const BasicOperationRefLink: Story = {
  args: {
    name: 'getUserById',
    operationRef: '#/paths/~1users~1{id}/get',
    description: '获取用户的详细信息'
  }
};

// 带参数映射的链接
export const LinkWithParameters: Story = {
  args: {
    name: 'getItemsInOrder',
    operationId: 'getOrderItems',
    description: '获取当前订单中的所有商品',
    parameters: {
      orderId: '$response.body#/id',
      limit: 10,
      offset: 0
    }
  }
};

// 带请求体映射的链接
export const LinkWithRequestBody: Story = {
  args: {
    name: 'updateOrderStatus',
    operationId: 'updateOrder',
    description: '更新订单状态',
    parameters: {
      orderId: '$response.body#/id'
    },
    requestBody: {
      status: 'processing',
      updatedAt: '$response.body#/timestamp'
    }
  }
};

// 复杂参数映射的链接
export const ComplexParameterLink: Story = {
  args: {
    name: 'getRelatedProducts',
    operationId: 'getProductsByCategory',
    description: '获取与当前产品相同类别的其他产品',
    parameters: {
      category: '$response.body#/category',
      limit: 5,
      exclude: '$response.body#/id',
      sort: 'popularity:desc',
      minPrice: '$response.body#/price - 100',
      maxPrice: '$response.body#/price + 100'
    }
  }
};

// 带服务器对象的链接
export const LinkWithServer: Story = {
  args: {
    name: 'getPaymentDetails',
    operationId: 'getPayment',
    description: '获取与订单关联的支付详情',
    parameters: {
      paymentId: '$response.body#/paymentId'
    },
    server: {
      url: 'https://payments.api.example.com/v1',
      description: '支付系统API服务器'
    } as ServerObject
  }
};

// 带变量的服务器链接
export const LinkWithServerVariables: Story = {
  args: {
    name: 'getShippingStatus',
    operationId: 'trackShipment',
    description: '获取当前订单的物流状态',
    parameters: {
      shipmentId: '$response.body#/shipmentId',
      carrier: '$response.body#/carrier'
    },
    server: {
      url: 'https://{region}.shipping.api.example.com/{version}',
      description: '区域化的物流跟踪API服务器',
      variables: {
        region: {
          default: 'us',
          description: '地区代码',
          enum: ['us', 'eu', 'asia']
        },
        version: {
          default: 'v2',
          description: 'API版本'
        }
      }
    } as ServerObject
  }
};

// 无描述的简单链接
export const MinimalLink: Story = {
  args: {
    name: 'cancelOrder',
    operationId: 'cancelOrder',
    parameters: {
      orderId: '$response.body#/id'
    }
  }
};

// 完整的复杂链接
export const CompleteLink: Story = {
  args: {
    name: 'processRefund',
    operationId: 'createRefund',
    description: '为当前订单创建退款请求',
    parameters: {
      orderId: '$response.body#/id',
      customerId: '$response.body#/customer/id',
      amount: '$response.body#/totalAmount'
    },
    requestBody: {
      reason: 'customer_request',
      items: '$response.body#/items',
      fullRefund: true,
      notifyCustomer: true
    },
    server: {
      url: 'https://payments.api.example.com/v2',
      description: '支付处理API服务器'
    } as ServerObject
  }
};
