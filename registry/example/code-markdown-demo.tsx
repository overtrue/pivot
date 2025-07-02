"use client";

import { I18nProvider } from "@/registry/lib/i18n/I18nProvider";
import { CodeMarkdown } from "@/registry/pivot/code-markdown";

export default function CodeMarkdownDemo() {
  const jsonCode = `{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 30,
  "active": true,
  "profile": {
    "bio": "Software Engineer",
    "location": "San Francisco, CA",
    "skills": ["JavaScript", "TypeScript", "React", "Node.js"]
  },
  "createdAt": "2024-03-15T10:30:00Z",
  "lastLoginAt": "2024-03-15T14:22:33Z"
}`;

  const xmlCode = `<?xml version="1.0" encoding="UTF-8"?>
<user>
  <id>123e4567-e89b-12d3-a456-426614174000</id>
  <name>John Doe</name>
  <email>john.doe@example.com</email>
  <age>30</age>
  <active>true</active>
  <profile>
    <bio>Software Engineer</bio>
    <location>San Francisco, CA</location>
    <skills>
      <skill>JavaScript</skill>
      <skill>TypeScript</skill>
      <skill>React</skill>
      <skill>Node.js</skill>
    </skills>
  </profile>
  <createdAt>2024-03-15T10:30:00Z</createdAt>
  <lastLoginAt>2024-03-15T14:22:33Z</lastLoginAt>
</user>`;

  const yamlCode = `id: 123e4567-e89b-12d3-a456-426614174000
name: John Doe
email: john.doe@example.com
age: 30
active: true
profile:
  bio: Software Engineer
  location: San Francisco, CA
  skills:
    - JavaScript
    - TypeScript
    - React
    - Node.js
createdAt: 2024-03-15T10:30:00Z
lastLoginAt: 2024-03-15T14:22:33Z`;

  const javascriptCode = `// API 客户端示例
class ApiClient {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${this.apiKey}\`,
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // 获取用户信息
  async getUser(userId) {
    return this.request(\`/users/\${userId}\`);
  }

  // 创建用户
  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }
}

// 使用示例
const client = new ApiClient('https://api.example.com', 'your-api-key');

client.getUser('123')
  .then(user => console.log('User:', user))
  .catch(error => console.error('Error:', error));`;

  const pythonCode = `import requests
import json
from typing import Dict, Any, Optional

class ApiClient:
    """API 客户端类，用于与 REST API 交互"""

    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        })

    def request(self, endpoint: str, method: str = 'GET',
                data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """发送 HTTP 请求"""
        url = f"{self.base_url}{endpoint}"

        try:
            response = self.session.request(
                method=method,
                url=url,
                json=data if data else None
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}")
            raise

    def get_user(self, user_id: str) -> Dict[str, Any]:
        """获取用户信息"""
        return self.request(f'/users/{user_id}')

    def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """创建用户"""
        return self.request('/users', method='POST', data=user_data)

# 使用示例
if __name__ == "__main__":
    client = ApiClient('https://api.example.com', 'your-api-key')

    try:
        user = client.get_user('123')
        print(f"User: {json.dumps(user, indent=2)}")
    except Exception as e:
        print(f"Error: {e}")`;

  const curlCode = `# 获取用户信息
curl -X GET "https://api.example.com/users/123" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json"

# 创建新用户
curl -X POST "https://api.example.com/users" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "profile": {
      "bio": "Software Engineer",
      "location": "San Francisco, CA"
    }
  }'

# 更新用户信息
curl -X PUT "https://api.example.com/users/123" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Smith",
    "profile": {
      "bio": "Senior Software Engineer",
      "location": "New York, NY"
    }
  }'

# 删除用户
curl -X DELETE "https://api.example.com/users/123" \\
  -H "Authorization: Bearer your-api-key"`;

  return (
    <I18nProvider>
      <div className="space-y-8 p-6">
        <h2 className="text-2xl font-bold">Code Markdown Demo</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          展示 CodeMarkdown 组件的语法高亮和复制功能
        </p>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">JSON 示例</h3>
          <CodeMarkdown code={jsonCode} language="json" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">XML 示例</h3>
          <CodeMarkdown code={xmlCode} language="xml" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">YAML 示例</h3>
          <CodeMarkdown code={yamlCode} language="yaml" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">JavaScript 示例</h3>
          <CodeMarkdown code={javascriptCode} language="javascript" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Python 示例</h3>
          <CodeMarkdown code={pythonCode} language="python" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">cURL 示例</h3>
          <CodeMarkdown code={curlCode} language="bash" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">禁用复制功能</h3>
          <CodeMarkdown
            code={jsonCode}
            language="json"
            disableCopy={true}
          />
        </div>
      </div>
    </I18nProvider>
  );
}
