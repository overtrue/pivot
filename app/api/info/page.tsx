import Layout from '@/components/layout/Layout';
import ApiInfo from '@/components/molecules/info/ApiInfo';
import React from 'react';

const ApiInfoPage: React.FC = () => {
  // Sample API information for demonstration
  const apiInfo = {
    title: 'Pet Store API',
    version: '1.0.1',
    summary: 'API for managing pets in a pet store',
    description: 'This is a sample Pet Store API based on the OpenAPI 3.0 specification. It provides endpoints for adding, updating, fetching, and deleting pets, as well as managing pet inventory and orders.',
    termsOfService: 'https://example.com/terms/',
    contact: {
      name: 'API Support',
      url: 'https://example.com/support',
      email: 'support@example.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      identifier: 'Apache-2.0'
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">API Information</h1>
        <p className="text-gray-700 mb-6">
          This page demonstrates how API metadata is displayed in OpenAPI documentation,
          including contact information and license details.
        </p>

        <ApiInfo {...apiInfo} />
      </div>
    </Layout>
  );
};

export default ApiInfoPage;
