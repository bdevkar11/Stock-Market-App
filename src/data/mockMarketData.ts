import { 
  MarketIndex, 
  StockQuote, 
  AISignal, 
  OptionChainOverview, 
  OptionStrategySetup, 
  PortfolioHolding, 
  BacktestPerformance,
  BrokerIntegration,
  AdminSystemHealth,
  SignalPerformanceStats,
  HistoricalSignalLog
} from '../types';
import { ALL_NSE_STOCKS } from './allStocksData';
export { generateCandles } from './candleGenerator';

export const INITIAL_INDICES: MarketIndex[] = [
  {
    symbol: 'NIFTY 50',
    name: 'NIFTY 50',
    value: 24852.15,
    change: 142.30,
    changePercent: 0.58,
    high: 24895.40,
    low: 24710.20,
    open: 24730.00,
    prevClose: 24709.85,
    isPositive: true,
    category: 'broad'
  },
  {
    symbol: 'BANKNIFTY',
    name: 'BANK NIFTY',
    value: 51280.45,
    change: 385.20,
    changePercent: 0.76,
    high: 51390.00,
    low: 50890.15,
    open: 50920.00,
    prevClose: 50895.25,
    isPositive: true,
    category: 'broad'
  },
  {
    symbol: 'FINNIFTY',
    name: 'FIN NIFTY',
    value: 23640.80,
    change: 110.50,
    changePercent: 0.47,
    high: 23690.10,
    low: 23510.30,
    open: 23540.00,
    prevClose: 23530.30,
    isPositive: true,
    category: 'broad'
  },
  {
    symbol: 'SENSEX',
    name: 'BSE SENSEX',
    value: 81380.20,
    change: 412.90,
    changePercent: 0.51,
    high: 81520.40,
    low: 80940.10,
    open: 81010.00,
    prevClose: 80967.30,
    isPositive: true,
    category: 'broad'
  },
  {
    symbol: 'NIFTY IT',
    name: 'NIFTY IT',
    value: 42150.30,
    change: -180.40,
    changePercent: -0.43,
    high: 42420.00,
    low: 42080.10,
    open: 42350.00,
    prevClose: 42330.70,
    isPositive: false,
    category: 'sector'
  },
  {
    symbol: 'NIFTY AUTO',
    name: 'NIFTY AUTO',
    value: 25610.75,
    change: 290.15,
    changePercent: 1.15,
    high: 25680.00,
    low: 25310.40,
    open: 25340.00,
    prevClose: 25320.60,
    isPositive: true,
    category: 'sector'
  },
  {
    symbol: 'NIFTY METAL',
    name: 'NIFTY METAL',
    value: 9420.10,
    change: 145.80,
    changePercent: 1.57,
    high: 9460.00,
    low: 9280.00,
    open: 9290.00,
    prevClose: 9274.30,
    isPositive: true,
    category: 'sector'
  },
  {
    symbol: 'NIFTY PHARMA',
    name: 'NIFTY PHARMA',
    value: 21890.60,
    change: -45.20,
    changePercent: -0.21,
    high: 21980.00,
    low: 21820.00,
    open: 21940.00,
    prevClose: 21935.80,
    isPositive: false,
    category: 'sector'
  }
];

export const INITIAL_STOCKS: StockQuote[] = ALL_NSE_STOCKS;

