import React from 'react';

const ExternalDocs: React.FC<{ url: string; description?: string }> = ({ url, description }) => {
  return (
    <div className="p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-bold mb-2">External Documentation</h2>
      <p className="text-sm text-gray-600">{description || 'Additional information can be found here:'}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {url}
      </a>
    </div>
  );
};

export default ExternalDocs;
