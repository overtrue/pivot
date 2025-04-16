'use client';

import React from 'react';

const RequiredBadge: React.FC = () => {
  return (
    <span className="bg-red-100 text-red-800 px-2 py-0.5 text-xs rounded font-semibold">
      required
    </span>
  );
};

export default RequiredBadge;
