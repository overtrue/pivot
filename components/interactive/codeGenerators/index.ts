import { CurlGenerator } from "./generators/CurlGenerator";
import { LaravelGenerator } from "./generators/LaravelGenerator";
import { PhpGenerator } from "./generators/PhpGenerator";
import { PythonGenerator } from "./generators/PythonGenerator";
import { TypeScriptGenerator } from "./generators/TypeScriptGenerator";
import { CodeGenerator } from "./types";

// 注册所有代码生成器
export const codeGenerators: CodeGenerator[] = [
  new CurlGenerator(),
  new TypeScriptGenerator(),
  new PythonGenerator(),
  new PhpGenerator(),
  new LaravelGenerator(),
];

// 通过ID获取生成器的辅助函数
export function getGeneratorById(id: string): CodeGenerator | undefined {
  return codeGenerators.find((generator) => generator.id === id);
}

export * from "./types";
