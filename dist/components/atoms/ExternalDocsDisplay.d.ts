import { ExternalDocumentationObject } from '../../types/openapi';
import { default as React } from 'react';

interface ExternalDocsDisplayProps {
    externalDocs: ExternalDocumentationObject;
    className?: string;
}
declare const ExternalDocsDisplay: React.FC<ExternalDocsDisplayProps>;
export default ExternalDocsDisplay;
