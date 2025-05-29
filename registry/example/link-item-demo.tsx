import { LinkItem } from "@/registry/pivot/link-item";

export default function LinkItemDemo() {
  // 用户相关链接
  const userProfileLink = {
    name: "getUserProfile",
    description: "获取用户详细资料信息",
    operationId: "getUserProfile",
    parameters: {
      userId: "$response.body#/id"
    }
  };

  const userOrdersLink = {
    name: "getUserOrders",
    description: "获取用户的所有订单列表",
    operationId: "getUserOrders",
    parameters: {
      userId: "$response.body#/id",
      status: "all"
    }
  };

  // 产品相关链接
  const productDetailsLink = {
    name: "getProductDetails",
    description: "获取产品的详细信息和规格",
    operationId: "getProductDetails",
    parameters: {
      productId: "$response.body#/id"
    }
  };

  const productReviewsLink = {
    name: "getProductReviews",
    description: "获取产品的用户评价和评分",
    operationId: "getProductReviews",
    parameters: {
      productId: "$response.body#/id",
      page: 1,
      limit: 20
    }
  };

  // 订单相关链接
  const orderDetailsLink = {
    name: "getOrderDetails",
    description: "获取订单的详细信息和状态",
    operationId: "getOrderDetails",
    parameters: {
      orderId: "$response.body#/id"
    }
  };

  const orderTrackingLink = {
    name: "trackOrder",
    description: "跟踪订单的物流配送状态",
    operationId: "trackOrder",
    parameters: {
      orderId: "$response.body#/id"
    }
  };

  const orderCancelLink = {
    name: "cancelOrder",
    description: "取消订单（仅限未发货状态）",
    operationId: "cancelOrder",
    parameters: {
      orderId: "$response.body#/id"
    }
  };

  // 支付相关链接
  const paymentDetailsLink = {
    name: "getPaymentDetails",
    description: "获取支付交易的详细信息",
    operationId: "getPaymentDetails",
    parameters: {
      paymentId: "$response.body#/id"
    }
  };

  const refundPaymentLink = {
    name: "refundPayment",
    description: "申请支付退款",
    operationId: "refundPayment",
    parameters: {
      paymentId: "$response.body#/id"
    }
  };

  // 文件相关链接
  const downloadFileLink = {
    name: "downloadFile",
    description: "下载文件内容",
    operationId: "downloadFile",
    parameters: {
      fileId: "$response.body#/id"
    }
  };

  const fileMetadataLink = {
    name: "getFileMetadata",
    description: "获取文件的元数据信息",
    operationId: "getFileMetadata",
    parameters: {
      fileId: "$response.body#/id"
    }
  };

  // 内容相关链接
  const articleCommentsLink = {
    name: "getArticleComments",
    description: "获取文章的评论列表",
    operationId: "getArticleComments",
    parameters: {
      articleId: "$response.body#/id",
      sort: "newest"
    }
  };

  const relatedArticlesLink = {
    name: "getRelatedArticles",
    description: "获取相关推荐文章",
    operationId: "getRelatedArticles",
    parameters: {
      articleId: "$response.body#/id",
      limit: 5
    }
  };

  // 通知相关链接
  const markNotificationReadLink = {
    name: "markNotificationRead",
    description: "标记通知为已读状态",
    operationId: "markNotificationRead",
    parameters: {
      notificationId: "$response.body#/id"
    }
  };

  // 分析相关链接
  const reportDetailsLink = {
    name: "getReportDetails",
    description: "获取分析报表的详细数据",
    operationId: "getReportDetails",
    parameters: {
      reportId: "$response.body#/id"
    }
  };

  const exportReportLink = {
    name: "exportReport",
    description: "导出报表数据为文件",
    operationId: "exportReport",
    parameters: {
      reportId: "$response.body#/id",
      format: "xlsx"
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户管理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户创建后的相关操作链接，包含资料查看和订单管理
        </p>
        <div className="space-y-3">
          <LinkItem
            name={userProfileLink.name}
            description={userProfileLink.description}
            operationId={userProfileLink.operationId}
            parameters={userProfileLink.parameters}
          />
          <LinkItem
            name={userOrdersLink.name}
            description={userOrdersLink.description}
            operationId={userOrdersLink.operationId}
            parameters={userOrdersLink.parameters}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">产品管理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          产品相关的扩展操作，包含详情查看和评价获取
        </p>
        <div className="space-y-3">
          <LinkItem
            name={productDetailsLink.name}
            description={productDetailsLink.description}
            operationId={productDetailsLink.operationId}
            parameters={productDetailsLink.parameters}
          />
          <LinkItem
            name={productReviewsLink.name}
            description={productReviewsLink.description}
            operationId={productReviewsLink.operationId}
            parameters={productReviewsLink.parameters}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">订单处理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          订单创建后的完整操作流程，包含查看、跟踪和取消功能
        </p>
        <div className="space-y-3">
          <LinkItem
            name={orderDetailsLink.name}
            description={orderDetailsLink.description}
            operationId={orderDetailsLink.operationId}
            parameters={orderDetailsLink.parameters}
          />
          <LinkItem
            name={orderTrackingLink.name}
            description={orderTrackingLink.description}
            operationId={orderTrackingLink.operationId}
            parameters={orderTrackingLink.parameters}
          />
          <LinkItem
            name={orderCancelLink.name}
            description={orderCancelLink.description}
            operationId={orderCancelLink.operationId}
            parameters={orderCancelLink.parameters}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付处理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付完成后的后续操作，包含详情查询和退款申请
        </p>
        <div className="space-y-3">
          <LinkItem
            name={paymentDetailsLink.name}
            description={paymentDetailsLink.description}
            operationId={paymentDetailsLink.operationId}
            parameters={paymentDetailsLink.parameters}
          />
          <LinkItem
            name={refundPaymentLink.name}
            description={refundPaymentLink.description}
            operationId={refundPaymentLink.operationId}
            parameters={refundPaymentLink.parameters}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">文件管理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文件上传后的相关操作，包含下载和元数据获取
        </p>
        <div className="space-y-3">
          <LinkItem
            name={downloadFileLink.name}
            description={downloadFileLink.description}
            operationId={downloadFileLink.operationId}
            parameters={downloadFileLink.parameters}
          />
          <LinkItem
            name={fileMetadataLink.name}
            description={fileMetadataLink.description}
            operationId={fileMetadataLink.operationId}
            parameters={fileMetadataLink.parameters}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">内容管理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文章内容的相关操作，包含评论获取和推荐功能
        </p>
        <div className="space-y-3">
          <LinkItem
            name={articleCommentsLink.name}
            description={articleCommentsLink.description}
            operationId={articleCommentsLink.operationId}
            parameters={articleCommentsLink.parameters}
          />
          <LinkItem
            name={relatedArticlesLink.name}
            description={relatedArticlesLink.description}
            operationId={relatedArticlesLink.operationId}
            parameters={relatedArticlesLink.parameters}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">通知系统 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          通知消息的状态管理操作
        </p>
        <div className="space-y-3">
          <LinkItem
            name={markNotificationReadLink.name}
            description={markNotificationReadLink.description}
            operationId={markNotificationReadLink.operationId}
            parameters={markNotificationReadLink.parameters}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">数据分析 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          分析报表的详细查看和数据导出功能
        </p>
        <div className="space-y-3">
          <LinkItem
            name={reportDetailsLink.name}
            description={reportDetailsLink.description}
            operationId={reportDetailsLink.operationId}
            parameters={reportDetailsLink.parameters}
          />
          <LinkItem
            name={exportReportLink.name}
            description={exportReportLink.description}
            operationId={exportReportLink.operationId}
            parameters={exportReportLink.parameters}
          />
        </div>
      </div>
    </div>
  );
}
