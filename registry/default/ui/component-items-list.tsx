import { cn } from "@/lib/utils";
import React from "react";

interface ComponentItemsListProps {
  items: string[] | undefined;
  selectedItem: string | null;
  onSelectItem: (item: string) => void;
  className?: string;
}

const ComponentItemsList = React.forwardRef<
  HTMLUListElement,
  ComponentItemsListProps
>(({ items, selectedItem, onSelectItem, className }, ref) => {
  if (!items || items.length === 0) {
    return <div className="text-neutral-500 italic">No items available</div>;
  }

  return (
    <ul ref={ref} className={cn("space-y-1 text-sm", className)}>
      {items.map((itemName) => (
        <li key={itemName}>
          <button
            onClick={() => onSelectItem(itemName)}
            className={cn(
              "w-full text-left px-3 py-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
              selectedItem === itemName
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
                : "text-neutral-700 dark:text-neutral-300",
            )}
          >
            {itemName}
          </button>
        </li>
      ))}
    </ul>
  );
});

ComponentItemsList.displayName = "ComponentItemsList";

export { ComponentItemsList };
