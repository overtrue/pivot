import { OpenApiSpec } from '../../types/type-script-generator';
import { default as React } from 'react';

interface NavigationSidebarProps {
    openapi: OpenApiSpec;
    activePath?: string | null;
    onSelectOperation?: (path: string, method: string, operation: any) => void;
    onSelectSchema?: (schemaName: string) => void;
    className?: string;
}
declare const NavigationSidebar: React.FC<NavigationSidebarProps>;
export default NavigationSidebar;
