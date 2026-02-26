'use client';

import React, { useState } from 'react';
import AirwallexPayment from '@/components/payment/AirwallexPayment';
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * 示例：结算页面
 * 
 * 展示如何在实际业务中使用 Airwallex 支付组件
 */
export default function CheckoutPage() {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 示例订单数据
  const order = {
    id: 'order_12345',
    items: [
      { name: 'SaaS Subscription - Monthly', price: 100 },
      { name: 'Custom Development Service', price: 500 },
    ],
    total: 600,
    currency: 'TWD',
    customerEmail: 'customer@example.com',
    customerName: 'John Doe',
  };

  /**
   * 支付成功回调
   */
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setPaymentStatus('success');
    setPaymentIntentId(paymentIntentId);
    
    // 可以在这里调用后端 API 更新订单状态
    console.log('Payment successful:', paymentIntentId);
  };

  /**
   * 支付失败回调
   */
  const handlePaymentError = (error: Error) => {
    setPaymentStatus('error');
    setErrorMessage(error.message);
    
    console.error('Payment failed:', error);
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Checkout</h1>
          <p className="text-gray-400">Secure payment powered by Airwallex</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左侧：订单摘要 */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 h-fit">
            <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
            
            {/* 订单项目 */}
            <div className="space-y-4 mb-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-white font-medium">
                    {order.currency} {item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* 分隔线 */}
            <div className="border-t border-gray-800 my-6" />

            {/* 总计 */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-amber-400">
                {order.currency} {order.total.toFixed(2)}
              </span>
            </div>

            {/* 支持的支付方式 */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-500 mb-4">Accepted payment methods:</p>
              <div className="flex flex-wrap gap-4">
                <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                  Visa
                </span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                  Mastercard
                </span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                  Apple Pay
                </span>
                <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                  Google Pay
                </span>
                {order.currency === 'TWD' && (
                  <>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                      E.SUN Bank
                    </span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                      7-Eleven
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 右侧：支付区域 */}
          <div>
            {paymentStatus === 'idle' && (
              <AirwallexPayment
                amount={order.total}
                currency={order.currency}
                description={`Arvix Pte. Ltd. - ${order.items.map(i => i.name).join(', ')}`}
                customerEmail={order.customerEmail}
                customerName={order.customerName}
                orderId={order.id}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                metadata={{
                  company: 'Arvix Pte. Ltd.',
                  orderType: 'saas_subscription',
                }}
              />
            )}

            {paymentStatus === 'success' && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Payment Successful!
                </h2>
                <p className="text-gray-400 mb-4">
                  Thank you for your purchase.
                </p>
                <p className="text-sm text-gray-500">
                  Payment Intent ID: {paymentIntentId}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl transition-colors"
                >
                  Make Another Payment
                </button>
              </div>
            )}

            {paymentStatus === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Payment Failed
                </h2>
                <p className="text-gray-400 mb-4">
                  {errorMessage || 'Something went wrong. Please try again.'}
                </p>
                <button
                  onClick={() => setPaymentStatus('idle')}
                  className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 安全提示 */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <CreditCard className="w-4 h-4" />
            <span>
              Secured by Airwallex. PCI DSS Compliant. Your payment information is encrypted.
            </span>
          </div>
          <p className="text-gray-700 text-xs mt-2">
            Arvix Pte. Ltd. | Singapore
          </p>
        </div>
      </div>
    </div>
  );
}
