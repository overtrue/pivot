import Layout from '@/components/layout/Layout';
import ResponseItem from '@/components/molecules/response/ResponseItem';
import React from 'react';

const ResponseViewerPage: React.FC = () => {
  // Example responses for demonstration
  const responses = [
    {
      code: '200',
      description: 'Successful response',
      content: {
        'application/json': {
          schema: { type: 'object' }
        }
      },
      headers: {
        'X-Rate-Limit': {
          required: true,
          schema: { type: 'integer' },
          description: 'Request rate limit'
        },
        'X-Expires-After': {
          required: false,
          schema: { type: 'string' },
          description: 'Date/time after which the data expires'
        }
      }
    },
    {
      code: '400',
      description: 'Bad request. Client error in the request.',
      content: {
        'application/json': {
          schema: { type: 'object' }
        },
        'application/xml': {
          schema: { type: 'object' }
        }
      }
    },
    {
      code: '401',
      description: 'Unauthorized. Authentication is required.',
      content: {
        'application/json': {
          schema: { type: 'object' }
        }
      }
    },
    {
      code: '404',
      description: 'Not found. The resource was not found.',
      content: {
        'application/json': {
          schema: { type: 'object' }
        }
      }
    },
    {
      code: '500',
      description: 'Internal Server Error. Something went wrong on the server.',
      content: {
        'application/json': {
          schema: { type: 'object' }
        }
      }
    },
    {
      code: '302',
      description: 'Found. Resource moved temporarily.',
      headers: {
        'Location': {
          required: true,
          schema: { type: 'string' },
          description: 'URI to the location where the resource has been moved to'
        }
      }
    },
    {
      code: '201',
      description: 'Created. The resource was successfully created.',
      content: {
        'application/json': {
          schema: { type: 'object' }
        }
      },
      links: {
        'GetUserByUserId': {
          operationId: 'getUser',
          description: 'Link to the newly created user resource'
        }
      }
    }
  ];

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">HTTP Response Examples</h1>
        <p className="text-gray-700 mb-6">
          This page demonstrates different HTTP responses with their status codes, descriptions, content types,
          headers, and links as defined in the OpenAPI specification.
        </p>

        <div className="space-y-4">
          {responses.map((response, index) => (
            <ResponseItem
              key={index}
              code={response.code}
              description={response.description}
              content={response.content}
              headers={response.headers}
              links={response.links}
              components={undefined}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ResponseViewerPage;
