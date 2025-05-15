import { cn } from '@/utils/cn';
import React from 'react';

interface TermsOfServiceProps {
  url: string;
  className?: string;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ url, className }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("text-blue-600 dark:text-blue-400 hover:underline text-sm", className)}
    >
      Terms of Service
    </a>
  );
};

export default TermsOfService;
