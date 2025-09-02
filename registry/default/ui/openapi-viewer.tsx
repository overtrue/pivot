"use client";

import { cn } from "@/lib/utils";
import { useOpenAPILoader } from "@/registry/default/hooks/use-openapi-loader";
import { I18nProvider } from "@/registry/default/lib/i18n";
import { OperationDetailedLayout } from "@/registry/default/ui/operation-detailed-layout";
import { OperationListLayout } from "@/registry/default/ui/operation-list-layout";
import type { OpenAPIV3 } from "openapi-types";
import React, { useEffect, useMemo, useState } from "react";

/**
 * OpenAPIViewer component props
 */
export interface OpenAPIViewerProps {
  // Data source - can be URL, JSON string, or OpenAPI object
  spec?: string | OpenAPIV3.Document;
  url?: string;

  // Layout type
  layout?: 'detail' | 'list' | 'auto';

  // Style
  className?: string;
  style?: React.CSSProperties;

  // Callbacks
  onReady?: (spec: OpenAPIV3.Document) => void;
  onError?: (error: Error) => void;
  onOperationSelect?: (path: string, method: string, operation: OpenAPIV3.OperationObject) => void;
}

/**
 * Internal viewer component (wrapped with providers)
 */
const OpenAPIViewerContent: React.FC<{
  spec: string | OpenAPIV3.Document | undefined;
  layout: 'detail' | 'list' | 'auto';
  className?: string;
  style?: React.CSSProperties;
  onReady?: (spec: OpenAPIV3.Document) => void;
  onError?: (error: Error) => void;
  onOperationSelect?: (path: string, method: string, operation: OpenAPIV3.OperationObject) => void;
}> = ({
  spec: inputSpec,
  layout,
  className,
  style,
  onReady,
  onError,
  onOperationSelect
}) => {
  const { spec, loading, error } = useOpenAPILoader(inputSpec);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // Determine actual layout
  const actualLayout = useMemo(() => {
    if (layout === 'auto') {
      // Auto-detect based on screen size or spec complexity
      const operationCount = spec ? Object.keys(spec.paths || {}).length : 0;
      return operationCount > 20 ? 'list' : 'detail';
    }
    return layout;
  }, [layout, spec]);

  // Handle ready callback
  useEffect(() => {
    if (spec && onReady) {
      onReady(spec);
    }
  }, [spec, onReady]);

  // Handle error callback
  useEffect(() => {
    if (error && onError) {
      onError(new Error(error));
    }
  }, [error, onError]);

  // Handle operation selection
  const handleOperationSelect = (path: string, method: string, operation: OpenAPIV3.OperationObject) => {
    setSelectedPath(path);
    setSelectedMethod(method);
    if (onOperationSelect) {
      onOperationSelect(path, method, operation);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={cn("flex items-center justify-center min-h-[400px]", className)} style={style}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading OpenAPI specification...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={cn("flex items-center justify-center min-h-[400px]", className)} style={style}>
        <div className="text-center max-w-md">
          <div className="text-destructive mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Failed to load OpenAPI specification</h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  // No spec state
  if (!spec) {
    return (
      <div className={cn("flex items-center justify-center min-h-[400px]", className)} style={style}>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No OpenAPI specification</h3>
          <p className="text-sm text-muted-foreground">Please provide a valid OpenAPI specification URL or object</p>
        </div>
      </div>
    );
  }

  // Render based on layout
  return (
    <div className={cn("h-full", className)} style={style}>
      {actualLayout === 'list' ? (
        <OperationListLayout
          spec={spec}
          selectedPath={selectedPath}
          selectedMethod={selectedMethod}
          onSelectOperation={handleOperationSelect}
        />
      ) : (
        <OperationDetailedLayout
          spec={spec}
          selectedPath={selectedPath}
          selectedMethod={selectedMethod}
          onSelectOperation={handleOperationSelect}
        />
      )}
    </div>
  );
};

/**
 * Main OpenAPIViewer component
 * A standalone, easy-to-use component for displaying OpenAPI specifications
 *
 * @example
 * ```tsx
 * // Simple usage with URL
 * <OpenAPIViewer url="https://api.example.com/openapi.json" />
 *
 * // With OpenAPI object
 * <OpenAPIViewer spec={openAPIDocument} layout="list" />
 * ```
 */
export const OpenAPIViewer = React.forwardRef<HTMLDivElement, OpenAPIViewerProps>(
  ({
    spec,
    url,
    layout = 'auto',
    className,
    style,
    onReady,
    onError,
    onOperationSelect
  }, ref) => {
    // Determine spec source
    const specSource = spec || url;

    if (!specSource) {
      return (
        <div className={cn("flex items-center justify-center min-h-[400px]", className)} style={style}>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">No specification provided</h3>
            <p className="text-sm text-muted-foreground">Please provide either a 'spec' or 'url' prop</p>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("pivot-viewer", className)} style={style}>
        <I18nProvider>
          <OpenAPIViewerContent
            spec={specSource}
            layout={layout}
            onReady={onReady}
            onError={onError}
            onOperationSelect={onOperationSelect}
          />
        </I18nProvider>
      </div>
    );
  }
);

OpenAPIViewer.displayName = "OpenAPIViewer";

/**
 * Standalone components for specific use cases
 */

// Response viewer for displaying only responses
export const ResponseViewer: React.FC<{
  responses: OpenAPIV3.ResponsesObject;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}> = ({ responses, components, className }) => {
  // Lazy load the ResponsesSection component
  const ResponsesSection = React.lazy(() => import('./responses-section').then(m => ({ default: m.ResponsesSection })));

  return (
    <I18nProvider>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ResponsesSection
          responses={responses}
          components={components}
          className={className}
        />
      </React.Suspense>
    </I18nProvider>
  );
};

// Operation viewer for displaying a single operation
export const OperationViewer: React.FC<{
  operation: OpenAPIV3.OperationObject;
  path: string;
  method: string;
  components?: OpenAPIV3.ComponentsObject;
  className?: string;
}> = ({ operation, path, method, components, className }) => {
  // Lazy load the OperationDetail component
  const OperationDetail = React.lazy(() => import('./operation-detail').then(m => ({ default: m.OperationDetail })));

  return (
    <I18nProvider>
      <React.Suspense fallback={<div>Loading...</div>}>
        <OperationDetail
          operation={operation}
          path={path}
          method={method}
          components={components}
          className={className}
        />
      </React.Suspense>
    </I18nProvider>
  );
};
