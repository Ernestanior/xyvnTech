# Airwallex 支付集成 - 安装指南

## 1. 安装依赖

```bash
# 安装 Airwallex Node.js SDK (后端)
npm install airwallex-node-sdk

# 或者使用 yarn
yarn add airwallex-node-sdk

# 安装 Airwallex 前端 Elements (Drop-in UI)
npm install airwallex-payment-elements

# 或者使用 yarn  
yarn add airwallex-payment-elements
```

## 2. 配置环境变量

1. 复制环境变量示例文件：
```bash
cp .env.airwallex.example .env
```

2. 编辑 `.env` 文件，填入您的 Airwallex API 凭证：
- `AIRWALLEX_CLIENT_ID`: 您的 Client ID
- `AIRWALLEX_API_KEY`: 您的 API Secret

## 3. 获取 API Keys

1. 访问 [Airwallex Webapp](https://www.airwallex.com/app/)
2. 登录您的账户
3. 进入 Settings > API Keys
4. 点击 "Create API Key"
5. 选择权限：Payments, Payment Intents
6. 保存生成的 Client ID 和 API Secret

## 4. 使用示例

### 在结算页面中使用组件：

```tsx
import AirwallexPayment from '@/components/payment/AirwallexPayment';

export default function CheckoutPage() {
  return (
    <AirwallexPayment
      amount={100}
      currency="TWD"
      description="SaaS Subscription - Monthly"
      customerEmail="customer@example.com"
      customerName="John Doe"
      orderId="order_12345"
      onSuccess={(paymentIntentId) => {
        console.log('Payment successful:', paymentIntentId);
        // 处理支付成功逻辑
        // 例如：更新订单状态、发送确认邮件等
      }}
      onError={(error) => {
        console.error('Payment failed:', error);
        // 处理支付失败逻辑
      }}
    />
  );
}
```

## 5. 支持的支付方式

### 全球通用
- Credit/Debit Cards (Visa, Mastercard, American Express, JCB)
- Apple Pay
- Google Pay

### 台湾本地
- E.SUN Bank (玉山银行)
- 7-Eleven
- FamilyMart
- 其他台湾本地支付方式

### 新加坡本地
- PayNow
- DBS/POSB
- 其他新加坡本地支付方式

## 6. 测试

使用测试环境 (`staging`) 进行测试：

- **测试信用卡号**: 
  - Visa: `4242 4242 4242 4242`
  - Mastercard: `5555 5555 5555 4444`
  - 任何未来的 expiry date
  - 任意 3 位 CVV

- **测试金额**:
  - `100.00` - 成功支付
  - `111.11` - 支付失败 (用于测试错误处理)

## 7. 切换到生产环境

1. 在 Airwallex Webapp 中申请生产环境 API Keys
2. 更新 `.env` 文件：
   - `AIRWALLEX_ENV=production`
   - `NEXT_PUBLIC_AIRWALLEX_ENV=production`
3. 重新部署应用

## 8. 安全注意事项

- ✅ API Secret 只存储在服务端环境变量中
- ✅ Client ID 可以暴露给前端
- ✅ 使用 HTTPS 进行所有 API 通信
- ✅ 在生产环境启用 3D Secure 验证
- ❌ 不要将 API Secret 提交到版本控制
- ❌ 不要在客户端代码中使用 API Secret

## 9. Webhook 配置 (可选)

建议配置 Webhook 以接收支付状态更新：

1. 在 Airwallex Webapp 中进入 Settings > Webhooks
2. 添加 Webhook URL: `https://yourdomain.com/api/airwallex/webhook`
3. 选择事件类型：`payment_intent.succeeded`, `payment_intent.failed`

示例 Webhook 处理器代码在 `src/app/api/airwallex/webhook/route.ts`
