import { ServerVariableObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import ServerVariable from '../../components/ServerVariable';

const meta = {
  title: 'Components/ServerVariable',
  component: ServerVariable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'text',
      description: '服务器变量名称'
    },
    variable: {
      control: 'object',
      description: '服务器变量对象'
    }
  },
} satisfies Meta<typeof ServerVariable>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本服务器变量
export const BasicVariable: Story = {
  args: {
    name: 'version',
    variable: {
      default: 'v1'
    } as ServerVariableObject
  }
};

// 带描述的服务器变量
export const VariableWithDescription: Story = {
  args: {
    name: 'region',
    variable: {
      default: 'us-east-1',
      description: '服务器所在的AWS区域'
    } as ServerVariableObject
  }
};

// 带枚举值的服务器变量
export const VariableWithEnum: Story = {
  args: {
    name: 'environment',
    variable: {
      default: 'production',
      enum: ['development', 'staging', 'production'],
      description: '服务器环境'
    } as ServerVariableObject
  }
};

// 端口变量
export const PortVariable: Story = {
  args: {
    name: 'port',
    variable: {
      default: '443',
      enum: ['80', '443', '8080', '8443'],
      description: '服务器端口号，取决于协议和安全需求'
    } as ServerVariableObject
  }
};

// 地区变量
export const RegionVariable: Story = {
  args: {
    name: 'region',
    variable: {
      default: 'cn',
      enum: ['cn', 'us', 'eu', 'ap', 'sa'],
      description: '地理区域代码：cn=中国, us=美国, eu=欧洲, ap=亚太, sa=南美'
    } as ServerVariableObject
  }
};

// 租户变量
export const TenantVariable: Story = {
  args: {
    name: 'tenant',
    variable: {
      default: 'shared',
      description: '多租户系统中的租户标识符，用于租户隔离'
    } as ServerVariableObject
  }
};

// 语言变量
export const LanguageVariable: Story = {
  args: {
    name: 'language',
    variable: {
      default: 'en',
      enum: ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko'],
      description: '国际化语言代码，用于内容本地化'
    } as ServerVariableObject
  }
};

// 版本变量
export const VersionVariable: Story = {
  args: {
    name: 'apiVersion',
    variable: {
      default: 'v2',
      enum: ['v1', 'v1.1', 'v2', 'v2.1', 'latest'],
      description: 'API版本，使用"latest"将始终指向最新版本'
    } as ServerVariableObject
  }
};
