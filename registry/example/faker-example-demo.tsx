import type { OpenAPIV3 } from 'openapi-types';
import { generateExample } from '../lib/generate-example';

export default function FakerExampleDemo() {
  // 用户信息 Schema 示例
  const userSchema: OpenAPIV3.SchemaObject = {
    type: 'object',
    properties: {
      id: { type: 'integer', description: '用户ID' },
      name: { type: 'string', description: '用户姓名' },
      email: { type: 'string', format: 'email', description: '电子邮箱' },
      phone: { type: 'string', description: '手机号码' },
      age: { type: 'integer', minimum: 18, maximum: 80, description: '年龄' },
      gender: { type: 'string', description: '性别' },
      address: { type: 'string', description: '地址' },
      city: { type: 'string', description: '城市' },
      country: { type: 'string', description: '国家' },
      company: { type: 'string', description: '公司' },
      position: { type: 'string', description: '职位' },
      website: { type: 'string', format: 'url', description: '个人网站' },
      avatar: { type: 'string', description: '头像' },
      bio: { type: 'string', description: '个人简介' },
      status: { type: 'string', description: '状态' },
      created_at: { type: 'string', format: 'date-time', description: '创建时间' },
      updated_at: { type: 'string', format: 'date-time', description: '更新时间' }
    },
    required: ['id', 'name', 'email']
  };

  // 产品信息 Schema 示例
  const productSchema: OpenAPIV3.SchemaObject = {
    type: 'object',
    properties: {
      id: { type: 'integer', description: '产品ID' },
      name: { type: 'string', description: '产品名称' },
      description: { type: 'string', description: '产品描述' },
      price: { type: 'number', minimum: 0, description: '价格' },
      currency: { type: 'string', description: '货币' },
      category: { type: 'string', description: '分类' },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: '标签'
      },
      sku: { type: 'string', description: 'SKU编码' },
      stock_count: { type: 'integer', minimum: 0, description: '库存数量' },
      images: {
        type: 'array',
        items: { type: 'string', format: 'url' },
        description: '产品图片'
      },
      status: { type: 'string', description: '状态' },
      created_at: { type: 'string', format: 'date-time', description: '创建时间' },
      updated_at: { type: 'string', format: 'date-time', description: '更新时间' }
    },
    required: ['id', 'name', 'price']
  };

  // 订单信息 Schema 示例
  const orderSchema: OpenAPIV3.SchemaObject = {
    type: 'object',
    properties: {
      order_id: { type: 'string', description: '订单ID' },
      user_id: { type: 'integer', description: '用户ID' },
      total_amount: { type: 'number', minimum: 0, description: '总金额' },
      currency: { type: 'string', description: '货币' },
      status: { type: 'string', description: '订单状态' },
      priority: { type: 'string', description: '优先级' },
      shipping_address: { type: 'string', description: '收货地址' },
      billing_address: { type: 'string', description: '账单地址' },
      phone: { type: 'string', description: '联系电话' },
      email: { type: 'string', format: 'email', description: '联系邮箱' },
      notes: { type: 'string', description: '订单备注' },
      created_at: { type: 'string', format: 'date-time', description: '创建时间' },
      estimated_delivery: { type: 'string', format: 'date', description: '预计送达时间' }
    },
    required: ['order_id', 'user_id', 'total_amount']
  };

  // 生成示例数据
  const userExample = generateExample(userSchema);
  const productExample = generateExample(productSchema);
  const orderExample = generateExample(orderSchema);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Faker.js 智能示例生成演示</h3>
        <p className="text-sm text-gray-600 mb-6">
          使用 @faker-js/faker 根据属性名智能生成真实的示例数据
        </p>
      </div>

      <div className="grid gap-6">
        {/* 用户信息示例 */}
        <div className="border rounded-lg p-4">
          <h4 className="text-md font-medium mb-3">用户信息示例</h4>
          <div className="bg-gray-50 rounded p-3 text-sm">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(userExample, null, 2)}
            </pre>
          </div>
        </div>

        {/* 产品信息示例 */}
        <div className="border rounded-lg p-4">
          <h4 className="text-md font-medium mb-3">产品信息示例</h4>
          <div className="bg-gray-50 rounded p-3 text-sm">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(productExample, null, 2)}
            </pre>
          </div>
        </div>

        {/* 订单信息示例 */}
        <div className="border rounded-lg p-4">
          <h4 className="text-md font-medium mb-3">订单信息示例</h4>
          <div className="bg-gray-50 rounded p-3 text-sm">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(orderExample, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 text-sm">
        <h5 className="font-medium mb-2">智能推断规则示例：</h5>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li><code>name</code>, <code>title</code> → 生成真实姓名</li>
          <li><code>email</code> → 生成有效邮箱地址</li>
          <li><code>phone</code>, <code>mobile</code> → 生成电话号码</li>
          <li><code>address</code> → 生成详细地址</li>
          <li><code>company</code> → 生成公司名称</li>
          <li><code>description</code> → 生成描述性文本</li>
          <li><code>price</code>, <code>amount</code> → 生成合理价格</li>
          <li><code>status</code> → 生成状态值</li>
          <li><code>created_at</code>, <code>updated_at</code> → 生成日期时间</li>
        </ul>
      </div>
    </div>
  );
}
