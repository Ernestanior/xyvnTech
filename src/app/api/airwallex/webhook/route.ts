/**
 * Airwallex Webhook Handler
 * 
 * 处理 Airwallex 支付状态回调
 * 
 * @route POST /api/airwallex/webhook
 * @body Airwallex webhook payload
 * @response 200 OK
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Airwallex Webhook 密钥 (从 Airwallex Webapp 获取)
const AIRWALLEX_WEBHOOK_SECRET = process.env.AIRWALLEX_WEBHOOK_SECRET;

// =============================================================================
// Webhook 事件类型定义
// =============================================================================

interface AirwallexWebhookEvent {
  id: string;
  type: string;
  created_at: string;
  data: {
    id: string;
    status: string;
    amount: number;
    currency: string;
    merchant_order_id: string;
    client_secret?: string;
    failure_code?: string;
    failure_message?: string;
  };
}

// =============================================================================
// Webhook 签名验证
// =============================================================================

/**
 * 验证 Airwallex Webhook 签名
 * 防止伪造请求
 * 
 * @param payload - 请求体原始内容
 * @param signature - Airwallex-Signature 请求头
 * @param secret - Webhook Secret
 */
async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    // 使用 Web Crypto API 验证 HMAC-SHA256 签名
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signatureBuffer = Uint8Array.from(
      atob(signature),
      (c) => c.charCodeAt(0)
    );

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      encoder.encode(payload)
    );

    return isValid;
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return false;
  }
}

// =============================================================================
// Webhook 事件处理
// =============================================================================

/**
 * 处理支付成功事件
 */
async function handlePaymentSuccess(event: AirwallexWebhookEvent): Promise<void> {
  const { data } = event;
  
  console.log('Payment succeeded:', {
    paymentIntentId: data.id,
    orderId: data.merchant_order_id,
    amount: data.amount,
    currency: data.currency,
  });

  // TODO: 实现您的业务逻辑
  // 例如:
  // 1. 更新数据库中的订单状态
  // 2. 发送支付确认邮件给客户
  // 3. 激活 SaaS 订阅
  // 4. 记录支付日志

  // 示例代码:
  // await db.orders.update({
  //   where: { orderId: data.merchant_order_id },
  //   data: {
  //     status: 'PAID',
  //     paymentIntentId: data.id,
  //     paidAt: new Date(),
  //   },
  // });

  // await sendPaymentConfirmationEmail(data.merchant_order_id);
}

/**
 * 处理支付失败事件
 */
async function handlePaymentFailed(event: AirwallexWebhookEvent): Promise<void> {
  const { data } = event;
  
  console.error('Payment failed:', {
    paymentIntentId: data.id,
    orderId: data.merchant_order_id,
    failureCode: data.failure_code,
    failureMessage: data.failure_message,
  });

  // TODO: 实现您的业务逻辑
  // 例如:
  // 1. 更新订单状态为失败
  // 2. 发送支付失败通知给客户
  // 3. 记录失败日志用于分析

  // 示例代码:
  // await db.orders.update({
  //   where: { orderId: data.merchant_order_id },
  //   data: {
  //     status: 'FAILED',
  //     paymentIntentId: data.id,
  //     failureReason: data.failure_message,
  //     failedAt: new Date(),
  //   },
  // });
}

/**
 * 处理支付取消事件
 */
async function handlePaymentCancelled(event: AirwallexWebhookEvent): Promise<void> {
  const { data } = event;
  
  console.log('Payment cancelled:', {
    paymentIntentId: data.id,
    orderId: data.merchant_order_id,
  });

  // TODO: 实现您的业务逻辑
  // 例如:
  // 1. 更新订单状态为已取消
  // 2. 释放库存 (如果是电商)
  // 3. 发送取消通知
}

// =============================================================================
// Webhook 路由处理器
// =============================================================================

export async function POST(request: NextRequest) {
  try {
    // 获取请求头
    const headersList = headers();
    const signature = headersList.get('Airwallex-Signature');
    
    // 获取请求体
    const payload = await request.text();

    // 验证签名 (如果配置了 Webhook Secret)
    if (AIRWALLEX_WEBHOOK_SECRET && signature) {
      const isValid = await verifyWebhookSignature(
        payload,
        signature,
        AIRWALLEX_WEBHOOK_SECRET
      );

      if (!isValid) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    } else if (AIRWALLEX_WEBHOOK_SECRET && !signature) {
      console.error('Missing webhook signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    // 解析事件
    const event: AirwallexWebhookEvent = JSON.parse(payload);

    console.log('Received Airwallex webhook:', {
      type: event.type,
      id: event.id,
      created_at: event.created_at,
    });

    // 根据事件类型处理
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event);
        break;

      case 'payment_intent.failed':
        await handlePaymentFailed(event);
        break;

      case 'payment_intent.cancelled':
        await handlePaymentCancelled(event);
        break;

      // 其他事件类型
      case 'payment_intent.created':
        console.log('Payment intent created:', event.data.id);
        break;

      case 'payment_intent.requires_action':
        console.log('Payment intent requires action:', event.data.id);
        break;

      default:
        console.log('Unhandled webhook event type:', event.type);
    }

    // 返回 200 OK
    // 这是非常重要的，告诉 Airwallex 我们已经成功处理了 Webhook
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS 请求处理 (CORS 预检)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 
        'Content-Type, Airwallex-Signature, Authorization',
    },
  });
}
