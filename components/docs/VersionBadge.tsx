import React from 'react';

const VersionBadge: React.FC<{ version: string }> = ({ version }) => {
  return (
    <span className="px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded">
      v{version}
    </span>
  );
};

export default VersionBadge;
