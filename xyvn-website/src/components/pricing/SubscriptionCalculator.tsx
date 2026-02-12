'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Check, X } from 'lucide-react';
import { Currency, formatPrice } from '@/data/currencyData';
import { getSubscriptionsByCategory } from '@/data/subscriptionPackages';

interface SubscriptionCalculatorProps {
  currency: Currency;
  category: string;
  onCategoryChange?: (category: string) => void;
}

export default function SubscriptionCalculator({ currency, category, onCategoryChange }: SubscriptionCalculatorProps) {
  const [selectedTier, setSelectedTier] = useState<'starter' | 'growth' | 'business'>('growth');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [years, setYears] = useState(3);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // 服务类型列表
  const categories = [
    { id: 'corporate-website', name: '企业官网', icon: '🌐' },
    { id: 'ecommerce', name: '电商网站', icon: '🛍️' },
    { id: 'landing-page', name: '一站式网页', icon: '🎯' },
    { id: 'admin-system', name: '管理系统', icon: '⚙️' },
    { id: 'cross-platform-app', name: 'APP开发', icon: '📱' },
    { id: 'miniprogram', name: '小程序', icon: '💬' },
  ];
  
  // 获取当前类别的订阅套餐
  const packages = getSubscriptionsByCategory(category);
  const selectedPackage = packages.find(pkg => pkg.tier === selectedTier);
  
  // 当类别改变时，重置选择
  const handleCategoryChange = (newCategory: string) => {
    if (onCategoryChange) {
      onCategoryChange(newCategory);
    }
    setSelectedAddons([]);
    // 检查新类别是否有当前选择的套餐层级
    const newPackages = getSubscriptionsByCategory(newCategory);
    if (!newPackages.find(pkg => pkg.tier === selectedTier)) {
      setSelectedTier('growth');
    }
  };
  
  // 如果当前类别没有订阅套餐，显示提示信息
  if (!selectedPackage || packages.length === 0) {
    return (
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">订阅费用计算器</h3>
            <p className="text-gray-400 text-sm">计算您的订阅总成本</p>
          </div>
        </div>

        {/* 服务类型选择 */}
        <div className="mb-6">
          <label className="text-white font-medium mb-3 block">选择服务类型</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`p-4 rounded-xl transition-all flex items-center gap-3 ${
                  category === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-medium text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 暂无订阅套餐提示 */}
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-10 h-10 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">该服务类型暂无订阅套餐</h3>
          <p className="text-gray-400 mb-6">
            我们正在为更多服务类型推出订阅套餐，敬请期待！
            <br />
            您可以选择其他服务类型或使用买断制定价。
          </p>
        </div>
      </div>
    );
  }
  
  // 计算总成本
  const setupFee = selectedPackage.pricing.setupFee;
  const monthlyFee = billingCycle === 'monthly' 
    ? selectedPackage.pricing.monthly 
    : selectedPackage.pricing.annual / 12;
  const totalMonths = years * 12;
  const subscriptionTotal = setupFee + (monthlyFee * totalMonths);
  
  // 计算附加服务成本
  const addonsCost = selectedAddons.reduce((total, addonId) => {
    const addon = selectedPackage.addons?.find(a => a.id === addonId);
    if (!addon) return total;
    
    if (addon.billingType === 'monthly') {
      return total + (addon.price * totalMonths);
    } else if (addon.billingType === 'annual') {
      return total + (addon.price * years);
    } else {
      return total + addon.price;
    }
  }, 0);
  
  const grandTotal = subscriptionTotal + addonsCost;
  
  // 年付节省
  const annualSavings = billingCycle === 'annual' 
    ? (selectedPackage.pricing.monthly * 12 - selectedPackage.pricing.annual) * years
    : 0;
  
  // 切换附加服务
  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">订阅费用计算器</h3>
          <p className="text-gray-400 text-sm">计算您的订阅总成本</p>
        </div>
      </div>

      {/* 服务类型选择 */}
      <div className="mb-6">
        <label className="text-white font-medium mb-3 block">选择服务类型</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`p-4 rounded-xl transition-all flex items-center gap-3 ${
                category === cat.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="font-medium text-sm">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 套餐选择 */}
      <div className="mb-6">
        <label className="text-white font-medium mb-3 block">选择套餐</label>
        <div className="grid grid-cols-3 gap-3">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedTier(pkg.tier)}
              className={`p-4 rounded-xl transition-all ${
                selectedTier === pkg.tier
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <div className="text-sm font-medium">{pkg.name}</div>
              <div className="text-xs mt-1 opacity-80">
                {formatPrice(pkg.pricing.monthly, currency)}/月
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 计费周期 */}
      <div className="mb-6">
        <label className="text-white font-medium mb-3 block">计费周期</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`p-4 rounded-xl transition-all ${
              billingCycle === 'monthly'
                ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <div className="font-medium">月付</div>
            <div className="text-sm mt-1">{formatPrice(selectedPackage.pricing.monthly, currency)}/月</div>
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`p-4 rounded-xl transition-all relative ${
              billingCycle === 'annual'
                ? 'bg-purple-500/20 border-2 border-purple-500 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
              省17%
            </div>
            <div className="font-medium">年付</div>
            <div className="text-sm mt-1">{formatPrice(selectedPackage.pricing.annual / 12, currency)}/月</div>
          </button>
        </div>
      </div>

      {/* 使用年限 */}
      <div className="mb-6">
        <label className="text-white font-medium mb-3 block">使用年限：{years} 年</label>
        <input
          type="range"
          min="1"
          max="5"
          value={years}
          onChange={(e) => setYears(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${(years - 1) * 25}%, rgba(255,255,255,0.1) ${(years - 1) * 25}%, rgba(255,255,255,0.1) 100%)`
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

      {/* 附加服务 */}
      {selectedPackage.addons && selectedPackage.addons.length > 0 && (
        <div className="mb-6">
          <label className="text-white font-medium mb-3 block">附加服务（可选）</label>
          <div className="space-y-2">
            {selectedPackage.addons.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`w-full p-4 rounded-xl transition-all text-left ${
                    isSelected
                      ? 'bg-purple-500/20 border-2 border-purple-500'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isSelected ? 'bg-purple-500 border-purple-500' : 'border-gray-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <div className="text-white font-medium">{addon.name}</div>
                        <div className="text-xs text-gray-400">{addon.description}</div>
                      </div>
                    </div>
                    <div className="text-sm text-purple-400 font-medium">
                      +{formatPrice(addon.price, currency)}/{addon.billingType === 'monthly' ? '月' : addon.billingType === 'annual' ? '年' : '次'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 费用明细 */}
      <div className="bg-white/5 rounded-2xl p-6 mb-6">
        <h4 className="text-lg font-bold text-white mb-4">费用明细</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">初装费</span>
            <span className="text-white">{formatPrice(setupFee, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">
              {billingCycle === 'monthly' ? '月费' : '年费'} ({years}年)
            </span>
            <span className="text-white">{formatPrice(monthlyFee * totalMonths, currency)}</span>
          </div>
          {annualSavings > 0 && (
            <div className="flex justify-between text-green-400">
              <span>年付优惠</span>
              <span>-{formatPrice(annualSavings, currency)}</span>
            </div>
          )}
          {selectedAddons.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">附加服务</span>
              <span className="text-white">{formatPrice(addonsCost, currency)}</span>
            </div>
          )}
        </div>
        <div className="pt-3 mt-3 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 font-medium">总计</span>
            <span className="text-3xl font-bold text-white">{formatPrice(grandTotal, currency)}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">
            平均 {formatPrice(grandTotal / totalMonths, currency)}/月
          </div>
        </div>
      </div>

      {/* 优势提示 */}
      {annualSavings > 0 && (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <div className="text-green-400 font-medium text-sm">年付更划算！</div>
              <div className="text-xs text-gray-400">
                {years}年总共节省 {formatPrice(annualSavings, currency)}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 包含服务 */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h4 className="text-sm font-bold text-white mb-3">✨ 订阅服务包含</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* 通用服务 */}
          <div className="flex items-center gap-2 text-gray-300">
            <Check className="w-3 h-3 text-green-400" />
            <span>云服务器托管</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Check className="w-3 h-3 text-green-400" />
            <span>SSL证书</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Check className="w-3 h-3 text-green-400" />
            <span>CDN加速</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Check className="w-3 h-3 text-green-400" />
            <span>每日备份</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Check className="w-3 h-3 text-green-400" />
            <span>技术支持</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Check className="w-3 h-3 text-green-400" />
            <span>功能更新</span>
          </div>
          
          {/* 根据类别显示特定服务 */}
          {category === 'ecommerce' && (
            <>
              <div className="flex items-center gap-2 text-gray-300">
                <Check className="w-3 h-3 text-green-400" />
                <span>支付网关</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Check className="w-3 h-3 text-green-400" />
                <span>订单管理</span>
              </div>
            </>
          )}
          
          {category === 'admin-system' && (
            <>
              <div className="flex items-center gap-2 text-gray-300">
                <Check className="w-3 h-3 text-green-400" />
                <span>数据库托管</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Check className="w-3 h-3 text-green-400" />
                <span>API接口</span>
              </div>
            </>
          )}
          
          {category === 'cross-platform-app' && (
            <>
              <div className="flex items-center gap-2 text-gray-300">
                <Check className="w-3 h-3 text-green-400" />
                <span>应用商店上架</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Check className="w-3 h-3 text-green-400" />
                <span>推送服务</span>
              </div>
            </>
          )}
          
          {category === 'miniprogram' && (
            <>
              <div className="flex items-center gap-2 text-gray-300">
                <Check className="w-3 h-3 text-green-400" />
                <span>小程序审核</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Check className="w-3 h-3 text-green-400" />
                <span>模板消息</span>
              </div>
            </>
          )}
          
          {(category === 'corporate-website' || category === 'landing-page') && (
            <>
              <div className="flex items-center gap-2 text-gray-300">
                <Check className="w-3 h-3 text-green-400" />
                <span>SEO优化</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Check className="w-3 h-3 text-green-400" />
                <span>内容更新</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
