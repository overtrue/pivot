
import { cn } from '@/utils/cn';
import React from 'react';

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className }) => {
  return (
    <h4 className={cn('font-semibold text-sm dark:text-neutral-200', className)}>
      {title}
    </h4>
  );
};

export default SectionTitle;
