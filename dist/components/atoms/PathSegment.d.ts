import { default as React } from "react";

interface PathSegmentProps {
  path: string;
  isParameter?: boolean;
  className?: string;
}
declare const PathSegment: React.FC<PathSegmentProps>;
export default PathSegment;
