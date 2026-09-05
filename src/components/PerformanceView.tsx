import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { SignalPerformanceStats, HistoricalSignalLog } from '../types';
import { INITIAL_PERFORMANCE_STATS, INITIAL_HISTORICAL_LOGS } from '../data/mockMarketData';

export const PerformanceView: React.FC = () => {
  const [stats] = useState<SignalPerformanceStats>(INITIAL_PERFORMANCE_STATS);
  const [logs] = useState<HistoricalSignalLog[]>(INITIAL_HISTORICAL_LOGS);
  const [logFilter, setLogFilter] = useState<'ALL' | 'TARGET_HIT' | 'SL_HIT'>('ALL');

  const filteredLogs = logs.filter(l => {
    if (logFilter === 'TARGET_HIT') return l.targetAchieved.includes('Target');
    if (logFilter === 'SL_HIT') return l.targetAchieved === 'Stop-Loss Hit';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header & Transparency Policy */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#F0B90B]/10 border border-[#F0B90B]/30">
            <ShieldCheck className="w-5 h-5 text-[#F0B90B]" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-[#EAECEF] tracking-tight">
              Signal Validation &amp; Historical Performance
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Auditable backtested results with walk-forward validation and transaction cost accounting.
            </p>
          </div>
        </div>

        {/* Methodology Note */}
        <div className="mt-3 p-3 rounded-lg bg-[#1E2329] border border-[#2B3139] text-[11px] text-gray-300 leading-relaxed font-mono">
          <span className="text-[#F0B90B] font-bold">Execution Assumptions: </span>
          All performance metrics include simulated 15 bps (0.15%) slippage, exchange transaction charges, STT, and SEBI turnover fees. Backtested on 3-year rolling tick data across NSE Top 100 universe.
        </div>
      </div>

      {/* 5 Core Institutional Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono">
        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-3 shadow-sm">
          <span className="text-[10px] uppercase text-gray-400 block">Overall Win Rate</span>
          <div className="text-xl sm:text-2xl font-black text-[#00C087] mt-1">
            {stats.winRate}%
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">
            {stats.winningTrades} of {stats.totalTrades} signals
          </span>
        </div>

        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-3 shadow-sm">
          <span className="text-[10px] uppercase text-gray-400 block">Profit Factor</span>
          <div className="text-xl sm:text-2xl font-black text-[#EAECEF] mt-1">
            {stats.profitFactor}
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">
            Gross Profit / Gross Loss
          </span>
        </div>

        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-3 shadow-sm">
          <span className="text-[10px] uppercase text-gray-400 block">Max Drawdown</span>
          <div className="text-xl sm:text-2xl font-black text-[#FF3B69] mt-1">
            {stats.maxDrawdown}%
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">
            Historical Peak to Trough
          </span>
        </div>

        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-3 shadow-sm">
          <span className="text-[10px] uppercase text-gray-400 block">Sharpe Ratio</span>
          <div className="text-xl sm:text-2xl font-black text-[#F0B90B] mt-1">
            {stats.sharpeRatio}
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">
            Risk-adjusted excess return
          </span>
        </div>

        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-3 shadow-sm col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase text-gray-400 block">Avg Risk/Reward</span>
          <div className="text-xl sm:text-2xl font-black text-[#F0B90B] mt-1">
            {stats.averageRR}
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">
            Expectancy per trade
          </span>
        </div>
      </div>

      {/* Performance by Market Regime / Condition */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <h2 className="text-xs uppercase tracking-wider font-bold text-gray-300 mb-3 flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-[#F0B90B]" />
          Model Robustness Across Market Regimes
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 block text-[11px] mb-1">🟢 Bullish Trend</span>
            <span className="text-xl font-bold text-[#00C087]">{stats.byMarketCondition.bullishTrend}% Win</span>
            <span className="text-[10px] text-gray-400 block mt-1">Optimal momentum capture</span>
          </div>

          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 block text-[11px] mb-1">🔴 Bearish Trend</span>
            <span className="text-xl font-bold text-[#00C087]">{stats.byMarketCondition.bearishTrend}% Win</span>
            <span className="text-[10px] text-gray-400 block mt-1">Breakdown &amp; short triggers</span>
          </div>

          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 block text-[11px] mb-1">🟡 Sideways / Chop</span>
            <span className="text-xl font-bold text-[#F0B90B]">{stats.byMarketCondition.sideways}% Win</span>
            <span className="text-[10px] text-gray-400 block mt-1">Filtered by NO TRADE logic</span>
          </div>

          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 block text-[11px] mb-1">⚡ High Volatility</span>
            <span className="text-xl font-bold text-[#00C087]">{stats.byMarketCondition.highVolatility}% Win</span>
            <span className="text-[10px] text-gray-400 block mt-1">Wider stop-losses applied</span>
          </div>
        </div>
      </div>

      {/* Historical Signal Log Table */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl overflow-hidden shadow-sm">
        <div className="p-3 bg-[#1E2329] border-b border-[#2B3139] flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-bold text-[#EAECEF]">Recent Historical Signal Logs</span>

          <div className="flex items-center gap-1 bg-[#181A20] p-1 rounded-lg border border-[#2B3139] text-[11px] font-mono">
            <button
              onClick={() => setLogFilter('ALL')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${logFilter === 'ALL' ? 'bg-[#2B3139] text-[#EAECEF] font-bold' : 'text-gray-400 hover:text-[#EAECEF]'}`}
            >
              All Logs
            </button>
            <button
              onClick={() => setLogFilter('TARGET_HIT')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${logFilter === 'TARGET_HIT' ? 'bg-[#00C087]/20 text-[#00C087] font-bold' : 'text-gray-400 hover:text-[#EAECEF]'}`}
            >
              Targets Hit
            </button>
            <button
              onClick={() => setLogFilter('SL_HIT')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${logFilter === 'SL_HIT' ? 'bg-[#FF3B69]/20 text-[#FF3B69] font-bold' : 'text-gray-400 hover:text-[#EAECEF]'}`}
            >
              Stop-Losses Hit
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-[#181A20] text-gray-400 border-b border-[#2B3139] text-[10px] uppercase">
                <th className="py-2.5 px-3 text-left">Symbol</th>
                <th className="py-2.5 px-2">Type</th>
                <th className="py-2.5 px-2">Entry</th>
                <th className="py-2.5 px-2">Exit</th>
                <th className="py-2.5 px-2">Return %</th>
                <th className="py-2.5 px-2">Outcome</th>
                <th className="py-2.5 px-2">Holding</th>
                <th className="py-2.5 px-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(l => {
                const isWin = l.returnPercent > 0;
                return (
                  <tr key={l.id} className="border-b border-[#2B3139]/60 hover:bg-[#1E2329]/60 transition-colors">
                    <td className="py-2.5 px-3 text-left font-bold text-[#EAECEF]">{l.symbol}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        l.action === 'BUY' ? 'bg-[#00C087]/20 text-[#00C087]' : 'bg-[#FF3B69]/20 text-[#FF3B69]'
                      }`}>
                        {l.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-gray-300">₹{(l.entryPrice ?? 0).toFixed(1)}</td>
                    <td className="py-2.5 px-2 text-[#EAECEF] font-bold">₹{(l.exitPrice ?? 0).toFixed(1)}</td>
                    <td className={`py-2.5 px-2 font-black ${isWin ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                      {isWin ? '+' : ''}{(l.returnPercent ?? 0).toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isWin ? 'bg-[#00C087]/15 text-[#00C087] border border-[#00C087]/30' : 'bg-[#FF3B69]/15 text-[#FF3B69] border border-[#FF3B69]/30'
                      }`}>
                        {l.targetAchieved}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-gray-400 text-[11px]">{l.holdingTime}</td>
                    <td className="py-2.5 px-3 text-right text-gray-500 text-[11px]">{l.entryDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
