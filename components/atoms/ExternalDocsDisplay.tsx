'use client';

import React from 'react';
import { ExternalDocumentationObject } from '../../types/openapi'; // Adjust path

interface ExternalDocsDisplayProps {
  externalDocs: ExternalDocumentationObject;
  className?: string;
}

const ExternalDocsDisplay: React.FC<ExternalDocsDisplayProps> = ({ externalDocs, className }) => {
  return (
    <div className={`text-sm ${className}`}>
      <a href={externalDocs.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        {externalDocs.description || 'External Documentation'}
      </a>
    </div>
  );
};

export default ExternalDocsDisplay;
