'use client';

import React from 'react';

const MockServer: React.FC = () => {
  return (
    <div className="p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Mock Server</h2>
      <p className="text-sm text-gray-600">Simulate API responses for testing purposes.</p>
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Start Mock Server
      </button>
    </div>
  );
};

export default MockServer;
