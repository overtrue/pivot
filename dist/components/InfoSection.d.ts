import { InfoObject } from '../types/openapi';
import { default as React } from 'react';

interface InfoSectionProps {
    info: InfoObject;
    className?: string;
}
declare const InfoSection: React.FC<InfoSectionProps>;
export default InfoSection;
