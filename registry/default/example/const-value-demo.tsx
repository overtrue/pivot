import { ConstValue } from "@/registry/default/ui/const-value";

export default function ConstValueDemo() {
  return (
    <div className="space-y-4 min-w-md">
      <ConstValue value="application/json" />
      <ConstValue value={42} />
      <ConstValue value={true} />
      <ConstValue value={["GET", "POST", "PUT"]} />
    </div>
  );
}
