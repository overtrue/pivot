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
          const componentName = path.basename(importPath, '.tsx').replace(/^\.\//, '');
          if (componentName && !componentName.startsWith('lib/') && !componentName.startsWith('utils/')) {
            registryDependencies.add(`${REGISTRY_BASE_URL}/${componentName}`);
          }
        }
        // Check if it's a registry component import (@/registry/pivot/...)
        else if (importPath.startsWith('@/registry/pivot/')) {
          const componentName = path.basename(importPath, '.tsx');
          if (componentName) {
            registryDependencies.add(`${REGISTRY_BASE_URL}/${componentName}`);
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

    return {
      npmDependencies: Array.from(npmDependencies),
      registryDependencies: Array.from(registryDependencies)
    };
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
 * Scans registry/pivot directory for .tsx files
 */
async function generateRegistryUI(): Promise<Registry["items"]> {
  console.log('🔍 Analyzing UI components...');

  const pivotDir = path.join(process.cwd(), 'registry/pivot');
  const files = await fs.readdir(pivotDir);
  const tsxFiles = files.filter(f => f.endsWith('.tsx'));
  const uiItems: Registry["items"] = [];

  for (const file of tsxFiles) {
    const componentName = path.basename(file, '.tsx');
    const filePath = path.join(pivotDir, file);
    const { npmDependencies, registryDependencies } = await analyzeFileDependencies(filePath);

    const item = {
      name: componentName,
      type: "registry:ui" as const,
      files: [
        {
          path: `registry/pivot/${file}`,
          type: "registry:ui" as const,
          target: `components/pivot/${file}`
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
 * Generate registry configuration for library utilities
 * Scans registry/lib directory structure
 */
async function generateRegistryLib(): Promise<Registry["items"]> {
  console.log('🔍 Analyzing library components...');

  const libDir = path.join(process.cwd(), 'registry/lib');
  let libItems: Registry["items"] = [];

  try {
    const subDirs = await fs.readdir(libDir, { withFileTypes: true });

    // Process each subdirectory (utils, hooks, etc.)
    for (const dirent of subDirs) {
      if (!dirent.isDirectory()) continue;

      const categoryName = dirent.name;
      const categoryPath = path.join(libDir, categoryName);
      const files = await fs.readdir(categoryPath);
      const tsFiles = files.filter(f => f.endsWith('.ts'));

      if (tsFiles.length === 0) continue;

      // Analyze dependencies for all files in this category
      const allDependencies = new Set<string>();
      const allRegistryDependencies = new Set<string>();

      for (const file of tsFiles) {
        const filePath = path.join(categoryPath, file);
        const { npmDependencies, registryDependencies } = await analyzeFileDependencies(filePath);

        npmDependencies.forEach(dep => allDependencies.add(dep));
        registryDependencies.forEach(dep => allRegistryDependencies.add(dep));
      }

      // Build file list
      const fileList = tsFiles.map(file => ({
        path: `registry/lib/${categoryName}/${file}`,
        type: "registry:lib" as const
      }));

      // Create registry item
      const item = {
        name: categoryName,
        type: "registry:lib" as const,
        files: fileList,
        ...(allDependencies.size > 0 && { dependencies: Array.from(allDependencies) }),
        ...(allRegistryDependencies.size > 0 && { registryDependencies: Array.from(allRegistryDependencies) })
      };

      libItems.push(item);
    }

    // Fallback: check for direct .ts files if no subdirectories found
    if (libItems.length === 0) {
      const files = await fs.readdir(libDir);
      const tsFiles = files.filter(f => f.endsWith('.ts'));

      if (tsFiles.length > 0) {
        const allDependencies = new Set<string>();
        const allRegistryDependencies = new Set<string>();

        for (const file of tsFiles) {
          const filePath = path.join(libDir, file);
          const { npmDependencies, registryDependencies } = await analyzeFileDependencies(filePath);

          npmDependencies.forEach(dep => allDependencies.add(dep));
          registryDependencies.forEach(dep => allRegistryDependencies.add(dep));
        }

        const fileList = tsFiles.map(file => ({
          path: `registry/lib/${file}`,
          type: "registry:lib" as const
        }));

        const item = {
          name: "lib",
          type: "registry:lib" as const,
          files: fileList,
          ...(allDependencies.size > 0 && { dependencies: Array.from(allDependencies) }),
          ...(allRegistryDependencies.size > 0 && { registryDependencies: Array.from(allRegistryDependencies) })
        };

        libItems.push(item);
      }
    }

  } catch (error) {
    console.warn('⚠️ Failed to scan lib directory, using fallback configuration:', error);

    // Fallback configuration
    libItems = [
      {
        name: "utils",
        type: "registry:lib" as const,
        files: [
          { path: "registry/lib/utils/index.ts", type: "registry:lib" as const },
          { path: "registry/lib/utils/schema-utils.ts", type: "registry:lib" as const },
          { path: "registry/lib/utils/type-utils.ts", type: "registry:lib" as const },
          { path: "registry/lib/utils/resolve-ref.ts", type: "registry:lib" as const },
          { path: "registry/lib/utils/generate-example.ts", type: "registry:lib" as const },
        ],
      },
      {
        name: "hooks",
        type: "registry:lib" as const,
        dependencies: ["react"],
        registryDependencies: ["resolve-ref"],
        files: [
          { path: "registry/lib/hooks/index.ts", type: "registry:lib" as const },
          { path: "registry/lib/hooks/use-operation.ts", type: "registry:lib" as const },
          { path: "registry/lib/hooks/use-schema.ts", type: "registry:lib" as const },
          { path: "registry/lib/hooks/use-openapi.ts", type: "registry:lib" as const },
        ],
      }
    ];
  }

  const content = `import { type Registry } from "shadcn/registry";

export const lib: Registry["items"] = ${JSON.stringify(libItems, null, 2)};
`;

  await fs.writeFile(path.join(process.cwd(), 'registry/registry-lib.ts'), content);
  console.log(`✅ Generated ${libItems.length} library configurations`);

  return libItems;
}

/**
 * Generate registry configuration for example components
 * Scans registry/example directory for .tsx files
 */
async function generateRegistryExamples(): Promise<Registry["items"]> {
  console.log('🔍 Analyzing example components...');

  const exampleDir = path.join(process.cwd(), 'registry/example');
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
          path: `registry/example/${file}`,
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
 * Generate all registry files automatically
 */
async function generateAllRegistryFiles(): Promise<{
  ui: Registry["items"];
  lib: Registry["items"];
  examples: Registry["items"];
}> {
  console.log('🚀 Starting automatic registry generation...');

  try {
    const [ui, lib, examples] = await Promise.all([
      generateRegistryUI(),
      generateRegistryLib(),
      generateRegistryExamples()
    ]);

    console.log('✅ All registry files generated successfully');
    return { ui, lib, examples };
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
    const process = exec(`pnpm shadcn:build`);

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
    const { ui, lib, examples } = await generateAllRegistryFiles();

    // Step 2: Build complete registry configuration
    const registry: Registry = {
      name: "shadcn",
      "$schema": "https://ui.shadcn.com/schema/registry.json",
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
