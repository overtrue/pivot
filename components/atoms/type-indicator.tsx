import { useI18n } from '@/lib/i18n/i18n-provider';
import { DataType } from '@/types/openapi';
import { cn } from '@/utils/cn';
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
  primary: 'text-blue-800 dark:text-blue-400',       // number/integer
  secondary: 'text-purple-800 dark:text-purple-400', // array
  success: 'text-green-800 dark:text-green-400',     // string
  warning: 'text-yellow-800 dark:text-yellow-400',   // boolean
  danger: 'text-red-800 dark:text-red-400',          // (Currently unused, could be for invalid/error types)
  info: 'text-indigo-800 dark:text-indigo-400',      // object
  neutral: 'text-neutral-500 dark:text-neutral-400',       // null & default
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
  const { t } = useI18n();
  // Determine the final theme name
  const finalTheme = theme === 'auto' ? getThemeForDataType(type) : theme;

  // Get text color class from the theme map
  const colorClass = dataTypeThemeColors[finalTheme] || dataTypeThemeColors.neutral; // Fallback to neutral

  // 翻译类型名称
  const getTypeDisplay = () => {
    if (children) return children;
    // 由于type是受限的DataType类型，我们直接返回type
    return type;
  };

  return (
    <span
      // Remove padding, background, and rounded classes
      className={cn('text-xs font-medium font-mono', colorClass, className)}
    >
      {getTypeDisplay()}
    </span>
  );
};

export default TypeIndicator;
