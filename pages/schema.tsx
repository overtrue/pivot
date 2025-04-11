import Layout from '@/components/layout/Layout';
import React from 'react';
import SchemaViewer from '../docs/pages/SchemaViewer';

const SchemaPage: React.FC = () => {
  return (
    <Layout>
      <SchemaViewer />
    </Layout>
  );
};

export default SchemaPage;
