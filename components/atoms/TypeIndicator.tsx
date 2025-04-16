import { DataType } from '@/types/openapi';
import React from 'react';

// Define theme names for data types
type DataTypeTheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface TypeIndicatorProps {
  type: DataType;
  theme?: DataTypeTheme | 'auto'; // Add theme prop
  className?: string;
  children?: React.ReactNode;
}

// Map themes to text colors
const dataTypeThemeColors: Record<DataTypeTheme, string> = {
  primary: 'text-blue-800',    // number/integer
  secondary: 'text-purple-800',// array
  success: 'text-green-800',  // string
  warning: 'text-yellow-800', // boolean
  danger: 'text-red-800',      // (Currently unused, could be for invalid/error types)
  info: 'text-indigo-800',   // object
  neutral: 'text-gray-500',   // null & default (using the gray-500 from your last FormatBadge change)
};

// Helper to determine theme from data type if theme is 'auto'
const getThemeForDataType = (type: DataType): DataTypeTheme => {
  switch (type) {
    case 'string':
      return 'success';
    case 'number':
    case 'integer':
      return 'primary';
    case 'boolean':
      return 'warning';
    case 'array':
      return 'secondary';
    case 'object':
      return 'info';
    case 'null':
      return 'neutral';
    default: // Should not happen with current DataType, but good practice
      return 'neutral';
  }
};

const TypeIndicator: React.FC<TypeIndicatorProps> = ({ type, theme = 'auto', className, children }) => {
  // Determine the final theme name
  const finalTheme = theme === 'auto' ? getThemeForDataType(type) : theme;

  // Get text color class from the theme map
  const colorClass = dataTypeThemeColors[finalTheme] || dataTypeThemeColors.neutral; // Fallback to neutral

  return (
    <span
      // Remove padding, background, and rounded classes
      className={`text-xs font-medium font-mono ${colorClass} ${className || ''}`}
    >
      {children || type} {/* Display children if provided, otherwise the type */}
    </span>
  );
};

export default TypeIndicator;
