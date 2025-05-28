import { RequiredBadge } from "@/registry/pivot/required-badge";

export default function RequiredBadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2 min-w-md">
      <RequiredBadge />
      <RequiredBadge>必填</RequiredBadge>
      <RequiredBadge>Required Field</RequiredBadge>
    </div>
  );
}
