import React from 'react';
import VersionBadge from '../../atoms/docs/VersionBadge';
import ExternalDocs from '../../docs/ExternalDocs';
import TermsOfService from '../../docs/TermsOfService';
import ContactInfo from './ContactInfo';
import LicenseInfo from './LicenseInfo';

interface ApiInfoProps {
  title: string;
  version: string;
  description?: string;
  summary?: string;
  termsOfService?: string;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
  license?: {
    name: string;
    url?: string;
    identifier?: string;
  };
  externalDocs?: {
    url: string;
    description?: string;
  };
  className?: string;
}

const ApiInfo: React.FC<ApiInfoProps> = ({
  title,
  version,
  description,
  summary,
  termsOfService,
  contact,
  license,
  externalDocs,
  className
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <VersionBadge version={version} />
      </div>

      {summary && (
        <p className="text-lg text-gray-700 mb-4">{summary}</p>
      )}

      {description && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">描述</h3>
          <div className="prose max-w-none">
            <p className="text-gray-700">{description}</p>
          </div>
        </div>
      )}

      {termsOfService && (
        <div className="mb-6">
          <TermsOfService url={termsOfService} />
        </div>
      )}

      {externalDocs && (
        <div className="mb-6">
          <ExternalDocs url={externalDocs.url} description={externalDocs.description} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {contact && <ContactInfo {...contact} />}
        {license && <LicenseInfo {...license} />}
      </div>
    </div>
  );
};

export default ApiInfo;
