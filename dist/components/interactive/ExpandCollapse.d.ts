import { default as React } from "react";

interface ExpandCollapseProps {
  isExpanded: boolean;
  onToggle: () => void;
  label?: string;
  expandedLabel?: string;
  collapsedLabel?: string;
  className?: string;
}
declare const ExpandCollapse: React.FC<ExpandCollapseProps>;
export default ExpandCollapse;
