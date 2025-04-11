import React from 'react';
import ApiOverview from './ApiOverview';
import ComponentDocs from './components/ComponentDocs';
import SchemaDocs from './SchemaDocs';

const DocsHome: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Documentation</h1>
      <ApiOverview />
      <ComponentDocs />
      <SchemaDocs />
    </div>
  );
};

export default DocsHome;
