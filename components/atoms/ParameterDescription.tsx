
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ParameterDescriptionProps {
  description: string;
}

const ParameterDescription: React.FC<ParameterDescriptionProps> = ({ description }) => {
  return (
    <div className="text-sm text-gray-500 prose max-w-none">
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
};

export default ParameterDescription;
