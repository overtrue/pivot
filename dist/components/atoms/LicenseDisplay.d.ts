import { LicenseObject } from "../../types/openapi";
import { default as React } from "react";

interface LicenseDisplayProps {
  license: LicenseObject;
  className?: string;
}
declare const LicenseDisplay: React.FC<LicenseDisplayProps>;
export default LicenseDisplay;