export const INITIAL_AI_SIGNALS: AISignal[] = [
  {
    id: 'SIG-RELIANCE-01',
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Ltd.',
    action: 'BUY',
    instrumentType: 'EQUITY',
    entryRange: [2975.00, 2988.00],
    stopLoss: 2930.00,
    target1: 3045.00,
    target2: 3095.00,
    riskRewardRatio: '1:2.4',
    signalStrength: 'Strong',
    confidence: 82,
    expectedHorizon: 'Intraday',
    reasons: [
      'EMA 20 crossed above EMA 50 on 15m timeframe (Golden Cross)',
      'Price sustaining above VWAP (₹2,972.30) with expanding volume (2.35x 20DMA)',
      'RSI at 63.4 showing healthy momentum with zero negative divergence',
      'Call unwinding detected at ₹3,000 CE strike with aggressive Put buildup at ₹2,960 PE'
    ],
    timestamp: 'Today, 10:42 AM IST',
    dataFreshness: 'Real-time',
    modelUsed: 'LightGBM Multi-Factor v3.4 + Orderflow Sentiment',
    marketRegime: 'Trending Bullish'
  },
  {
    id: 'SIG-TATAMOTORS-02',
    symbol: 'TATAMOTORS',
    companyName: 'Tata Motors Ltd.',
    action: 'BUY',
    instrumentType: 'EQUITY',
    entryRange: [988.00, 996.00],
    stopLoss: 968.00,
    target1: 1025.00,
    target2: 1055.00,
    riskRewardRatio: '1:2.8',
    signalStrength: 'Strong',
    confidence: 86,
    expectedHorizon: 'Swing (1-3D)',
    reasons: [
      'High volume breakout above prior multi-week resistance (₹980 pivot)',
      'Delivery percentage surged to 58.7% indicating institutional accumulation',
      'Auto sector index outperforming Nifty 50 with relative strength score of 89/100',
      'Futures basis trading at +₹5.8 premium with fresh long buildup in open interest'
    ],
    timestamp: 'Today, 10:15 AM IST',
    dataFreshness: 'Real-time',
    modelUsed: 'RandomForest Ensemble v4.1 (Walk-Forward Validated)',
    marketRegime: 'Trending Bullish'
  },
  {
    id: 'SIG-TCS-03',
    symbol: 'TCS',
    companyName: 'Tata Consultancy Services',
    action: 'SELL',
    instrumentType: 'EQUITY',
    entryRange: [4310.00, 4325.00],
    stopLoss: 4360.00,
    target1: 4260.00,
    target2: 4220.00,
    riskRewardRatio: '1:2.2',
    signalStrength: 'Moderate',
    confidence: 74,
    expectedHorizon: 'Intraday',
    reasons: [
      'Failed retest of 20 EMA (₹4,372) following bearish MACD histogram divergence',
      'IT sector facing institutional profit booking; Nifty IT down -0.43%',
      'RSI descending below 45 mark with declining volume on pullbacks',
      'Heavy Call writing observed at ₹4,350 and ₹4,400 strikes'
    ],
    timestamp: 'Today, 10:30 AM IST',
    dataFreshness: 'Real-time',
    modelUsed: 'Gradient Boosting Time-Series Predictor v2.9',
    marketRegime: 'Rangebound'
  },
  {
    id: 'SIG-INFY-04',
    symbol: 'INFY',
    companyName: 'Infosys Ltd.',
    action: 'HOLD',
    instrumentType: 'EQUITY',
    entryRange: [1880.00, 1890.00],
    stopLoss: 1860.00,
    target1: 1920.00,
    target2: 1950.00,
    riskRewardRatio: '1:1.6',
    signalStrength: 'Weak',
    confidence: 56,
    expectedHorizon: 'Intraday',
    reasons: [
      'Consolidating inside a tight Bollinger Band squeeze (bandwidth < 4.8%)',
      'Conflicting timeframe indicators: Daily bullish vs 15m bearish chop',
      'Insufficient volume surge to confirm clear breakout or breakdown direction',
      'Model recommends waiting for confirmation above ₹1,905 or below ₹1,870'
    ],
    timestamp: 'Today, 10:38 AM IST',
    dataFreshness: 'Real-time',
    modelUsed: 'Logistic Momentum Regressor v1.8',
    marketRegime: 'Rangebound'
  },
  {
    id: 'SIG-HDFCBANK-05',
    symbol: 'HDFCBANK',
    companyName: 'HDFC Bank Ltd.',
    action: 'BUY',
    instrumentType: 'EQUITY',
    entryRange: [1648.00, 1656.00],
    stopLoss: 1630.00,
    target1: 1690.00,
    target2: 1720.00,
    riskRewardRatio: '1:2.5',
    signalStrength: 'Strong',
    confidence: 80,
    expectedHorizon: 'Swing (1-3D)',
    reasons: [
      'Institutional buying support at ₹1,630 anchored VWAP',
      'Highest delivery percentage among banking heavyweights at 68.5%',
      'Bank Nifty showing strength with private banks leading market breadth',
      'Significant Put writing at ₹1,640 and ₹1,650 strikes indicating solid floor'
    ],
    timestamp: 'Today, 09:50 AM IST',
    dataFreshness: 'Real-time',
    modelUsed: 'LightGBM Multi-Factor v3.4 + Orderflow Sentiment',
    marketRegime: 'Trending Bullish'
  }
];

