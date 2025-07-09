"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface DemoComponent {
  name: string;
  displayName: string;
  category: string;
}

export default function DemoIndexPage() {
  const [components, setComponents] = useState<DemoComponent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/demo/components")
      .then(res => res.json())
      .then(data => {
        const categorizedComponents = data.components.map((name: string) => ({
          name,
          displayName: name.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          category: getCategory(name)
        }));
        setComponents(categorizedComponents);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getCategory = (name: string): string => {
    if (name.includes('layout')) return 'Layout';
    if (name.includes('section')) return 'Section';
    if (name.includes('display')) return 'Display';
    if (name.includes('generator')) return 'Generator';
    if (name.includes('badge')) return 'Badge';
    if (name.includes('button')) return 'Button';
    if (name.includes('panel')) return 'Panel';
    if (name.includes('item')) return 'Item';
    if (name.includes('label')) return 'Label';
    if (name.includes('operation')) return 'Operation';
    if (name.includes('parameter')) return 'Parameter';
    if (name.includes('response')) return 'Response';
    if (name.includes('request')) return 'Request';
    if (name.includes('schema')) return 'Schema';
    if (name.includes('security')) return 'Security';
    if (name.includes('server')) return 'Server';
    return 'Other';
  };

  const groupedComponents = components.reduce((acc, component) => {
    const category = component.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(component);
    return acc;
  }, {} as Record<string, DemoComponent[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Demo Components</h1>
          <p className="text-muted-foreground">
            Browse and test all available OpenAPI components ({components.length} total)
          </p>
        </div>

        <div className="grid gap-8">
          {Object.entries(groupedComponents)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, categoryComponents]) => (
              <div key={category} className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-primary">
                  {category} ({categoryComponents.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryComponents
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((component) => (
                      <Link
                        key={component.name}
                        href={`/demo/${component.name}`}
                        className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="font-medium text-sm mb-1">
                          {component.displayName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {component.name}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
