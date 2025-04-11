import fs from 'fs';
import path from 'path';
import React from 'react';

const generateDocs = () => {
  const componentsDir = path.join(process.cwd(), 'components');
  const docsDir = path.join(process.cwd(), 'docs', 'pages', 'components');

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const components = fs.readdirSync(componentsDir);

  components.forEach((component) => {
    const componentPath = path.join(componentsDir, component);
    if (fs.statSync(componentPath).isDirectory()) {
      const docFilePath = path.join(docsDir, `${component}.mdx`);
      const docContent = `# ${component}\n\nDocumentation for ${component} component.`;
      fs.writeFileSync(docFilePath, docContent);
    }
  });
};

generateDocs();

const DocsGenerator: React.FC = () => {
  return <div>Documentation has been generated.</div>;
};

export default DocsGenerator;