export function generateOptionChain(symbol: string = 'NIFTY 50', spotPrice: number = 24852.15): OptionChainOverview {
  const step = symbol === 'NIFTY 50' ? 50 : symbol === 'BANKNIFTY' ? 100 : 20;
  const atmStrike = Math.round(spotPrice / step) * step;
  const strikeCount = 13;
  const startStrike = atmStrike - Math.floor(strikeCount / 2) * step;
  
  const strikes = [];
  let totalCallOI = 0;
  let totalPutOI = 0;
  let highestCallOI = 0;
  let highestCallOIStrike = 0;
  let highestPutOI = 0;
  let highestPutOIStrike = 0;

  for (let i = 0; i < strikeCount; i++) {
    const strike = startStrike + i * step;
    const isCallITM = strike < spotPrice;
    const isPutITM = strike > spotPrice;
    const distFromAtm = (strike - spotPrice) / spotPrice;
    
    // Call pricing & OI calculation
    const callIntrinsic = Math.max(0, spotPrice - strike);
    const callTimeValue = Math.max(12, Math.abs(spotPrice * 0.012) * Math.exp(-Math.pow(distFromAtm * 20, 2)));
    const callLtp = +(callIntrinsic + callTimeValue).toFixed(2);
    const callBid = +(callLtp * 0.995).toFixed(2);
    const callAsk = +(callLtp * 1.005).toFixed(2);
    const callDelta = +(0.5 - distFromAtm * 8).toFixed(2);
    const clampedCallDelta = Math.min(0.98, Math.max(0.02, callDelta));
    const callIV = +(12.5 + Math.abs(distFromAtm) * 35).toFixed(1);
    const callOI = Math.floor(45000 + Math.random() * 190000 * Math.exp(-Math.pow(distFromAtm * 12, 2)));
    const callOIChange = Math.floor((Math.random() - 0.4) * 35000);
    const callVolume = Math.floor(callOI * (0.8 + Math.random() * 1.5));

    // Put pricing & OI calculation
    const putIntrinsic = Math.max(0, strike - spotPrice);
    const putTimeValue = callTimeValue * 1.02; // Put skew
    const putLtp = +(putIntrinsic + putTimeValue).toFixed(2);
    const putBid = +(putLtp * 0.995).toFixed(2);
    const putAsk = +(putLtp * 1.005).toFixed(2);
    const putDelta = +(clampedCallDelta - 1).toFixed(2);
    const putIV = +(13.8 + Math.abs(distFromAtm) * 38).toFixed(1);
    const putOI = Math.floor(48000 + Math.random() * 210000 * Math.exp(-Math.pow(distFromAtm * 12, 2)));
    const putOIChange = Math.floor((Math.random() - 0.3) * 38000);
    const putVolume = Math.floor(putOI * (0.9 + Math.random() * 1.4));

    totalCallOI += callOI;
    totalPutOI += putOI;

    if (callOI > highestCallOI) {
      highestCallOI = callOI;
      highestCallOIStrike = strike;
    }
    if (putOI > highestPutOI) {
      highestPutOI = putOI;
      highestPutOIStrike = strike;
    }

    strikes.push({
      strikePrice: strike,
      calls: {
        ltp: callLtp,
        change: +(callLtp * 0.08 * (Math.random() > 0.4 ? 1 : -1)).toFixed(2),
        changePercent: +(Math.random() * 18 * (Math.random() > 0.4 ? 1 : -1)).toFixed(1),
        bid: callBid,
        ask: callAsk,
        oi: callOI,
        oiChange: callOIChange,
        oiChangePercent: +(callOIChange / (callOI || 1) * 100).toFixed(1),
        volume: callVolume,
        iv: Number(callIV),
        delta: clampedCallDelta,
        gamma: 0.0018,
        theta: -14.2,
        vega: 8.5,
        inTheMoney: isCallITM
      },
      puts: {
        ltp: putLtp,
        change: +(putLtp * 0.08 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2),
        changePercent: +(Math.random() * 18 * (Math.random() > 0.5 ? 1 : -1)).toFixed(1),
        bid: putBid,
        ask: putAsk,
        oi: putOI,
        oiChange: putOIChange,
        oiChangePercent: +(putOIChange / (putOI || 1) * 100).toFixed(1),
        volume: putVolume,
        iv: Number(putIV),
        delta: Number(putDelta),
        gamma: 0.0018,
        theta: -13.8,
        vega: 8.7,
        inTheMoney: isPutITM
      }
    });
  }

  const pcr = +(totalPutOI / (totalCallOI || 1)).toFixed(2);
  const pcrSentiment = pcr > 1.25 ? 'Bullish' : pcr < 0.75 ? 'Bearish' : 'Neutral';
  const futuresPrice = +(spotPrice * 1.0024).toFixed(2);
  const futuresBasis = +(futuresPrice - spotPrice).toFixed(2);

  return {
    underlyingSymbol: symbol,
    underlyingLtp: spotPrice,
    spotChange: 142.30,
    spotChangePercent: 0.58,
    expiryDates: ['12-SEP-2024 (Weekly)', '19-SEP-2024 (Weekly)', '26-SEP-2024 (Monthly)', '31-OCT-2024 (Monthly)'],
    selectedExpiry: '12-SEP-2024 (Weekly)',
    pcr,
    pcrSentiment,
    maxPain: atmStrike,
    highestCallOIStrike,
    highestPutOIStrike,
    totalCallOI,
    totalPutOI,
    futuresPrice,
    futuresBasis,
    costOfCarryPct: 6.8,
    oiBuildup: 'Long Buildup',
    strikes
  };
}

