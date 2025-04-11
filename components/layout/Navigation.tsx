import Link from 'next/link';
import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-100 p-4 border-b">
      <ul className="flex space-x-4 flex-wrap">
        <li>
          <Link href="/">
            <a className="text-blue-600 hover:underline">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/documentation">
            <a className="text-blue-600 hover:underline">Documentation</a>
          </Link>
        </li>
        <li>
          <Link href="/api-info">
            <a className="text-blue-600 hover:underline">API Info</a>
          </Link>
        </li>
        <li>
          <Link href="/schema-viewer">
            <a className="text-blue-600 hover:underline">Schema</a>
          </Link>
        </li>
        <li>
          <Link href="/response-viewer">
            <a className="text-blue-600 hover:underline">Responses</a>
          </Link>
        </li>
        <li>
          <Link href="/parameter-viewer">
            <a className="text-blue-600 hover:underline">Parameters</a>
          </Link>
        </li>
        <li>
          <Link href="/security-schemes">
            <a className="text-blue-600 hover:underline">Security</a>
          </Link>
        </li>
        <li>
          <Link href="/servers">
            <a className="text-blue-600 hover:underline">Servers</a>
          </Link>
        </li>
        <li>
          <Link href="/response-examples">
            <a className="text-blue-600 hover:underline">Response Examples</a>
          </Link>
        </li>
        <li>
          <Link href="/codegen">
            <a className="text-blue-600 hover:underline">Code Gen</a>
          </Link>
        </li>
        <li>
          <Link href="/tools">
            <a className="text-blue-600 hover:underline">Tools</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
