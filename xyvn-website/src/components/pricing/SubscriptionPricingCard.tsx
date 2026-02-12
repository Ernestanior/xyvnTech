'use client';

import { motion } from 'framer-motion';
import { Check, X, Sparkles, TrendingUp } from 'lucide-react';
import { SubscriptionPackage, BillingCycle } from '@/types/pricing';
import { Currency, formatPrice } from '@/data/currencyData';

interface SubscriptionPricingCardProps {
  package: SubscriptionPackage;
  billingCycle: BillingCycle;
  currency: Currency;
  onSelect: () => void;
  delay?: number;
}

export default function SubscriptionPricingCard({
  package: pkg,
  billingCycle,
  currency,
  onSelect,
  delay = 0,
}: SubscriptionPricingCardProps) {
  const isPopular = pkg.tags?.includes('popular');
  const isBestValue = pkg.tags?.includes('best-value');
  const isRecommended = pkg.tags?.includes('recommended');
  
  const monthlyPrice = billingCycle === 'monthly' 
    ? pkg.pricing.monthly 
    : Math.round(pkg.pricing.annual / 12);
  
  const setupFee = pkg.pricing.setupFee;
  const annualSavings = pkg.pricing.monthly * 12 - pkg.pricing.annual;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 hover:bg-white/10 transition-all ${
        isPopular || isBestValue ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-white/10'
      }`}
    >
      {/* 标签 */}
      {(isPopular || isBestValue || isRecommended) && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {isPopular && '最受欢迎'}
            {isBestValue && '最超值'}
            {isRecommended && '推荐'}
          </div>
        </div>
      )}

      {/* 套餐名称 */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
        <p className="text-gray-400 text-sm">{pkg.description}</p>
        {pkg.targetAudience && (
          <p className="text-xs text-gray-500 mt-1">适合：{pkg.targetAudience}</p>
        )}
      </div>

      {/* 价格 */}
      <div className="mb-6">
        {/* 月费 */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-white">
            {formatPrice(monthlyPrice, currency)}
          </span>
          <span className="text-gray-400">/月</span>
        </div>
        
        {/* 年付节省提示 */}
        {billingCycle === 'annual' && annualSavings > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">
              年付节省 {formatPrice(annualSavings, currency)}
            </span>
          </div>
        )}
        
        {/* 初装费 */}
        <div className="text-sm text-gray-400">
          初装费：{formatPrice(setupFee, currency)}
        </div>
        
        {/* 交易费（电商） */}
        {pkg.pricing.transactionFee && (
          <div className="text-sm text-gray-400">
            交易费：{pkg.pricing.transactionFee}%
          </div>
        )}
      </div>

      {/* 限制信息 */}
      {pkg.limits && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {pkg.limits.pages && (
              <div>
                <span className="text-gray-400">页面：</span>
                <span className="text-white ml-1">{pkg.limits.pages}</span>
              </div>
            )}
            {pkg.limits.products && (
              <div>
                <span className="text-gray-400">SKU：</span>
                <span className="text-white ml-1">{pkg.limits.products}</span>
              </div>
            )}
            {pkg.limits.orders && (
              <div>
                <span className="text-gray-400">订单：</span>
                <span className="text-white ml-1">{pkg.limits.orders}/月</span>
              </div>
            )}
            {pkg.limits.storage && (
              <div>
                <span className="text-gray-400">存储：</span>
                <span className="text-white ml-1">{pkg.limits.storage}</span>
              </div>
            )}
            {pkg.limits.bandwidth && (
              <div>
                <span className="text-gray-400">流量：</span>
                <span className="text-white ml-1">{pkg.limits.bandwidth}</span>
              </div>
            )}
            {pkg.limits.users && (
              <div>
                <span className="text-gray-400">用户：</span>
                <span className="text-white ml-1">{pkg.limits.users}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 功能列表 */}
      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-gray-300">
            {feature.included === false ? (
              <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            ) : (
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <span className="text-sm">{feature.name}</span>
              {typeof feature.included === 'string' && feature.included !== 'unlimited' && feature.included !== 'limited' && (
                <span className="text-xs text-gray-500 ml-2">({feature.included})</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* 支持信息 */}
      <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <div className="text-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-400">技术支持：</span>
            <span className="text-white">{pkg.supportLevel === 'email' ? '邮件' : pkg.supportLevel === 'email-phone' ? '邮件+电话' : pkg.supportLevel === 'priority' ? '优先支持' : '专属支持'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">响应时间：</span>
            <span className="text-white">{pkg.responseTime}</span>
          </div>
        </div>
      </div>

      {/* CTA按钮 */}
      <button
        onClick={onSelect}
        className={`w-full py-3 rounded-xl font-medium transition-all ${
          isPopular || isBestValue
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
            : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
        }`}
      >
        选择套餐
      </button>
    </motion.div>
  );
}
