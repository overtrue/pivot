import { LinksSection } from "@/registry/pivot/links-section";

export default function LinksSectionDemo() {
  // 用户管理 API 链接示例
  const userManagementLinks = {
    "GetUserProfile": {
      operationId: "getUserProfile",
      description: "获取用户详细资料",
      parameters: {
        userId: "$response.body#/id"
      }
    },
    "UpdateUser": {
      operationId: "updateUser",
      description: "更新用户信息",
      parameters: {
        userId: "$response.body#/id"
      },
      requestBody: {
        name: "$response.body#/name",
        email: "$response.body#/email"
      }
    },
    "DeleteUser": {
      operationId: "deleteUser",
      description: "删除用户账户",
      parameters: {
        userId: "$response.body#/id"
      }
    },
    "GetUserOrders": {
      operationId: "getUserOrders",
      description: "获取用户的所有订单",
      parameters: {
        userId: "$response.body#/id",
        page: 1,
        limit: 20
      }
    }
  };

  // 电商订单 API 链接示例
  const orderManagementLinks = {
    "GetOrderDetails": {
      operationId: "getOrderById",
      description: "获取订单详细信息",
      parameters: {
        orderId: "$response.body#/id"
      }
    },
    "UpdateOrderStatus": {
      operationId: "updateOrderStatus",
      description: "更新订单状态",
      parameters: {
        orderId: "$response.body#/id"
      },
      requestBody: {
        status: "processing",
        notes: "订单正在处理中"
      }
    },
    "CancelOrder": {
      operationId: "cancelOrder",
      description: "取消订单",
      parameters: {
        orderId: "$response.body#/id"
      },
      requestBody: {
        reason: "customer_request"
      }
    },
    "GetOrderItems": {
      operationId: "getOrderItems",
      description: "获取订单商品列表",
      parameters: {
        orderId: "$response.body#/id"
      }
    },
    "CreateRefund": {
      operationId: "createRefund",
      description: "创建退款申请",
      parameters: {
        orderId: "$response.body#/id"
      },
      requestBody: {
        amount: "$response.body#/total_amount",
        reason: "product_defect"
      }
    },
    "GetInvoice": {
      operationId: "getOrderInvoice",
      description: "获取订单发票",
      parameters: {
        orderId: "$response.body#/id"
      }
    }
  };

  // 产品管理 API 链接示例
  const productManagementLinks = {
    "GetProductDetails": {
      operationId: "getProductById",
      description: "获取产品详细信息",
      parameters: {
        productId: "$response.body#/id"
      }
    },
    "UpdateProduct": {
      operationId: "updateProduct",
      description: "更新产品信息",
      parameters: {
        productId: "$response.body#/id"
      },
      requestBody: {
        name: "$response.body#/name",
        price: "$response.body#/price",
        description: "$response.body#/description"
      }
    },
    "GetProductReviews": {
      operationId: "getProductReviews",
      description: "获取产品评价列表",
      parameters: {
        productId: "$response.body#/id",
        page: 1,
        limit: 10,
        sort: "newest"
      }
    },
    "GetRelatedProducts": {
      operationId: "getRelatedProducts",
      description: "获取相关产品推荐",
      parameters: {
        productId: "$response.body#/id",
        category: "$response.body#/category",
        limit: 5
      }
    },
    "UpdateInventory": {
      operationId: "updateProductInventory",
      description: "更新产品库存",
      parameters: {
        productId: "$response.body#/id"
      },
      requestBody: {
        quantity: 100,
        operation: "set"
      }
    },
    "AddToWishlist": {
      operationId: "addProductToWishlist",
      description: "添加到心愿单",
      parameters: {
        productId: "$response.body#/id",
        userId: "$request.header.X-User-ID"
      }
    }
  };

  // 支付处理 API 链接示例
  const paymentProcessingLinks = {
    "GetPaymentDetails": {
      operationId: "getPaymentById",
      description: "获取支付详情",
      parameters: {
        paymentId: "$response.body#/payment_id"
      }
    },
    "RefundPayment": {
      operationId: "createRefund",
      description: "创建退款",
      parameters: {
        paymentId: "$response.body#/payment_id"
      },
      requestBody: {
        amount: "$response.body#/amount",
        reason: "customer_request"
      }
    },
    "GetPaymentReceipt": {
      operationId: "getPaymentReceipt",
      description: "获取支付凭证",
      parameters: {
        paymentId: "$response.body#/payment_id",
        format: "pdf"
      }
    },
    "GetTransactionHistory": {
      operationId: "getTransactionHistory",
      description: "获取交易历史",
      parameters: {
        customerId: "$response.body#/customer_id",
        startDate: "$response.body#/created_at",
        limit: 50
      }
    }
  };

  // 内容管理 API 链接示例
  const contentManagementLinks = {
    "GetArticleDetails": {
      operationId: "getArticleById",
      description: "获取文章详细内容",
      parameters: {
        articleId: "$response.body#/id"
      }
    },
    "UpdateArticle": {
      operationId: "updateArticle",
      description: "更新文章内容",
      parameters: {
        articleId: "$response.body#/id"
      },
      requestBody: {
        title: "$response.body#/title",
        content: "$response.body#/content",
        status: "published"
      }
    },
    "GetArticleComments": {
      operationId: "getArticleComments",
      description: "获取文章评论",
      parameters: {
        articleId: "$response.body#/id",
        page: 1,
        limit: 20,
        sort: "newest"
      }
    },
    "GetAuthorProfile": {
      operationId: "getAuthorProfile",
      description: "获取作者信息",
      parameters: {
        authorId: "$response.body#/author_id"
      }
    },
    "GetRelatedArticles": {
      operationId: "getRelatedArticles",
      description: "获取相关文章",
      parameters: {
        articleId: "$response.body#/id",
        category: "$response.body#/category",
        limit: 5
      }
    },
    "PublishArticle": {
      operationId: "publishArticle",
      description: "发布文章",
      parameters: {
        articleId: "$response.body#/id"
      },
      requestBody: {
        publish_time: "now",
        notify_subscribers: true
      }
    }
  };

  return (
    <div className="space-y-8 min-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">用户管理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          用户创建后的相关操作链接，包含查看、更新、删除和获取订单等操作
        </p>
        <LinksSection links={userManagementLinks} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">订单管理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          订单创建后的完整操作流程，包含状态更新、取消、退款和发票等功能
        </p>
        <LinksSection links={orderManagementLinks} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">产品管理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          产品相关的扩展操作，包含详情查看、评价获取、库存管理和推荐功能
        </p>
        <LinksSection links={productManagementLinks} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">支付处理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          支付完成后的后续操作，包含退款、凭证获取和交易历史查询
        </p>
        <LinksSection links={paymentProcessingLinks} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">内容管理 API 链接</h4>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
          文章内容管理的相关操作，包含评论、作者信息、相关推荐和发布功能
        </p>
        <LinksSection links={contentManagementLinks} />
      </div>
    </div>
  );
}