export const INITIAL_OPTION_STRATEGIES: OptionStrategySetup[] = [
  {
    id: 'OPT-NIFTY-BULLCALL-01',
    strategyName: 'BULL CALL SPREAD',
    symbol: 'NIFTY 50',
    strikes: 'Buy 24850 CE & Sell 25050 CE',
    expiry: '12-SEP-2024',
    entryPremium: 82.50,
    stopLossPremium: 42.00,
    targetPremium: 145.00,
    maxProfit: '₹5,875 (per lot)',
    maxRisk: '₹2,062 (per lot)',
    riskReward: '1:2.85',
    pop: 68.4,
    confidence: 84,
    reasons: [
      'NIFTY holding comfortably above 20 EMA support at 24,730',
      'PCR at 1.18 indicates solid put writing support with rising base',
      'IV rank moderate at 16.4%; spread minimizes vega exposure and theta decay',
      'Target resistance at 25,050 coincides with major Call OI cluster'
    ],
    lotSize: 25,
    dataQuality: 'High Liquidity'
  },
  {
    id: 'OPT-BANKNIFTY-BUYCALL-02',
    strategyName: 'BUY CALL',
    symbol: 'BANKNIFTY',
    strikes: 'Buy 51200 CE',
    expiry: '11-SEP-2024',
    entryPremium: 215.00,
    stopLossPremium: 140.00,
    targetPremium: 380.00,
    maxProfit: 'Unlimited (Target: ₹2,475/lot)',
    maxRisk: '₹3,225 (per lot)',
    riskReward: '1:2.2',
    pop: 62.1,
    confidence: 79,
    reasons: [
      'Private banking index breakout supported by HDFC Bank and ICICI Bank volume',
      'Short covering triggered at 51,000 Call strike with 1.2M shares shed',
      'Momentum acceleration above morning high of 51,240',
      'Delta at 0.54 offers excellent participation with defined stop loss'
    ],
    lotSize: 15,
    dataQuality: 'High Liquidity'
  },
  {
    id: 'OPT-RELIANCE-COVEREDCALL-03',
    strategyName: 'COVERED CALL',
    symbol: 'RELIANCE',
    strikes: 'Hold Cash Shares + Sell 3040 CE',
    expiry: '26-SEP-2024',
    entryPremium: 38.50,
    stopLossPremium: 65.00,
    targetPremium: 8.00,
    maxProfit: '₹9,625 (per lot cash)',
    maxRisk: 'Downside equity buffered by ₹38.5',
    riskReward: '1:1.9',
    pop: 74.2,
    confidence: 81,
    reasons: [
      'Implied Volatility elevated prior to upcoming enterprise announcement',
      'High Call open interest barrier at ₹3,050 acts as strong ceiling',
      'Generates 1.3% monthly synthetic yield on delivery holdings',
      'Favorable theta decay curve over next 18 trading sessions'
    ],
    lotSize: 250,
    dataQuality: 'High Liquidity'
  },
  {
    id: 'OPT-TCS-BEARPUT-04',
    strategyName: 'BEAR PUT SPREAD',
    symbol: 'TCS',
    strikes: 'Buy 4320 PE & Sell 4240 PE',
    expiry: '26-SEP-2024',
    entryPremium: 28.00,
    stopLossPremium: 14.00,
    targetPremium: 58.00,
    maxProfit: '₹5,600 (per lot)',
    maxRisk: '₹2,450 (per lot)',
    riskReward: '1:2.28',
    pop: 64.8,
    confidence: 73,
    reasons: [
      'Rejection from descending 50-day moving average on daily chart',
      'Sectoral underperformance; foreign institutional selling in IT segment',
      'Defined downside risk protects against sudden bounce off ₹4,200 support'
    ],
    lotSize: 175,
    dataQuality: 'High Liquidity'
  },
  {
    id: 'OPT-INFY-NOTRADE-05',
    strategyName: 'NO TRADE',
    symbol: 'INFY',
    strikes: 'N/A — Squeeze In Progress',
    expiry: 'Current Week',
    entryPremium: 0,
    stopLossPremium: 0,
    targetPremium: 0,
    maxProfit: '₹0',
    maxRisk: '₹0',
    riskReward: 'N/A',
    pop: 0,
    confidence: 45,
    reasons: [
      'Implied volatility drop combined with rangebound consolidation below ₹1,900',
      'Risk/Reward ratio does not satisfy minimum threshold of 1:2.0',
      'Model advises preserving capital until directional range breakout occurs'
    ],
    lotSize: 400,
    dataQuality: 'Moderate'
  }
];

