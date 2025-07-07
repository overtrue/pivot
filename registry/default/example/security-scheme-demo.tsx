import { SecurityScheme } from "@/registry/default/ui/security-scheme";

export default function SecuritySchemeDemo() {
  const apiKeyScheme = {
    type: "apiKey" as const,
    description: "API key authentication",
    name: "X-API-Key",
    in: "header" as const
  };

  const httpScheme = {
    type: "http" as const,
    description: "Bearer token authentication",
    scheme: "bearer",
    bearerFormat: "JWT"
  };

  const oauth2Scheme = {
    type: "oauth2" as const,
    description: "OAuth2 authentication",
    flows: {
      authorizationCode: {
        authorizationUrl: "https://example.com/oauth/authorize",
        tokenUrl: "https://example.com/oauth/token",
        scopes: {
          "read": "Read access to resources",
          "write": "Write access to resources",
          "admin": "Administrative access"
        }
      }
    }
  };

  return (
    <div className="space-y-6 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-2">API Key Authentication</h4>
        <SecurityScheme name="ApiKeyAuth" scheme={apiKeyScheme} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">HTTP Bearer Authentication</h4>
        <SecurityScheme name="BearerAuth" scheme={httpScheme} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">OAuth2 Authentication</h4>
        <SecurityScheme name="OAuth2" scheme={oauth2Scheme} />
      </div>
    </div>
  );
}
