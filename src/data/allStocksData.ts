import { StockQuote, Candle, TechnicalIndicators, Timeframe, TrendDirection } from '../types';
import { generateCandles } from './candleGenerator';

export interface StockDefinition {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  prevClose: number;
  week52High: number;
  week52Low: number;
  pe: number;
  marketCapCr: number;
  lotSize: number;
  isFnO: boolean;
  volume: number;
  deliveryPercent: number;
}

export const NSE_STOCK_DEFINITIONS: StockDefinition[] = [
  // 1. Energy & Oil/Gas
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    sector: 'Energy & Oil',
    price: 2985.40,
    prevClose: 2936.70,
    week52High: 3217.90,
    week52Low: 2221.05,
    pe: 27.8,
    marketCapCr: 2018450,
    lotSize: 250,
    isFnO: true,
    volume: 6842000,
    deliveryPercent: 64.2
  },
  {
    symbol: 'ONGC',
    name: 'Oil & Natural Gas Corp Ltd.',
    sector: 'Energy & Oil',
    price: 324.50,
    prevClose: 320.10,
    week52High: 344.75,
    week52Low: 178.00,
    pe: 7.9,
    marketCapCr: 408200,
    lotSize: 3850,
    isFnO: true,
    volume: 18450000,
    deliveryPercent: 58.4
  },
  {
    symbol: 'BPCL',
    name: 'Bharat Petroleum Corp Ltd.',
    sector: 'Energy & Oil',
    price: 358.20,
    prevClose: 354.00,
    week52High: 388.00,
    week52Low: 195.50,
    pe: 4.8,
    marketCapCr: 155400,
    lotSize: 1800,
    isFnO: true,
    volume: 14200000,
    deliveryPercent: 52.1
  },
  {
    symbol: 'NTPC',
    name: 'NTPC Ltd.',
    sector: 'Power & Utilities',
    price: 412.80,
    prevClose: 408.50,
    week52High: 448.45,
    week52Low: 226.70,
    pe: 18.2,
    marketCapCr: 400200,
    lotSize: 1500,
    isFnO: true,
    volume: 16500000,
    deliveryPercent: 61.3
  },
  {
    symbol: 'POWERGRID',
    name: 'Power Grid Corp of India Ltd.',
    sector: 'Power & Utilities',
    price: 338.60,
    prevClose: 335.20,
    week52High: 366.25,
    week52Low: 194.00,
    pe: 19.5,
    marketCapCr: 314900,
    lotSize: 1800,
    isFnO: true,
    volume: 12100000,
    deliveryPercent: 67.8
  },

  // 2. Banking & Financials
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    sector: 'Banking',
    price: 1654.80,
    prevClose: 1632.40,
    week52High: 1794.00,
    week52Low: 1363.55,
    pe: 18.6,
    marketCapCr: 1258900,
    lotSize: 550,
    isFnO: true,
    volume: 12450000,
    deliveryPercent: 68.5
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    sector: 'Banking',
    price: 1224.60,
    prevClose: 1211.80,
    week52High: 1332.00,
    week52Low: 915.00,
    pe: 17.8,
    marketCapCr: 861200,
    lotSize: 700,
    isFnO: true,
    volume: 9800000,
    deliveryPercent: 62.4
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    sector: 'Banking',
    price: 818.70,
    prevClose: 811.80,
    week52High: 912.00,
    week52Low: 560.00,
    pe: 10.8,
    marketCapCr: 730600,
    lotSize: 750,
    isFnO: true,
    volume: 11400000,
    deliveryPercent: 54.3
  },
  {
    symbol: 'KOTAKBANK',
    name: 'Kotak Mahindra Bank Ltd.',
    sector: 'Banking',
    price: 1785.40,
    prevClose: 1792.00,
    week52High: 1932.00,
    week52Low: 1544.15,
    pe: 22.4,
    marketCapCr: 354800,
    lotSize: 400,
    isFnO: true,
    volume: 4650000,
    deliveryPercent: 59.1
  },
  {
    symbol: 'AXISBANK',
    name: 'Axis Bank Ltd.',
    sector: 'Banking',
    price: 1182.30,
    prevClose: 1174.50,
    week52High: 1339.65,
    week52Low: 968.00,
    pe: 13.9,
    marketCapCr: 365200,
    lotSize: 625,
    isFnO: true,
    volume: 7200000,
    deliveryPercent: 55.6
  },
  {
    symbol: 'INDUSINDBK',
    name: 'IndusInd Bank Ltd.',
    sector: 'Banking',
    price: 1445.00,
    prevClose: 1438.00,
    week52High: 1694.00,
    week52Low: 1332.00,
    pe: 12.1,
    marketCapCr: 112500,
    lotSize: 500,
    isFnO: true,
    volume: 3800000,
    deliveryPercent: 51.2
  },
  {
    symbol: 'BAJFINANCE',
    name: 'Bajaj Finance Ltd.',
    sector: 'Financial Services',
    price: 7240.00,
    prevClose: 7125.00,
    week52High: 8192.00,
    week52Low: 6360.00,
    pe: 29.5,
    marketCapCr: 448200,
    lotSize: 125,
    isFnO: true,
    volume: 850000,
    deliveryPercent: 48.2
  },
  {
    symbol: 'BAJAJFINSV',
    name: 'Bajaj Finserv Ltd.',
    sector: 'Financial Services',
    price: 1845.20,
    prevClose: 1822.00,
    week52High: 1995.00,
    week52Low: 1475.00,
    pe: 34.2,
    marketCapCr: 294200,
    lotSize: 500,
    isFnO: true,
    volume: 2100000,
    deliveryPercent: 49.5
  },
  {
    symbol: 'JIOFIN',
    name: 'Jio Financial Services Ltd.',
    sector: 'Financial Services',
    price: 338.40,
    prevClose: 332.60,
    week52High: 394.70,
    week52Low: 204.65,
    pe: 128.0,
    marketCapCr: 215000,
    lotSize: 2000,
    isFnO: false,
    volume: 15400000,
    deliveryPercent: 62.0
  },

  // 3. Information Technology (IT)
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd.',
    sector: 'Information Technology',
    price: 4320.50,
    prevClose: 4355.30,
    week52High: 4592.25,
    week52Low: 3313.00,
    pe: 31.8,
    marketCapCr: 1563200,
    lotSize: 175,
    isFnO: true,
    volume: 2410000,
    deliveryPercent: 66.8
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    sector: 'Information Technology',
    price: 1872.20,
    prevClose: 1854.80,
    week52High: 1991.45,
    week52Low: 1358.35,
    pe: 28.6,
    marketCapCr: 777200,
    lotSize: 400,
    isFnO: true,
    volume: 6420000,
    deliveryPercent: 63.4
  },
  {
    symbol: 'HCLTECH',
    name: 'HCL Technologies Ltd.',
    sector: 'Information Technology',
    price: 1782.50,
    prevClose: 1770.00,
    week52High: 1898.00,
    week52Low: 1195.00,
    pe: 27.4,
    marketCapCr: 483600,
    lotSize: 350,
    isFnO: true,
    volume: 2950000,
    deliveryPercent: 64.1
  },
  {
    symbol: 'WIPRO',
    name: 'Wipro Ltd.',
    sector: 'Information Technology',
    price: 524.80,
    prevClose: 521.10,
    week52High: 585.00,
    week52Low: 375.00,
    pe: 24.1,
    marketCapCr: 274300,
    lotSize: 1500,
    isFnO: true,
    volume: 7800000,
    deliveryPercent: 57.8
  },
  {
    symbol: 'TECHM',
    name: 'Tech Mahindra Ltd.',
    sector: 'Information Technology',
    price: 1610.40,
    prevClose: 1595.00,
    week52High: 1740.00,
    week52Low: 1090.00,
    pe: 45.2,
    marketCapCr: 157200,
    lotSize: 600,
    isFnO: true,
    volume: 2400000,
    deliveryPercent: 54.3
  },

  // 4. Automobile
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    sector: 'Automobile',
    price: 994.50,
    prevClose: 978.20,
    week52High: 1179.05,
    week52Low: 602.00,
    pe: 11.4,
    marketCapCr: 365800,
    lotSize: 550,
    isFnO: true,
    volume: 14200000,
    deliveryPercent: 58.7
  },
  {
    symbol: 'MARUTI',
    name: 'Maruti Suzuki India Ltd.',
    sector: 'Automobile',
    price: 12480.00,
    prevClose: 12390.00,
    week52High: 13680.00,
    week52Low: 9737.00,
    pe: 28.2,
    marketCapCr: 392500,
    lotSize: 50,
    isFnO: true,
    volume: 520000,
    deliveryPercent: 61.4
  },
  {
    symbol: 'M&M',
    name: 'Mahindra & Mahindra Ltd.',
    sector: 'Automobile',
    price: 2812.00,
    prevClose: 2780.00,
    week52High: 3222.00,
    week52Low: 1460.00,
    pe: 29.8,
    marketCapCr: 349600,
    lotSize: 200,
    isFnO: true,
    volume: 3800000,
    deliveryPercent: 59.8
  },
  {
    symbol: 'HEROMOTOCO',
    name: 'Hero MotoCorp Ltd.',
    sector: 'Automobile',
    price: 5460.00,
    prevClose: 5410.00,
    week52High: 6040.00,
    week52Low: 2930.00,
    pe: 25.6,
    marketCapCr: 109100,
    lotSize: 150,
    isFnO: true,
    volume: 780000,
    deliveryPercent: 52.6
  },
  {
    symbol: 'EICHERMOT',
    name: 'Eicher Motors Ltd.',
    sector: 'Automobile',
    price: 4890.00,
    prevClose: 4840.00,
    week52High: 5104.00,
    week52Low: 3320.00,
    pe: 34.1,
    marketCapCr: 134100,
    lotSize: 175,
    isFnO: true,
    volume: 910000,
    deliveryPercent: 56.4
  },

  // 5. Healthcare & Pharma
  {
    symbol: 'SUNPHARMA',
    name: 'Sun Pharmaceutical Industries Ltd.',
    sector: 'Healthcare & Pharma',
    price: 1845.60,
    prevClose: 1832.00,
    week52High: 1960.00,
    week52Low: 1098.00,
    pe: 39.4,
    marketCapCr: 442800,
    lotSize: 350,
    isFnO: true,
    volume: 2400000,
    deliveryPercent: 63.8
  },
  {
    symbol: 'CIPLA',
    name: 'Cipla Ltd.',
    sector: 'Healthcare & Pharma',
    price: 1612.00,
    prevClose: 1598.00,
    week52High: 1702.00,
    week52Low: 1130.00,
    pe: 28.5,
    marketCapCr: 130100,
    lotSize: 650,
    isFnO: true,
    volume: 1800000,
    deliveryPercent: 57.2
  },
  {
    symbol: 'DRREDDY',
    name: "Dr. Reddy's Laboratories Ltd.",
    sector: 'Healthcare & Pharma',
    price: 6680.00,
    prevClose: 6620.00,
    week52High: 7100.00,
    week52Low: 5212.00,
    pe: 20.3,
    marketCapCr: 111400,
    lotSize: 125,
    isFnO: true,
    volume: 640000,
    deliveryPercent: 54.9
  },
  {
    symbol: 'APOLLOHOSP',
    name: 'Apollo Hospitals Enterprise Ltd.',
    sector: 'Healthcare & Pharma',
    price: 6920.00,
    prevClose: 6865.00,
    week52High: 7420.00,
    week52Low: 4720.00,
    pe: 82.1,
    marketCapCr: 99500,
    lotSize: 125,
    isFnO: true,
    volume: 580000,
    deliveryPercent: 58.3
  },
  {
    symbol: 'DIVISLAB',
    name: "Divi's Laboratories Ltd.",
    sector: 'Healthcare & Pharma',
    price: 5210.00,
    prevClose: 5160.00,
    week52High: 5480.00,
    week52Low: 3350.00,
    pe: 65.4,
    marketCapCr: 138300,
    lotSize: 150,
    isFnO: true,
    volume: 720000,
    deliveryPercent: 51.8
  },

  // 6. FMCG & Consumer Goods
  {
    symbol: 'ITC',
    name: 'ITC Ltd.',
    sector: 'FMCG',
    price: 512.40,
    prevClose: 508.50,
    week52High: 528.50,
    week52Low: 399.30,
    pe: 30.2,
    marketCapCr: 639800,
    lotSize: 1600,
    isFnO: true,
    volume: 13500000,
    deliveryPercent: 69.4
  },
  {
    symbol: 'NESTLEIND',
    name: 'Nestle India Ltd.',
    sector: 'FMCG',
    price: 2480.00,
    prevClose: 2495.00,
    week52High: 2777.00,
    week52Low: 2145.00,
    pe: 72.8,
    marketCapCr: 239100,
    lotSize: 200,
    isFnO: true,
    volume: 780000,
    deliveryPercent: 62.1
  },
  {
    symbol: 'BRITANNIA',
    name: 'Britannia Industries Ltd.',
    sector: 'FMCG',
    price: 5920.00,
    prevClose: 5880.00,
    week52High: 6240.00,
    week52Low: 4430.00,
    pe: 64.3,
    marketCapCr: 142600,
    lotSize: 100,
    isFnO: true,
    volume: 520000,
    deliveryPercent: 59.8
  },
  {
    symbol: 'TATACONSUM',
    name: 'Tata Consumer Products Ltd.',
    sector: 'FMCG',
    price: 1185.00,
    prevClose: 1172.00,
    week52High: 1269.00,
    week52Low: 830.00,
    pe: 85.0,
    marketCapCr: 112900,
    lotSize: 450,
    isFnO: true,
    volume: 1950000,
    deliveryPercent: 58.9
  },

  // 7. Metals & Mining
  {
    symbol: 'TATASTEEL',
    name: 'Tata Steel Ltd.',
    sector: 'Metals & Mining',
    price: 154.20,
    prevClose: 152.00,
    week52High: 184.60,
    week52Low: 114.25,
    pe: 38.5,
    marketCapCr: 192500,
    lotSize: 5500,
    isFnO: true,
    volume: 38500000,
    deliveryPercent: 53.2
  },
  {
    symbol: 'JSWSTEEL',
    name: 'JSW Steel Ltd.',
    sector: 'Metals & Mining',
    price: 982.00,
    prevClose: 968.00,
    week52High: 1025.00,
    week52Low: 737.00,
    pe: 28.4,
    marketCapCr: 240200,
    lotSize: 675,
    isFnO: true,
    volume: 4800000,
    deliveryPercent: 56.4
  },
  {
    symbol: 'HINDALCO',
    name: 'Hindalco Industries Ltd.',
    sector: 'Metals & Mining',
    price: 685.00,
    prevClose: 674.00,
    week52High: 715.00,
    week52Low: 448.00,
    pe: 14.8,
    marketCapCr: 153900,
    lotSize: 1400,
    isFnO: true,
    volume: 7900000,
    deliveryPercent: 52.8
  },
  {
    symbol: 'COALINDIA',
    name: 'Coal India Ltd.',
    sector: 'Metals & Mining',
    price: 492.50,
    prevClose: 488.00,
    week52High: 543.55,
    week52Low: 268.00,
    pe: 8.2,
    marketCapCr: 303500,
    lotSize: 2100,
    isFnO: true,
    volume: 11200000,
    deliveryPercent: 60.1
  },
  {
    symbol: 'VEDL',
    name: 'Vedanta Ltd.',
    sector: 'Metals & Mining',
    price: 462.00,
    prevClose: 454.00,
    week52High: 506.00,
    week52Low: 207.00,
    pe: 15.2,
    marketCapCr: 171800,
    lotSize: 1700,
    isFnO: true,
    volume: 16800000,
    deliveryPercent: 51.0
  },

  // 8. Infrastructure, Cement & Real Estate
  {
    symbol: 'LT',
    name: 'Larsen & Toubro Ltd.',
    sector: 'Infrastructure & Capital Goods',
    price: 3640.00,
    prevClose: 3605.00,
    week52High: 3919.00,
    week52Low: 2860.00,
    pe: 37.5,
    marketCapCr: 500600,
    lotSize: 150,
    isFnO: true,
    volume: 2400000,
    deliveryPercent: 62.5
  },
  {
    symbol: 'ULTRACEMCO',
    name: 'UltraTech Cement Ltd.',
    sector: 'Cement & Building',
    price: 11280.00,
    prevClose: 11150.00,
    week52High: 12140.00,
    week52Low: 7900.00,
    pe: 44.8,
    marketCapCr: 325600,
    lotSize: 100,
    isFnO: true,
    volume: 480000,
    deliveryPercent: 61.2
  },
  {
    symbol: 'GRASIM',
    name: 'Grasim Industries Ltd.',
    sector: 'Cement & Building',
    price: 2680.00,
    prevClose: 2650.00,
    week52High: 2875.00,
    week52Low: 1850.00,
    pe: 31.0,
    marketCapCr: 182400,
    lotSize: 250,
    isFnO: true,
    volume: 1100000,
    deliveryPercent: 55.4
  },
  {
    symbol: 'DLF',
    name: 'DLF Ltd.',
    sector: 'Real Estate',
    price: 845.00,
    prevClose: 832.00,
    week52High: 967.00,
    week52Low: 485.00,
    pe: 68.0,
    marketCapCr: 209100,
    lotSize: 825,
    isFnO: true,
    volume: 5400000,
    deliveryPercent: 54.1
  },

  // 9. Telecom, Adani & Conglomerates
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd.',
    sector: 'Telecommunications',
    price: 1568.00,
    prevClose: 1548.00,
    week52High: 1680.00,
    week52Low: 890.00,
    pe: 65.0,
    marketCapCr: 894500,
    lotSize: 475,
    isFnO: true,
    volume: 5900000,
    deliveryPercent: 66.5
  },
  {
    symbol: 'ADANIENT',
    name: 'Adani Enterprises Ltd.',
    sector: 'Conglomerates',
    price: 2980.00,
    prevClose: 2940.00,
    week52High: 3345.00,
    week52Low: 2142.00,
    pe: 95.0,
    marketCapCr: 339700,
    lotSize: 300,
    isFnO: true,
    volume: 2400000,
    deliveryPercent: 44.5
  },
  {
    symbol: 'ADANIPORTS',
    name: 'Adani Ports and SEZ Ltd.',
    sector: 'Infrastructure & Ports',
    price: 1445.00,
    prevClose: 1428.00,
    week52High: 1607.00,
    week52Low: 754.00,
    pe: 35.8,
    marketCapCr: 312100,
    lotSize: 400,
    isFnO: true,
    volume: 4100000,
    deliveryPercent: 57.2
  },

  // 10. Consumer Discretionary & Retail
  {
    symbol: 'TITAN',
    name: 'Titan Company Ltd.',
    sector: 'Consumer Durables',
    price: 3620.00,
    prevClose: 3585.00,
    week52High: 3886.00,
    week52Low: 2980.00,
    pe: 88.5,
    marketCapCr: 321300,
    lotSize: 175,
    isFnO: true,
    volume: 1350000,
    deliveryPercent: 63.2
  },
  {
    symbol: 'ASIANPAINT',
    name: 'Asian Paints Ltd.',
    sector: 'Consumer & Paints',
    price: 3190.00,
    prevClose: 3160.00,
    week52High: 3422.00,
    week52Low: 2670.00,
    pe: 58.2,
    marketCapCr: 305900,
    lotSize: 200,
    isFnO: true,
    volume: 1150000,
    deliveryPercent: 61.8
  },
  {
    symbol: 'TRENT',
    name: 'Trent Ltd.',
    sector: 'Retail & Fashion',
    price: 7120.00,
    prevClose: 6980.00,
    week52High: 7650.00,
    week52Low: 2010.00,
    pe: 145.0,
    marketCapCr: 253100,
    lotSize: 100,
    isFnO: true,
    volume: 1450000,
    deliveryPercent: 56.7
  },
  {
    symbol: 'ZOMATO',
    name: 'Zomato Ltd.',
    sector: 'Consumer Internet',
    price: 264.80,
    prevClose: 258.40,
    week52High: 298.20,
    week52Low: 98.50,
    pe: 110.0,
    marketCapCr: 234100,
    lotSize: 2500,
    isFnO: false,
    volume: 34200000,
    deliveryPercent: 54.8
  },

  // 11. Defense & Capital Goods
  {
    symbol: 'HAL',
    name: 'Hindustan Aeronautics Ltd.',
    sector: 'Defense & Aerospace',
    price: 4780.00,
    prevClose: 4710.00,
    week52High: 5675.00,
    week52Low: 1920.00,
    pe: 41.5,
    marketCapCr: 319700,
    lotSize: 150,
    isFnO: true,
    volume: 2450000,
    deliveryPercent: 58.2
  },
  {
    symbol: 'BEL',
    name: 'Bharat Electronics Ltd.',
    sector: 'Defense & Electronics',
    price: 308.50,
    prevClose: 304.20,
    week52High: 340.50,
    week52Low: 129.00,
    pe: 48.0,
    marketCapCr: 225500,
    lotSize: 2200,
    isFnO: true,
    volume: 18500000,
    deliveryPercent: 61.5
  },
  {
    symbol: 'BHEL',
    name: 'Bharat Heavy Electricals Ltd.',
    sector: 'Capital Goods',
    price: 288.40,
    prevClose: 284.10,
    week52High: 335.40,
    week52Low: 118.00,
    pe: 62.0,
    marketCapCr: 100400,
    lotSize: 2625,
    isFnO: true,
    volume: 14800000,
    deliveryPercent: 49.3
  },
  {
    symbol: 'IRCTC',
    name: 'Indian Railway Catering & Tourism Corp',
    sector: 'Travel & Services',
    price: 935.00,
    prevClose: 928.00,
    week52High: 1138.90,
    week52Low: 655.00,
    pe: 58.4,
    marketCapCr: 74800,
    lotSize: 875,
    isFnO: true,
    volume: 3100000,
    deliveryPercent: 53.6
  }
];

