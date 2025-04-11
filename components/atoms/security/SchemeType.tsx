import clsx from 'clsx';
import React from 'react';

type SchemeType = 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';

interface SchemeTypeProps {
  type: SchemeType;
  className?: string;
}

const schemeColors: Record<SchemeType, string> = {
  apiKey: 'bg-yellow-100 text-yellow-800',
  http: 'bg-blue-100 text-blue-800',
  oauth2: 'bg-green-100 text-green-800',
  openIdConnect: 'bg-purple-100 text-purple-800',
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