export const INITIAL_PORTFOLIO: PortfolioHolding[] = [
  {
    id: 'HOLD-01',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    instrument: 'EQUITY',
    quantity: 100,
    avgPrice: 2890.00,
    currentPrice: 2985.40,
    pnl: 9540.00,
    pnlPercent: 3.30,
    dayPnl: 4870.00,
    investedAmount: 289000.00,
    currentValue: 298540.00,
    sector: 'Energy'
  },
  {
    id: 'HOLD-02',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    instrument: 'EQUITY',
    quantity: 200,
    avgPrice: 1610.50,
    currentPrice: 1654.80,
    pnl: 8860.00,
    pnlPercent: 2.75,
    dayPnl: 4480.00,
    investedAmount: 322100.00,
    currentValue: 330960.00,
    sector: 'Banking'
  },
  {
    id: 'HOLD-03',
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    instrument: 'EQUITY',
    quantity: 150,
    avgPrice: 945.00,
    currentPrice: 994.50,
    pnl: 7425.00,
    pnlPercent: 5.24,
    dayPnl: 4215.00,
    investedAmount: 141750.00,
    currentValue: 149175.00,
    sector: 'Auto'
  },
  {
    id: 'HOLD-04',
    symbol: 'NIFTY 24850 CE',
    name: 'NIFTY 12-SEP 24850 CE',
    instrument: 'OPTIONS',
    quantity: 50,
    avgPrice: 110.00,
    currentPrice: 138.40,
    pnl: 1420.00,
    pnlPercent: 25.81,
    dayPnl: 1420.00,
    investedAmount: 5500.00,
    currentValue: 6920.00,
    sector: 'Index F&O'
  }
];

