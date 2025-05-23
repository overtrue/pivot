import { default as React } from "react";

interface OperationPathProps {
  path: string;
  className?: string;
}
/**
 * 将一个完整的 OpenAPI 路径分割为多个 PathSegment 组件
 * 自动识别路径中的参数（形如 {param}）并高亮显示
 */
declare const OperationPath: React.FC<OperationPathProps>;
export default OperationPath;
