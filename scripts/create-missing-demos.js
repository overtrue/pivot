#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 需要创建示例的组件列表
const componentsNeedingDemos = [
  'navigation-sidebar',
  'oauth-flow-details',
  'path-segment',
  'all-in-one-layout',
  'accordion-components-section',
  'callback-display',
  'component-tabs',
  'server-display',
  'operation-path',
  'response-content-section',
  'example-display',
  'links-section',
  'servers-section',
  'section-title',
  'terms-of-service',
  'operation-box',
  'oauth-flow',
  'theme-toggle',
  'request-body-section',
  'required-marker',
  'scheme-type',
  'schema-with-example-viewer',
  'component-detail',
  'header-item',
  'component-items-list',
  'enum-values-display',
  'language-switcher',
  'responses-section',
  'parameter-group',
  'parameter-description',
  'parameters-section',
  'security-requirement-item',
  'components-section',
  'media-type-selector',
  'security-schemes',
  'servers',
  'python-generator',
  'headers-section',
  'parameter-item',
  'security-requirements-section',
  'server',
  'link-item',
  'try-it-out-panel',
  'security-scheme-display',
  'php-generator',
  'schema-composition-display',
  'external-docs',
  'laravel-generator',
  'typescript-generator',
  'codegen',
  'server-variable'
]

// 创建基本的示例组件模板
function createDemoComponent(componentName) {
  const pascalCaseName = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  const componentImport = `@/registry/pivot/${componentName}`

  return `import { ${pascalCaseName} } from "${componentImport}";

export default function ${pascalCaseName}Demo() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-3">基本用法</h4>
        <${pascalCaseName} />
      </div>
    </div>
  );
}`
}

// 更新 MDX 文件
function updateMdxFile(componentName) {
  const mdxPath = path.join(__dirname, '..', 'content', 'docs', 'components', `${componentName}.mdx`)

  if (fs.existsSync(mdxPath)) {
    let content = fs.readFileSync(mdxPath, 'utf8')
    content = content.replace(
      `<ComponentPreview name="${componentName}" />`,
      `<ComponentPreview name="${componentName}-demo" />`
    )
    fs.writeFileSync(mdxPath, content)
    console.log(`✅ Updated ${componentName}.mdx`)
  } else {
    console.log(`⚠️  MDX file not found: ${componentName}.mdx`)
  }
}

// 主函数
function main() {
  console.log('🚀 Creating missing demo components...\n')

  const exampleDir = path.join(__dirname, '..', 'registry', 'example')

  // 确保目录存在
  if (!fs.existsSync(exampleDir)) {
    fs.mkdirSync(exampleDir, { recursive: true })
  }

  let createdCount = 0
  let updatedCount = 0

  componentsNeedingDemos.forEach(componentName => {
    const demoFileName = `${componentName}-demo.tsx`
    const demoFilePath = path.join(exampleDir, demoFileName)

    // 检查示例组件是否已存在
    if (!fs.existsSync(demoFilePath)) {
      // 检查基础组件是否存在
      const baseComponentPath = path.join(__dirname, '..', 'registry', 'pivot', `${componentName}.tsx`)

      if (fs.existsSync(baseComponentPath)) {
        const demoContent = createDemoComponent(componentName)
        fs.writeFileSync(demoFilePath, demoContent)
        console.log(`✅ Created ${demoFileName}`)
        createdCount++

        // 更新对应的 MDX 文件
        updateMdxFile(componentName)
        updatedCount++
      } else {
        console.log(`⚠️  Base component not found: ${componentName}.tsx`)
      }
    } else {
      console.log(`ℹ️  Demo already exists: ${demoFileName}`)
    }
  })

  console.log(`\n📊 Summary:`)
  console.log(`   Created: ${createdCount} demo components`)
  console.log(`   Updated: ${updatedCount} MDX files`)
  console.log(`\n🎉 Done! Don't forget to:`)
  console.log(`   1. Add the new demos to registry-example.js`)
  console.log(`   2. Run 'npm run build:registry'`)
}

main()
