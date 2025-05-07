"use client";

import * as React from "react";
import {
  Copy,
  TabletIcon,
  Laptop,
  Maximize2,
  Smartphone,
  Sparkles,
  SquareTerminalIcon,
} from "lucide-react";
import Link from "next/link";

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
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface BlockPreviewProps {
  title?: string;
  preview: React.ReactNode;
  code: string;
}

export function BlockPreview({ title, preview, code }: BlockPreviewProps) {
  const [view, setView] = React.useState<"preview" | "code">("preview");
  const [device, setDevice] = React.useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [copied, setCopied] = React.useState(false);
  const previewWidth = React.useState(100);

  const copyToClipboard = React.useCallback(() => {
    if (typeof navigator !== "undefined") {
      const textToCopy =
        view === "code" ? code : `pnpm dlx shadcn@latest add button`;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [code, view]);

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
      <div className="flex flex-col gap-2">
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
              <>
                <Separator orientation="vertical" />
                <ToggleGroup
                  type="single"
                  value={device}
                  onValueChange={(value) => {
                    if (value)
                      setDevice(value as "mobile" | "tablet" | "desktop");
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
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {view === "preview" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {copied ? "Copied!" : "Copy code"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <Button variant="secondary" size="sm" className="h-8 gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Open in v0</span>
            </Button>
          </div>
        </div>
      </div>
      {view === "preview" ? (
        <ResizablePanelGroup direction="horizontal" className="min-h-[400px]">
          <ResizablePanel
            defaultSize={99}
            minSize={30}
            className={cn(getPreviewWidth())}
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
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={1}></ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <CodeBlock code={code as string} lang="tsx" />
      )}
      <div>
        <Tabs defaultValue="pnpm" className="h-full">
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
          <div className="border border-dashed w-fit text-muted p-2 rounded-lg text-xs">
            <TabsContent value="pnpm" className="">
              <pre className="language-bash">
                <code className="text-foreground flex items-center gap-2">
                  <SquareTerminalIcon className="h-4 w-4" />
                  pnpm dlx shadcn@latest add button
                </code>
              </pre>
            </TabsContent>
            <TabsContent value="npm" className="">
              <pre className="language-bash">
                <code className="text-foreground flex items-center gap-2">
                  <SquareTerminalIcon className="h-4 w-4" />
                  npx shadcn@latest add button
                </code>
              </pre>
            </TabsContent>
            <TabsContent value="yarn" className="">
              <pre className="language-bash">
                <code className="text-foreground flex items-center gap-2">
                  <SquareTerminalIcon className="h-4 w-4" />
                  yarn dlx shadcn-ui@latest add button
                </code>
              </pre>
            </TabsContent>
            <TabsContent value="bun" className="">
              <pre className="language-bash">
                <code className="text-foreground flex items-center gap-2">
                  <SquareTerminalIcon className="h-4 w-4" />
                  bunx shadcn-ui@latest add button
                </code>
              </pre>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
