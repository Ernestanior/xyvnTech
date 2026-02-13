import { SubscriptionPackage, OneTimePackage, CostBreakdown, PricingComparison, BillingCycle } from '@/types/pricing';
import { Currency, convertPrice } from '@/data/currencyData';

/**
 * 计算订阅制总成本
 */
export function calculateSubscriptionCost(
  pkg: SubscriptionPackage,
  months: number,
  billingCycle: BillingCycle = 'monthly',
  currency: Currency
): CostBreakdown {
  const setupFee = convertPrice(pkg.pricing.setupFee, currency);
  
  let recurringCost: number;
  if (billingCycle === 'annual') {
    const years = Math.ceil(months / 12);
    recurringCost = convertPrice(pkg.pricing.annual, currency) * years;
  } else {
    recurringCost = convertPrice(pkg.pricing.monthly, currency) * months;
  }
  
  const totalCost = setupFee + recurringCost;
  
  // 计算节省（相比月付）
  const monthlyEquivalent = convertPrice(pkg.pricing.monthly, currency) * months;
  const savings = monthlyEquivalent - recurringCost;
  const savingsPercentage = savings > 0 ? (savings / monthlyEquivalent) * 100 : 0;
  
  return {
    setupFee,
    recurringCost,
    totalCost,
    savings,
    savingsPercentage,
  };
}

/**
 * 计算年付节省金额
 */
export function calculateAnnualSavings(
  monthlyFee: number,
  annualFee: number,
  currency: Currency
): { savings: number; percentage: number } {
  const monthlyTotal = convertPrice(monthlyFee, currency) * 12;
  const annualTotal = convertPrice(annualFee, currency);
  const savings = monthlyTotal - annualTotal;
  const percentage = (savings / monthlyTotal) * 100;
  
  return { savings, percentage };
}

/**
 * 对比买断制 vs 订阅制
 */
export function comparePricingModels(
  oneTimePkg: OneTimePackage,
  subscriptionPkg: SubscriptionPackage,
  years: number,
  currency: Currency
): PricingComparison {
  // 买断制总成本
  const oneTimeCost = {
    initial: convertPrice(oneTimePkg.price, currency),
    maintenance: oneTimePkg.maintenanceOptions?.[0]?.monthlyFee 
      ? convertPrice(oneTimePkg.maintenanceOptions[0].monthlyFee, currency) * 12 * years 
      : 0,
    hosting: 200 * 12 * years,  // 假设服务器成本 $200/月
    total: 0,
  };
  oneTimeCost.total = oneTimeCost.initial + oneTimeCost.maintenance + oneTimeCost.hosting;
  
  // 订阅制总成本
  const subscriptionCost = calculateSubscriptionCost(
    subscriptionPkg,
    years * 12,
    'annual',
    currency
  );
  
  // 计算节省
  const savings = oneTimeCost.total - subscriptionCost.totalCost;
  const savingsPercentage = (savings / oneTimeCost.total) * 100;
  
  // 计算回本月数
  const breakEvenMonths = Math.ceil(
    oneTimeCost.initial / convertPrice(subscriptionPkg.pricing.monthly, currency)
  );
  
  return {
    oneTime: oneTimeCost,
    subscription: subscriptionCost,
    savings,
    savingsPercentage,
    breakEvenMonths,
  };
}

/**
 * 计算每日成本
 */
export function calculateDailyCost(monthlyFee: number, currency: Currency): number {
  return convertPrice(monthlyFee, currency) / 30;
}

/**
 * 格式化价格显示
 */
export function formatPriceDisplay(
  amount: number,
  currency: Currency,
  showDecimals: boolean = true
): string {
  const formatted = showDecimals 
    ? amount.toFixed(2) 
    : Math.round(amount).toString();
  
  return `${currency.symbol}${formatted}`;
}

/**
 * 计算价格范围（±15%）
 */
export function calculatePriceRange(basePrice: number, currency: Currency): { min: number; max: number } {
  const converted = convertPrice(basePrice, currency);
  return {
    min: Math.round(converted * 0.85),
    max: Math.round(converted * 1.15),
  };
}

/**
 * 格式化价格范围显示
 */
export function formatPriceRange(min: number, max: number, currency: Currency): string {
  return `${currency.symbol}${min.toLocaleString()} - ${currency.symbol}${max.toLocaleString()}`;
}
