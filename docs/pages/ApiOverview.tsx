import DeprecatedBadge from '@/components/docs/DeprecatedBadge';
import ExternalDocs from '@/components/docs/ExternalDocs';
import TermsOfService from '@/components/docs/TermsOfService';
import VersionBadge from '@/components/docs/VersionBadge';
import ExpandCollapse from '@/components/interactive/ExpandCollapse';
import React, { useState } from 'react';

const ApiOverview: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="prose max-w-none">
      <h1>API Overview <VersionBadge version="1.0.0" /></h1>
      <p>This section provides an overview of the API, including its purpose and key features.</p>

      <ExpandCollapse
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        label="Key Features"
      />

      {isExpanded && (
        <ul>
          <li>Comprehensive OpenAPI 3.1 support</li>
          <li>Interactive documentation with Try It functionality</li>
          <li>Customizable themes and layouts</li>
          <li>Multi-language support <DeprecatedBadge message="This feature will be updated soon." /></li>
        </ul>
      )}

      <h2>Getting Started</h2>
      <p>To get started, provide an OpenAPI schema URL or JSON file to render the documentation.</p>

      <ExternalDocs
        url="https://swagger.io/specification/"
        description="Learn more about the OpenAPI Specification here."
      />

      <TermsOfService url="https://example.com/terms" />
    </div>
  );
};

export default ApiOverview;
