'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { loadAirwallex } from 'airwallex-payment-elements';
import { CreditCard, Smartphone, Wallet, Loader2 } from 'lucide-react';

// =============================================================================
// 类型定义
// =============================================================================

interface AirwallexPaymentProps {
  // 支付金额 (如: 100.00 表示 100 TWD)
  amount: number;
  
  // 货币代码 (TWD, SGD, USD 等)
  currency: string;
  
  // 订单描述
  description?: string;
  
  // 客户邮箱
  customerEmail?: string;
  
  // 客户姓名
  customerName?: string;
  
  // 订单 ID (可选)
  orderId?: string;
  
  // 支付成功回调
  onSuccess: (paymentIntentId: string) => void;
  
  // 支付失败回调
  onError: (error: Error) => void;
  
  // 元数据 (可选)
  metadata?: Record<string, string>;
}

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

// =============================================================================
// Airwallex 支付组件
// =============================================================================

/**
 * Airwallex Drop-in UI 支付组件
 * 
 * 功能特点:
 * - 支持信用卡/借记卡 (Visa, Mastercard, Amex, JCB)
 * - 支持 Apple Pay
 * - 支持 Google Pay
 * - 支持台湾本地支付方式 (玉山银行 E.SUN, 7-Eleven 等)
 * - 无需离开网站即可完成支付
 * 
 * @example
 * ```tsx
 * <AirwallexPayment
 *   amount={100}
 *   currency="TWD"
 *   description="SaaS Subscription - Monthly"
 *   customerEmail="customer@example.com"
 *   customerName="John Doe"
 *   onSuccess={(id) => console.log('Payment successful:', id)}
 *   onError={(err) => console.error('Payment failed:', err)}
 * />
 * ```
 */
