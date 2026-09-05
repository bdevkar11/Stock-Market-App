import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  SlidersHorizontal, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Layers, 
  BarChart2, 
  Compass, 
  Calendar,
  Zap,
  Info,
  ChevronRight
} from 'lucide-react';
import { StockQuote, Timeframe } from '../types';
import { CandlestickChart } from './CandlestickChart';

interface StockAnalysisViewProps {
  stocks: StockQuote[];
  selectedStock: StockQuote;
  onSelectStock: (stock: StockQuote) => void;
  onTradeStock: (stock: StockQuote, side?: 'BUY' | 'SELL') => void;
  onNavigateTab: (tab: string) => void;
}

export const StockAnalysisView: React.FC<StockAnalysisViewProps> = ({
  stocks,
  selectedStock,
  onSelectStock,
  onTradeStock,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'TECHNICALS' | 'PIVOTS' | 'TIMEFRAMES' | 'DELIVERY'>('TECHNICALS');

  const filteredStocks = stocks.filter(s => 
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isPos = selectedStock.change >= 0;
  const tech = selectedStock.technicals;

  return (
    <div className="space-y-4">
      {/* Top Search & Stock Selector Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#181A20] p-3 rounded-xl border border-[#2B3139] shadow-sm">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search stock by symbol, name, or sector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#EAECEF] placeholder-gray-500 focus:border-[#F0B90B] outline-none font-mono"
          />
        </div>

        {/* Quick Stock Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {stocks.slice(0, 6).map(s => (
            <button
              key={s.symbol}
              onClick={() => onSelectStock(s)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                selectedStock.symbol === s.symbol
                  ? 'bg-[#F0B90B] text-[#0B0E11] font-bold shadow-sm'
                  : 'bg-[#1E2329] text-gray-400 hover:text-[#EAECEF] border border-[#2B3139]'
              }`}
            >
              {s.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Overview Header Card */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#EAECEF] tracking-tight font-mono">
                {selectedStock.symbol}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#1E2329] text-gray-300 border border-[#2B3139]">
                {selectedStock.exchange} • EQUITY
              </span>
              {selectedStock.isFnO && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#3772FF]/15 text-[#3772FF] border border-[#3772FF]/30">
                  F&amp;O Lot: {selectedStock.lotSize}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{selectedStock.name} • <span className="text-gray-500">{selectedStock.sector}</span></p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right font-mono">
              <div className="text-2xl sm:text-3xl font-black text-[#EAECEF]">
                ₹{selectedStock.price.toFixed(2)}
              </div>
              <div className={`text-xs font-bold flex items-center justify-end gap-1 ${isPos ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                {isPos ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {isPos ? '+' : ''}{selectedStock.change.toFixed(2)} ({isPos ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)
              </div>
            </div>

            {/* Quick Buy/Sell Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                id="btn-stock-buy"
                onClick={() => onTradeStock(selectedStock, 'BUY')}
                className="px-4 py-2 rounded-lg bg-[#00C087] hover:bg-[#00a876] text-[#0B0E11] font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                BUY
              </button>
              <button
                id="btn-stock-sell"
                onClick={() => onTradeStock(selectedStock, 'SELL')}
                className="px-4 py-2 rounded-lg bg-[#FF3B69] hover:bg-[#e0325b] text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                SELL
              </button>
            </div>
          </div>
        </div>

        {/* OHLC Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-4 pt-3 border-t border-[#2B3139] text-xs font-mono">
          <div className="bg-[#1E2329] p-2.5 rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 text-[10px] block uppercase">Open</span>
            <span className="font-bold text-[#EAECEF]">₹{selectedStock.open.toFixed(2)}</span>
          </div>
          <div className="bg-[#1E2329] p-2.5 rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 text-[10px] block uppercase">High</span>
            <span className="font-bold text-[#00C087]">₹{selectedStock.high.toFixed(2)}</span>
          </div>
          <div className="bg-[#1E2329] p-2.5 rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 text-[10px] block uppercase">Low</span>
            <span className="font-bold text-[#FF3B69]">₹{selectedStock.low.toFixed(2)}</span>
          </div>
          <div className="bg-[#1E2329] p-2.5 rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 text-[10px] block uppercase">Prev Close</span>
            <span className="font-bold text-gray-300">₹{selectedStock.prevClose.toFixed(2)}</span>
          </div>
          <div className="bg-[#1E2329] p-2.5 rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 text-[10px] block uppercase">52W Range</span>
            <span className="font-bold text-gray-300 text-[11px]">
              ₹{selectedStock.week52Low.toFixed(0)} - ₹{selectedStock.week52High.toFixed(0)}
            </span>
          </div>
          <div className="bg-[#1E2329] p-2.5 rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 text-[10px] block uppercase">Trend Status</span>
            <span className={`font-bold text-[11px] ${
              tech.trendDirection === 'Bullish' ? 'text-[#00C087]' : tech.trendDirection === 'Bearish' ? 'text-[#FF3B69]' : 'text-gray-300'
            }`}>
              {tech.trendDirection}
            </span>
          </div>
        </div>
      </div>

      {/* Candlestick Interactive Chart */}
      <CandlestickChart
        candles={selectedStock.history}
        technicals={selectedStock.technicals}
        symbol={selectedStock.symbol}
        currentPrice={selectedStock.price}
      />

      {/* Technical Deep Dive Tabs */}
      <div className="bg-[#181A20] rounded-xl border border-[#2B3139] p-4 shadow-sm">
        {/* Navigation for Sub-analyses */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#2B3139]">
          <div className="flex items-center gap-1.5 bg-[#1E2329] p-1 rounded-lg border border-[#2B3139] text-xs">
            <button
              onClick={() => setActiveSubTab('TECHNICALS')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeSubTab === 'TECHNICALS' 
                  ? 'bg-[#2B3139] text-[#EAECEF] shadow-sm' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              Indicators &amp; MAs
            </button>
            <button
              onClick={() => setActiveSubTab('PIVOTS')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeSubTab === 'PIVOTS' 
                  ? 'bg-[#2B3139] text-[#EAECEF] shadow-sm' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              Support &amp; Resistance
            </button>
            <button
              onClick={() => setActiveSubTab('TIMEFRAMES')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeSubTab === 'TIMEFRAMES' 
                  ? 'bg-[#2B3139] text-[#EAECEF] shadow-sm' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              Multi-Timeframe Trend
            </button>
            <button
              onClick={() => setActiveSubTab('DELIVERY')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeSubTab === 'DELIVERY' 
                  ? 'bg-[#2B3139] text-[#EAECEF] shadow-sm' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              Delivery &amp; Volume
            </button>
          </div>

          {selectedStock.isFnO && (
            <button
              onClick={() => onNavigateTab('fno')}
              className="px-3 py-1.5 rounded-lg bg-[#3772FF]/15 text-[#3772FF] border border-[#3772FF]/30 hover:bg-[#3772FF]/25 font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              View Option Chain
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tab 1: Indicators & Moving Averages */}
        {activeSubTab === 'TECHNICALS' && (
          <div className="pt-4 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <span className="text-gray-400 text-[10px] block uppercase">9 EMA (Ultra Short)</span>
                <span className="font-bold text-[#EAECEF] text-sm">₹{tech.ema9.toFixed(2)}</span>
                <span className="text-[10px] text-[#00C087] block mt-0.5">
                  {selectedStock.price > tech.ema9 ? 'Trading Above (Bullish)' : 'Trading Below'}
                </span>
              </div>

              <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <span className="text-gray-400 text-[10px] block uppercase">20 EMA (Short-Term)</span>
                <span className="font-bold text-[#EAECEF] text-sm">₹{tech.ema20.toFixed(2)}</span>
                <span className="text-[10px] text-[#00C087] block mt-0.5">
                  {selectedStock.price > tech.ema20 ? 'Strong Support Active' : 'Under Pressure'}
                </span>
              </div>

              <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <span className="text-gray-400 text-[10px] block uppercase">50 EMA (Medium-Term)</span>
                <span className="font-bold text-[#EAECEF] text-sm">₹{tech.ema50.toFixed(2)}</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  Cross Margin: +₹{(tech.ema20 - tech.ema50).toFixed(1)}
                </span>
              </div>

              <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <span className="text-gray-400 text-[10px] block uppercase">200 EMA (Baseline)</span>
                <span className="font-bold text-[#EAECEF] text-sm">₹{tech.ema200.toFixed(2)}</span>
                <span className="text-[10px] text-[#F0B90B] block mt-0.5">
                  Long-Term Trend Baseline
                </span>
              </div>
            </div>

            {/* Momentum & Volatility Gauges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-gray-400 font-semibold">RSI (14 Period)</span>
                  <span className={`font-mono font-bold ${
                    tech.rsi > 70 ? 'text-[#F0B90B]' : tech.rsi < 30 ? 'text-[#3772FF]' : 'text-[#00C087]'
                  }`}>
                    {tech.rsi.toFixed(1)} ({tech.rsi > 70 ? 'Overbought' : tech.rsi < 30 ? 'Oversold' : 'Healthy Zone'})
                  </span>
                </div>
                <div className="w-full bg-[#0B0E11] h-2 rounded-full overflow-hidden mt-2 border border-[#2B3139]">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00C087] via-[#F0B90B] to-[#FF3B69]" 
                    style={{ width: `${Math.min(100, Math.max(0, tech.rsi))}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139] font-mono text-xs">
                <span className="text-gray-400 font-semibold block mb-1">MACD (12, 26, 9)</span>
                <div className="flex justify-between text-[11px] text-gray-300">
                  <span>MACD: <strong className="text-[#00C087]">{tech.macd.macd.toFixed(2)}</strong></span>
                  <span>Signal: <strong>{tech.macd.signal.toFixed(2)}</strong></span>
                  <span>Hist: <strong className={tech.macd.histogram >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}>
                    {tech.macd.histogram.toFixed(2)}
                  </strong></span>
                </div>
              </div>

              <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139] font-mono text-xs">
                <span className="text-gray-400 font-semibold block mb-1">Bollinger Bands &amp; ATR</span>
                <div className="flex justify-between text-[11px] text-gray-300">
                  <span>ATR: <strong>₹{tech.atr.toFixed(1)}</strong></span>
                  <span>Upper: <strong>₹{tech.bollinger.upper.toFixed(0)}</strong></span>
                  <span>Lower: <strong>₹{tech.bollinger.lower.toFixed(0)}</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pivot Points Support & Resistance */}
        {activeSubTab === 'PIVOTS' && (
          <div className="pt-4 font-mono text-xs space-y-3">
            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-[#FF3B69]/10 border border-[#FF3B69]/30">
                <span className="text-[#FF3B69] text-[10px] block uppercase font-bold">Resistance 2 (R2)</span>
                <span className="text-sm font-bold text-[#EAECEF]">₹{tech.pivots.r2.toFixed(2)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FF3B69]/10 border border-[#FF3B69]/20">
                <span className="text-[#FF3B69] text-[10px] block uppercase font-bold">Resistance 1 (R1)</span>
                <span className="text-sm font-bold text-[#EAECEF]">₹{tech.pivots.r1.toFixed(2)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#1E2329] border border-[#2B3139]">
                <span className="text-gray-400 text-[10px] block uppercase font-bold">Pivot Point (PP)</span>
                <span className="text-sm font-bold text-[#F0B90B]">₹{tech.pivots.pivot.toFixed(2)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#00C087]/10 border border-[#00C087]/20">
                <span className="text-[#00C087] text-[10px] block uppercase font-bold">Support 1 (S1)</span>
                <span className="text-sm font-bold text-[#EAECEF]">₹{tech.pivots.s1.toFixed(2)}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#00C087]/10 border border-[#00C087]/30">
                <span className="text-[#00C087] text-[10px] block uppercase font-bold">Support 2 (S2)</span>
                <span className="text-sm font-bold text-[#EAECEF]">₹{tech.pivots.s2.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 pt-2">
              Calculated using standard floor pivots from prior session's High, Low, and Close. Price is currently positioned 
              {selectedStock.price >= tech.pivots.pivot ? ' above ' : ' below '} 
              the central pivot, indicating an intraday {selectedStock.price >= tech.pivots.pivot ? 'bullish' : 'bearish'} directional bias.
            </p>
          </div>
        )}

        {/* Tab 3: Multi-Timeframe Matrix */}
        {activeSubTab === 'TIMEFRAMES' && (
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center font-mono">
              {(['1m', '5m', '15m', '30m', '1h', '1d', '1w'] as Timeframe[]).map(tf => {
                const trend = selectedStock.timeframeTrend[tf];
                const isBull = trend === 'Bullish';
                const isBear = trend === 'Bearish';

                return (
                  <div 
                    key={tf}
                    className={`p-2.5 rounded-lg border ${
                      isBull ? 'bg-[#00C087]/10 border-[#00C087]/30 text-[#00C087]' :
                      isBear ? 'bg-[#FF3B69]/10 border-[#FF3B69]/30 text-[#FF3B69]' :
                      'bg-[#1E2329] border-[#2B3139] text-gray-400'
                    }`}
                  >
                    <span className="text-[10px] uppercase block font-bold text-gray-400">{tf}</span>
                    <span className="text-xs font-black">{trend}</span>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139] flex items-center justify-between text-xs font-mono">
              <span className="text-gray-400">Timeframe Trend Alignment:</span>
              <span className="text-[#00C087] font-bold">
                85% Bullish Consensus across intraday &amp; daily charts
              </span>
            </div>
          </div>
        )}

        {/* Tab 4: Delivery & Volume */}
        {activeSubTab === 'DELIVERY' && (
          <div className="pt-4 font-mono text-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <span className="text-gray-400 text-[10px] uppercase block">Delivery Percentage</span>
                <span className="text-xl font-bold text-[#F0B90B]">{selectedStock.deliveryPercent}%</span>
                <span className="text-[10px] text-gray-400 block mt-1">
                  {selectedStock.deliveryPercent > 55 ? 'High institutional delivery buying' : 'Moderate speculative volume'}
                </span>
              </div>

              <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <span className="text-gray-400 text-[10px] uppercase block">Total Traded Volume</span>
                <span className="text-xl font-bold text-[#EAECEF]">{(selectedStock.volume / 100000).toFixed(2)} Lakh</span>
                <span className="text-[10px] text-gray-400 block mt-1">
                  Ratio to 20-DMA: <strong className="text-[#00C087]">{tech.volumeRatio20DMA}x</strong>
                </span>
              </div>

              <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
                <span className="text-gray-400 text-[10px] uppercase block">Volume Profile Quality</span>
                <span className="text-xl font-bold text-[#00C087]">Above Average</span>
                <span className="text-[10px] text-gray-400 block mt-1">
                  Volume expansion confirms price trajectory
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
