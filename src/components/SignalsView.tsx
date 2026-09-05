import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Bot, 
  Radio, 
  Zap, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { AISignal, StockQuote } from '../types';

interface SignalsViewProps {
  signals: AISignal[];
  stocks: StockQuote[];
  onTradeSignal: (stock: StockQuote, signal: AISignal) => void;
  onSelectStock: (stock: StockQuote) => void;
}

export const SignalsView: React.FC<SignalsViewProps> = ({
  signals,
  stocks,
  onTradeSignal,
  onSelectStock
}) => {
  const [filterAction, setFilterAction] = useState<'ALL' | 'BUY' | 'SELL' | 'HOLD'>('ALL');
  const [analyzingSymbol, setAnalyzingSymbol] = useState<string | null>(null);
  const [deepAnalysisResult, setDeepAnalysisResult] = useState<Record<string, any>>({});

  const filteredSignals = signals.filter(s => {
    if (filterAction === 'ALL') return true;
    return s.action === filterAction;
  });

  const handleRunDeepAnalysis = async (signal: AISignal) => {
    const stock = stocks.find(s => s.symbol === signal.symbol);
    if (!stock) return;

    setAnalyzingSymbol(signal.symbol);
    try {
      const res = await fetch('/api/ai/deep-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: signal.symbol,
          price: stock.price,
          rsi: stock.technicals.rsi,
          ema20: stock.technicals.ema20,
          ema50: stock.technicals.ema50,
          vwap: stock.technicals.vwap,
          trendDirection: stock.technicals.trendDirection,
          pcr: 1.18,
          oiBuildup: 'Long Buildup'
        })
      });

      const data = await res.json();
      setDeepAnalysisResult(prev => ({
        ...prev,
        [signal.symbol]: data
      }));
    } catch (err) {
      console.error('Failed to trigger deep AI analysis:', err);
    } finally {
      setAnalyzingSymbol(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Filter Controls */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#F0B90B]/10 border border-[#F0B90B]/30">
                <Bot className="w-5 h-5 text-[#F0B90B]" />
              </div>
              <h1 className="text-base sm:text-lg font-black text-[#EAECEF] tracking-tight">
                AI Buy/Sell Signal Engine
              </h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Data-driven multi-factor probability predictions based on technicals, order flow, and quantitative ML models.
            </p>
          </div>

          {/* Action Filter */}
          <div className="flex items-center gap-1 bg-[#1E2329] p-1 rounded-lg border border-[#2B3139] text-xs font-semibold">
            {(['ALL', 'BUY', 'SELL', 'HOLD'] as const).map(act => (
              <button
                key={act}
                onClick={() => setFilterAction(act)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  filterAction === act
                    ? 'bg-[#2B3139] text-[#EAECEF] shadow-sm font-bold'
                    : 'text-gray-400 hover:text-[#EAECEF]'
                }`}
              >
                {act === 'BUY' ? 'BUY' : act === 'SELL' ? 'SELL' : act === 'HOLD' ? 'HOLD' : 'All Signals'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSignals.map((sig) => {
          const isBuy = sig.action === 'BUY';
          const isSell = sig.action === 'SELL';
          const isHold = sig.action === 'HOLD';
          const matchedStock = stocks.find(s => s.symbol === sig.symbol);
          const deepAi = deepAnalysisResult[sig.symbol];
          const isAnalyzing = analyzingSymbol === sig.symbol;

          return (
            <div 
              key={sig.id}
              className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              {/* Header Status Bar */}
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#2B3139]">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black tracking-wide border ${
                      isBuy ? 'bg-[#00C087]/15 text-[#00C087] border-[#00C087]/30' :
                      isSell ? 'bg-[#FF3B69]/15 text-[#FF3B69] border-[#FF3B69]/30' :
                      'bg-[#F0B90B]/15 text-[#F0B90B] border-[#F0B90B]/30'
                    }`}>
                      {sig.action}
                    </span>
                    <div>
                      <span className="font-extrabold text-base text-[#EAECEF] font-mono">{sig.symbol}</span>
                      <span className="text-[10px] text-gray-400 block truncate max-w-[150px]">{sig.companyName}</span>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-[10px] text-gray-400 uppercase">Probability:</span>
                      <span className="px-2 py-0.5 rounded bg-[#1E2329] text-[#F0B90B] border border-[#2B3139] font-extrabold text-xs">
                        {sig.confidence}%
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5">{sig.expectedHorizon}</span>
                  </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-4 gap-2 my-3 p-2.5 bg-[#1E2329] rounded-lg border border-[#2B3139] font-mono text-center text-xs">
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase block">Entry Range</span>
                    <span className="text-[#EAECEF] font-bold">
                      ₹{(sig.entryRange?.[0] ?? 0).toFixed(0)} - ₹{(sig.entryRange?.[1] ?? 0).toFixed(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase block">Stop Loss</span>
                    <span className="text-[#FF3B69] font-bold">₹{(sig.stopLoss ?? 0).toFixed(0)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase block">Target 1 &amp; 2</span>
                    <span className="text-[#00C087] font-bold">
                      ₹{(sig.target1 ?? 0).toFixed(0)} / ₹{(sig.target2 ?? 0).toFixed(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase block">R:R Ratio</span>
                    <span className="text-[#F0B90B] font-bold">{sig.riskRewardRatio}</span>
                  </div>
                </div>

                {/* Factors & Explainability */}
                <div className="space-y-1.5 mb-3">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#F0B90B]" />
                    Calculated Algorithmic Rationale:
                  </span>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {sig.reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00C087] shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deep Gemini AI Analysis Box if triggered */}
                {deepAi && (
                  <div className="p-3 mb-3 bg-[#1E2329] border border-[#2B3139] rounded-lg text-xs space-y-2">
                    <div className="flex items-center justify-between font-semibold text-[#F0B90B]">
                      <span className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#F0B90B]" />
                        Gemini Institutional Analysis
                      </span>
                      <span className="font-mono text-[10px] text-[#F0B90B]">
                        Confidence: {deepAi.confidenceScore || sig.confidence}%
                      </span>
                    </div>
                    <p className="text-[#EAECEF] leading-relaxed italic text-xs">
                      "{deepAi.summary}"
                    </p>
                    <div className="text-[10px] text-gray-400 font-mono">
                      Engine: {deepAi.source || 'Gemini 3.8 Flash Quantitative Reasoning'}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Meta & Actions */}
              <div className="pt-3 border-t border-[#2B3139] space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {sig.timestamp}
                  </span>
                  <span className="text-gray-400">
                    Model: <strong className="text-[#EAECEF]">{sig.modelUsed}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRunDeepAnalysis(sig)}
                    disabled={isAnalyzing}
                    className="px-3 py-2 rounded-lg bg-[#F0B90B]/15 hover:bg-[#F0B90B]/25 border border-[#F0B90B]/30 text-[#F0B90B] text-xs font-semibold flex items-center justify-center gap-1 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F0B90B]" />
                    {isAnalyzing ? 'Analyzing...' : 'Deep AI Reasoning'}
                  </button>

                  <button
                    onClick={() => {
                      if (matchedStock) onSelectStock(matchedStock);
                    }}
                    className="flex-1 py-2 rounded-lg bg-[#1E2329] hover:bg-[#2B3139] text-[#EAECEF] border border-[#2B3139] text-xs font-semibold text-center transition-colors cursor-pointer"
                  >
                    View Chart
                  </button>

                  <button
                    onClick={() => {
                      if (matchedStock) onTradeSignal(matchedStock, sig);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer ${
                      isBuy ? 'bg-[#00C087] hover:bg-[#00a876] text-[#0B0E11]' :
                      isSell ? 'bg-[#FF3B69] hover:bg-[#e0325b] text-white' :
                      'bg-[#F0B90B] hover:bg-[#dfaa07] text-[#0B0E11]'
                    }`}
                  >
                    Paper Trade {sig.action}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
