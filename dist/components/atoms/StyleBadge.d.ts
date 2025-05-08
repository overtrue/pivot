import { StyleType } from '../../types/openapi';
import { default as React } from 'react';

interface StyleBadgeProps {
    style: StyleType;
    className?: string;
}
declare const StyleBadge: React.FC<StyleBadgeProps>;
export default StyleBadge;
