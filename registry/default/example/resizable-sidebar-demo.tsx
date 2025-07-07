import { ResizableSidebar } from "@/registry/default/ui/resizable-sidebar";

export default function ResizableSidebarDemo() {
  return (
    <div className="h-96 border rounded-lg overflow-hidden min-w-md">
      <ResizableSidebar
        defaultWidth={250}
        minWidth={200}
        maxWidth={400}
        className="flex"
        sidebarClassName="bg-neutral-50 dark:bg-neutral-900 border-r"
      >
        <div className="p-4 space-y-2">
          <h3 className="font-semibold">侧边栏</h3>
          <p className="text-sm text-muted-foreground">拖拽右边缘调整宽度</p>
          <div className="space-y-1">
            <div className="p-2 bg-white dark:bg-neutral-800 rounded text-sm">
              菜单项 1
            </div>
            <div className="p-2 bg-white dark:bg-neutral-800 rounded text-sm">
              菜单项 2
            </div>
            <div className="p-2 bg-white dark:bg-neutral-800 rounded text-sm">
              菜单项 3
            </div>
          </div>
        </div>
      </ResizableSidebar>
      <div className="flex-1 p-4">
        <h3 className="font-semibold mb-2">主内容区域</h3>
        <p className="text-sm text-muted-foreground">
          这是主内容区域。左侧的侧边栏可以通过拖拽调整宽度。
        </p>
      </div>
    </div>
  );
}
