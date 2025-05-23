import { Code2 } from 'lucide-react';
import { CodeGenerator, CodeGeneratorParams } from '..';

export class LaravelGenerator implements CodeGenerator {
  id = 'laravel';
  label = 'Laravel';

  getIcon() {
    return <Code2 size={16} />;
  }

  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, requestBodyExample, requestBody } = params;

    // 生成格式化后的PHP数组表示
    const formattedRequestBody = JSON.stringify(requestBodyExample, null, 2)
      .replace(/"/g, "'")
      .replace(/\n/g, "\n        ");

    const guzzleRequestBody = JSON.stringify(requestBodyExample, null, 2)
      .replace(/"/g, "'")
      .replace(/\n/g, "\n            ");

    return `<?php
// 使用 Laravel HTTP 客户端
use Illuminate\\Support\\Facades\\Http;

function call_${method.toLowerCase()}()
{
    $response = Http::withHeaders([
        'Content-Type' => 'application/json',
        'Accept' => 'application/json',
    ])${(['POST', 'PUT', 'PATCH'].includes(method) && requestBody) ? `->${method.toLowerCase()}("${endpoint}",
        ${formattedRequestBody}
    );` : `.${method.toLowerCase()}("${endpoint}");`}

    return $response->json();
}

// 或者使用 Laravel 的 Guzzle 封装
public function call_${method.toLowerCase()}_guzzle()
{
    $client = new \\GuzzleHttp\\Client();

    $response = $client->request("${method}", "${endpoint}", [
        'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ],${(['POST', 'PUT', 'PATCH'].includes(method) && requestBody) ? `
        'json' => ${guzzleRequestBody}` : ''}
    ]);

    return json_decode($response->getBody(), true);
}`;
  }
}
