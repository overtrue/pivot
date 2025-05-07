import { LoadingSpinner } from './LoadingSpinner';
import { RequestBodyInput } from './RequestBodyInput';
import { ResponseDisplay } from './ResponseDisplay';

// ... existing code ...

// 修改主容器布局
<div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">

  // 参数输入区域
  <div className="w-full md:w-1/2 space-y-4">
    {/* 参数输入控件 */}
  </div>

  // 响应显示区域
  <div className="w-full md:w-1/2">
    {isLoading ? <LoadingSpinner /> : response && <ResponseDisplay response={response} />}
  </div>
</div>

// 替换原有的 renderResponse 和 renderRequestBody 调用
{ response && <ResponseDisplay response={response} /> }
{ renderRequestBody() && <RequestBodyInput requestBody={resolveRequestBody()} value={requestBodyValue} onChange={handleRequestBodyChange} /> }

// 替换原有的加载状态显示
{ isLoading && <LoadingSpinner /> }
