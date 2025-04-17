import { ServerObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import Server from '../../components/Server';

const meta = {
  title: 'Components/Server',
  component: Server,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    server: {
      control: 'object',
      description: '服务器对象'
    }
  },
} satisfies Meta<typeof Server>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本服务器
export const BasicServer: Story = {
  args: {
    server: {
      url: 'https://api.example.com',
      description: '生产环境API服务器'
    } as ServerObject
  }
};

// 带变量的服务器
export const ServerWithVariables: Story = {
  args: {
    server: {
      url: 'https://{username}.example.com:{port}/{version}',
      description: '可配置的API服务器',
      variables: {
        username: {
          default: 'demo',
          description: '用户名，用于多租户隔离'
        },
        port: {
          default: '443',
          enum: ['80', '443', '8080', '8443'],
          description: '服务器端口'
        },
        version: {
          default: 'v2',
          enum: ['v1', 'v2', 'v3'],
          description: 'API版本'
        }
      }
    } as ServerObject
  }
};

// 区域化服务器
export const RegionalServer: Story = {
  args: {
    server: {
      url: 'https://{region}.api.example.com',
      description: '区域化API端点',
      variables: {
        region: {
          default: 'cn',
          enum: ['cn', 'us', 'eu', 'ap', 'sa'],
          description: '地理区域代码：cn=中国, us=美国, eu=欧洲, ap=亚太, sa=南美'
        }
      }
    } as ServerObject
  }
};

// 环境服务器
export const EnvironmentServer: Story = {
  args: {
    server: {
      url: 'https://{env}.example.com',
      description: '环境特定API服务器',
      variables: {
        env: {
          default: 'prod',
          enum: ['dev', 'staging', 'prod'],
          description: '部署环境'
        }
      }
    } as ServerObject
  }
};

// 本地开发服务器
export const DevelopmentServer: Story = {
  args: {
    server: {
      url: 'http://localhost:{port}',
      description: '本地开发服务器',
      variables: {
        port: {
          default: '3000',
          enum: ['3000', '8080', '8000', '9000'],
          description: '本地开发端口'
        }
      }
    } as ServerObject
  }
};

// 复杂服务器配置
export const ComplexServer: Story = {
  args: {
    server: {
      url: 'https://{version}.{env}.api.{region}.example.com:{port}/service/{tenant}',
      description: '完全可配置的企业级API服务',
      variables: {
        version: {
          default: 'v2',
          enum: ['v1', 'v2', 'v3', 'latest'],
          description: 'API版本，使用"latest"将始终指向最新版本'
        },
        env: {
          default: 'prod',
          enum: ['dev', 'test', 'staging', 'prod'],
          description: '运行环境'
        },
        region: {
          default: 'cn',
          enum: ['cn', 'us', 'eu', 'ap'],
          description: '服务器地理区域'
        },
        port: {
          default: '443',
          enum: ['80', '443', '8443'],
          description: '端口号，取决于您的安全需求'
        },
        tenant: {
          default: 'default',
          description: '租户名称，用于多租户架构中'
        }
      }
    } as ServerObject
  }
};

// 仅URL服务器
export const UrlOnlyServer: Story = {
  args: {
    server: {
      url: 'https://api.example.com/v1'
    } as ServerObject
  }
};

// WebSocket服务器
export const WebSocketServer: Story = {
  args: {
    server: {
      url: 'wss://{region}.ws.example.com',
      description: 'WebSocket服务器，用于实时通信',
      variables: {
        region: {
          default: 'cn',
          enum: ['cn', 'us', 'eu'],
          description: '服务器区域'
        }
      }
    } as ServerObject
  }
};
