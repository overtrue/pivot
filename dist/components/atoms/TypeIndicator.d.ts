import { DataType } from '../../types/openapi';
import { default as React } from 'react';

type DataTypeTheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
interface TypeIndicatorProps {
    type: DataType;
    theme?: DataTypeTheme | 'auto';
    className?: string;
    children?: React.ReactNode;
}
declare const TypeIndicator: React.FC<TypeIndicatorProps>;
export default TypeIndicator;
