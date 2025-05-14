import { default as React } from 'react';

interface CopyButtonProps {
    text: string;
    className?: string;
    iconClassName?: string;
    size?: 'sm' | 'md' | 'lg';
}
declare const CopyButton: React.FC<CopyButtonProps>;
export default CopyButton;
