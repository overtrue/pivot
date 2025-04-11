import Layout from '@/components/layout/Layout';
import AllOfContainer from '@/components/molecules/SchemaViewer/AllOfContainer';
import React from 'react';

const AllOfPage: React.FC = () => {
  const schemas = [
    {
      name: 'User',
      properties: [
        { name: 'id', type: 'integer', description: 'User ID' },
        { name: 'name', type: 'string', description: 'User name' },
      ],
    },
    {
      name: 'Product',
      properties: [
        { name: 'id', type: 'integer', description: 'Product ID' },
        { name: 'title', type: 'string', description: 'Product title' },
      ],
    },
  ];

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">AllOf Schema Viewer</h1>
        <AllOfContainer schemas={schemas} />
      </div>
    </Layout>
  );
};

export default AllOfPage;
