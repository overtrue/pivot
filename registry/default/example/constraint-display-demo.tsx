import { ConstraintDisplay } from "@/registry/default/ui/constraint-display";

export default function ConstraintDisplayDemo() {
  const schema = {
    minLength: 1,
    maxLength: 100,
    minimum: 0,
    maximum: 999,
    pattern: "^[a-zA-Z0-9]+$",
    minItems: 1,
    maxItems: 10,
    uniqueItems: true,
    multipleOf: 5,
  };

  return (
    <div className="space-y-4 min-w-md">
      <ConstraintDisplay schema={schema} />
    </div>
  );
}
