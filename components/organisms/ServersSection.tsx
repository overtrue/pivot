'use client';

import React from 'react';
import { ServerObject } from '../../types/openapi'; // Adjust path
import ServerDisplay from '../atoms/server/ServerDisplay';
import SectionTitle from '../atoms/typography/SectionTitle';

interface ServersSectionProps {
  servers: ServerObject[];
  className?: string;
}

const ServersSection: React.FC<ServersSectionProps> = ({ servers, className }) => {
  if (!servers || servers.length === 0) {
    return null;
  }

  return (
    <div className={`py-4 ${className}`}>
      <SectionTitle title="Servers" className="text-xl mb-3" />
      <div className="space-y-4">
        {servers.map((server, index) => (
          <ServerDisplay key={index} server={server} className="border rounded" />
        ))}
      </div>
    </div>
  );
};

export default ServersSection;