export default function AirwallexPayment({
  amount,
  currency,
  description,
  customerEmail,
  customerName,
  orderId,
  onSuccess,
  onError,
  metadata,
}: AirwallexPaymentProps) {
  // 组件状态
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Airwallex 配置
  const airwallexClientId = process.env.NEXT_PUBLIC_AIRWALLEX_CLIENT_ID || '';
  const airwallexEnv = (process.env.NEXT_PUBLIC_AIRWALLEX_ENV as 'staging' | 'production') || 'staging';

  /**
   * 初始化 Airwallex SDK
   * 在组件挂载时预加载 Airwallex SDK
   */
  useEffect(() => {
    const initAirwallex = async () => {
      try {
        await loadAirwallex({
          env: airwallexEnv,
          origin: typeof window !== 'undefined' ? window.location.origin : '',
        });
        console.log('Airwallex SDK loaded successfully');
      } catch (err) {
        console.error('Failed to load Airwallex SDK:', err);
        setError('Failed to load payment system. Please try again later.');
      }
    };

    if (airwallexClientId) {
      initAirwallex();
    } else {
      setError('Airwallex client ID is not configured');
    }
  }, [airwallexClientId, airwallexEnv]);

  /**
   * 创建 Payment Intent
   * 调用后端 API 获取 client_secret
   */
  const createPaymentIntent = useCallback(async (): Promise<PaymentIntentResponse | null> => {
    try {
      const response = await fetch('/api/airwallex/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          description,
          customerEmail,
          customerName,
          orderId,
          metadata: {
            ...metadata,
            source: 'drop-in-ui',
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment intent');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      onError(err as Error);
      return null;
    }
  }, [amount, currency, description, customerEmail, customerName, orderId, metadata, onError]);

  /**
   * 处理支付按钮点击
   * 1. 创建 Payment Intent
   * 2. 显示支付表单
   */
  const handlePaymentClick = async () => {
    setLoading(true);
    setError('');

    try {
      const paymentIntent = await createPaymentIntent();
      
      if (paymentIntent && paymentIntent.clientSecret) {
        setClientSecret(paymentIntent.clientSecret);
        setShowPaymentForm(true);
        setIsReady(true);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * 渲染支付表单
   * 使用 Airwallex Drop-in Elements
   */
  const renderPaymentForm = () => {
    if (!clientSecret || !showPaymentForm) return null;

    return (
      <AirwallexDropInForm
        clientSecret={clientSecret}
        clientId={airwallexClientId}
        env={airwallexEnv}
        amount={amount}
        currency={currency}
        onSuccess={onSuccess}
        onError={(err) => {
          setError(err.message);
          onError(err);
        }}
        onCancel={() => setShowPaymentForm(false)}
      />
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 支付概览卡片 */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400">Amount</span>
          <span className="text-2xl font-bold text-white">
            {currency} {amount.toFixed(2)}
          </span>
        </div>
        
        {description && (
          <div className="text-sm text-gray-500 mb-4">
            {description}
          </div>
        )}

        {/* 支持的支付方式图标 */}
        <div className="flex items-center gap-3 text-gray-500 text-sm mb-4">
          <span className="flex items-center gap-1">
            <CreditCard className="w-4 h-4" />
            Cards
          </span>
          <span className="flex items-center gap-1">
            <Smartphone className="w-4 h-4" />
            Apple Pay
          </span>
          <span className="flex items-center gap-1">
            <Wallet className="w-4 h-4" />
            Google Pay
          </span>
        </div>

        {/* 台湾本地支付方式提示 */}
        {currency === 'TWD' && (
          <div className="text-xs text-gray-600 bg-gray-800/50 rounded-lg p-2">
            <span className="font-medium">Taiwan Local Options:</span> E.SUN Bank, 7-Eleven, and more
          </div>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* 支付按钮或支付表单 */}
      {!showPaymentForm ? (
        <button
          onClick={handlePaymentClick}
          disabled={loading || !airwallexClientId}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Pay {currency} {amount.toFixed(2)}
            </>
          )}
        </button>
      ) : (
        renderPaymentForm()
      )}
    </div>
  );
}

// =============================================================================
// Airwallex Drop-in 表单组件
// =============================================================================

interface AirwallexDropInFormProps {
  clientSecret: string;
  clientId: string;
  env: 'staging' | 'production';
  amount: number;
  currency: string;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: Error) => void;
  onCancel: () => void;
}

/**
 * Airwallex Drop-in Elements 表单组件
 * 
 * 该组件负责渲染 Airwallex 的 Drop-in UI 并处理支付流程
 */
function AirwallexDropInForm({
  clientSecret,
  clientId,
  env,
  amount,
  currency,
  onSuccess,
  onError,
  onCancel,
}: AirwallexDropInFormProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let elements: any = null;
    let dropInElement: any = null;

    const initDropIn = async () => {
      try {
        // 动态导入 Airwallex 以支持 SSR
        const Airwallex = await import('airwallex-payment-elements');
        
        // 创建 Elements 实例
        elements = Airwallex.createElements({
          clientId,
          mode: env,
          locale: 'en', // 支持 'zh', 'en', 'ja' 等
        });

        // 创建 Drop-in Element
        dropInElement = elements.create('dropIn', {
          client_secret: clientSecret,
          
          // 外观配置
          appearance: {
            // 主题颜色
            variables: {
              colorPrimary: '#f59e0b', // amber-500
              colorBackground: '#1f2937', // gray-800
              colorText: '#ffffff',
              borderRadius: '12px',
            },
          },
          
          // 支持的支付方式配置
          // 根据地区自动显示本地支付方式
          payment_method_options: {
            // 信用卡配置
            card: {
              allowed_networks: ['visa', 'mastercard', 'amex', 'jcb'],
              three_ds: {
                enabled: true,
              },
            },
            // Apple Pay
            applepay: {
              enabled: true,
              // 仅在支持的设备和浏览器上显示
            },
            // Google Pay
            googlepay: {
              enabled: true,
            },
            // 台湾本地支付方式
            // Airwallex 会根据 currency 和 billing address 自动显示
            // 如: E.SUN Bank (玉山银行), 7-Eleven, FamilyMart 等
          },
          
          // 货币和金额显示
          currency,
          amount: Math.round(amount * 100), // 转换为最小货币单位
        });

        // 挂载到 DOM
        if (containerRef.current) {
          await dropInElement.mount(containerRef.current);
        }

        // 监听支付事件
        dropInElement.on('ready', () => {
          console.log('Airwallex Drop-in is ready');
        });

        dropInElement.on('success', (event: any) => {
          console.log('Payment successful:', event);
          setIsSubmitting(false);
          onSuccess(event.payment_intent_id || '');
        });

        dropInElement.on('error', (event: any) => {
          console.error('Payment error:', event);
          setIsSubmitting(false);
          onError(new Error(event.error?.message || 'Payment failed'));
        });

      } catch (err) {
        console.error('Failed to initialize Airwallex Drop-in:', err);
        onError(err instanceof Error ? err : new Error('Failed to initialize payment form'));
      }
    };

    initDropIn();

    // 清理函数
    return () => {
      if (dropInElement) {
        try {
          dropInElement.destroy();
        } catch (err) {
          console.error('Error destroying Airwallex element:', err);
        }
      }
    };
  }, [clientSecret, clientId, env, amount, currency, onSuccess, onError]);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
      {/* 支付表单容器 */}
      <div ref={containerRef} className="min-h-[400px]" />
      
      {/* 取消按钮 */}
      <button
        onClick={onCancel}
        disabled={isSubmitting}
        className="mt-4 w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl transition-colors disabled:opacity-50"
      >
        Cancel
      </button>
      
      {/* 安全提示 */}
      <p className="mt-4 text-center text-xs text-gray-600">
        Secured by Airwallex. Your payment information is encrypted.
      </p>
    </div>
  );
}
