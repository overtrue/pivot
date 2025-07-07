import { exec } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { rimraf } from "rimraf";
import { registryItemSchema, type Registry } from "shadcn/registry";
import { z } from "zod";

// =============================================================================
// CONFIGURATION
// =============================================================================

const DEPRECATED_ITEMS = ["toast"];
const REGISTRY_BASE_URL = 'https://pivotkit.vercel.app/r';

// =============================================================================
// TYPES
// =============================================================================

interface DependencyAnalysis {
  npmDependencies: string[];
  registryDependencies: string[];
}

// =============================================================================
// DEPENDENCY ANALYSIS
// =============================================================================

/**
 * Analyze dependencies for a single file
 * @param filePath - Path to the file to analyze
 * @returns Object containing npm and registry dependencies
 */
async function analyzeFileDependencies(filePath: string): Promise<DependencyAnalysis> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const npmDependencies = new Set<string>();
    const registryDependencies = new Set<string>();

    // Parse all import statements
    const importMatches = content.match(/from\s+["'][^"']+["']/g);
    if (importMatches) {
      for (const match of importMatches) {
        const importPath = match.match(/["']([^"']+)["']/)?.[1];
        if (!importPath) continue;

        // Check if it's a relative import (internal component)
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
          let componentName = path.basename(importPath, '.tsx').replace(/^\.\//, '');
          if (componentName && !componentName.startsWith('lib/') && !componentName.startsWith('utils/')) {
            if (importPath.startsWith('@/registry/lib/')) {
              componentName = 'lib';
            }
            registryDependencies.add(`${REGISTRY_BASE_URL}/${componentName}.json`);
          }
        }
        // Check if it's a registry component import (@/components/ui/...)
        else if (importPath.startsWith('@/components/ui/')) {
          const componentName = path.basename(importPath, '.tsx');
          if (componentName) {
            registryDependencies.add(componentName);
          }
        }
        // Check if it's a registry component import (@/registry/...)
        else if (importPath.startsWith('@/registry/')) {
          let componentName = path.basename(importPath, path.extname(importPath));

          if (importPath.startsWith('@/registry/default/lib/')) {
            componentName = 'lib';
          }

          if (importPath.startsWith('@/registry/default/hooks/')) {
            componentName = 'hooks';
          }

          if (componentName) {
            registryDependencies.add(`${REGISTRY_BASE_URL}/${componentName}.json`);
          }
        }
        // Check if it's an npm package (not starting with . or / or @/)
        else if (!importPath.startsWith('.') && !importPath.startsWith('/') && !importPath.startsWith('@/')) {
          // Extract package name (handle scoped packages like @faker-js/faker)
          const packageName = importPath.startsWith('@')
            ? importPath.split('/').slice(0, 2).join('/') // @scope/package
            : importPath.split('/')[0]; // regular package

          npmDependencies.add(packageName);
        }
      }
    }

    // 如果是 lib 组件，添加 registryDependencies 到结果中
    const result = {
      npmDependencies: Array.from(npmDependencies),
      registryDependencies: Array.from(registryDependencies)
    };

    // 打印调试信息
    console.log(`\n📦 Analyzing dependencies for ${filePath}:`);
    console.log('  - NPM dependencies:', result.npmDependencies);
    console.log('  - Registry dependencies:', result.registryDependencies);

    return result;
  } catch (error) {
    console.warn(`Failed to analyze dependencies for ${filePath}:`, error);
    return { npmDependencies: [], registryDependencies: [] };
  }
}

// =============================================================================
// REGISTRY GENERATORS
// =============================================================================

/**
 * Generate registry configuration for UI components
 * Scans registry/default/ui directory for .tsx files
 */
