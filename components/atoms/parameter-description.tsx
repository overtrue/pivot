
import { cn } from '@/utils/cn';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ParameterDescriptionProps {
  description: string;
  className?: string;
}

const ParameterDescription: React.FC<ParameterDescriptionProps> = ({ description, className }) => {
  return (
    <div className={cn("text-sm text-neutral-500 dark:text-neutral-400 prose dark:prose-invert max-w-none", className)}>
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
};

export default ParameterDescription;
