"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function SiteHeader() {
  return (
    <header className="w-full bg-transparent">
      <div className="flex px-4 md:px-32 h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="inline-block font-semibold text-xl">
              Niche-kit
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <ThemeToggle />
          <Button size="sm" variant="outline" asChild>
            <Link
              href="https://github.com/Vi-obb/niche-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <GitHubLogoIcon className="h-4 w-4" />
              <span>Vi-obb/niche-kit</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
