'use client';

import React from 'react';
import { InfoObject } from '../../types/openapi'; // Adjust path
import ContactDisplay from '../atoms/info/ContactDisplay';
import LicenseDisplay from '../atoms/info/LicenseDisplay';
import DescriptionDisplay from '../atoms/typography/DescriptionDisplay';

interface InfoSectionProps {
  info: InfoObject;
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ info, className }) => {
  return (
    <div className={`py-6 ${className}`}>
      <h1 className="text-3xl font-bold mb-2">{info.title}</h1>
      <div className="text-lg text-gray-600 mb-4">Version: {info.version}</div>

      {info.description && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <DescriptionDisplay description={info.description} className="prose max-w-none" />
        </div>
      )}

      {info.termsOfService && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Terms of Service</h2>
          <a href={info.termsOfService} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{info.termsOfService}</a>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {info.contact && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <ContactDisplay contact={info.contact} />
          </div>
        )}

        {info.license && (
          <div>
            <h2 className="text-xl font-semibold mb-2">License</h2>
            <LicenseDisplay license={info.license} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoSection;
