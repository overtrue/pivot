import React from 'react';

const TermsOfService: React.FC<{ url: string }> = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline text-sm"
    >
      Terms of Service
    </a>
  );
};

export default TermsOfService;