async function generateRegistryUI(): Promise<Registry["items"]> {
  console.log('🔍 Analyzing UI components...');

  const uiDir = path.join(process.cwd(), 'registry/default/ui');
  const files = await fs.readdir(uiDir);
  const tsxFiles = files.filter(f => f.endsWith('.tsx'));
  const uiItems: Registry["items"] = [];

  for (const file of tsxFiles) {
    const componentName = path.basename(file, '.tsx');
    const filePath = path.join(uiDir, file);
    const { npmDependencies, registryDependencies } = await analyzeFileDependencies(filePath);

    const item = {
      name: componentName,
      type: "registry:ui" as const,
      files: [
        {
          path: `registry/default/ui/${file}`,
          type: "registry:ui" as const,
          target: `components/ui/${file}`
        }
      ],
      ...(npmDependencies.length > 0 && { dependencies: npmDependencies }),
      ...(registryDependencies.length > 0 && { registryDependencies })
    };

    uiItems.push(item);
  }

  const content = `import { type Registry } from "shadcn/registry";

export const ui: Registry["items"] = ${JSON.stringify(uiItems, null, 2)};
export default ui;
`;

  await fs.writeFile(path.join(process.cwd(), 'registry/registry-ui.ts'), content);
  console.log(`✅ Generated ${uiItems.length} UI component configurations`);

  return uiItems;
}

/**
 * Generate registry configuration for example components
 * Scans registry/default/example directory for .tsx files
 */
async function generateRegistryExamples(): Promise<Registry["items"]> {
  console.log('🔍 Analyzing example components...');

  const exampleDir = path.join(process.cwd(), 'registry/default/example');
  let files: string[] = [];

  try {
    files = await fs.readdir(exampleDir);
  } catch (error) {
    console.log('📁 Example directory not found, skipping...');
    return [];
  }

  const tsxFiles = files.filter(f => f.endsWith('.tsx'));
  const exampleItems: Registry["items"] = [];

  for (const file of tsxFiles) {
    const componentName = path.basename(file, '.tsx');
    const filePath = path.join(exampleDir, file);
    const { npmDependencies, registryDependencies } = await analyzeFileDependencies(filePath);

    const item = {
      name: componentName,
      type: "registry:example" as const,
      files: [
        {
          path: `registry/default/example/${file}`,
          type: "registry:example" as const,
          target: `components/example/${file}`
        }
      ],
      ...(npmDependencies.length > 0 && { dependencies: npmDependencies }),
      ...(registryDependencies.length > 0 && { registryDependencies })
    };

    exampleItems.push(item);
  }

  const content = `import { type Registry } from "shadcn/registry";

export const examples: Registry["items"] = ${JSON.stringify(exampleItems, null, 2)};
`;

  await fs.writeFile(path.join(process.cwd(), 'registry/registry-examples.ts'), content);
  console.log(`✅ Generated ${exampleItems.length} example configurations`);

  return exampleItems;
}

/**
 * 递归获取目录下的所有文件
 */
