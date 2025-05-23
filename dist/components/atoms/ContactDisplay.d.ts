import { ContactObject } from '../../types/type-script-generator';
import { default as React } from 'react';

interface ContactDisplayProps {
    contact: ContactObject;
    className?: string;
}
declare const ContactDisplay: React.FC<ContactDisplayProps>;
export default ContactDisplay;