export const BACKTEST_PERFORMANCE: BacktestPerformance = {
  winRate: 72.4,
  profitFactor: 2.18,
  maxDrawdown: -8.3,
  sharpeRatio: 1.94,
  totalTrades: 1482,
  avgRiskReward: '1:2.34',
  sampleSizeDays: 730,
  slippageIncludedBps: 15,
  regimePerformance: [
    { regime: 'Trending Bullish', winRate: 78.6, trades: 620, profitFactor: 2.65 },
    { regime: 'Trending Bearish', winRate: 73.2, trades: 395, profitFactor: 2.15 },
    { regime: 'Rangebound / Chop', winRate: 61.4, trades: 312, profitFactor: 1.54 },
    { regime: 'High Volatility / Events', winRate: 67.8, trades: 155, profitFactor: 1.88 }
  ],
  recentHistoricalSignals: [
    {
      id: 'HIST-01',
      symbol: 'TATAMOTORS',
      action: 'BUY',
      date: '04-Sep-2024',
      entry: 968.00,
      exit: 996.00,
      returnPercent: 2.89,
      result: 'Target 1 Hit',
      holdingPeriod: '1 Day'
    },
    {
      id: 'HIST-02',
      symbol: 'BHARTIARTL',
      action: 'BUY',
      date: '03-Sep-2024',
      entry: 1510.00,
      exit: 1552.00,
      returnPercent: 2.78,
      result: 'Target 2 Hit',
      holdingPeriod: '2 Days'
    },
    {
      id: 'HIST-03',
      symbol: 'WIPRO',
      action: 'SELL',
      date: '02-Sep-2024',
      entry: 518.00,
      exit: 504.00,
      returnPercent: 2.70,
      result: 'Target 1 Hit',
      holdingPeriod: '4 Hours'
    },
    {
      id: 'HIST-04',
      symbol: 'AXISBANK',
      action: 'BUY',
      date: '29-Aug-2024',
      entry: 1175.00,
      exit: 1162.00,
      returnPercent: -1.10,
      result: 'Stop Loss Hit',
      holdingPeriod: '3 Hours'
    },
    {
      id: 'HIST-05',
      symbol: 'ICICIBANK',
      action: 'BUY',
      date: '28-Aug-2024',
      entry: 1195.00,
      exit: 1230.00,
      returnPercent: 2.92,
      result: 'Target 2 Hit',
      holdingPeriod: '3 Days'
    }
  ]
};

