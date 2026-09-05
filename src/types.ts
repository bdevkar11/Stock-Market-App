export type MarketStatus = 'OPEN' | 'CLOSED' | 'PRE_OPEN' | 'POST_CLOSE';

export type Timeframe = '1m' | '5m' | '15m' | '30m' | '1h' | '1d' | '1w';

export type TrendDirection = 'Bullish' | 'Bearish' | 'Neutral';

export type SignalAction = 'BUY' | 'SELL' | 'HOLD';

export type SignalStrength = 'Strong' | 'Moderate' | 'Weak';

export type DataFreshness = 'Real-time' | '15m Delayed' | 'EOD';

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  isPositive: boolean;
  category: 'broad' | 'sector';
}

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  vwap?: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: {
    macd: number;
    signal: number;
    histogram: number;
  };
  ema9: number;
  ema20: number;
  ema50: number;
  ema200: number;
  sma20: number;
  vwap: number;
  atr: number;
  bollinger: {
    upper: number;
    middle: number;
    lower: number;
  };
  pivots: {
    r2: number;
    r1: number;
    pivot: number;
    s1: number;
    s2: number;
  };
  trendDirection: TrendDirection;
  breakoutStatus: 'Bullish Breakout' | 'Bearish Breakdown' | 'Consolidation' | 'Near Resistance' | 'Near Support';
  deliveryPercent: number;
  volumeRatio20DMA: number;
}

export interface StockQuote {
  symbol: string;
  name: string;
  exchange: 'NSE' | 'BSE';
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  volume: number;
  deliveryPercent: number;
  week52High: number;
  week52Low: number;
  pe: number;
  marketCapCr: number;
  isFnO: boolean;
  lotSize: number;
  technicals: TechnicalIndicators;
  timeframeTrend: Record<Timeframe, TrendDirection>;
  history: Candle[];
}

export interface AISignal {
  id: string;
  symbol: string;
  companyName: string;
  action: SignalAction;
  instrumentType: 'EQUITY' | 'FUTURES' | 'OPTIONS';
  entryRange: [number, number];
  stopLoss: number;
  target1: number;
  target2: number;
  riskRewardRatio: string;
  signalStrength: SignalStrength;
  confidence: number; // e.g. 78 (%)
  expectedHorizon: 'Intraday' | 'Swing (1-3D)' | 'Positional (1-2W)';
  reasons: string[];
  timestamp: string;
  dataFreshness: DataFreshness;
  modelUsed: string; // e.g. 'LightGBM Multi-Factor v3.2 + Deep Volatility Transformer'
  marketRegime: 'Trending Bullish' | 'Trending Bearish' | 'Rangebound' | 'High Volatility';
}

export interface OptionData {
  ltp: number;
  change: number;
  changePercent: number;
  bid: number;
  ask: number;
  oi: number;
  oiChange: number;
  oiChangePercent: number;
  volume: number;
  iv: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  inTheMoney: boolean;
}

export interface OptionStrike {
  strikePrice: number;
  calls: OptionData;
  puts: OptionData;
}

export type OIBuildupType = 'Long Buildup' | 'Short Buildup' | 'Short Covering' | 'Long Unwinding';

export interface OptionChainOverview {
  underlyingSymbol: string;
  underlyingLtp: number;
  spotChange: number;
  spotChangePercent: number;
  expiryDates: string[];
  selectedExpiry: string;
  pcr: number;
  pcrSentiment: 'Bullish' | 'Bearish' | 'Neutral';
  maxPain: number;
  highestCallOIStrike: number;
  highestPutOIStrike: number;
  totalCallOI: number;
  totalPutOI: number;
  futuresPrice: number;
  futuresBasis: number;
  costOfCarryPct: number;
  oiBuildup: OIBuildupType;
  strikes: OptionStrike[];
}

export type OptionStrategyType = 
  | 'BUY CALL' 
  | 'BUY PUT' 
  | 'BULL CALL SPREAD' 
  | 'BEAR PUT SPREAD' 
  | 'COVERED CALL' 
  | 'IRON CONDOR' 
  | 'NO TRADE';

