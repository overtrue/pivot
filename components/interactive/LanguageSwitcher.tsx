import React from 'react';
import { useI18n } from '../../lib/i18n/I18nProvider';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setLocale('en')}
        className={`px-4 py-2 rounded ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        English
      </button>
      <button
        onClick={() => setLocale('zh')}
        className={`px-4 py-2 rounded ${locale === 'zh' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        中文
      </button>
    </div>
  );
};

export default LanguageSwitcher;
