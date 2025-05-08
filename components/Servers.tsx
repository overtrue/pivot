
import { ServerObject } from '@/types/openapi';
import React from 'react';
import SectionTitle from './atoms/SectionTitle';
import Server from './Server';

// 服务器列表组件
interface ServersProps {
  servers: ServerObject[];
  className?: string;
}

const Servers: React.FC<ServersProps> = ({ servers, className }) => {
  if (!servers || servers.length === 0) {
    return null;
  }

  return (
    <div className={className || ''}>
      <SectionTitle title="服务器" />
      <div className="mt-3">
        {servers.map((server, index) => (
          <Server key={index} server={server} />
        ))}
      </div>
    </div>
  );
};

export default Servers;