export const BROKER_INTEGRATIONS: BrokerIntegration[] = [
  {
    id: 'ZERODHA',
    name: 'Zerodha Kite Connect',
    status: 'SANDBOX',
    authType: 'OAuth 2.0 + TOTP',
    features: ['Real-time WebSocket Ticks', 'Order Execution (CNC/MIS)', 'GTT Triggers', 'Option Chain'],
    latencyMs: 14,
    description: 'Direct institutional gateway to Zerodha OMS. Paper trading active.'
  },
  {
    id: 'UPSTOX',
    name: 'Upstox v2 API',
    status: 'DISCONNECTED',
    authType: 'OAuth 2.0 + TOTP',
    features: ['Historical Feeds', 'Multi-Leg F&O Orders', 'Portfolio Synchronization'],
    latencyMs: 18,
    description: 'SEBI-registered broker integration. Ready for API token configuration.'
  },
  {
    id: 'ANGELONE',
    name: 'Angel One SmartAPI',
    status: 'DISCONNECTED',
    authType: 'SmartAPI JWT',
    features: ['Feed & Live Quotes', 'Bracket Orders', 'Option Greeks Stream'],
    latencyMs: 22,
    description: 'High-speed trading endpoint supporting systematic algo execution.'
  },
  {
    id: 'DHAN',
    name: 'Dhan HQ API',
    status: 'DISCONNECTED',
    authType: 'API Key + Secret',
    features: ['Superfast Webhooks', 'Advanced Option Strategies', 'Instant Margin Calc'],
    latencyMs: 12,
    description: 'Tailored for professional F&O traders with deep option chain connectivity.'
  }
];

export const ADMIN_SYSTEM_HEALTH: AdminSystemHealth = {
  dataFeedLatencyMs: 14,
  nseApiStatus: 'Operational',
  bseApiStatus: 'Operational',
  signalEngineStatus: 'Healthy',
  activeTradersCount: 4280,
  signalsGenerated24h: 128,
  modelDriftRate: '0.42% (Optimal)',
  modelVersion: 'v4.2.1-ensemble-prod',
  serverUptimeHours: 742
};

export const INITIAL_SIGNALS: AISignal[] = INITIAL_AI_SIGNALS;

export const INITIAL_PERFORMANCE_STATS: SignalPerformanceStats = {
  winRate: 72.4,
  profitFactor: 2.18,
  maxDrawdown: 8.3,
  sharpeRatio: 1.94,
  totalTrades: 1482,
  winningTrades: 1073,
  losingTrades: 409,
  averageRR: '1:2.34',
  byMarketCondition: {
    bullishTrend: 78.5,
    bearishTrend: 71.2,
    sideways: 61.4,
    highVolatility: 67.8
  }
};

export const INITIAL_HISTORICAL_LOGS: HistoricalSignalLog[] = [
  {
    id: 'LOG-01',
    symbol: 'RELIANCE',
    action: 'BUY',
    entryDate: '24 Mar 2026',
    entryPrice: 2840.00,
    exitPrice: 2915.00,
    returnPercent: 2.64,
    targetAchieved: 'Target 1 Hit',
    holdingTime: '2h 15m'
  },
  {
    id: 'LOG-02',
    symbol: 'TATAMOTORS',
    action: 'BUY',
    entryDate: '23 Mar 2026',
    entryPrice: 978.00,
    exitPrice: 1018.00,
    returnPercent: 4.09,
    targetAchieved: 'Target 2 Hit',
    holdingTime: '1D 4h'
  },
  {
    id: 'LOG-03',
    symbol: 'TCS',
    action: 'SELL',
    entryDate: '22 Mar 2026',
    entryPrice: 4340.00,
    exitPrice: 4275.00,
    returnPercent: 1.50,
    targetAchieved: 'Target 1 Hit',
    holdingTime: '4h 10m'
  },
  {
    id: 'LOG-04',
    symbol: 'INFY',
    action: 'BUY',
    entryDate: '21 Mar 2026',
    entryPrice: 1890.00,
    exitPrice: 1865.00,
    returnPercent: -1.32,
    targetAchieved: 'Stop-Loss Hit',
    holdingTime: '1h 45m'
  },
  {
    id: 'LOG-05',
    symbol: 'ICICIBANK',
    action: 'BUY',
    entryDate: '20 Mar 2026',
    entryPrice: 1225.00,
    exitPrice: 1262.00,
    returnPercent: 3.02,
    targetAchieved: 'Target 1 Hit',
    holdingTime: '1D 1h'
  }
];

