"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
  onThemeChange?: (theme: "light" | "dark") => void;
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, onThemeChange }, ref) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    // 初始化主题
    useEffect(() => {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);
      document.documentElement.classList.toggle(
        "dark",
        initialTheme === "dark",
      );
    }, []);

    const toggleTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      onThemeChange?.(newTheme);
    };

    return (
      <button
        ref={ref}
        onClick={toggleTheme}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
          "disabled:pointer-events-none disabled:opacity-50",
          "h-9 w-9",
          className,
        )}
        aria-label="Toggle theme"
      >
        <Sun className="size-[1.2rem] text-neutral-800 dark:hidden dark:text-neutral-200" />
        <Moon className="hidden size-[1.2rem] text-neutral-800 dark:block dark:text-neutral-200" />
      </button>
    );
  },
);

ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };
