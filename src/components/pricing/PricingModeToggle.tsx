'use client';

import { motion } from 'framer-motion';
import { PricingMode } from '@/types/pricing';

interface PricingModeToggleProps {
  value: PricingMode;
  onChange: (mode: PricingMode) => void;
}

export default function PricingModeToggle({ value, onChange }: PricingModeToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <div className="relative inline-flex bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-full p-1.5 shadow-lg">
        {/* 订阅制按钮 */}
        <button
          onClick={() => onChange('subscription')}
          className={`relative z-10 px-8 py-2.5 rounded-full font-medium transition-all duration-300 ${
            value === 'subscription' 
              ? 'text-white font-semibold' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {/* 订阅制选中时的背景 */}
          {value === 'subscription' && (
            <motion.div
              layoutId="pricingModeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/50"
              transition={{ 
                type: 'spring', 
                stiffness: 400, 
                damping: 35,
                mass: 0.8
              }}
            />
          )}
          <div className="relative z-10 flex items-center gap-2">
            <span className="text-xl">🔄</span>
            <span>订阅制</span>
            <span className={`px-2 py-0.5 text-xs rounded-full transition-all duration-300 ${
              value === 'subscription'
                ? 'bg-white/20 text-white'
                : 'bg-green-500/20 text-green-400'
            }`}>
              推荐
            </span>
          </div>
        </button>
        
        {/* 买断制按钮 */}
        <button
          onClick={() => onChange('one-time')}
          className={`relative z-10 px-8 py-2.5 rounded-full font-medium transition-all duration-300 ${
            value === 'one-time' 
              ? 'text-white font-semibold' 
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          {/* 买断制选中时的背景 */}
          {value === 'one-time' && (
            <motion.div
              layoutId="pricingModeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/50"
              transition={{ 
                type: 'spring', 
                stiffness: 400, 
                damping: 35,
                mass: 0.8
              }}
            />
          )}
          <div className="relative z-10 flex items-center gap-2">
            <span className="text-xl">💎</span>
            <span>买断制</span>
          </div>
        </button>
      </div>
    </div>
  );
}
