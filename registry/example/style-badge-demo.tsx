import { StyleBadge } from "@/registry/pivot/style-badge";

export default function StyleBadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2 min-w-md">
      <StyleBadge style="form" />
      <StyleBadge style="simple" />
      <StyleBadge style="matrix" />
      <StyleBadge style="label" />
      <StyleBadge style="spaceDelimited" />
      <StyleBadge style="pipeDelimited" />
      <StyleBadge style="deepObject" />
    </div>
  );
}
