"use client";

import { MediaTypeSelector } from "@/registry/default/ui/media-type-selector";
import { useState } from "react";

export default function MediaTypeSelectorDemo() {
  const [selectedMediaTypes, setSelectedMediaTypes] = useState<
    Record<string, string | null>
  >({
    apiResponse: null,
    fileUpload: null,
    imageProcessing: null,
    documentExport: null,
    dataExchange: null,
    contentManagement: null,
    paymentProcessing: null,
    realtime: null,
    multimedia: null,
    archive: null,
  });
  // API 响应媒体类型
  const apiResponseMediaTypes = [
    "application/json",
    "application/xml",
    "text/plain",
  ];

  // 文件上传媒体类型
  const fileUploadMediaTypes = [
    "multipart/form-data",
    "application/json",
    "application/octet-stream",
  ];

  // 图像处理媒体类型
  const imageProcessingMediaTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ];

  // 文档导出媒体类型
  const documentExportMediaTypes = [
    "application/json",
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/pdf",
    "text/plain",
  ];

  // 数据交换媒体类型
  const dataExchangeMediaTypes = [
    "application/json",
    "application/xml",
    "application/yaml",
    "text/csv",
    "application/x-protobuf",
  ];

  // 内容管理媒体类型
  const contentManagementMediaTypes = [
    "application/json",
    "text/html",
    "text/markdown",
    "text/plain",
    "application/xml",
  ];

  // 支付处理媒体类型
  const paymentProcessingMediaTypes = [
    "application/json",
    "application/x-www-form-urlencoded",
    "text/plain",
  ];

  // 实时通信媒体类型
  const realtimeMediaTypes = [
    "application/json",
    "text/plain",
    "application/octet-stream",
  ];

  // 多媒体内容媒体类型
  const multimediaMediaTypes = [
    "video/mp4",
    "video/webm",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "image/jpeg",
    "image/png",
  ];

  // 压缩文件媒体类型
  const archiveMediaTypes = [
    "application/zip",
    "application/x-tar",
    "application/gzip",
    "application/x-7z-compressed",
    "application/x-rar-compressed",
  ];

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">API 响应媒体类型选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          标准 API 响应支持的媒体类型，包含 JSON、XML 和纯文本格式
        </p>
        <MediaTypeSelector
          mediaTypes={apiResponseMediaTypes}
          activeMediaType={selectedMediaTypes.apiResponse || null}
          onSelectMediaType={(type) =>
            setSelectedMediaTypes((prev) => ({ ...prev, apiResponse: type }))
          }
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件上传媒体类型选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传接口支持的媒体类型，包含表单数据和二进制流
        </p>
        <MediaTypeSelector
          mediaTypes={fileUploadMediaTypes}
          activeMediaType={selectedMediaTypes.fileUpload || null}
          onSelectMediaType={(type) =>
            setSelectedMediaTypes((prev) => ({ ...prev, fileUpload: type }))
          }
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">图像处理媒体类型选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          图像处理 API 支持的图片格式，包含常见的 Web 图像格式
        </p>
        <MediaTypeSelector
          mediaTypes={imageProcessingMediaTypes}
          activeMediaType={selectedMediaTypes.imageProcessing || null}
          onSelectMediaType={(type) =>
            setSelectedMediaTypes((prev) => ({
              ...prev,
              imageProcessing: type,
            }))
          }
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文档导出媒体类型选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          数据导出功能支持的文档格式，包含 Excel、PDF、CSV 等
        </p>
        <MediaTypeSelector
          mediaTypes={documentExportMediaTypes}
          activeMediaType={selectedMediaTypes.documentExport || null}
          onSelectMediaType={(type) =>
            setSelectedMediaTypes((prev) => ({ ...prev, documentExport: type }))
          }
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据交换媒体类型选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          系统间数据交换支持的格式，包含结构化和二进制数据
        </p>
        <MediaTypeSelector
          mediaTypes={dataExchangeMediaTypes}
          activeMediaType={selectedMediaTypes.dataExchange || null}
          onSelectMediaType={(type) =>
            setSelectedMediaTypes((prev) => ({ ...prev, dataExchange: type }))
          }
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">内容管理媒体类型选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          内容管理系统支持的内容格式，包含 HTML、Markdown 等
        </p>
        <MediaTypeSelector
          mediaTypes={contentManagementMediaTypes}
          activeMediaType={selectedMediaTypes.contentManagement || null}
          onSelectMediaType={(type) =>
            setSelectedMediaTypes((prev) => ({
              ...prev,
              contentManagement: type,
            }))
          }
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付处理媒体类型选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付接口支持的数据格式，包含 JSON 和表单编码格式
        </p>
        <MediaTypeSelector
          mediaTypes={paymentProcessingMediaTypes}
          activeMediaType={selectedMediaTypes.paymentProcessing || null}
          onSelectMediaType={(type) =>
            setSelectedMediaTypes((prev) => ({
              ...prev,
              paymentProcessing: type,
            }))
          }
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">实时通信媒体类型选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          WebSocket 和实时通信支持的数据格式
        </p>
        <MediaTypeSelector
          mediaTypes={realtimeMediaTypes}
          activeMediaType={selectedMediaTypes.realtime || null}
          onSelectMediaType={(type) =>
            setSelectedMediaTypes((prev) => ({ ...prev, realtime: type }))
          }
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">多媒体内容媒体类型选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          多媒体处理 API 支持的音视频和图像格式
        </p>
        <MediaTypeSelector
          mediaTypes={multimediaMediaTypes}
          activeMediaType={selectedMediaTypes.multimedia || null}
          onSelectMediaType={(type) =>
            setSelectedMediaTypes((prev) => ({ ...prev, multimedia: type }))
          }
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">压缩文件媒体类型选择</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件压缩和归档功能支持的压缩格式
        </p>
        <MediaTypeSelector
          mediaTypes={archiveMediaTypes}
          activeMediaType={selectedMediaTypes.archive || null}
          onSelectMediaType={(type) =>
            setSelectedMediaTypes((prev) => ({ ...prev, archive: type }))
          }
        />
      </div>
    </div>
  );
}
