import { default as React } from "react";

interface MethodLabelProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
  variant?: "default" | "compact";
  className?: string;
}
declare const MethodLabel: React.FC<MethodLabelProps>;
export default MethodLabel;
