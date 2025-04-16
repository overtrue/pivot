import { SecuritySchemeType } from '@/types/openapi';
import clsx from 'clsx';
import React from 'react';

interface SchemeTypeProps {
  type: SecuritySchemeType;
  className?: string;
}

const schemeColors: Record<SecuritySchemeType, string> = {
  apiKey: 'bg-yellow-100 text-yellow-800',
  http: 'bg-blue-100 text-blue-800',
  oauth2: 'bg-green-100 text-green-800',
  openIdConnect: 'bg-purple-100 text-purple-800',
  mutualTLS: 'bg-red-100 text-red-800',
};

const SchemeType: React.FC<SchemeTypeProps> = ({ type, className }) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 text-xs font-semibold rounded',
        schemeColors[type],
        className
      )}
    >
      {type}
    </span>
  );
};

export default SchemeType;
