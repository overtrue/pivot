import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const exampleDir = path.join(process.cwd(), "registry", "default", "example");
    const files = await fs.readdir(exampleDir);

    // 过滤出 demo 组件文件，保留完整的组件名称
    const demoComponents = files
      .filter(file => file.endsWith("-demo.tsx"))
      .map(file => file.replace(".tsx", ""))
      .sort();

    return NextResponse.json({
      components: demoComponents,
      count: demoComponents.length
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read demo components" },
      { status: 500 }
    );
  }
}
