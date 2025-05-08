import { SecuritySchemeType } from '../../types/openapi';
import { default as React } from 'react';

interface SchemeTypeProps {
    type: SecuritySchemeType;
    className?: string;
}
declare const SchemeType: React.FC<SchemeTypeProps>;
export default SchemeType;
