import { CodeGenerator } from './code-generator';
import { CurlGenerator } from './curl-generator';
import { LaravelGenerator } from './laravel-generator';
import { PhpGenerator } from './php-generator';
import { PythonGenerator } from './python-generator';
import { TypeScriptGenerator } from './type-script-generator';

// 注册所有代码生成器
export const codeGenerators: CodeGenerator[] = [
  new CurlGenerator(),
  new TypeScriptGenerator(),
  new PythonGenerator(),
  new PhpGenerator(),
  new LaravelGenerator()
];

// 通过ID获取生成器的辅助函数
export function getGeneratorById(id: string): CodeGenerator | undefined {
  return codeGenerators.find(generator => generator.id === id);
}

export * from './types';
