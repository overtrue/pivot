import { InfoObject } from '@/types/openapi'; // Adjust path
import { Book, FileText, Info, Users } from 'lucide-react';
import React from 'react';
import ContactDisplay from './atoms/ContactDisplay';
import DescriptionDisplay from './atoms/DescriptionDisplay';
import LicenseDisplay from './atoms/LicenseDisplay';

interface InfoSectionProps {
  info: InfoObject;
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ info, className }) => {
  return (
    <div className={`py-8 ${className}`}>
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-3xl font-bold mb-3 text-gray-800">{info.title}</h1>
        <div className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          版本 {info.version}
        </div>
      </div>

      {info.description && (
        <div className="mb-8 bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <FileText className="text-blue-600 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">接口说明</h2>
          </div>
          <DescriptionDisplay description={info.description} className="prose max-w-none text-gray-600" />
        </div>
      )}

      {info.termsOfService && (
        <div className="mb-8 bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <Book className="text-blue-600 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">服务条款</h2>
          </div>
          <a href={info.termsOfService} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline hover:text-blue-800 transition-colors break-all flex items-center">
            <span>{info.termsOfService}</span>
          </a>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {info.contact && (
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <Users className="text-blue-600 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">联系方式</h2>
            </div>
            <ContactDisplay contact={info.contact} />
          </div>
        )}

        {info.license && (
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <Info className="text-blue-600 mr-2" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">许可证</h2>
            </div>
            <LicenseDisplay license={info.license} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoSection;
