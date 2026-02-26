'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-white py-3 px-4 shadow-lg"
        >
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Sparkles className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <p className="text-sm md:text-base font-medium">
                <span className="hidden sm:inline">🎉 新年特惠！</span>
                <span className="font-bold mx-2">限时优惠</span>
                现在咨询享受
                <span className="font-bold mx-1">8折</span>
                优惠，名额有限！
              </p>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-4 py-1.5 bg-white text-orange-600 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                立即咨询
              </motion.button>

              <button
                onClick={() => setIsVisible(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
