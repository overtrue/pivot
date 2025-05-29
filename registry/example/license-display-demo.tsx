import { LicenseDisplay } from "@/registry/pivot/license-display";

export default function LicenseDisplayDemo() {
  const mitLicense = {
    name: "MIT License",
    identifier: "MIT",
    url: "https://opensource.org/licenses/MIT"
  };

  const apacheLicense = {
    name: "Apache License 2.0",
    identifier: "Apache-2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0"
  };

  const customLicense = {
    name: "Custom License",
    url: "https://example.com/license"
  };

  const simpleLicense = {
    name: "Proprietary License"
  };

  return (
    <div className="space-y-4 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-2">MIT License</h4>
        <LicenseDisplay license={mitLicense} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Apache License</h4>
        <LicenseDisplay license={apacheLicense} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Custom License</h4>
        <LicenseDisplay license={customLicense} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Simple License</h4>
        <LicenseDisplay license={simpleLicense} />
      </div>
    </div>
  );
}
