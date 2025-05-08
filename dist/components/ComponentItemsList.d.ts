import { default as React } from 'react';

interface ComponentItemsListProps {
    items: string[] | undefined;
    selectedItem: string | null;
    onSelectItem: (item: string) => void;
}
declare const ComponentItemsList: React.FC<ComponentItemsListProps>;
export default ComponentItemsList;
