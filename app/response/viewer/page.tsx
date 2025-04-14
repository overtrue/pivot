'use client';

import Layout from '@/components/layout/Layout';
import ResponseGroup from '@/components/molecules/ResponseGroup';
import React from 'react';

const ResponseViewer: React.FC = () => {
  const responses = [
    { code: '200', description: 'OK - The request was successful.' },
    { code: '400', description: 'Bad Request - The request could not be understood or was missing required parameters.' },
    { code: '500', description: 'Internal Server Error - An error occurred on the server.' },
  ];

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Response Viewer</h1>
        <ResponseGroup responses={responses} />
      </div>
    </Layout>
  );
};

export default ResponseViewer;
