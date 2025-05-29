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
          "flex items-center px-3 py-1.5 text-sm text-white hover:bg-neutral-600 dark:hover:bg-neutral-700 transition-colors rounded-md",
          className,
        )}
        aria-label="Toggle Theme"
      >
        {theme === "light" ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </button>
    );
  },
);

ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };
