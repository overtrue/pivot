import { default as React } from "react";

interface MediaTypeSelectorProps {
  mediaTypes: string[];
  activeMediaType: string | null;
  onSelectMediaType: (mediaType: string) => void;
}
declare const MediaTypeSelector: React.FC<MediaTypeSelectorProps>;
export default MediaTypeSelector;
