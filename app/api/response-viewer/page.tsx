import Layout from '@/components/layout/Layout';
import React from 'react';
import ResponseViewer from '../pages/response-viewer';

const ApiResponseViewer: React.FC = () => {
  return (
    <Layout>
      <ResponseViewer />
    </Layout>
  );
};

export default ApiResponseViewer;
