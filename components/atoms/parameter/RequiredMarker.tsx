import React from 'react';

interface RequiredMarkerProps {
  className?: string;
}

const RequiredMarker: React.FC<RequiredMarkerProps> = ({ className }) => {
  return (
    <span className={`text-red-600 font-bold ${className}`} title="Required">
      *
    </span>
  );
};

export default RequiredMarker;
