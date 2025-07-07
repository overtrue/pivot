import { MediaTypeDisplay } from "@/registry/default/ui/media-type-display";

export default function MediaTypeDisplayDemo() {
  const mediaTypes = [
    "application/json",
    "application/xml",
    "text/plain",
    "text/html",
    "multipart/form-data",
    "application/octet-stream",
    "image/png",
    "video/mp4",
    "application/pdf"
  ];

  return (
    <div className="space-y-4 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-2">常见媒体类型</h4>
        <div className="flex flex-wrap gap-2">
          {mediaTypes.map((type) => (
            <MediaTypeDisplay key={type} mediaType={type} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">自定义样式</h4>
        <div className="flex flex-wrap gap-2">
          <MediaTypeDisplay
            mediaType="application/json"
            className="border border-green-300"
          />
          <MediaTypeDisplay
            mediaType="application/xml"
            className="border border-orange-300"
          />
        </div>
      </div>
    </div>
  );
}
