import { DefaultValueDisplay } from "@/registry/pivot/default-value-display";

export default function DefaultValueDisplayDemo() {
  return (
    <div className="space-y-4 min-w-md">
      <DefaultValueDisplay value="application/json" />
      <DefaultValueDisplay value={42} />
      <DefaultValueDisplay value={true} />
      <DefaultValueDisplay value={["item1", "item2", "item3"]} />
    </div>
  );
}
