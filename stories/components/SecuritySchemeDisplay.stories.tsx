import { SecuritySchemeObject } from '@/types/openapi';
import type { Meta, StoryObj } from '@storybook/react';
import SecuritySchemeDisplay from '../../components/SecuritySchemeDisplay';

const meta = {
  title: 'Components/SecuritySchemeDisplay',
  component: SecuritySchemeDisplay,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'text',
      description: '安全方案名称'
    },
    scheme: {
      control: 'object',
      description: '安全方案对象'
    }
  },
} satisfies Meta<typeof SecuritySchemeDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

// API密钥认证
export const ApiKey: Story = {
  args: {
    name: 'api_key',
    scheme: {
      type: 'apiKey',
      name: 'X-API-Key',
      in: 'header',
      description: '通过API密钥进行认证。您可以从开发者门户获取您的API密钥。'
    } as SecuritySchemeObject
  }
};

// 基本认证
export const BasicAuth: Story = {
  args: {
    name: 'basicAuth',
    scheme: {
      type: 'http',
      scheme: 'basic',
      description: '使用HTTP基本认证。用户名和密码必须通过Base64编码并放在Authorization头部。'
    } as SecuritySchemeObject
  }
};

// Bearer令牌认证
export const BearerAuth: Story = {
  args: {
    name: 'bearerAuth',
    scheme: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: '使用Bearer令牌进行认证。令牌必须在Authorization头部中以"Bearer "为前缀。'
    } as SecuritySchemeObject
  }
};

// OAuth2认证 - 隐式流程
export const OAuth2Implicit: Story = {
  args: {
    name: 'oauth2_implicit',
    scheme: {
      type: 'oauth2',
      description: '使用OAuth 2.0隐式流程进行认证。',
      flows: {
        implicit: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          scopes: {
            'read:pets': '读取宠物信息',
            'write:pets': '修改宠物信息'
          }
        }
      }
    } as SecuritySchemeObject
  }
};

// OAuth2认证 - 授权码流程
export const OAuth2AuthCode: Story = {
  args: {
    name: 'oauth2_code',
    scheme: {
      type: 'oauth2',
      description: '使用OAuth 2.0授权码流程进行认证。',
      flows: {
        authorizationCode: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          tokenUrl: 'https://example.com/oauth/token',
          refreshUrl: 'https://example.com/oauth/refresh',
          scopes: {
            'read:pets': '读取宠物信息',
            'write:pets': '修改宠物信息',
            'read:users': '读取用户信息',
            'admin': '管理员权限'
          }
        }
      }
    } as SecuritySchemeObject
  }
};

// OAuth2认证 - 客户端凭证流程
export const OAuth2ClientCredentials: Story = {
  args: {
    name: 'oauth2_client_credentials',
    scheme: {
      type: 'oauth2',
      description: '使用OAuth 2.0客户端凭证流程进行认证。适用于服务器到服务器的通信。',
      flows: {
        clientCredentials: {
          tokenUrl: 'https://example.com/oauth/token',
          scopes: {
            'api:read': '读取API资源',
            'api:write': '修改API资源'
          }
        }
      }
    } as SecuritySchemeObject
  }
};

// OAuth2认证 - 密码流程
export const OAuth2Password: Story = {
  args: {
    name: 'oauth2_password',
    scheme: {
      type: 'oauth2',
      description: '使用OAuth 2.0密码流程进行认证。',
      flows: {
        password: {
          tokenUrl: 'https://example.com/oauth/token',
          refreshUrl: 'https://example.com/oauth/refresh',
          scopes: {
            'user': '用户访问权限',
            'admin': '管理员访问权限'
          }
        }
      }
    } as SecuritySchemeObject
  }
};

// OAuth2认证 - 多种流程
export const OAuth2MultipleFlows: Story = {
  args: {
    name: 'oauth2_multiple',
    scheme: {
      type: 'oauth2',
      description: '支持多种OAuth 2.0流程的认证方式。',
      flows: {
        implicit: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          scopes: {
            'read:data': '读取数据权限'
          }
        },
        authorizationCode: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          tokenUrl: 'https://example.com/oauth/token',
          scopes: {
            'read:data': '读取数据权限',
            'write:data': '写入数据权限'
          }
        },
        clientCredentials: {
          tokenUrl: 'https://example.com/oauth/token',
          scopes: {
            'api:access': 'API访问权限'
          }
        }
      }
    } as SecuritySchemeObject
  }
};

// OpenID Connect认证
export const OpenIdConnect: Story = {
  args: {
    name: 'oidc',
    scheme: {
      type: 'openIdConnect',
      description: '使用OpenID Connect认证。',
      openIdConnectUrl: 'https://example.com/.well-known/openid-configuration'
    } as SecuritySchemeObject
  }
};

// 相互TLS认证
export const MutualTLS: Story = {
  args: {
    name: 'mtls',
    scheme: {
      type: 'mutualTLS',
      description: '使用相互TLS认证。客户端需要提供有效的客户端证书才能建立连接。'
    } as SecuritySchemeObject
  }
};
