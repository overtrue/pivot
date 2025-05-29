"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";

const versions = {
  v3: "https://v3.pivotkit.vercel.app",
  v4: "https://pivotkit.vercel.app",
};

export function VersionSelect() {
  const [version, setVersion] = React.useState<keyof typeof versions>("v4");

  const handleVersionChange = (value: keyof typeof versions) => {
    setVersion(value);
    window.location.href = versions[value];
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-7 w-14 cursor-pointer items-center justify-between rounded-full border border-muted-foreground/20 bg-muted py-1 pl-2 pr-0.5 text-sm font-medium text-muted-foreground">
        {version}
        <div className="flex size-5 items-center justify-center rounded-full border border-muted-foreground/20">
          <ChevronDownIcon className="size-4 opacity-50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => handleVersionChange("v3")}
          className={cn(
            "flex justify-between",
            version === "v3" && "bg-muted text-primary",
          )}
        >
          Tailwind v3
          {version === "v3" && <CheckIcon className="ml-2 size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleVersionChange("v4")}
          className={cn(
            "flex justify-between",
            version === "v4" && "bg-muted text-primary",
          )}
        >
          Tailwind v4
          {version === "v4" && <CheckIcon className="ml-2 size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
