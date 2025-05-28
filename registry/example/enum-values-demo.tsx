import { EnumValues } from "@/registry/pivot/enum-values";

export default function EnumValuesDemo() {
  const values = ["active", "inactive", "pending", "archived"];

  return (
    <div className="space-y-4 min-w-md">
      <EnumValues values={values} />
    </div>
  );
}
