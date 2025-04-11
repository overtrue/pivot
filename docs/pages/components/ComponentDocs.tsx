import VersionBadge from '@/components/docs/VersionBadge';
import React from 'react';

const ComponentDocs: React.FC = () => {
  return (
    <div className="prose max-w-none">
      <h1>Component Documentation <VersionBadge version="1.0.0" /></h1>
      <p>Welcome to the OpenAPI Component Library documentation. Here you will find detailed information about each component, including usage examples and props.</p>

      <h2>MethodLabel</h2>
      <p>The <code>MethodLabel</code> component is used to display HTTP methods with semantic colors.</p>
      <pre>
        <code>{`<MethodLabel method="GET" />`}</code>
      </pre>

      <h2>PathSegment</h2>
      <p>The <code>PathSegment</code> component highlights segments of a URL path, including dynamic parameters.</p>
      <pre>
        <code>{`<PathSegment path="/users/{id}" isParameter={true} />`}</code>
      </pre>

      <h2>RequiredMarker</h2>
      <p>The <code>RequiredMarker</code> component indicates required fields with a red asterisk.</p>
      <pre>
        <code>{`<RequiredMarker />`}</code>
      </pre>

      <h2>TypeIndicator</h2>
      <p>The <code>TypeIndicator</code> component displays the type of a schema property with semantic colors.</p>
      <pre>
        <code>{`<TypeIndicator type="string" />`}</code>
      </pre>

      <h2>DeprecatedBadge</h2>
      <p>The <code>DeprecatedBadge</code> component is used to mark deprecated features.</p>
      <pre>
        <code>{`<DeprecatedBadge message="This feature is deprecated." />`}</code>
      </pre>
    </div>
  );
};

export default ComponentDocs;
