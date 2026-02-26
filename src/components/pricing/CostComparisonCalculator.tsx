'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Calculator, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { Currency, formatPrice } from '@/data/currencyData';

interface CostComparisonCalculatorProps {
  currency: Currency;
  category: string;
}

export default function CostComparisonCalculator({ currency, category }: CostComparisonCalculatorProps) {
  const t = useTranslations('pricing');
  const [years, setYears] = useState(3);
  
  // 根据类别获取对应的价格数据
  const getCategoryPricing = () => {
    switch (category) {
      case 'corporate-website':
        return {
          oneTime: {
            initial: 80000,
            maintenance: 6000,
            hosting: 3000,
            updates: 8000,
          },
          subscription: {
            setup: 15000,
            monthly: 2299,
          },
          name: '企业官网',
        };
      case 'ecommerce':
        return {
          oneTime: {
            initial: 150000,
            maintenance: 12000,
            hosting: 5000,
            updates: 15000,
          },
          subscription: {
            setup: 30000,
            monthly: 7999,
          },
          name: '电商网站',
        };
      case 'admin-system':
        return {
          oneTime: {
            initial: 200000,
            maintenance: 15000,
            hosting: 8000,
            updates: 20000,
          },
          subscription: {
            setup: 60000,
            monthly: 11999,
          },
          name: '管理系统',
        };
      case 'cross-platform-app':
        return {
          oneTime: {
            initial: 250000,
            maintenance: 20000,
            hosting: 10000,
            updates: 25000,
          },
          subscription: {
            setup: 60000,
            monthly: 9999,
          },
          name: 'APP开发',
        };
      case 'miniprogram':
        return {
          oneTime: {
            initial: 80000,
            maintenance: 6000,
            hosting: 3000,
            updates: 8000,
          },
          subscription: {
            setup: 20000,
            monthly: 3499,
          },
          name: '小程序',
        };
      case 'landing-page':
        return {
          oneTime: {
            initial: 40000,
            maintenance: 3000,
            hosting: 2000,
            updates: 5000,
          },
          subscription: {
            setup: 10000,
            monthly: 1699,
          },
          name: '一站式网页',
        };
      default:
        return {
          oneTime: {
            initial: 80000,
            maintenance: 6000,
            hosting: 3000,
            updates: 8000,
          },
          subscription: {
            setup: 15000,
            monthly: 2299,
          },
          name: '企业官网',
        };
    }
  };
  
  const pricing = getCategoryPricing();
  
  // 买断制成本
  const oneTimeCost = {
    initial: pricing.oneTime.initial,
    maintenance: pricing.oneTime.maintenance * years,
    hosting: pricing.oneTime.hosting * years,
    updates: pricing.oneTime.updates * years,
  };
  const oneTimeTotal = oneTimeCost.initial + oneTimeCost.maintenance + oneTimeCost.hosting + oneTimeCost.updates;
  
  // 订阅制成本
  const subscriptionCost = {
    setup: pricing.subscription.setup,
    monthly: pricing.subscription.monthly * 12 * years,
  };
  const subscriptionTotal = subscriptionCost.setup + subscriptionCost.monthly;
  
  // 节省
  const savings = oneTimeTotal - subscriptionTotal;
  const savingsPercentage = ((savings / oneTimeTotal) * 100).toFixed(1);
  
  // 回本月数
  const breakEvenMonths = Math.ceil(oneTimeCost.initial / pricing.subscription.monthly);

  return (
    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">{t('costCalculator')}</h3>
          <p className="text-gray-400 text-sm">{t('costCalculatorDesc')}</p>
        </div>
      </div>

      {/* 时间选择器 */}
      <div className="mb-8">
        <label className="text-white font-medium mb-3 block">{t('yearsLabel', { years })}</label>
        <input
          type="range"
          min="1"
          max="5"
          value={years}
          onChange={(e) => setYears(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(139, 92, 246) 0%, rgb(139, 92, 246) ${(years - 1) * 25}%, rgba(255,255,255,0.1) ${(years - 1) * 25}%, rgba(255,255,255,0.1) 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1{t('year')}</span>
          <span>2{t('year')}</span>
          <span>3{t('year')}</span>
          <span>4{t('year')}</span>
          <span>5{t('year')}</span>
        </div>
      </div>

      {/* 成本对比 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 买断制 */}
        <div className="bg-white/5 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-400" />
            {t('mode.oneTime')}
          </h4>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">{t('initialDev')}</span>
              <span className="text-white">{formatPrice(oneTimeCost.initial, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('annualMaint', { years })}</span>
              <span className="text-white">{formatPrice(oneTimeCost.maintenance, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('hostingFee', { years })}</span>
              <span className="text-white">{formatPrice(oneTimeCost.hosting, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('featureUpdates', { years })}</span>
              <span className="text-white">{formatPrice(oneTimeCost.updates, currency)}</span>
            </div>
          </div>
          <div className="pt-3 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">{t('total')}</span>
              <span className="text-2xl font-bold text-white">{formatPrice(oneTimeTotal, currency)}</span>
            </div>
          </div>
        </div>

        {/* 订阅制 */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-green-400" />
            {t('mode.subscription')}
          </h4>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">{t('setupFee')}</span>
              <span className="text-white">{formatPrice(subscriptionCost.setup, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t('monthlyFee', { years })}</span>
              <span className="text-white">{formatPrice(subscriptionCost.monthly, currency)}</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>✓ {t('includesHosting')}</span>
              <span>{t('included')}</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>✓ {t('includesUpdates')}</span>
              <span>{t('included')}</span>
            </div>
          </div>
          <div className="pt-3 border-t border-white/20">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">{t('total')}</span>
              <span className="text-2xl font-bold text-white">{formatPrice(subscriptionTotal, currency)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 节省提示 */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{t('subscriptionBetter')}</h4>
              <p className="text-sm text-gray-400">{t('yearsComparison', { years })}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-400">
              {formatPrice(savings, currency)}
            </div>
            <div className="text-sm text-gray-400">{t('save')} {savingsPercentage}%</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>{t('breakEven', { months: breakEvenMonths })}</span>
        </div>
      </motion.div>

      {/* 额外优势 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-amber-400 font-medium mb-1">✓ {t('zeroInitial')}</div>
          <div className="text-xs text-gray-400">{t('noLargeInvestment')}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-orange-400 font-medium mb-1">✓ {t('continuousUpdates')}</div>
          <div className="text-xs text-gray-400">{t('freeUpgrades')}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-green-400 font-medium mb-1">✓ {t('flexibleScale')}</div>
          <div className="text-xs text-gray-400">{t('upgradeAnytime')}</div>
        </div>
      </div>
    </div>
  );
}
