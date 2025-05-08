import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { blocks } from "@/data/blocks";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const requestedPath = searchParams.get("path");

  if (!requestedPath) {
    return NextResponse.json(
      { error: "No file path provided" },
      { status: 400 }
    );
  }

  try {
    const block = blocks.find((b) => b.filePath === requestedPath);

    if (!block || !block.filePath) {
      console.error(`Block not found for path: ${requestedPath}`);
      return NextResponse.json(
        { error: "File path not found in blocks data" },
        { status: 404 }
      );
    }

    const filePath = block.filePath;

    const baseDir = process.cwd();
    const fullPath = path.join(baseDir, filePath);

    if (path.relative(baseDir, fullPath).startsWith("..")) {
      console.error(
        `Security violation: Attempted to access file outside project directory: ${filePath}`
      );
      return NextResponse.json(
        { error: "Access denied: Invalid file path" },
        { status: 403 }
      );
    }

    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return NextResponse.json(
        {
          error: "File not found",
          details: `Block found in data, but file not found at path: ${filePath}`,
        },
        { status: 404 }
      );
    }

    const stats = fs.statSync(fullPath);
    if (!stats.isFile()) {
      console.error(`Not a file: ${fullPath}`);
      return NextResponse.json({ error: "Not a file" }, { status: 400 });
    }

    const fileContent = fs.readFileSync(fullPath, "utf-8");
    return NextResponse.json({ code: fileContent });
  } catch (error) {
    console.error(`Error processing file request for ${requestedPath}:`, error);
    console.error(`Working directory: ${process.cwd()}`);
    console.error(`Environment: ${process.env.NODE_ENV}`);

    return NextResponse.json(
      {
        error: "Failed to read file",
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
