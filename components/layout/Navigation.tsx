import Link from 'next/link';
import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-100 p-4 border-b">
      <ul className="flex space-x-4 flex-wrap">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/documentation" className="text-blue-600 hover:underline">
            Documentation
          </Link>
        </li>
        <li>
          <Link href="/api/info" className="text-blue-600 hover:underline">
            API Info
          </Link>
        </li>
        <li>
          <Link href="/schema/viewer" className="text-blue-600 hover:underline">
            Schema
          </Link>
        </li>
        <li>
          <Link href="/response/viewer" className="text-blue-600 hover:underline">
            Responses
          </Link>
        </li>
        <li>
          <Link href="/parameter/viewer" className="text-blue-600 hover:underline">
            Parameters
          </Link>
        </li>
        <li>
          <Link href="/security-schemes" className="text-blue-600 hover:underline">
            Security
          </Link>
        </li>
        <li>
          <Link href="/servers" className="text-blue-600 hover:underline">
            Servers
          </Link>
        </li>
        <li>
          <Link href="/response/examples" className="text-blue-600 hover:underline">
            Response Examples
          </Link>
        </li>
        <li>
          <Link href="/codegen" className="text-blue-600 hover:underline">
            Code Gen
          </Link>
        </li>
        <li>
          <Link href="/tools" className="text-blue-600 hover:underline">
            Tools
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
