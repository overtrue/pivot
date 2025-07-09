"use client";

import { useMemo } from "react";

/**
 * Hook for working with OpenAPI operations
 * @param operation - The operation object
 * @param path - The path string
 * @param method - The HTTP method
 * @returns Operation utilities
 */
export function useOperation(operation: any, path: string, method: string) {
  return useMemo(() => {
    const getOperationId = () => {
      return operation.operationId || `${method.toLowerCase()}-${path}`;
    };

    const getTags = () => {
      return operation.tags || [];
    };

    const getParameters = () => {
      return operation.parameters || [];
    };

    const getRequestBody = () => {
      return operation.requestBody;
    };

    const getResponses = () => {
      return operation.responses || {};
    };

    const getSecurity = () => {
      return operation.security || [];
    };

    return {
      getOperationId,
      getTags,
      getParameters,
      getRequestBody,
      getResponses,
      getSecurity,
    };
  }, [operation, path, method]);
}
