"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function SiteHeader() {
  const { resolvedTheme } = useTheme();
  const logoSrc =
    resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <header className="w-full bg-transparent">
      <div className="flex px-4 md:px-32 h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-1">
            <Image
              src={logoSrc}
              alt="Niche Kit Logo"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
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
