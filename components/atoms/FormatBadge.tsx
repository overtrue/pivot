import { FormatType } from '@/types/openapi';
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
  primary: 'text-blue-800',      // Was number, removed bg-blue-100
  secondary: 'text-purple-800', // Was date, removed bg-purple-100
  success: 'text-green-800',    // Was identifier, removed bg-green-100
  warning: 'text-yellow-800', // Was binary, removed bg-yellow-100
  danger: 'text-red-800',       // Was sensitive, removed bg-red-100
  neutral: 'text-gray-500',     // Was default, removed bg-gray-100
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
      className={`text-xs font-medium font-mono ${colorClass} ${className || ''}`}
    >
      {format}
    </span>
  );
};

export default FormatBadge;
