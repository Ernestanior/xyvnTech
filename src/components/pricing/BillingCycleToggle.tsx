'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BillingCycle } from '@/types/pricing';

interface BillingCycleToggleProps {
  value: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  annualDiscount?: number;
}

export default function BillingCycleToggle({ value, onChange, annualDiscount = 17 }: BillingCycleToggleProps) {
  const t = useTranslations('pricing');
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="relative inline-flex bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-full p-1.5 shadow-lg">
        {/* 月付按钮 */}
        <button
          onClick={() => onChange('monthly')}
          className={`relative z-10 px-8 py-2.5 rounded-full font-medium transition-all duration-300 ${
            value === 'monthly' 
              ? 'text-white font-semibold' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {/* 月付选中时的背景 */}
          {value === 'monthly' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full shadow-lg shadow-green-500/50"
              transition={{ 
                type: 'spring', 
                stiffness: 400, 
                damping: 35,
                mass: 0.8
              }}
            />
          )}
          <span className="relative z-10">{t('billing.monthly')}</span>
        </button>
        
        {/* 年付按钮 */}
        <button
          onClick={() => onChange('annual')}
          className={`relative z-10 px-8 py-2.5 rounded-full font-medium transition-all duration-300 ${
            value === 'annual' 
              ? 'text-white font-semibold' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {/* 年付选中时的背景 */}
          {value === 'annual' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full shadow-lg shadow-green-500/50"
              transition={{ 
                type: 'spring', 
                stiffness: 400, 
                damping: 35,
                mass: 0.8
              }}
            />
          )}
          <div className="relative z-10 flex items-center gap-2">
            <span>{t('billing.annual')}</span>
            <span className={`px-2 py-0.5 text-xs rounded-full transition-all duration-300 ${
              value === 'annual'
                ? 'bg-white/20 text-white'
                : 'bg-green-500/20 text-green-400'
            }`}>
              {t('billing.save', { discount: annualDiscount })}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
