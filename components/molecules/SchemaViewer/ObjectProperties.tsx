import React from 'react';

interface ObjectPropertiesProps {
  properties: { name: string; type: string; description?: string }[];
}

const ObjectProperties: React.FC<ObjectPropertiesProps> = ({ properties }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((prop) => (
          <tr key={prop.name}>
            <td className="border border-gray-300 px-4 py-2 font-mono">{prop.name}</td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm text-gray-600">{prop.type}</td>
            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{prop.description || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ObjectProperties;
