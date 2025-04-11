import Layout from '@/components/layout/Layout';
import Servers from '@/components/molecules/Servers';
import React from 'react';

const ServerPage: React.FC = () => {
  // Sample servers for demonstration
  const servers = [
    {
      url: 'https://api.example.com/v1',
      description: 'Production server'
    },
    {
      url: 'https://staging-api.example.com/v1',
      description: 'Staging server for testing'
    },
    {
      url: 'https://{username}.example.com:{port}/{basePath}',
      description: 'Development server with variables',
      variables: {
        username: {
          name: 'username',
          default: 'demo',
          description: 'Your development username',
          enum: ['demo', 'test', 'dev']
        },
        port: {
          name: 'port',
          default: '8443',
          description: 'API port',
          enum: ['8443', '443', '8080']
        },
        basePath: {
          name: 'basePath',
          default: 'v1',
          description: 'Base path for API calls',
          enum: ['v1', 'v2', 'beta']
        }
      }
    }
  ];

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Server Configuration</h1>
        <p className="text-gray-700 mb-6">
          This page demonstrates how server information is displayed in OpenAPI documentation,
          including server variables and interpolated URLs.
        </p>

        <Servers servers={servers} />
      </div>
    </Layout>
  );
};

export default ServerPage;
