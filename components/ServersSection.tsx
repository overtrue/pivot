import { useI18n } from "@/lib/i18n/I18nProvider";
import { ServerObject } from "@/types/openapi"; // Adjust path
import React from "react";
import SectionTitle from "./atoms/SectionTitle";
import ServerDisplay from "./atoms/ServerDisplay";

interface ServersSectionProps {
  servers: ServerObject[];
  className?: string;
}

const ServersSection: React.FC<ServersSectionProps> = ({
  servers,
  className,
}) => {
  const { t } = useI18n();

  if (!servers || servers.length === 0) {
    return null;
  }

  return (
    <div className={`py-4 ${className} dark:text-neutral-200`}>
      <SectionTitle title={t("Servers")} className="text-xl mb-3" />
      <div className="space-y-4">
        {servers.map((server, index) => (
          <ServerDisplay key={index} server={server} className="rounded" />
        ))}
      </div>
    </div>
  );
};

export default ServersSection;
