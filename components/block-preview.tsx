"use client";

import * as React from "react";
import {
  Copy,
  TabletIcon,
  Laptop,
  Maximize2,
  Smartphone,
  SquareTerminalIcon,
} from "lucide-react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

import { cn } from "@/lib/utils";
import CodeBlock from "./code-block";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface BlockPreviewProps {
  title?: string;
  preview: React.ReactNode;
  code?: string;
  slug: string;
  filePath?: string;
  category?: string;
}

export function BlockPreview({
  title,
  preview,
  code: initialCode,
  slug,
  filePath,
  category,
}: BlockPreviewProps) {
  const [view, setView] = React.useState<"preview" | "code">("preview");
  const [device, setDevice] = React.useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  const [codeCopied, setCodeCopied] = React.useState(false);
  const [commandCopied, setCommandCopied] = React.useState(false);
  const [codeTooltipOpen, setCodeTooltipOpen] = React.useState(false);
  const [commandTooltipOpen, setCommandTooltipOpen] = React.useState(false);

  const [packageManager, setPackageManager] = React.useState<
    "pnpm" | "npm" | "yarn" | "bun"
  >("pnpm");
  const [previewWidth, setPreviewWidth] = React.useState(100);
  const [code, setCode] = React.useState<string | null>(initialCode || null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (view === "code" && !initialCode && filePath && !code) {
      setIsLoading(true);
    }
  }, [view, initialCode, filePath, code]);

  React.useEffect(() => {
    async function fetchCode() {
      if (!initialCode && filePath && view === "code" && !code) {
        try {
          const response = await fetch(
            `/api/code?path=${encodeURIComponent(filePath)}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch code: ${response.status}`);
          }

          const data = await response.json();
          setCode(data.code);
        } catch (error) {
          console.error("Error fetching code:", error);
          setCode("// Error loading code");
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchCode();
  }, [initialCode, filePath, view, code]);

  const copyCodeToClipboard = React.useCallback(() => {
    if (typeof navigator !== "undefined" && code) {
      navigator.clipboard.writeText(code).then(() => {
        setCodeCopied(true);
        setCodeTooltipOpen(true);

        setTimeout(() => {
          setCodeCopied(false);
          setCodeTooltipOpen(false);
        }, 2000);
      });
    }
  }, [code]);

  const copyCommandToClipboard = React.useCallback(() => {
    if (typeof navigator !== "undefined") {
      const baseCmd = {
        pnpm: "pnpm dlx shadcn@latest add",
        npm: "npx shadcn@latest add",
        yarn: "yarn dlx shadcn@latest add",
        bun: "bunx --bun shadcn@latest add",
      };

      const textToCopy = `${baseCmd[packageManager]} https://niche-kit.vercel.app/r/${slug}.json`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        setCommandCopied(true);
        setCommandTooltipOpen(true);

        setTimeout(() => {
          setCommandCopied(false);
          setCommandTooltipOpen(false);
        }, 2000);
      });
    }
  }, [packageManager, slug]);

  const getPreviewWidth = () => {
    switch (device) {
      case "mobile":
        return `w-full max-w-[375px]`;
      case "tablet":
        return `w-full max-w-[768px]`;
      case "desktop":
        return `w-full max-w-[${previewWidth}%]`;
      default:
        return `w-full`;
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden w-full flex flex-col gap-4 py-4 border-t border-dashed"
      )}
    >
      <div className="flex flex-col gap-2 pt-8">
        <h2>{title}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tabs
              defaultValue="preview"
              onValueChange={(value) => setView(value as "preview" | "code")}
            >
              <TabsList className="grid-cols-2">
                <TabsTrigger value="preview" className="text-xs">
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="text-xs">
                  Code
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {view === "preview" && (
              <div className="hidden md:flex md:items-center md:gap-2">
                <Separator orientation="vertical" />
                <ToggleGroup
                  type="single"
                  value={device}
                  onValueChange={(value) => {
                    if (value) {
                      const newDevice = value as
                        | "mobile"
                        | "tablet"
                        | "desktop";
                      setDevice(newDevice);
                      if (newDevice === "desktop") {
                        setPreviewWidth(100);
                      }
                    }
                  }}
                >
                  <ToggleGroupItem value="mobile" size="sm" className="px-2">
                    <Smartphone className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="tablet" size="sm" className="px-2">
                    <TabletIcon className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="desktop" size="sm" className="px-2">
                    <Laptop className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {view === "preview" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <Link href={preview as string} target="_blank">
                        <Maximize2 className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View fullscreen</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {view === "code" && (
              <TooltipProvider>
                <Tooltip
                  open={codeTooltipOpen}
                  onOpenChange={setCodeTooltipOpen}
                >
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={copyCodeToClipboard}
                      disabled={isLoading}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {codeCopied ? "Copied!" : "Copy code"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Link
                      href={`https://v0.dev/chat/api/open?url=https://niche-kit.vercel.app/r/${slug}.json`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        sendGAEvent("event", "open_in_v0", {
                          block_title: title,
                          block_category: category,
                        })
                      }
                    >
                      <svg
                        viewBox="0 0 40 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 text-current"
                      >
                        <path
                          d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open in v0</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      {view === "preview" ? (
        <ResizablePanelGroup direction="horizontal" className="min-h-[800px]">
          <ResizablePanel
            defaultSize={100}
            minSize={30}
            className={cn(getPreviewWidth())}
            onResize={(size) => {
              if (device === "desktop") {
                setPreviewWidth(size);
              }
            }}
          >
            <div
              className={cn("h-full w-full border border-dashed rounded-xl")}
            >
              <iframe
                src={preview as string}
                className={cn(
                  "transition-all duration-200 h-full w-full rounded-xl"
                )}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center p-8 border border-dashed rounded-xl min-h-[400px]">
              <p className="text-muted-foreground">Loading code...</p>
            </div>
          ) : code === null ? (
            <div className="flex items-center justify-center p-8 border border-dashed rounded-xl min-h-[400px]">
              <p className="text-muted-foreground">No code available</p>
            </div>
          ) : (
            <CodeBlock code={code} lang="tsx" />
          )}
        </div>
      )}
      <div>
        <Tabs
          defaultValue="pnpm"
          className="h-full"
          onValueChange={(value) =>
            setPackageManager(value as "pnpm" | "npm" | "yarn" | "bun")
          }
        >
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="pnpm" className="text-xs">
                pnpm
              </TabsTrigger>
              <TabsTrigger value="npm" className="text-xs">
                npm
              </TabsTrigger>
              <TabsTrigger value="yarn" className="text-xs">
                yarn
              </TabsTrigger>
              <TabsTrigger value="bun" className="text-xs">
                bun
              </TabsTrigger>
            </TabsList>
          </div>
          <TooltipProvider>
            <Tooltip
              open={commandTooltipOpen}
              onOpenChange={setCommandTooltipOpen}
            >
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="border border-dashed w-fit font-mono text-muted p-2 rounded-lg text-xs"
                  onClick={copyCommandToClipboard}
                >
                  <TabsContent value="pnpm" className="">
                    <pre className="language-bash">
                      <code className="text-foreground flex items-center gap-2">
                        <SquareTerminalIcon className="h-4 w-4" />
                        pnpm dlx shadcn@latest add{" "}
                        {`https://niche-kit.vercel.app/r/${slug}.json`}
                      </code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="npm" className="">
                    <pre className="language-bash">
                      <code className="text-foreground flex items-center gap-2">
                        <SquareTerminalIcon className="h-4 w-4" />
                        npx shadcn@latest add{" "}
                        {`https://niche-kit.vercel.app/r/${slug}.json`}
                      </code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="yarn" className="">
                    <pre className="language-bash">
                      <code className="text-foreground flex items-center gap-2">
                        <SquareTerminalIcon className="h-4 w-4" />
                        yarn dlx shadcn@latest add{" "}
                        {`https://niche-kit.vercel.app/r/${slug}.json`}
                      </code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="bun" className="">
                    <pre className="language-bash">
                      <code className="text-foreground flex items-center gap-2">
                        <SquareTerminalIcon className="h-4 w-4" />
                        bunx --bun shadcn@latest add{" "}
                        {`https://niche-kit.vercel.app/r/${slug}.json`}
                      </code>
                    </pre>
                  </TabsContent>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {commandCopied ? "Copied!" : "Click to copy"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Tabs>
      </div>
    </div>
  );
}
