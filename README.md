# OpenAPI UI

A modern React component library for visualizing and interacting with OpenAPI specifications.

## Features

- 🚀 Full support for OpenAPI 3.x specifications
- 🎨 Beautiful and responsive UI components
- ⚡️ Interactive "Try it out" functionality
- 📦 Lightweight and tree-shakable

## Installation

```bash
npm install openapi-ui
# or
yarn add openapi-ui
```

## Basic Usage

```tsx
import { OpenApiLayout } from 'openapi-ui';
import spec from './openapi-spec.json';

function App() {
  return <OpenApiLayout spec={spec} />;
}
```

## Components

### OpenApiLayout

The main layout component that renders the complete OpenAPI documentation.

### TryItOutPanel

Standalone component for making API requests:

```tsx
import { TryItOutPanel } from 'openapi-ui';

function TestPage() {
  return (
    <TryItOutPanel
      operation={operationObject}
      method="post"
      path="/api/users"
    />
  );
}
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build
```

## License

MIT
