import Codegen from '@/components/interactive/Codegen';
import Layout from '@/components/layout/Layout';
import React from 'react';

const CodegenPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold">Code Generation</h1>
        <p className="text-gray-700">
          Below are code samples for making API requests to different endpoints:
        </p>

        <h2 className="text-xl font-semibold mt-4">GET Example</h2>
        <Codegen
          endpoint="https://api.example.com/users"
          method="GET"
          parameters={[
            { name: "page", in: "query", required: false, type: "integer" },
            { name: "limit", in: "query", required: false, type: "integer" }
          ]}
        />

        <h2 className="text-xl font-semibold mt-4">POST Example</h2>
        <Codegen
          endpoint="https://api.example.com/users"
          method="POST"
          requestBody={{
            type: "object",
            properties: [
              { name: "name", type: "string" },
              { name: "email", type: "string" }
            ]
          }}
        />

        <h2 className="text-xl font-semibold mt-4">PUT Example</h2>
        <Codegen
          endpoint="https://api.example.com/users/123"
          method="PUT"
          requestBody={{
            type: "object",
            properties: [
              { name: "name", type: "string" },
              { name: "email", type: "string" }
            ]
          }}
        />
      </div>
    </Layout>
  );
};

export default CodegenPage;
