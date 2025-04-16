'use client';

import { ServerObject } from '@/types/openapi'; // Adjust path
import React from 'react';
import DescriptionDisplay from './DescriptionDisplay';

interface ServerDisplayProps {
  server: ServerObject;
  className?: string;
}

const ServerDisplay: React.FC<ServerDisplayProps> = ({ server, className }) => {
  return (
    <div className={`bg-gray-50 p-2 rounded ${className}`}>
      <div className="text-xs font-semibold mb-1 font-mono break-all">{server.url}</div>
      {server.description && (
        <DescriptionDisplay description={server.description} className="text-xs mb-2" />
      )}

      {server.variables && Object.keys(server.variables).length > 0 && (
        <div className="mt-2">
          <h5 className="text-xs font-medium mb-1">Variables</h5>
          <div className="space-y-2">
            {Object.entries(server.variables).map(([varName, variable]) => (
              <div key={varName} className="border border-gray-200 p-1.5 rounded bg-white text-xs">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-mono font-medium">{varName}</span>
                  <span className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-700">Default: {variable.default}</span>
                </div>
                {variable.description && (
                  <DescriptionDisplay description={variable.description} className="text-xs mt-1 text-gray-600" />
                )}
                {variable.enum && variable.enum.length > 0 && (
                  <div className="mt-1">
                    <span className="font-medium">Enum:</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {variable.enum.map((value) => (
                        <span key={value} className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">{value}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerDisplay;