async function getAllFiles(dir: string, rootDir?: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const isRootDir = rootDir ? dir === rootDir : false;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath, rootDir || dir)));
    } else if ((entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      // 只过滤掉根目录下的 index.ts 文件，保留子目录中的 index.ts 文件
      if (entry.name === 'index.ts' && isRootDir) {
        continue;
      }
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Generate registry configuration for lib components
 * Scans registry/default/lib directory for .ts/.tsx files
 */
async function generateRegistryLib(): Promise<Registry["items"]> {
  console.log('🔍 Analyzing lib components...');

  const libDir = path.join(process.cwd(), 'registry/default/lib');
  const files: {
    path: string;
    type: "registry:lib";
    target: string;
  }[] = [];
  const allDependencies = new Set<string>();

  // 递归获取所有文件
  const allFiles = await getAllFiles(libDir, libDir);

  // 收集所有文件
  for (const filePath of allFiles) {
    const { npmDependencies } = await analyzeFileDependencies(filePath);

    // 计算相对路径
    const relativePath = path.relative(process.cwd(), filePath);
    const targetPath = relativePath.replace(/^registry\/default\//, '');

    // 添加文件
    files.push({
      path: relativePath,
      type: 'registry:lib',
      target: targetPath
    });

    // 收集所有依赖
    npmDependencies.forEach(dep => allDependencies.add(dep));
  }

  // 创建单个 lib 组件
  const libItem: Registry["items"][0] = {
    name: 'lib',
    type: 'registry:lib',
    description: 'Core library components and utilities',
    files: files.sort((a, b) => a.path.localeCompare(b.path)),
    dependencies: Array.from(allDependencies).sort()
  };

  const content = `import { type Registry } from "shadcn/registry";

// This file is auto-generated by scripts/build-registry.mts
// Do not edit this file manually
export const lib: Registry["items"] = [${JSON.stringify(libItem, null, 2)}];
`;

  await fs.writeFile(path.join(process.cwd(), 'registry/registry-lib.ts'), content);
  console.log(`✅ Generated lib configuration with ${files.length} files`);

  return [libItem];
}

/**
 * Generate registry configuration for hooks
 * Scans registry/default/hooks directory for .ts files
 */
async function generateRegistryHooks(): Promise<Registry["items"]> {
  console.log('🔍 Analyzing hooks...');

  const hooksDir = path.join(process.cwd(), 'registry/default/hooks');
  const files: {
    path: string;
    type: "registry:hook";
    target: string;
  }[] = [];
  const allDependencies = new Set<string>();

  // 递归获取所有文件
  const allFiles = await getAllFiles(hooksDir, hooksDir);

  // 收集所有文件
  for (const filePath of allFiles) {
    const { npmDependencies } = await analyzeFileDependencies(filePath);

    // 计算相对路径
    const relativePath = path.relative(process.cwd(), filePath);
    const targetPath = relativePath.replace(/^registry\/default\//, '');

    // 添加文件
    files.push({
      path: relativePath,
      type: 'registry:hook',
      target: targetPath
    });

    // 收集所有依赖
    npmDependencies.forEach(dep => allDependencies.add(dep));
  }

  // 创建单个 hooks 组件
  const hooksItem: Registry["items"][0] = {
    name: 'hooks',
    type: 'registry:hook',
    description: 'React hooks collection',
    files: files.sort((a, b) => a.path.localeCompare(b.path)),
    dependencies: Array.from(allDependencies).sort()
  };

  console.log(`✅ Generated hooks configuration with ${files.length} files`);

  return [hooksItem];
}

/**
 * Write registry file
 */
async function writeRegistryFile(filename: string, items: Registry["items"]): Promise<void> {
  const content = `import { type Registry } from "shadcn/registry";

// This file is auto-generated by scripts/build-registry.mts
// Do not edit this file manually
export const ${filename.replace(/\.ts$/, "").replace(/-/g, "_")}: Registry["items"] = ${JSON.stringify(items, null, 2)};
`;

  await fs.writeFile(path.join(process.cwd(), `registry/${filename}`), content);
  console.log(`✅ Generated ${filename}`);
}

/**
 * Generate all registry files automatically
 */
async function generateAllRegistryFiles(): Promise<{
  ui: Registry["items"];
  examples: Registry["items"];
  lib: Registry["items"];
  hooks: Registry["items"];
}> {
  console.log('🚀 Starting automatic registry generation...');

  try {
    const [ui, examples, lib, hooks] = await Promise.all([
      generateRegistryUI(),
      generateRegistryExamples(),
      generateRegistryLib(),
      generateRegistryHooks()
    ]);

    // 写入文件
    await Promise.all([
      writeRegistryFile("registry-ui.ts", ui),
      writeRegistryFile("registry-examples.ts", examples),
      writeRegistryFile("registry-lib.ts", lib),
      writeRegistryFile("registry-hooks.ts", hooks),
    ]);

    console.log('✅ All registry files generated successfully');
    return { ui, examples, lib, hooks };
  } catch (error) {
    console.error('❌ Failed to generate registry files:', error);
    throw error;
  }
}

// =============================================================================
// REGISTRY BUILDING
// =============================================================================

/**
 * Build the registry index file
 */
async function buildRegistryIndex(registry: Registry): Promise<void> {
  let index = `/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
// This file is autogenerated by scripts/build-registry.ts
// Do not edit this file directly.
import * as React from "react"

export const Index: Record<string, any> = {`;

  for (const item of registry.items) {
    const resolveFiles = item.files?.map((file) => `${file.path}`);
    if (!resolveFiles) continue;

    const componentPath = item.files?.[0]?.path ? `@/${item.files[0].path}` : "";

    index += `
  "${item.name}": {
    name: "${item.name}",
    title: "${item.title ?? item.name}",
    description: "${item.description ?? ""}",
    type: "${item.type}",
    registryDependencies: ${JSON.stringify(item.registryDependencies)},
    files: [${item.files?.map((file) => {
      const filePath = `${typeof file === "string" ? file : file.path}`;
      const resolvedFilePath = path.resolve(filePath);
      return typeof file === "string"
        ? `"${resolvedFilePath}"`
        : `{
      path: "${filePath}",
      type: "${file.type}",
      target: "${file.target ?? ""}"
    }`;
    })}],
    component: ${componentPath
        ? `React.lazy(async () => {
      const mod = await import("${componentPath}")
      const exportName = Object.keys(mod).find(key => typeof mod[key] === 'function' || typeof mod[key] === 'object') || item.name
      return { default: mod.default || mod[exportName] }
    })`
        : "null"
      },
    meta: ${JSON.stringify(item.meta)},
  },`;
  }

  index += `
  }`;

  rimraf.sync(path.join(process.cwd(), "__registry__/index.tsx"));
  await fs.writeFile(path.join(process.cwd(), "__registry__/index.tsx"), index);
}

/**
 * Build the registry JSON file
 */
async function buildRegistryJsonFile(registry: Registry): Promise<void> {
  const fixedRegistry = {
    ...registry,
    "$schema": "https://ui.shadcn.com/schema/registry.json",
    items: registry.items.map((item) => {
      const files = item.files?.map((file) => ({
        ...file,
        path: `${file.path}`,
      }));

      return { ...item, files };
    }),
  };

  rimraf.sync(path.join(process.cwd(), `registry.json`));
  rimraf.sync(path.join(process.cwd(), `public/registry.json`));

  const registryJson = JSON.stringify(fixedRegistry, null, 2);

  await fs.writeFile(path.join(process.cwd(), `registry.json`), registryJson);
  await fs.writeFile(path.join(process.cwd(), `public/registry.json`), registryJson);
}

/**
 * Build the final registry using shadcn CLI
 */
async function buildRegistry(): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = exec(`npx shadcn build`);

    process.on("exit", (code) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

/**
 * Main build function
 */
async function main(): Promise<void> {
  try {
    console.log("🗂️ Building registry...");

    // Step 1: Generate all registry files
    const { ui, examples, lib, hooks } = await generateAllRegistryFiles();

    // Step 2: Build complete registry configuration
    const registry: Registry = {
      name: "shadcn",
      homepage: "https://ui.shadcn.com",
      items: z.array(registryItemSchema).parse(
        [
          {
            name: "index",
            type: "registry:style",
            title: "Index",
            dependencies: [
              "tw-animate-css",
              "class-variance-authority",
              "lucide-react",
            ],
            registryDependencies: ["utils"],
            cssVars: {},
            files: [],
          },
          ...ui,
          ...examples,
          ...lib,
          ...hooks,
        ].filter((item) => !DEPRECATED_ITEMS.includes(item.name))
      ),
    };

    // Step 3: Build registry files
    await buildRegistryIndex(registry);
    await buildRegistryJsonFile(registry);
    await buildRegistry();

    console.log("✅ Registry build completed successfully");
  } catch (error) {
    console.error("❌ Build failed:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.stack);
    }
    process.exit(1);
  }
}

// Execute main function
main();
