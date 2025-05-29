"use client";

import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { CopyButton } from "@/registry/pivot/copy-button";
import { ExampleDisplay } from "@/registry/pivot/example-display";

export default function CopyButtonDemo() {
  const sampleCode = `{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "active": true
}`;

  const sampleObject = {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    active: true
  };

  return (
    <I18nProvider>
      <div className="space-y-6 p-6">
        <h2 className="text-2xl font-bold">Copy Button Demo</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Copy Button</h3>
          <div className="flex items-center space-x-4">
            <CopyButton text="Hello, World!" size="sm" />
            <CopyButton text="Hello, World!" size="md" />
            <CopyButton text="Hello, World!" size="lg" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Example Display with Copy Button</h3>
          <ExampleDisplay
            example={sampleObject}
            language="json"
            title="User Object Example"
            className="max-w-md"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Example Display without Copy Button</h3>
          <ExampleDisplay
            example={sampleObject}
            language="json"
            title="User Object Example (No Copy)"
            disableCopy={true}
            className="max-w-md"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">XML Example</h3>
          <ExampleDisplay
            example={sampleObject}
            language="xml"
            title="User XML Example"
            className="max-w-md"
          />
        </div>
      </div>
    </I18nProvider>
  );
}
