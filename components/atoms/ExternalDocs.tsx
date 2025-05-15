import { cn } from '@/utils/cn';
import React from 'react';

const ExternalDocs: React.FC<{ url: string; description?: string; className?: string }> = ({ url, description, className }) => {
  return (
    <div className={cn("p-4 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700", className)}>
      <h2 className="text-lg font-bold mb-2 dark:text-white">External Documentation</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description || 'Additional information can be found here:'}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        {url}
      </a>
    </div>
  );
};

export default ExternalDocs;
