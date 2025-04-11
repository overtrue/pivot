import Layout from '@/components/layout/Layout';
import SecuritySchemes from '@/components/molecules/SecuritySchemes';
import React from 'react';

const SecuritySchemePage: React.FC = () => {
  // Sample security schemes for demonstration
  const securitySchemes = [
    {
      name: 'api_key',
      type: 'apiKey',
      description: 'API key authentication',
      in: 'header'
    },
    {
      name: 'basic_auth',
      type: 'http',
      description: 'Basic HTTP authentication',
      scheme: 'basic'
    },
    {
      name: 'bearer_auth',
      type: 'http',
      description: 'Bearer token authentication',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    },
    {
      name: 'oauth2_sample',
      type: 'oauth2',
      description: 'OAuth 2.0 authentication',
      flows: {
        implicit: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          scopes: { 'read': 'Read access', 'write': 'Write access' }
        },
        authorizationCode: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          tokenUrl: 'https://example.com/oauth/token',
          scopes: { 'read': 'Read access', 'write': 'Write access' }
        }
      }
    },
    {
      name: 'openid_sample',
      type: 'openIdConnect',
      description: 'OpenID Connect authentication',
      openIdConnectUrl: 'https://example.com/.well-known/openid-configuration'
    }
  ];

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Security Schemes</h1>
        <p className="text-gray-700 mb-6">
          This page demonstrates the different types of security schemes supported by OpenAPI specification.
        </p>

        <SecuritySchemes schemes={securitySchemes} />
      </div>
    </Layout>
  );
};

export default SecuritySchemePage;
