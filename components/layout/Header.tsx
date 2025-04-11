import VersionBadge from '@/components/docs/VersionBadge';
import LanguageSwitcher from '@/components/interactive/LanguageSwitcher';
import ThemeSwitcher from '@/components/interactive/ThemeSwitcher';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">OpenAPI Component Library</h1>
        <VersionBadge version="1.0.0" />
      </div>
      <div className="flex space-x-4">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
