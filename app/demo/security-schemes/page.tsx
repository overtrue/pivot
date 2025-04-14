import SecuritySchemes from '@/components/organisms/security/SecuritySchemes';
import React from 'react';

const securitySchemesExample = {
  basicAuth: {
    type: 'http',
    scheme: 'basic',
    description: '基本HTTP认证'
  },
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'JWT Bearer认证'
  },
  apiKeyAuth: {
    type: 'apiKey',
    in: 'header',
    name: 'X-API-KEY',
    description: 'API密钥认证'
  },
  oauth2Auth: {
    type: 'oauth2',
    description: 'OAuth2认证',
    flows: {
      implicit: {
        authorizationUrl: 'https://example.com/oauth2/authorize',
        scopes: {
          'read:api': '读取API资源',
          'write:api': '写入API资源'
        }
      },
      authorizationCode: {
        authorizationUrl: 'https://example.com/oauth2/authorize',
        tokenUrl: 'https://example.com/oauth2/token',
        refreshUrl: 'https://example.com/oauth2/refresh',
        scopes: {
          'read:api': '读取API资源',
          'write:api': '写入API资源',
          'admin:api': '管理API资源'
        }
      }
    }
  }
};

const SecuritySchemeViewer: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Security Schemes Demo</h1>
      <div className="prose max-w-none mb-8">
        <p>
          此页面展示了OpenAPI中不同类型的安全方案组件，包括基本认证、Bearer令牌、API密钥和OAuth2认证。
        </p>
      </div>

      <SecuritySchemes schemes={securitySchemesExample} />
    </div>
  );
};

export default SecuritySchemeViewer;
