import { useI18n } from '@/lib/i18n/I18nProvider';
import { cn } from '@/utils/cn';
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
  const { t } = useI18n();

  if (mediaTypes.length <= 1) {
    return null; // Don't render tabs if only one or zero media types
  }

  const handleClick = (e: React.MouseEvent, mediaType: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(t('Switching media type to: %s').replace('%s', mediaType));
    onSelectMediaType(mediaType);
  };

  return (
    <div className="mb-2 border-b dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center z-10">
        {mediaTypes.map(mediaType => (
          <li key={mediaType} className="mr-2">
            <button
              onClick={(e) => handleClick(e, mediaType)}
              className={cn(
                'inline-block p-2 border-b-2 rounded-t-lg',
                activeMediaType === mediaType
                  ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                  : 'border-transparent hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              )}
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
