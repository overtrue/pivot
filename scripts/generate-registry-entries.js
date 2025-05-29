#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 获取所有示例组件
function getAllDemoComponents() {
  const exampleDir = path.join(__dirname, '..', 'registry', 'example')
  const files = fs.readdirSync(exampleDir)

  return files
    .filter(file => file.endsWith('-demo.tsx'))
    .map(file => file.replace('-demo.tsx', ''))
    .sort()
}

// 生成注册表条目
function generateRegistryEntry(componentName) {
  const title = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') + ' Demo'

  return `  {
    name: "${componentName}-demo",
    type: "registry:example",
    title: "${title}",
    description: "Example showing ${componentName.replace('-', ' ')} component",
    files: [
      {
        path: "registry/example/${componentName}-demo.tsx",
        type: "registry:example",
        target: "components/example/${componentName}-demo.tsx"
      }
    ]
  }`
}

// 主函数
function main() {
  console.log('🚀 Generating registry entries...\n')

  const demoComponents = getAllDemoComponents()
  console.log(`Found ${demoComponents.length} demo components`)

  const entries = demoComponents.map(generateRegistryEntry)
  const registryContent = `export const exampleRegistry = [
${entries.join(',\n')}
];`

  // 写入到临时文件
  const outputPath = path.join(__dirname, 'generated-registry-entries.js')
  fs.writeFileSync(outputPath, registryContent)

  console.log(`\n✅ Generated registry entries saved to: ${outputPath}`)
  console.log(`\n📋 You can copy these entries to registry-example.js:`)
  console.log(`\n${registryContent}`)
}

main()
