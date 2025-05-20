
import { useI18n } from '@/lib/i18n/I18nProvider';
import { ServerObject } from '@/types/openapi';
import React from 'react';
import SectionTitle from './atoms/SectionTitle';
import Server from './Server';

// Server list component
interface ServersProps {
  servers: ServerObject[];
  className?: string;
}

const Servers: React.FC<ServersProps> = ({ servers, className }) => {
  const { t } = useI18n();

  if (!servers || servers.length === 0) {
    return null;
  }

  return (
    <div className={`${className || ''} dark:text-neutral-200`}>
      <SectionTitle title={t("Servers")} />
      <div className="mt-3">
        {servers.map((server, index) => (
          <Server key={index} server={server} />
        ))}
      </div>
    </div>
  );
};

export default Servers;
