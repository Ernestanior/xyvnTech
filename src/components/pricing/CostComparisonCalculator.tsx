'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, DollarSign, Clock } from 'lucide-react';
import { Currency, formatPrice } from '@/data/currencyData';

interface CostComparisonCalculatorProps {
  currency: Currency;
  category: string;
}

export default function CostComparisonCalculator({ currency, category }: CostComparisonCalculatorProps) {
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
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">成本对比计算器</h3>
          <p className="text-gray-400 text-sm">对比买断制与订阅制的长期成本</p>
        </div>
      </div>

      {/* 时间选择器 */}
      <div className="mb-8">
        <label className="text-white font-medium mb-3 block">使用年限：{years} 年</label>
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
          <span>1年</span>
          <span>2年</span>
          <span>3年</span>
          <span>4年</span>
          <span>5年</span>
        </div>
      </div>

      {/* 成本对比 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 买断制 */}
        <div className="bg-white/5 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-400" />
            买断制
          </h4>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">初始开发</span>
              <span className="text-white">{formatPrice(oneTimeCost.initial, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">年度维护 ({years}年)</span>
              <span className="text-white">{formatPrice(oneTimeCost.maintenance, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">服务器托管 ({years}年)</span>
              <span className="text-white">{formatPrice(oneTimeCost.hosting, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">功能更新 ({years}年)</span>
              <span className="text-white">{formatPrice(oneTimeCost.updates, currency)}</span>
            </div>
          </div>
          <div className="pt-3 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">总计</span>
              <span className="text-2xl font-bold text-white">{formatPrice(oneTimeTotal, currency)}</span>
            </div>
          </div>
        </div>

        {/* 订阅制 */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-green-400" />
            订阅制
          </h4>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-400">初装费</span>
              <span className="text-white">{formatPrice(subscriptionCost.setup, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">月费 ({years}年)</span>
              <span className="text-white">{formatPrice(subscriptionCost.monthly, currency)}</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>✓ 包含服务器</span>
              <span>已包含</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>✓ 包含维护更新</span>
              <span>已包含</span>
            </div>
          </div>
          <div className="pt-3 border-t border-white/20">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">总计</span>
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
              <h4 className="text-lg font-bold text-white">订阅制更划算</h4>
              <p className="text-sm text-gray-400">{years}年总成本对比</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-400">
              {formatPrice(savings, currency)}
            </div>
            <div className="text-sm text-gray-400">节省 {savingsPercentage}%</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Clock className="w-4 h-4 text-blue-400" />
          <span>买断制需要 {breakEvenMonths} 个月才能回本，而订阅制从第一天就开始节省成本</span>
        </div>
      </motion.div>

      {/* 额外优势 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-blue-400 font-medium mb-1">✓ 零初始投入</div>
          <div className="text-xs text-gray-400">无需大额前期投资</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-purple-400 font-medium mb-1">✓ 持续更新</div>
          <div className="text-xs text-gray-400">免费功能升级</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="text-green-400 font-medium mb-1">✓ 灵活扩展</div>
          <div className="text-xs text-gray-400">随时升级套餐</div>
        </div>
      </div>
    </div>
  );
}
