import { ValueDisplay } from "@/registry/default/ui/value-display";

export default function ValueDisplayDemo() {
  const values = [
    { label: "字符串", value: "Hello World" },
    { label: "数字", value: 42 },
    { label: "布尔值", value: true },
    { label: "数组", value: [1, 2, 3, "test"] },
    { label: "对象", value: { name: "张三", age: 25, active: true } },
    { label: "空值", value: null },
    { label: "未定义", value: undefined },
    { label: "长字符串", value: "这是一个很长的字符串，用来测试组件如何处理长文本内容的显示效果" }
  ];

  return (
    <div className="space-y-4 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">不同类型的值</h4>
        <div className="space-y-2">
          {values.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-sm text-muted-foreground w-16 flex-shrink-0">
                {item.label}:
              </span>
              <ValueDisplay value={item.value} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">自定义样式</h4>
        <div className="space-y-2">
          <ValueDisplay
            value="自定义背景色"
            className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
          />
          <ValueDisplay
            value="自定义边框"
            className="border border-green-300 bg-green-50 dark:bg-green-900/20"
          />
        </div>
      </div>
    </div>
  );
}
