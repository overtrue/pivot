"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface ResizableSidebarProps {
  children: React.ReactNode;
  className?: string;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  sidebarClassName?: string;
  onWidthChange?: (width: number) => void;
  stickyPosition?: boolean; // 是否启用粘性定位
  topOffset?: string; // 粘性定位的顶部偏移量，例如 "0px"
}

const ResizableSidebar = React.forwardRef<
  HTMLDivElement,
  ResizableSidebarProps
>(
  (
    {
      children,
      className,
      defaultWidth = 280,
      minWidth = 280,
      maxWidth = 350,
      sidebarClassName,
      onWidthChange,
      stickyPosition = true, // 默认启用粘性定位
      topOffset = "0px", // 默认顶部偏移量为0
    },
    ref,
  ) => {
    const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
    const [isDragging, setIsDragging] = useState(false);

    const sidebarRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    // Combine refs
    useEffect(() => {
      if (typeof ref === "function") {
        ref(rootRef.current);
      } else if (ref) {
        ref.current = rootRef.current;
      }
    }, [ref]);

    // 初始化 CSS 变量
    useEffect(() => {
      if (rootRef.current) {
        rootRef.current.style.setProperty(
          "--sidebar-width",
          `${sidebarWidth}px`,
        );
      }
    }, [sidebarWidth]);

    // 开始拖动
    const startDragging = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    // 处理拖动过程
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !rootRef.current) return;

        // 计算新宽度
        let newWidth = e.clientX;

        // 限制宽度范围
        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;

        // 直接更新 CSS 变量，避免 React 状态更新引起重新渲染
        rootRef.current.style.setProperty("--sidebar-width", `${newWidth}px`);
      };

      const handleMouseUp = () => {
        if (isDragging && rootRef.current) {
          // 获取当前 CSS 变量值并更新 React 状态
          const currentWidth =
            rootRef.current.style.getPropertyValue("--sidebar-width");
          const numWidth = parseInt(currentWidth, 10);
          if (!isNaN(numWidth)) {
            setSidebarWidth(numWidth);
            onWidthChange?.(numWidth);
          }
        }
        setIsDragging(false);
      };

      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, minWidth, maxWidth, onWidthChange]);

    return (
      <div
        ref={rootRef}
        className={cn(className, isDragging && "select-none cursor-ew-resize")}
      >
        <div
          ref={sidebarRef}
          className={cn(
            "flex-shrink-0 relative",
            stickyPosition && "sticky top-0 h-screen",
            sidebarClassName,
          )}
          style={{
            width: "var(--sidebar-width)",
            top: stickyPosition ? topOffset : undefined,
          }}
        >
          {children}

          {/* 调整大小手柄 */}
          <div
            className="absolute top-0 right-0 bottom-0 w-1 bg-transparent hover:bg-neutral-400 dark:hover:bg-neutral-500 cursor-ew-resize z-10 transition-colors"
            onMouseDown={startDragging}
          />
        </div>
      </div>
    );
  },
);

ResizableSidebar.displayName = "ResizableSidebar";

export { ResizableSidebar, type ResizableSidebarProps };
