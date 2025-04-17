import { ServerObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import Servers from '../../components/Servers';

const meta = {
  title: 'Components/Servers',
  component: Servers,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    servers: {
      control: 'object',
      description: '服务器对象数组'
    }
  },
} satisfies Meta<typeof Servers>;

export default meta;
type Story = StoryObj<typeof meta>;

// 单一服务器
export const SingleServer: Story = {
  args: {
    servers: [
      {
        url: 'https://api.example.com',
        description: '生产环境API服务器'
      }
    ] as ServerObject[]
  }
};

// 多环境服务器
export const MultiEnvironmentServers: Story = {
  args: {
    servers: [
      {
        url: 'https://api.example.com',
        description: '生产环境服务器'
      },
      {
        url: 'https://staging-api.example.com',
        description: '预发布环境服务器'
      },
      {
        url: 'https://dev-api.example.com',
        description: '开发环境服务器'
      }
    ] as ServerObject[]
  }
};

// 区域化服务器
export const RegionalServers: Story = {
  args: {
    servers: [
      {
        url: 'https://cn-api.example.com',
        description: '中国区服务器'
      },
      {
        url: 'https://us-api.example.com',
        description: '美国区服务器'
      },
      {
        url: 'https://eu-api.example.com',
        description: '欧洲区服务器'
      }
    ] as ServerObject[]
  }
};

// 带变量的服务器列表
export const ServersWithVariables: Story = {
  args: {
    servers: [
      {
        url: 'https://{region}.api.example.com',
        description: '区域化API端点',
        variables: {
          region: {
            default: 'cn',
            enum: ['cn', 'us', 'eu', 'ap'],
            description: '服务器区域'
          }
        }
      },
      {
        url: 'https://{env}.example.com',
        description: '环境特定API服务器',
        variables: {
          env: {
            default: 'prod',
            enum: ['dev', 'staging', 'prod'],
            description: '部署环境'
          }
        }
      }
    ] as ServerObject[]
  }
};

// 多协议服务器
export const MultiProtocolServers: Story = {
  args: {
    servers: [
      {
        url: 'https://api.example.com',
        description: '安全HTTP服务器'
      },
      {
        url: 'http://api.example.com',
        description: '非安全HTTP服务器（仅用于测试）'
      },
      {
        url: 'wss://ws.example.com',
        description: 'WebSocket服务器'
      }
    ] as ServerObject[]
  }
};

// 复杂服务器配置
export const ComplexServerSetup: Story = {
  args: {
    servers: [
      {
        url: 'https://{version}.api.example.com',
        description: '版本化API服务器',
        variables: {
          version: {
            default: 'v2',
            enum: ['v1', 'v2', 'v3', 'latest'],
            description: 'API版本'
          }
        }
      },
      {
        url: 'https://{env}.{region}.api.example.com',
        description: '环境与区域配置',
        variables: {
          env: {
            default: 'prod',
            enum: ['dev', 'staging', 'prod'],
            description: '环境'
          },
          region: {
            default: 'cn',
            enum: ['cn', 'us', 'eu', 'ap'],
            description: '区域'
          }
        }
      },
      {
        url: 'http://localhost:{port}',
        description: '本地开发服务器',
        variables: {
          port: {
            default: '3000',
            enum: ['3000', '8080', '9000'],
            description: '开发端口'
          }
        }
      }
    ] as ServerObject[]
  }
};
