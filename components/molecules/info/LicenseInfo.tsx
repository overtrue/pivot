import React from 'react';

interface LicenseInfoProps {
  name: string;
  url?: string;
  identifier?: string;
  className?: string;
}

const LicenseInfo: React.FC<LicenseInfoProps> = ({ name, url, identifier, className }) => {
  return (
    <div className={`bg-white rounded shadow p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-2">License</h3>

      <div className="mb-1">
        <span className="font-semibold text-gray-700">Name:</span> {name}
      </div>

      {url && (
        <div className="mb-1">
          <span className="font-semibold text-gray-700">URL:</span>{' '}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {url}
          </a>
        </div>
      )}

      {identifier && (
        <div className="mb-1">
          <span className="font-semibold text-gray-700">Identifier:</span>{' '}
          <span className="bg-gray-100 px-2 py-1 rounded text-sm">{identifier}</span>
        </div>
      )}
    </div>
  );
};

export default LicenseInfo;
