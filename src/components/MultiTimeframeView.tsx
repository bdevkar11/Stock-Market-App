import React, { useState } from 'react';
import { Compass, CheckCircle2, AlertCircle, XCircle, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';
import { StockQuote, Timeframe } from '../types';

interface MultiTimeframeViewProps {
  stocks: StockQuote[];
  onSelectStock: (stock: StockQuote) => void;
  onTradeStock: (stock: StockQuote, side?: 'BUY' | 'SELL') => void;
}

export const MultiTimeframeView: React.FC<MultiTimeframeViewProps> = ({
  stocks,
  onSelectStock,
  onTradeStock
}) => {
  const [selectedStock, setSelectedStock] = useState<StockQuote>(stocks[0]);

  const timeframes: Timeframe[] = ['1m', '5m', '15m', '30m', '1h', '1d', '1w'];

  // Calculate consensus for the selected stock
  const trends = Object.values(selectedStock.timeframeTrend);
  const bullishCount = trends.filter(t => t === 'Bullish').length;
  const bearishCount = trends.filter(t => t === 'Bearish').length;
  const totalCount = trends.length;
  const consensusPct = Math.round((Math.max(bullishCount, bearishCount) / totalCount) * 100);
  const dominantTrend = bullishCount >= bearishCount ? 'Bullish' : 'Bearish';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#F0B90B]/10 border border-[#F0B90B]/30">
            <Compass className="w-5 h-5 text-[#F0B90B]" />
          </div>
          <h1 className="text-base sm:text-lg font-black text-[#EAECEF] tracking-tight">
            Multi-Timeframe Trend Alignment Engine
          </h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          High-probability trade execution occurs when the lower timeframe entry trigger aligns cleanly with higher timeframe institutional momentum.
        </p>
      </div>

      {/* Stock Quick Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {stocks.map(st => (
          <button
            key={st.symbol}
            onClick={() => setSelectedStock(st)}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
              selectedStock.symbol === st.symbol
                ? 'bg-[#F0B90B]/20 text-[#F0B90B] border border-[#F0B90B]/50 shadow-sm'
                : 'bg-[#181A20] text-gray-400 hover:text-[#EAECEF] border border-[#2B3139]'
            }`}
          >
            {st.symbol} (₹{st.price.toFixed(0)})
          </button>
        ))}
      </div>

      {/* Selected Stock In-Depth Matrix */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2B3139]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-[#EAECEF] font-mono">{selectedStock.symbol}</h2>
              <span className="text-xs text-gray-400 font-mono">₹{selectedStock.price.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400">{selectedStock.name}</p>
          </div>

          {/* Computed Consensus Score */}
          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <span className="text-[10px] text-gray-400 block uppercase">Consensus Alignment</span>
              <span className={`text-base font-black ${dominantTrend === 'Bullish' ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                {consensusPct}% {dominantTrend}
              </span>
            </div>

            <button
              onClick={() => onTradeStock(selectedStock, dominantTrend === 'Bullish' ? 'BUY' : 'SELL')}
              className={`px-4 py-2 rounded-lg text-xs font-bold text-white shadow-sm transition-all cursor-pointer ${
                dominantTrend === 'Bullish' ? 'bg-[#00C087] hover:bg-[#00C087]/80' : 'bg-[#FF3B69] hover:bg-[#FF3B69]/80'
              }`}
            >
              Trade {dominantTrend === 'Bullish' ? 'BUY' : 'SELL'}
            </button>
          </div>
        </div>

        {/* 7 Timeframe Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 my-4">
          {timeframes.map(tf => {
            const trend = selectedStock.timeframeTrend[tf];
            const isBull = trend === 'Bullish';
            const isBear = trend === 'Bearish';

            return (
              <div
                key={tf}
                className={`p-3 rounded-lg border font-mono text-center transition-all ${
                  isBull ? 'bg-[#00C087]/10 border-[#00C087]/30 text-[#00C087]' :
                  isBear ? 'bg-[#FF3B69]/10 border-[#FF3B69]/30 text-[#FF3B69]' :
                  'bg-[#1E2329] border-[#2B3139] text-gray-400'
                }`}
              >
                <span className="text-[10px] text-gray-400 block uppercase font-bold">{tf}</span>
                <div className="flex items-center justify-center gap-1 my-1.5">
                  {isBull && <ArrowUpRight className="w-4 h-4 text-[#00C087]" />}
                  {isBear && <ArrowDownRight className="w-4 h-4 text-[#FF3B69]" />}
                  {!isBull && !isBear && <AlertCircle className="w-4 h-4 text-gray-500" />}
                </div>
                <span className="text-xs font-black block">{trend}</span>
                <span className="text-[9px] text-gray-400 block mt-1">
                  {tf === '1m' || tf === '5m' ? 'Entry Trigger' : tf === '15m' || tf === '30m' ? 'Structure' : 'Macro Trend'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tactical Recommendation */}
        <div className="p-3.5 bg-[#1E2329] rounded-lg border border-[#2B3139] text-xs text-gray-300 space-y-1.5 leading-relaxed">
          <div className="font-bold text-[#EAECEF] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#F0B90B]" />
            Execution Rule Analysis:
          </div>
          <p>
            • <strong>Higher Timeframe Trend:</strong> Daily (1D) and Weekly (1W) charts confirm strong <strong>{selectedStock.timeframeTrend['1d']}</strong> momentum above the 200 EMA baseline.
          </p>
          <p>
            • <strong>Intraday Structure:</strong> 15m and 1h show constructive pullbacks to VWAP. 
          </p>
          <p>
            • <strong>Lower Timeframe Trigger:</strong> Look for 5m bullish pin-bars or EMA-9 crosses in the direction of the dominant {dominantTrend} bias. Avoid counter-trend intraday scalps.
          </p>
        </div>
      </div>

      {/* Cross-Market Multi-Timeframe Heatmap Table */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl overflow-hidden shadow-sm">
        <div className="p-3 bg-[#1E2329] border-b border-[#2B3139] flex items-center justify-between text-xs">
          <span className="font-bold text-[#EAECEF]">NSE F&amp;O Universe Timeframe Matrix</span>
          <span className="text-gray-400 font-mono text-[11px]">8 Stocks Tracked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-[#181A20] text-gray-400 border-b border-[#2B3139] text-[10px] uppercase">
                <th className="py-2.5 px-3 text-left">Stock</th>
                <th className="py-2.5 px-2">Price</th>
                {timeframes.map(tf => (
                  <th key={tf} className="py-2.5 px-2 uppercase">{tf}</th>
                ))}
                <th className="py-2.5 px-3">Consensus</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(st => {
                const sTrends = Object.values(st.timeframeTrend);
                const bulls = sTrends.filter(t => t === 'Bullish').length;
                const bears = sTrends.filter(t => t === 'Bearish').length;
                const dom = bulls >= bears ? 'Bullish' : 'Bearish';
                const pct = Math.round((Math.max(bulls, bears) / sTrends.length) * 100);

                return (
                  <tr 
                    key={st.symbol}
                    onClick={() => setSelectedStock(st)}
                    className="border-b border-[#2B3139]/60 hover:bg-[#1E2329]/60 cursor-pointer transition-colors"
                  >
                    <td className="py-2 px-3 text-left font-bold text-[#EAECEF]">
                      {st.symbol}
                    </td>
                    <td className="py-2 px-2 text-gray-300">
                      ₹{st.price.toFixed(1)}
                    </td>
                    {timeframes.map(tf => {
                      const t = st.timeframeTrend[tf];
                      return (
                        <td key={tf} className="py-2 px-1">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            t === 'Bullish' ? 'bg-[#00C087]/20 text-[#00C087]' :
                            t === 'Bearish' ? 'bg-[#FF3B69]/20 text-[#FF3B69]' :
                            'bg-[#2B3139] text-gray-400'
                          }`}>
                            {t.slice(0, 4)}
                          </span>
                        </td>
                      );
                    })}
                    <td className="py-2 px-3">
                      <span className={`font-bold text-[11px] ${dom === 'Bullish' ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                        {pct}% {dom}
                      </span>
                    </td>
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
