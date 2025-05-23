// filepath: /workspaces/pivot/components/interactive/codeGenerators/generators/PhpGenerator.ts
import React from 'react';
import { Code2 } from 'lucide-react';
import { CodeGenerator, CodeGeneratorParams } from '..';
import { replaceDoubleQuotes } from '../utils/resolveRef';

export class PhpGenerator implements CodeGenerator {
  id = 'php';
  label = 'PHP';
  
  getIcon() {
    return <Code2 size={16} />;
  }
  
  generateCode(params: CodeGeneratorParams): string {
    const { endpoint, method, requestBodyExample, requestBody } = params;
    
    return `<?php
// 使用 PHP 的 cURL 扩展
function call_${method.toLowerCase()}() {
    $url = "${endpoint}";

    $curl = curl_init();

    $headers = [
        "Content-Type: application/json",
        "Accept: application/json"
    ];

    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_CUSTOMREQUEST => "${method}",${(['POST', 'PUT', 'PATCH'].includes(method) && requestBody) ? `
        CURLOPT_POSTFIELDS => json_encode(
${JSON.stringify(requestBodyExample, null, 4).split('\n').map(line => '            ' + replaceDoubleQuotes(line)).join(',\n')}
        ),` : ''}
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        return "cURL Error: " . $err;
    } else {
        return json_decode($response, true);
    }
}`;
  }
}
