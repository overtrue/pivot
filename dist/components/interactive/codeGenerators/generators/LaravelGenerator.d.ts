import { default as React } from "react";
import { CodeGenerator, CodeGeneratorParams } from "../types";

export declare class LaravelGenerator implements CodeGenerator {
  id: string;
  label: string;
  getIcon(): React.JSX.Element;
  generateCode(params: CodeGeneratorParams): string;
}
