import { FormatType } from '../../types/openapi';
import { default as React } from 'react';

type FormatTheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
interface FormatBadgeProps {
    format: FormatType;
    theme?: FormatTheme | 'auto';
    className?: string;
}
declare const FormatBadge: React.FC<FormatBadgeProps>;
export default FormatBadge;
