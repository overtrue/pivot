import React from 'react';

interface MediaTypeSelectorProps {
  mediaTypes: string[];
  activeMediaType: string | null;
  onSelectMediaType: (mediaType: string) => void;
}

const MediaTypeSelector: React.FC<MediaTypeSelectorProps> = ({
  mediaTypes,
  activeMediaType,
  onSelectMediaType,
}) => {
  if (mediaTypes.length <= 1) {
    return null; // Don't render tabs if only one or zero media types
  }

  return (
    <div className="mb-2 border-b">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center z-10">
        {mediaTypes.map(mediaType => (
          <li key={mediaType} className="mr-2">
            <button
              onClick={() => onSelectMediaType(mediaType)}
              className={`inline-block p-2 border-b-2 rounded-t-lg ${activeMediaType === mediaType
                ? 'text-blue-600 border-blue-600'
                : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                }`}
              type="button"
            >
              {mediaType}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaTypeSelector;
