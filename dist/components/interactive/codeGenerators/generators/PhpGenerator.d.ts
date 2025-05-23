import { default as React } from "react";
import { CodeGenerator, CodeGeneratorParams } from "../types";

export declare class PhpGenerator implements CodeGenerator {
  id: string;
  label: string;
  getIcon(): React.JSX.Element;
  generateCode(params: CodeGeneratorParams): string;
}
