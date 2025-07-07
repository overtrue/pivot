import { cn } from "@/lib/utils";
import type { OpenAPIV3 } from 'openapi-types';
import React from "react";

interface ContactDisplayProps {
  contact: OpenAPIV3.ContactObject;
  className?: string;
}

const ContactDisplay = React.forwardRef<HTMLDivElement, ContactDisplayProps>(
  ({ contact, className }, ref) => {
    return (
      <div ref={ref} className={cn("text-sm", className)}>
        {contact.name && <div className="font-semibold">{contact.name}</div>}
        {contact.email && (
          <div className="text-neutral-700 dark:text-neutral-300">
            Email:{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {contact.email}
            </a>
          </div>
        )}
        {contact.url && (
          <div className="text-neutral-700 dark:text-neutral-300">
            URL:{" "}
            <a
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {contact.url}
            </a>
          </div>
        )}
      </div>
    );
  },
);

ContactDisplay.displayName = "ContactDisplay";

export { ContactDisplay, type ContactDisplayProps };
