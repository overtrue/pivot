'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface DescriptionDisplayProps {
  description: string;
  className?: string;
}

const DescriptionDisplay: React.FC<DescriptionDisplayProps> = ({ description, className }) => {
  return (
    <div className={`text-sm text-gray-600 prose max-w-none ${className}`}>
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
};

export default DescriptionDisplay;
