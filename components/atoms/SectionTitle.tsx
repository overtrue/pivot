'use client';

import React from 'react';

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className }) => {
  return (
    <h4 className={`font-semibold text-sm ${className}`}>
      {title}
    </h4>
  );
};

export default SectionTitle;
