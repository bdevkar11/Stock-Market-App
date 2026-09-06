import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Eye, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  BarChart3,
  Flame,
  Volume2
} from 'lucide-react';
import { MarketIndex, StockQuote, AISignal, PortfolioHolding } from '../types';

interface DashboardViewProps {
  indices: MarketIndex[];
  stocks: StockQuote[];
  signals: AISignal[];
  portfolio: PortfolioHolding[];
  onSelectStock: (stock: StockQuote) => void;
  onNavigateTab: (tab: string) => void;
  onTradeStock: (stock: StockQuote, side?: 'BUY' | 'SELL') => void;
  watchlist: string[];
  onToggleWatchlist: (symbol: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  indices,
  stocks,
  signals,
  portfolio,
  onSelectStock,
  onNavigateTab,
  onTradeStock,
  watchlist,
  onToggleWatchlist
}) => {
  const [activeMoverTab, setActiveMoverTab] = useState<'GAINERS' | 'LOSERS' | 'VOLUME'>('GAINERS');

  const broadIndices = indices.filter(i => i.category === 'broad');
  const sectorIndices = indices.filter(i => i.category === 'sector');

  // Sorted stocks across all live symbols
  const topGainers = [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 8);
  const topLosers = [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 8);
  const topVolume = [...stocks].sort((a, b) => b.volume - a.volume).slice(0, 8);

  // Portfolio aggregates
  const totalInvested = portfolio.reduce((acc, h) => acc + h.investedAmount, 0);
  const totalCurrent = portfolio.reduce((acc, h) => acc + h.currentValue, 0);
  const totalPnl = totalCurrent - totalInvested;
  const totalPnlPct = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
  const dayPnl = portfolio.reduce((acc, h) => acc + h.dayPnl, 0);

  return (
    <div className="space-y-4">
      {/* 1. Market Indices Bar / Grid */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs uppercase tracking-wider font-bold text-gray-400 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-[#F0B90B]" />
            Key Indian Indices (NSE / BSE)
          </h2>
          <span className="text-[11px] text-gray-500 font-mono">Live Institutional Stream</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {broadIndices.map((idx) => {
            const isPos = idx.change >= 0;
            return (
              <div
                key={idx.symbol}
                className="bg-[#181A20] hover:bg-[#1E2329] border border-[#2B3139] rounded-xl p-3 transition-all cursor-pointer shadow-sm group"
                onClick={() => onNavigateTab('fno')}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-xs text-[#EAECEF] group-hover:text-[#F0B90B] transition-colors">
                    {idx.name}
                  </span>
                  <span className={`text-[11px] font-mono font-bold flex items-center ${isPos ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                    {isPos ? '+' : ''}{(idx.changePercent ?? 0).toFixed(2)}%
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-base font-extrabold font-mono text-[#EAECEF]">
                    {(idx.value ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                  <span className={`text-[11px] font-mono ${isPos ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                    {isPos ? '+' : ''}{(idx.change ?? 0).toFixed(1)}
                  </span>
                </div>

                {/* Range Bar */}
                <div className="mt-2 text-[10px] text-gray-500 flex items-center justify-between font-mono">
                  <span>L: {(idx.low ?? 0).toFixed(0)}</span>
                  <div className="w-16 h-1 bg-[#2B3139] rounded-full overflow-hidden mx-1">
                    <div 
                      className={`h-full ${isPos ? 'bg-[#00C087]' : 'bg-[#FF3B69]'}`} 
                      style={{ width: `${Math.min(100, Math.max(10, (((idx.value ?? 0) - (idx.low ?? 0)) / ((idx.high ?? 0) - (idx.low ?? 0) || 1)) * 100))}%` }}
                    />
                  </div>
                  <span>H: {(idx.high ?? 0).toFixed(0)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sector Indices Mini Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none mt-1">
          {sectorIndices.map(sec => (
            <div 
              key={sec.symbol} 
              className="shrink-0 bg-[#181A20] border border-[#2B3139] px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-mono"
            >
              <span className="text-gray-400 font-semibold">{sec.symbol}</span>
              <span className="text-[#EAECEF] font-bold">{(sec.value ?? 0).toFixed(1)}</span>
              <span className={`text-[11px] font-bold ${(sec.change ?? 0) >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                {(sec.change ?? 0) >= 0 ? '+' : ''}{(sec.changePercent ?? 0).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Portfolio / P&L Quick Summary & Daily Gain */}
      <div className="bg-[#181A20] rounded-xl border border-[#2B3139] p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#2B3139]">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
              Virtual Paper Portfolio
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl sm:text-2xl font-black font-mono text-[#EAECEF]">
                ₹{totalCurrent.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
              <span className={`text-xs font-mono font-bold flex items-center ${totalPnl >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                {totalPnl >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                ₹{totalPnl.toLocaleString('en-IN', { maximumFractionDigits: 0 })} ({(totalPnlPct ?? 0).toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-gray-500 text-[10px] block">TODAY'S P&amp;L</span>
              <span className={`font-bold text-sm ${dayPnl >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                {dayPnl >= 0 ? '+' : ''}₹{dayPnl.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <button
              onClick={() => onNavigateTab('portfolio')}
              className="px-3 py-1.5 rounded-lg bg-[#1E2329] text-[#F0B90B] border border-[#2B3139] hover:bg-[#2B3139] font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer"
            >
              Open Portfolio
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 text-[11px] font-mono text-gray-400">
          <div>Invested: <span className="text-[#EAECEF] font-bold">₹{totalInvested.toLocaleString('en-IN')}</span></div>
          <div>Active Holdings: <span className="text-[#EAECEF] font-bold">{portfolio.length} Assets</span></div>
          <div>F&amp;O Positions: <span className="text-[#F0B90B] font-bold">1 Active Call</span></div>
          <div>Risk Exposure: <span className="text-[#00C087] font-bold">Low (12.4% Margin)</span></div>
        </div>
      </div>

      {/* 3. Latest AI-Generated Signals (High Probability Radar) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#1E2329] border border-[#2B3139] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#F0B90B]" />
            </div>
            <h2 className="text-xs uppercase tracking-wider font-bold text-[#EAECEF]">
              Active AI Buy/Sell Signals
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('signals')}
            className="text-xs text-[#F0B90B] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            View All Signals ({signals.length})
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {signals.slice(0, 2).map((sig) => {
            const isBuy = sig.action === 'BUY';
            const matchedStock = stocks.find(s => s.symbol === sig.symbol);

            return (
              <div 
                key={sig.id}
                className="bg-[#181A20] hover:bg-[#1E2329] border border-[#2B3139] rounded-xl p-4 transition-all shadow-sm relative overflow-hidden"
              >
                {/* Accent top border */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${isBuy ? 'bg-[#00C087]' : 'bg-[#FF3B69]'}`} />

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-black tracking-wide ${
                      isBuy ? 'bg-[#00C087]/15 text-[#00C087] border border-[#00C087]/30' : 'bg-[#FF3B69]/15 text-[#FF3B69] border border-[#FF3B69]/30'
                    }`}>
                      {sig.action}
                    </span>
                    <span className="font-extrabold text-sm text-[#EAECEF]">{sig.symbol}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{sig.expectedHorizon}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-gray-400">Confidence:</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#1E2329] border border-[#2B3139] text-[#F0B90B] font-mono font-bold text-xs">
                      {sig.confidence}%
                    </span>
                  </div>
                </div>

                {/* Entry, SL, Targets */}
                <div className="grid grid-cols-4 gap-2 my-2.5 p-2.5 bg-[#1E2329] rounded-lg border border-[#2B3139] text-center font-mono text-[11px]">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Entry Zone</span>
                    <span className="text-[#EAECEF] font-bold">₹{(sig.entryRange?.[0] ?? 0).toFixed(0)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Stop Loss</span>
                    <span className="text-[#FF3B69] font-bold">₹{(sig.stopLoss ?? 0).toFixed(0)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">Target 1</span>
                    <span className="text-[#00C087] font-bold">₹{(sig.target1 ?? 0).toFixed(0)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">R:R Ratio</span>
                    <span className="text-[#F0B90B] font-bold">{sig.riskRewardRatio}</span>
                  </div>
                </div>

                {/* Top Reason */}
                <p className="text-xs text-gray-400 line-clamp-1 italic mb-3">
                  "{sig.reasons[0]}"
                </p>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#2B3139]">
                  <button
                    onClick={() => {
                      if (matchedStock) onSelectStock(matchedStock);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-[#2B3139] hover:bg-[#363D47] text-[#EAECEF] font-medium text-xs text-center transition-colors cursor-pointer"
                  >
                    View Chart &amp; Technicals
                  </button>
                  <button
                    onClick={() => {
                      if (matchedStock) onTradeStock(matchedStock, sig.action === 'SELL' ? 'SELL' : 'BUY');
                    }}
                    className={`px-4 py-1.5 rounded-lg font-bold text-xs transition-colors shadow-sm cursor-pointer ${
                      isBuy ? 'bg-[#00C087] hover:brightness-110 text-[#0B0E11]' : 'bg-[#FF3B69] hover:brightness-110 text-white'
                    }`}
                  >
                    Trade {sig.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Market Movers: Top Gainers, Losers, Top Volume */}
      <div className="bg-[#181A20] rounded-xl border border-[#2B3139] p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xs uppercase tracking-wider font-bold text-[#EAECEF] flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#F0B90B]" />
              Market Momentum &amp; Movers
            </h2>
            <button
              onClick={() => onNavigateTab('stocks')}
              className="text-[11px] font-mono text-[#F0B90B] hover:underline cursor-pointer flex items-center gap-0.5"
            >
              Browse all {stocks.length} live stocks <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#1E2329] p-1 rounded-lg border border-[#2B3139] text-xs">
            <button
              onClick={() => setActiveMoverTab('GAINERS')}
              className={`px-3 py-1 rounded font-semibold transition-all cursor-pointer ${
                activeMoverTab === 'GAINERS' 
                  ? 'bg-[#00C087] text-[#0B0E11] font-bold' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              Top Gainers
            </button>
            <button
              onClick={() => setActiveMoverTab('LOSERS')}
              className={`px-3 py-1 rounded font-semibold transition-all cursor-pointer ${
                activeMoverTab === 'LOSERS' 
                  ? 'bg-[#FF3B69] text-white font-bold' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              Top Losers
            </button>
            <button
              onClick={() => setActiveMoverTab('VOLUME')}
              className={`px-3 py-1 rounded font-semibold transition-all cursor-pointer ${
                activeMoverTab === 'VOLUME' 
                  ? 'bg-[#F0B90B] text-[#0B0E11] font-bold' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              Top Volume
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(activeMoverTab === 'GAINERS' ? topGainers : activeMoverTab === 'LOSERS' ? topLosers : topVolume).map(st => {
            const isPos = st.change >= 0;
            const inWatch = watchlist.includes(st.symbol);

            return (
              <div
                key={st.symbol}
                className="bg-[#1E2329] hover:bg-[#2B3139] border border-[#2B3139] p-3 rounded-xl transition-all cursor-pointer group"
                onClick={() => onSelectStock(st)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-extrabold text-sm text-[#EAECEF] group-hover:text-[#F0B90B] transition-colors">
                      {st.symbol}
                    </span>
                    <span className="text-[10px] text-gray-500 block truncate max-w-[130px]">{st.name}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(st.symbol);
                    }}
                    className={`p-1 rounded-lg transition-colors cursor-pointer ${inWatch ? 'text-[#F0B90B]' : 'text-gray-600 hover:text-gray-400'}`}
                  >
                    <Eye className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <div className="flex items-baseline justify-between mt-2 font-mono">
                  <span className="text-sm font-bold text-[#EAECEF]">
                    ₹{(st.price ?? 0).toFixed(2)}
                  </span>
                  <span className={`text-xs font-bold ${isPos ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                    {isPos ? '+' : ''}{(st.changePercent ?? 0).toFixed(2)}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-2 pt-2 border-t border-[#2B3139]">
                  <span>Deliv: <strong className="text-gray-300">{st.deliveryPercent ?? 45}%</strong></span>
                  <span>RSI: <strong className="text-gray-300">{(st.technicals?.rsi ?? 50).toFixed(0)}</strong></span>
                  <span className={st.technicals?.trendDirection === 'Bullish' ? 'text-[#00C087]' : st.technicals?.trendDirection === 'Bearish' ? 'text-[#FF3B69]' : 'text-gray-400'}>
                    {st.technicals?.trendDirection || 'Neutral'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
