import { ParameterName } from "@/registry/pivot/parameter-name";

export default function ParameterNameDemo() {
  return (
    <div className="space-y-2 min-w-md">
      <ParameterName name="userId" />
      <ParameterName name="email" />
      <ParameterName name="oldField" deprecated={true} />
      <ParameterName name="apiKey" />
    </div>
  );
}
