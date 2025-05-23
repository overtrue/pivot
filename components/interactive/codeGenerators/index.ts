import { CurlGenerator } from './generators/openapi';
import { LaravelGenerator } from './generators/openapi';
import { PhpGenerator } from './generators/openapi';
import { PythonGenerator } from './generators/openapi';
import { TypeScriptGenerator } from './generators/openapi';
import { CodeGenerator } from './openapi';

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
