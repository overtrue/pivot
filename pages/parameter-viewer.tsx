import Layout from '@/components/layout/Layout';
import ParameterItem from '@/components/molecules/parameter/ParameterItem';
import React from 'react';

const ParameterViewerPage: React.FC = () => {
  // Sample parameters for demonstration
  const parameters = [
    {
      name: 'id',
      in: 'path',
      required: true,
      description: '要获取的资源的唯一标识符',
      schema: {
        type: 'string',
        format: 'uuid'
      }
    },
    {
      name: 'limit',
      in: 'query',
      required: false,
      description: '每页返回的结果数量',
      schema: {
        type: 'integer',
        format: 'int32',
        default: 20,
        minimum: 1,
        maximum: 100
      }
    },
    {
      name: 'sort',
      in: 'query',
      required: false,
      description: '结果排序方式',
      schema: {
        type: 'string',
        enum: ['asc', 'desc']
      },
      style: 'form',
      explode: true,
      examples: {
        ascending: {
          value: 'asc',
          summary: '按升序排序'
        },
        descending: {
          value: 'desc',
          summary: '按降序排序'
        }
      }
    },
    {
      name: 'X-API-Key',
      in: 'header',
      required: true,
      description: '用于授权请求的 API 密钥',
      schema: {
        type: 'string'
      }
    },
    {
      name: 'filter',
      in: 'query',
      required: false,
      description: '筛选结果的条件',
      schema: {
        type: 'object'
      },
      style: 'deepObject',
      explode: true
    },
    {
      name: 'search',
      in: 'query',
      required: false,
      description: '搜索关键字',
      schema: {
        type: 'string',
        minLength: 3,
        maxLength: 50
      }
    },
    {
      name: 'userAgent',
      in: 'header',
      required: false,
      deprecated: true,
      description: '用户代理信息（已弃用）',
      schema: {
        type: 'string'
      }
    },
    {
      name: 'session',
      in: 'cookie',
      required: false,
      description: '会话标识符',
      schema: {
        type: 'string'
      }
    }
  ];

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">API 参数示例</h1>
        <p className="text-gray-700 mb-6">
          本页展示了 OpenAPI 规范中定义的各种参数类型和属性，包括路径参数、查询参数、头参数和 Cookie 参数。
        </p>

        <div className="space-y-4">
          {parameters.map((parameter, index) => (
            <ParameterItem
              key={index}
              {...parameter as any}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ParameterViewerPage;
