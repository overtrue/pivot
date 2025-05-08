import { default as React } from 'react';

interface StatusCodeProps {
    code: string | number;
    size?: 'small' | 'medium';
    className?: string;
}
declare const StatusCode: React.FC<StatusCodeProps>;
export default StatusCode;
