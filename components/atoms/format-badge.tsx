import { FormatType } from '@/types/openapi';
import { cn } from '@/utils/cn';
import React from 'react';

// Define more abstract theme names
type FormatTheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

interface FormatBadgeProps {
  format: FormatType;
  theme?: FormatTheme | 'auto'; // Theme prop using new names
  className?: string;
}

// Map themes to colors using new names (only text color)
const formatThemeColors: Record<FormatTheme, string> = {
  primary: 'text-blue-800 dark:text-blue-400',         // Was number
  secondary: 'text-purple-800 dark:text-purple-400',   // Was date
  success: 'text-green-800 dark:text-green-400',       // Was identifier
  warning: 'text-yellow-800 dark:text-yellow-400',     // Was binary
  danger: 'text-red-800 dark:text-red-400',            // Was sensitive
  neutral: 'text-neutral-500 dark:text-neutral-400',         // Was default
};

// Helper to determine theme from format if theme is 'auto' (returns new theme names)
const getThemeForFormat = (format: FormatType): FormatTheme => {
  if (['int32', 'int64', 'float', 'double'].includes(format)) return 'primary';
  if (['date', 'date-time'].includes(format)) return 'secondary';
  if (['email', 'uuid', 'uri', 'hostname', 'ipv4', 'ipv6'].includes(format)) return 'success';
  if (['byte', 'binary'].includes(format)) return 'warning';
  if (['password'].includes(format)) return 'danger';
  return 'neutral'; // Default to neutral
};

const FormatBadge: React.FC<FormatBadgeProps> = ({ format, theme = 'auto', className }) => {
  // Determine the final theme name
  const finalTheme = theme === 'auto' ? getThemeForFormat(format) : theme;

  // Get color class from the theme map
  const colorClass = formatThemeColors[finalTheme] || formatThemeColors.neutral; // Fallback to neutral

  return (
    <span
      className={cn('text-xs font-medium font-mono', colorClass, className)}
    >
      {format}
    </span>
  );
};

export default FormatBadge;
