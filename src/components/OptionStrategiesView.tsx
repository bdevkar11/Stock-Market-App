import React from 'react';
import { 
  Layers, 
  ShieldAlert, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Ban, 
  Percent, 
  Target, 
  AlertTriangle 
} from 'lucide-react';
import { OptionStrategySetup } from '../types';
import { INITIAL_OPTION_STRATEGIES } from '../data/mockMarketData';

export const OptionStrategiesView: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Overview Header Card */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#F0B90B]/10 border border-[#F0B90B]/30">
            <Layers className="w-5 h-5 text-[#F0B90B]" />
          </div>
          <h1 className="text-base sm:text-lg font-black text-[#EAECEF] tracking-tight">
            Probability-Based F&amp;O Trading Setups
          </h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Systematic options setups with defined risk limits, Greeks optimization, and Black-Scholes probability of profit (PoP).
        </p>
      </div>

      {/* Strategies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INITIAL_OPTION_STRATEGIES.map((strat) => {
          const isNoTrade = strat.strategyName === 'NO TRADE';
          const isSpread = strat.strategyName.includes('SPREAD');

          return (
            <div 
              key={strat.id}
              className={`bg-[#181A20] border rounded-xl p-4 shadow-sm flex flex-col justify-between ${
                isNoTrade ? 'border-[#F0B90B]/30' : 'border-[#2B3139]'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-[#2B3139]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold tracking-wide border ${
                        isNoTrade ? 'bg-[#F0B90B]/15 text-[#F0B90B] border-[#F0B90B]/30' :
                        strat.strategyName.includes('BULL') || strat.strategyName === 'BUY CALL' ? 'bg-[#00C087]/15 text-[#00C087] border-[#00C087]/30' :
                        'bg-[#FF3B69]/15 text-[#FF3B69] border-[#FF3B69]/30'
                      }`}>
                        {strat.strategyName}
                      </span>
                      <span className="font-extrabold text-[#EAECEF] text-base font-mono">{strat.symbol}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono mt-0.5 block">
                      {strat.strikes}
                    </span>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[10px] text-gray-400 block uppercase">Probability of Profit</span>
                    <span className={`text-base font-black ${strat.pop > 65 ? 'text-[#00C087]' : 'text-[#EAECEF]'}`}>
                      {strat.pop > 0 ? `${strat.pop}%` : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Pricing / Risk Matrix */}
                {!isNoTrade ? (
                  <div className="grid grid-cols-3 gap-2 my-3 p-2.5 bg-[#1E2329] rounded-lg border border-[#2B3139] font-mono text-center text-xs">
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Entry Premium</span>
                      <span className="text-[#EAECEF] font-bold">₹{strat.entryPremium.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Stop Loss</span>
                      <span className="text-[#FF3B69] font-bold">₹{strat.stopLossPremium.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Target</span>
                      <span className="text-[#00C087] font-bold">₹{strat.targetPremium.toFixed(2)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="my-3 p-3 rounded-lg bg-[#1E2329] border border-[#F0B90B]/40 text-xs text-[#F0B90B] flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#F0B90B] shrink-0" />
                    <span>Trading halted: High volatility contraction or low liquidity makes risk-to-reward unfavorable.</span>
                  </div>
                )}

                {/* Max Risk & Reward */}
                {!isNoTrade && (
                  <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139] mb-3 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Profit:</span>
                      <span className="text-[#00C087] font-bold">{strat.maxProfit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Risk:</span>
                      <span className="text-[#FF3B69] font-bold">{strat.maxRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">R:R Ratio / Lot Size:</span>
                      <span className="text-[#F0B90B] font-bold">{strat.riskReward} ({strat.lotSize} Qty/Lot)</span>
                    </div>
                  </div>
                )}

                {/* Rationales */}
                <div className="space-y-1 text-xs text-gray-300">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                    Setup Rationale:
                  </span>
                  {strat.reasons.map((r, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00C087] shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expiry & Data Quality */}
              <div className="pt-3 border-t border-[#2B3139] mt-3 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>Expiry: <strong className="text-[#EAECEF]">{strat.expiry}</strong></span>
                <span className="px-2 py-0.5 rounded bg-[#1E2329] text-gray-300 font-sans border border-[#2B3139]">
                  {strat.dataQuality}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
