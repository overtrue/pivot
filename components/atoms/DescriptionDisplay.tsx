
import { cn } from '@/utils/cn';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface DescriptionDisplayProps {
  description: string;
  className?: string;
}

const DescriptionDisplay: React.FC<DescriptionDisplayProps> = ({ description, className }) => {
  return (
    <div className={cn(`text-sm text-gray-500 dark:text-gray-300 prose dark:prose-invert max-w-none`, className)}>
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
};

export default DescriptionDisplay;
