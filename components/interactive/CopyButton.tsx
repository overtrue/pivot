
import React from 'react';

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Copy
    </button>
  );
};

export default CopyButton;
