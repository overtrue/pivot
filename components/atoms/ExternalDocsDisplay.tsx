
import { ExternalDocumentationObject } from '@/types/openapi'; // Adjust path
import { cn } from '@/utils/cn';
import React from 'react';

interface ExternalDocsDisplayProps {
  externalDocs: ExternalDocumentationObject;
  className?: string;
}

const ExternalDocsDisplay: React.FC<ExternalDocsDisplayProps> = ({ externalDocs, className }) => {
  return (
    <div className={cn('text-sm', className)}>
      <a href={externalDocs.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
        {externalDocs.description || 'External Documentation'}
      </a>
    </div>
  );
};

export default ExternalDocsDisplay;
