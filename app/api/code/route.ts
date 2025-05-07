// filepath: /Users/princessdevaki/Desktop/Projects/niche-kit/app/api/code/route.ts
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

  // Ensure the path is relative to the project root and not trying to access files outside the project
  const fullPath = path.join(process.cwd(), filePath);

  try {
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    return NextResponse.json({ code: fileContent });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
