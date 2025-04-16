import { OAuthFlowType } from '@/types/openapi';
import clsx from 'clsx';
import React from 'react';

interface OAuthFlowProps {
  flow: OAuthFlowType;
  className?: string;
}

const flowColors: Record<OAuthFlowType, string> = {
  implicit: 'bg-orange-100 text-orange-800',
  password: 'bg-red-100 text-red-800',
  clientCredentials: 'bg-green-100 text-green-800',
  authorizationCode: 'bg-blue-100 text-blue-800',
};

const OAuthFlow: React.FC<OAuthFlowProps> = ({ flow, className }) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 text-xs font-semibold rounded',
        flowColors[flow],
        className
      )}
    >
      {flow}
    </span>
  );
};

export default OAuthFlow;
