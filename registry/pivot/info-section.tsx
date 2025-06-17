import { cn } from "@/lib/utils";
import { Book, FileText, Info, Users } from "lucide-react";
import type { OpenAPIV3 } from 'openapi-types';
import React from "react";
import { ContactDisplay } from "../pivot/contact-display";
import { DescriptionDisplay } from "../pivot/description-display";
import { LicenseDisplay } from "../pivot/license-display";

interface InfoSectionProps {
  info: OpenAPIV3.InfoObject;
  className?: string;
}

const InfoSection = React.forwardRef<HTMLDivElement, InfoSectionProps>(
  ({ info, className }, ref) => {
    return (
      <div ref={ref} className={cn("py-8", className)}>
        <div className="flex flex-col items-start mb-8">
          <h1 className="text-3xl font-bold mb-3 text-neutral-800 dark:text-neutral-100">
            {info.title}
          </h1>
          <div className="flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            Version {info.version}
          </div>
        </div>

        {info.description && (
          <div className="mb-8 bg-white dark:bg-neutral-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <FileText
                className="text-blue-600 dark:text-blue-400 mr-2"
                size={20}
              />
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                API Description
              </h2>
            </div>
            <DescriptionDisplay
              description={info.description}
              className="prose max-w-none text-neutral-600 dark:text-neutral-300"
            />
          </div>
        )}

        {info.termsOfService && (
          <div className="mb-8 bg-white dark:bg-neutral-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Book
                className="text-blue-600 dark:text-blue-400 mr-2"
                size={20}
              />
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                Terms of Service
              </h2>
            </div>
            <a
              href={info.termsOfService}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors break-all flex items-center"
            >
              <span>{info.termsOfService}</span>
            </a>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {info.contact && (
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Users
                  className="text-blue-600 dark:text-blue-400 mr-2"
                  size={20}
                />
                <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                  Contact
                </h2>
              </div>
              <ContactDisplay contact={info.contact} />
            </div>
          )}

          {info.license && (
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Info
                  className="text-blue-600 dark:text-blue-400 mr-2"
                  size={20}
                />
                <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                  License
                </h2>
              </div>
              <LicenseDisplay license={info.license} />
            </div>
          )}
        </div>
      </div>
    );
  },
);

InfoSection.displayName = "InfoSection";

export { InfoSection, type InfoSectionProps };
