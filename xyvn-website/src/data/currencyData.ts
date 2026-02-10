// 币种配置和汇率数据
export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // 相对于 TWD 的汇率
}

// 支持的币种列表（基准：1 TWD）
export const currencies: Currency[] = [
  {
    code: 'USD',
    symbol: '$',
    name: '美元',
    rate: 0.032, // 1 TWD ≈ 0.032 USD
  },
  {
    code: 'SGD',
    symbol: 'S$',
    name: '新加坡元',
    rate: 0.043, // 1 TWD ≈ 0.043 SGD
  },
  {
    code: 'CNY',
    symbol: '¥',
    name: '人民币',
    rate: 0.23, // 1 TWD ≈ 0.23 CNY
  },
  {
    code: 'JPY',
    symbol: '¥',
    name: '日元',
    rate: 4.8, // 1 TWD ≈ 4.8 JPY
  },
  {
    code: 'TWD',
    symbol: 'NT$',
    name: '新台币',
    rate: 1,
  },
  {
    code: 'HKD',
    symbol: 'HK$',
    name: '港币',
    rate: 0.25, // 1 TWD ≈ 0.25 HKD
  },
  {
    code: 'EUR',
    symbol: '€',
    name: '欧元',
    rate: 0.029, // 1 TWD ≈ 0.029 EUR
  },
  {
    code: 'KRW',
    symbol: '₩',
    name: '韩元',
    rate: 42, // 1 TWD ≈ 42 KRW
  },
];

// 格式化价格显示
export const formatPrice = (price: number, currency: Currency): string => {
  const convertedPrice = price * currency.rate;
  
  // 取整到百位（个位和十位都是0）
  const roundedPrice = Math.round(convertedPrice / 100) * 100;
  
  const withCommas = roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return `${currency.symbol}${withCommas}`;
};

// 获取币种对象
export const getCurrency = (code: string): Currency => {
  return currencies.find(c => c.code === code) || currencies[0];
};

// 价格范围格式化
export const formatPriceRange = (min: number, max: number, currency: Currency): string => {
  // 先转换币种，再取整到百位
  const convertedMin = Math.round((min * currency.rate) / 100) * 100;
  const convertedMax = Math.round((max * currency.rate) / 100) * 100;
  
  const minFormatted = convertedMin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const maxFormatted = convertedMax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return `${currency.symbol}${minFormatted} - ${currency.symbol}${maxFormatted}`;
};
