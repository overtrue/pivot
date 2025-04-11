import VersionBadge from '@/components/docs/VersionBadge';
import React from 'react';

const SchemaDocs: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <h1>Schema Documentation <VersionBadge version="1.0.0" /></h1>
      <p>This section provides detailed information about schema-related components.</p>

      <h2>ObjectProperties</h2>
      <p>The <code>ObjectProperties</code> component displays a table of object properties, including their types and descriptions.</p>
      <pre>
        <code>{`<ObjectProperties properties={[{ name: 'id', type: 'integer', description: 'User ID' }]} />`}</code>
      </pre>

      <h2>ArrayItems</h2>
      <p>The <code>ArrayItems</code> component displays the structure of array items, reusing the <code>ObjectProperties</code> component.</p>
      <pre>
        <code>{`<ArrayItems items={[{ type: 'string', description: 'Item description' }]} />`}</code>
      </pre>

      <h2>AllOfContainer</h2>
      <p>The <code>AllOfContainer</code> component displays multiple schemas in an expandable format.</p>
      <pre>
        <code>{`<AllOfContainer schemas={[{ name: 'User', properties: [{ name: 'id', type: 'integer' }] }]} />`}</code>
      </pre>
    </div>
  );
};

export default SchemaDocs;
