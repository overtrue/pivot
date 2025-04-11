import React from 'react';

interface ContactInfoProps {
  name?: string;
  url?: string;
  email?: string;
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ name, url, email, className }) => {
  if (!name && !url && !email) {
    return null;
  }

  return (
    <div className={`bg-white rounded shadow p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-2">Contact Information</h3>

      {name && (
        <div className="mb-1">
          <span className="font-semibold text-gray-700">Name:</span> {name}
        </div>
      )}

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

      {email && (
        <div className="mb-1">
          <span className="font-semibold text-gray-700">Email:</span>{' '}
          <a
            href={`mailto:${email}`}
            className="text-blue-600 hover:underline"
          >
            {email}
          </a>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