export interface OptionStrategySetup {
  id: string;
  strategyName: OptionStrategyType;
  symbol: string;
  strikes: string;
  expiry: string;
  entryPremium: number;
  stopLossPremium: number;
  targetPremium: number;
  maxProfit: string;
  maxRisk: string;
  riskReward: string;
  pop: number; // Probability of Profit %
  confidence: number;
  reasons: string[];
  lotSize: number;
  dataQuality: 'High Liquidity' | 'Moderate' | 'Insufficient Liquidity';
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  name?: string;
  companyName?: string;
  product?: 'CNC' | 'MIS' | 'NRML';
  instrument: 'EQUITY' | 'FUTURES' | 'OPTIONS';
  quantity: number;
  avgPrice?: number;
  avgBuyPrice?: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  dayPnl: number;
  investedAmount: number;
  currentValue: number;
  sector?: string;
}

export interface PaperTradeOrder {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  product: 'CNC' | 'MIS' | 'NRML';
  orderType: 'MARKET' | 'LIMIT' | 'SL';
  quantity: number;
  price: number;
  triggerPrice?: number;
  status: 'EXECUTED' | 'PENDING' | 'CANCELLED';
  timestamp: string;
  instrument: 'EQUITY' | 'FUTURES' | 'OPTIONS';
}

export interface MarketAlert {
  id: string;
  symbol: string;
  conditionType: 'PRICE_ABOVE' | 'PRICE_BELOW' | 'BREAKOUT' | 'RSI_CONDITION' | 'EMA_CROSSOVER' | 'OI_SPIKE' | 'SIGNAL_GENERATED';
  title: string;
  targetValue: string | number;
  isTriggered: boolean;
  createdAt: string;
  triggeredAt?: string;
  pushEnabled: boolean;
}

export interface BacktestPerformance {
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  sharpeRatio: number;
  totalTrades: number;
  avgRiskReward: string;
  sampleSizeDays: number;
  slippageIncludedBps: number;
  regimePerformance: {
    regime: string;
    winRate: number;
    trades: number;
    profitFactor: number;
  }[];
  recentHistoricalSignals: {
    id: string;
    symbol: string;
    action: SignalAction;
    date: string;
    entry: number;
    exit: number;
    returnPercent: number;
    result: 'Target 1 Hit' | 'Target 2 Hit' | 'Stop Loss Hit' | 'Trailing Exit';
    holdingPeriod: string;
  }[];
}

export interface BrokerIntegration {
  id: string;
  name: string;
  status: 'CONNECTED' | 'SANDBOX' | 'DISCONNECTED';
  authType: 'OAuth 2.0 + TOTP' | 'API Key + Secret' | 'SmartAPI JWT';
  features: string[];
  latencyMs: number;
  description: string;
}

export interface AdminSystemHealth {
  dataFeedLatencyMs: number;
  nseApiStatus: 'Operational' | 'Degraded' | 'Offline';
  bseApiStatus: 'Operational' | 'Degraded' | 'Offline';
  signalEngineStatus: 'Healthy' | 'Re-training' | 'Idle';
  activeTradersCount: number;
  signalsGenerated24h: number;
  modelDriftRate: string;
  modelVersion: string;
  serverUptimeHours: number;
}

export interface SystemHealth {
  status: 'OPTIMAL' | 'DEGRADED' | 'MAINTENANCE';
  feedLatencyMs: number;
  activeTraders: number;
  signalsGenerated24h: number;
  modelAccuracy30d: number;
  dataProviderStatus: {
    nseTicks: 'CONNECTED' | 'DISCONNECTED';
    optionChainFeed: 'CONNECTED' | 'DISCONNECTED';
    historicalDatabase: 'CONNECTED' | 'DISCONNECTED';
    aiEngine: 'CONNECTED' | 'DISCONNECTED';
  };
  lastUpdated: string;
}

export interface BrokerConfig {
  brokerName: string;
  isConnected: boolean;
  apiKeyMasked: string;
  mode: 'LIVE' | 'SANDBOX';
  pingMs: number;
  statusMessage: string;
}

export interface SignalPerformanceStats {
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  sharpeRatio: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  averageRR: string;
  byMarketCondition: {
    bullishTrend: number;
    bearishTrend: number;
    sideways: number;
    highVolatility: number;
  };
}

export interface HistoricalSignalLog {
  id: string;
  symbol: string;
  action: SignalAction;
  entryDate: string;
  entryPrice: number;
  exitPrice: number;
  returnPercent: number;
  targetAchieved: 'Target 1 Hit' | 'Target 2 Hit' | 'Stop-Loss Hit';
  holdingTime: string;
}

export interface TradingJournalEntry {
  id: string;
  date: string;
  symbol: string;
  tradeType: string;
  pnl: number;
  mistake: string;
  disciplineScore: number;
  notes: string;
}

