import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import TypeIndicator from '@/components/atoms/type/TypeIndicator';
import FormatBadge from '@/components/atoms/type/FormatBadge';
import ExpandCollapse from '@/components/atoms/interaction/ExpandCollapse';

interface ResponseObjectProps {
  code: string;
  response: {
    description?: string;
    content?: Record<string, {
      schema?: any;
      examples?: Record<string, {
        value: any;
        summary?: string;
      }>;
    }>;
    headers?: Record<string, {
      description?: string;
      schema?: any;
      required?: boolean;
    }>;
  };
}

// 状态码颜色映射
const statusCodeColors: Record<string, string> = {
  '1': 'bg-blue-500',     // 信息
  '2': 'bg-green-500',    // 成功
  '3': 'bg-yellow-500',   // 重定向
  '4': 'bg-orange-500',   // 客户端错误
  '5': 'bg-red-500',      // 服务器错误
  'default': 'bg-gray-500' // 默认
};

// 获取状态码对应的颜色
const getStatusCodeColor = (code: string): string => {
  if (code === 'default') return statusCodeColors.default;
  return statusCodeColors[code[0]] || statusCodeColors.default;
};

const ResponseObject: React.FC<ResponseObjectProps> = ({ code, response }) => {
  const { description, content, headers } = response;
  const statusColor = getStatusCodeColor(code);

  return (
    <Card className="mb-4 border-l-4" style={{
      borderLeftColor: statusColor.replace('bg-', 'rgb(var(--'))
      .replace('-500', '))')
    }}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Badge className={`${statusColor} text-white`}>{code}</Badge>
          <CardTitle className="text-base font-medium">
            {description || '没有描述'}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        {headers && Object.keys(headers).length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">响应头</h4>
            <div className="space-y-2">
              {Object.entries(headers).map(([name, header]) => (
                <div key={name} className="bg-muted p-2 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{name}</span>
                    {header.required && (
                      <Badge variant="destructive" className="text-xs">必需</Badge>
                    )}
                    {header.schema && (
                      <TypeIndicator schema={header.schema} />
                    )}
                  </div>
                  {header.description && (
                    <p className="text-sm text-muted-foreground mt-1">{header.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {content && Object.keys(content).length > 0 ? (
          <Tabs defaultValue={Object.keys(content)[0]}>
            <TabsList className="mb-4">
              {Object.keys(content).map(mediaType => (
                <TabsTrigger key={mediaType} value={mediaType}>
                  {mediaType}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(content).map(([mediaType, mediaContent]) => (
              <TabsContent key={mediaType} value={mediaType}>
                {mediaContent.schema && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">响应模式</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <TypeIndicator schema={mediaContent.schema} />
                        {mediaContent.schema.format && (
                          <FormatBadge format={mediaContent.schema.format} />
                        )}
                      </div>
                      {mediaContent.schema.description && (
                        <p className="text-sm text-muted-foreground">
                          {mediaContent.schema.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {mediaContent.examples && Object.keys(mediaContent.examples).length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">响应示例</h4>
                    <div className="space-y-3">
                      {Object.entries(mediaContent.examples).map(([name, example]) => (
                        <ExpandCollapse
                          key={name}
                          title={example.summary || name}
                          defaultOpen={true}
                        >
                          <pre className="bg-muted p-3 rounded-md overflow-auto text-sm">
                            <code>{JSON.stringify(example.value, null, 2)}</code>
                          </pre>
                        </ExpandCollapse>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <p className="text-sm text-muted-foreground">此响应未定义内容格式</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ResponseObject;
