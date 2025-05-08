import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json(
      { error: "No file path provided" },
      { status: 400 }
    );
  }

  try {
    // Normalize the file path to prevent directory traversal attacks
    const normalizedPath = path
      .normalize(filePath)
      .replace(/^(\.\.(\/|\\|$))+/, "");

    // Determine the base directory - in production it might be different
    const baseDir = process.cwd();
    const fullPath = path.join(baseDir, normalizedPath);

    // Safety check: Make sure the file is within the project directory
    if (path.relative(baseDir, fullPath).startsWith("..")) {
      console.error(
        `Security violation: Attempted to access file outside project directory: ${filePath}`
      );
      return NextResponse.json(
        { error: "Access denied: Invalid file path" },
        { status: 403 }
      );
    }

    // Check if file exists before trying to read it
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Check if path points to a file, not a directory
    const stats = fs.statSync(fullPath);
    if (!stats.isFile()) {
      console.error(`Not a file: ${fullPath}`);
      return NextResponse.json({ error: "Not a file" }, { status: 400 });
    }

    const fileContent = fs.readFileSync(fullPath, "utf-8");
    return NextResponse.json({ code: fileContent });
  } catch (error) {
    // Enhanced error logging
    console.error(`Error processing file request for ${filePath}:`, error);
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