export function buildStockQuote(def: StockDefinition): StockQuote {
  const price = def.price;
  const prevClose = def.prevClose;
  const change = +(price - prevClose).toFixed(2);
  const changePercent = +((change / prevClose) * 100).toFixed(2);
  const isBullish = change >= 0;

  const high = +(Math.max(price, prevClose) + price * 0.008).toFixed(2);
  const low = +(Math.min(price, prevClose) - price * 0.008).toFixed(2);
  const open = +(prevClose + (change * 0.3)).toFixed(2);

  const pivot = +((high + low + price) / 3).toFixed(2);
  const r1 = +(2 * pivot - low).toFixed(2);
  const s1 = +(2 * pivot - high).toFixed(2);
  const r2 = +(pivot + (high - low)).toFixed(2);
  const s2 = +(pivot - (high - low)).toFixed(2);

  const ema9 = +(price * (isBullish ? 0.995 : 1.004)).toFixed(2);
  const ema20 = +(price * (isBullish ? 0.988 : 1.012)).toFixed(2);
  const ema50 = +(price * (isBullish ? 0.978 : 1.025)).toFixed(2);
  const ema200 = +(price * (isBullish ? 0.945 : 1.055)).toFixed(2);
  const vwap = +(price * (isBullish ? 0.996 : 1.003)).toFixed(2);

  const rsi = isBullish ? +(58 + (price % 15)).toFixed(1) : +(42 - (price % 12)).toFixed(1);

  const technicals: TechnicalIndicators = {
    rsi,
    macd: {
      macd: +(price * (isBullish ? 0.005 : -0.004)).toFixed(2),
      signal: +(price * (isBullish ? 0.003 : -0.002)).toFixed(2),
      histogram: +(price * (isBullish ? 0.002 : -0.002)).toFixed(2)
    },
    ema9,
    ema20,
    ema50,
    ema200,
    sma20: ema20,
    vwap,
    atr: +(price * 0.014).toFixed(2),
    bollinger: {
      upper: +(price * 1.025).toFixed(2),
      middle: ema20,
      lower: +(price * 0.975).toFixed(2)
    },
    pivots: { r2, r1, pivot, s1, s2 },
    trendDirection: isBullish ? 'Bullish' : 'Bearish',
    breakoutStatus: isBullish 
      ? (rsi > 64 ? 'Bullish Breakout' : 'Near Resistance')
      : (rsi < 36 ? 'Bearish Breakdown' : 'Near Support'),
    deliveryPercent: def.deliveryPercent,
    volumeRatio20DMA: +(1.4 + (price % 10) / 10).toFixed(2)
  };

  const timeframeTrend: Record<Timeframe, TrendDirection> = {
    '1m': isBullish ? 'Bullish' : 'Bearish',
    '5m': isBullish ? 'Bullish' : 'Bearish',
    '15m': isBullish ? 'Bullish' : 'Neutral',
    '30m': isBullish ? 'Bullish' : 'Neutral',
    '1h': isBullish ? 'Bullish' : 'Neutral',
    '1d': isBullish ? 'Bullish' : 'Neutral',
    '1w': 'Bullish'
  };

  // Generate lightweight candle history (28 candles to keep DOM light and memory footprint ultra-lean)
  const history = generateCandles(price, 28, 0.005);

  return {
    symbol: def.symbol,
    name: def.name,
    exchange: 'NSE',
    sector: def.sector,
    price,
    change,
    changePercent,
    open,
    high,
    low,
    prevClose,
    volume: def.volume,
    deliveryPercent: def.deliveryPercent,
    week52High: def.week52High,
    week52Low: def.week52Low,
    pe: def.pe,
    marketCapCr: def.marketCapCr,
    isFnO: def.isFnO,
    lotSize: def.lotSize,
    technicals,
    timeframeTrend,
    history
  };
}

// Pre-compute all 54 stock quotes once for instant response
export const ALL_NSE_STOCKS: StockQuote[] = NSE_STOCK_DEFINITIONS.map(buildStockQuote);

export const ALL_SECTORS: string[] = [
  'All Sectors',
  'Banking',
  'Information Technology',
  'Automobile',
  'Energy & Oil',
  'Healthcare & Pharma',
  'FMCG',
  'Metals & Mining',
  'Financial Services',
  'Infrastructure & Capital Goods',
  'Power & Utilities',
  'Telecommunications',
  'Consumer Durables',
  'Retail & Fashion',
  'Consumer Internet',
  'Defense & Aerospace'
];
