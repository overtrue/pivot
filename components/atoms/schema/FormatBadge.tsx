import React from 'react';

type FormatType = 'int32' | 'int64' | 'float' | 'double' | 'byte' | 'binary' |
  'date' | 'date-time' | 'password' | 'email' | 'uuid' | 'uri' |
  'hostname' | 'ipv4' | 'ipv6';

interface FormatBadgeProps {
  format: FormatType;
  className?: string;
}

const getColorForFormat = (format: FormatType): string => {
  // Group formats by category
  if (['int32', 'int64', 'float', 'double'].includes(format)) {
    return 'bg-blue-100 text-blue-800'; // number formats
  } else if (['date', 'date-time'].includes(format)) {
    return 'bg-purple-100 text-purple-800'; // date formats
  } else if (['email', 'uuid', 'uri', 'hostname', 'ipv4', 'ipv6'].includes(format)) {
    return 'bg-green-100 text-green-800'; // identifier formats
  } else if (['byte', 'binary'].includes(format)) {
    return 'bg-yellow-100 text-yellow-800'; // binary formats
  } else if (['password'].includes(format)) {
    return 'bg-red-100 text-red-800'; // sensitive formats
  }
  return 'bg-gray-100 text-gray-800'; // default
};

const FormatBadge: React.FC<FormatBadgeProps> = ({ format, className }) => {
  const colorClass = getColorForFormat(format);

  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium ${colorClass} ${className || ''}`}
    >
      format: {format}
    </span>
  );
};

export default FormatBadge;
