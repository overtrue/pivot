'use client';

import { ContactObject } from '@/types/openapi'; // Adjust path
import React from 'react';

interface ContactDisplayProps {
  contact: ContactObject;
  className?: string;
}

const ContactDisplay: React.FC<ContactDisplayProps> = ({ contact, className }) => {
  return (
    <div className={`text-sm ${className}`}>
      {contact.name && <div className="font-semibold">{contact.name}</div>}
      {contact.email && (
        <div>
          Email: <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a>
        </div>
      )}
      {contact.url && (
        <div>
          URL: <a href={contact.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{contact.url}</a>
        </div>
      )}
    </div>
  );
};

export default ContactDisplay;
