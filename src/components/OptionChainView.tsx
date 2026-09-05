import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Layers, 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  Info,
  SlidersHorizontal,
  Flame,
  BarChart2
} from 'lucide-react';
import { OptionChainOverview } from '../types';
import { generateOptionChain } from '../data/mockMarketData';

interface OptionChainViewProps {
  onNavigateTab?: (tab: string) => void;
}

export const OptionChainView: React.FC<OptionChainViewProps> = ({ onNavigateTab }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<'NIFTY 50' | 'BANKNIFTY' | 'RELIANCE' | 'HDFCBANK'>('NIFTY 50');
  const [showGreeks, setShowGreeks] = useState(false);

  // Spot prices for underlying
  const spotPrices = {
    'NIFTY 50': 24852.15,
    'BANKNIFTY': 51280.45,
    'RELIANCE': 2985.40,
    'HDFCBANK': 1654.80
  };

  const optionChain: OptionChainOverview = generateOptionChain(selectedSymbol, spotPrices[selectedSymbol]);
  const [selectedExpiry, setSelectedExpiry] = useState(optionChain.expiryDates[0]);

  // Max OI for bar visualizer
  const maxCallOI = Math.max(...optionChain.strikes.map(s => s.calls.oi));
  const maxPutOI = Math.max(...optionChain.strikes.map(s => s.puts.oi));

  return (
    <div className="space-y-4">
      {/* 1. Underlying Selector & F&O Metrics Summary Card */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#2B3139]">
          <div className="flex items-center gap-3">
            {/* Symbol Switcher */}
            <div className="flex items-center gap-1.5 bg-[#1E2329] p-1 rounded-lg border border-[#2B3139]">
              {(['NIFTY 50', 'BANKNIFTY', 'RELIANCE', 'HDFCBANK'] as const).map(sym => (
                <button
                  key={sym}
                  onClick={() => setSelectedSymbol(sym)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedSymbol === sym 
                      ? 'bg-[#F0B90B] text-[#0B0E11] font-bold shadow-sm' 
                      : 'text-gray-400 hover:text-[#EAECEF]'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>

            {/* Expiry Selector */}
            <div className="flex items-center gap-1 bg-[#1E2329] px-2.5 py-1.5 rounded-lg border border-[#2B3139] text-xs font-mono">
              <span className="text-gray-400 text-[10px]">Expiry:</span>
              <select
                value={selectedExpiry}
                onChange={(e) => setSelectedExpiry(e.target.value)}
                className="bg-transparent text-[#EAECEF] font-bold outline-none cursor-pointer text-xs"
              >
                {optionChain.expiryDates.map(d => (
                  <option key={d} value={d} className="bg-[#181A20] text-[#EAECEF]">
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Greek Toggle */}
          <button
            onClick={() => setShowGreeks(!showGreeks)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              showGreeks 
                ? 'bg-[#F0B90B]/15 text-[#F0B90B] border-[#F0B90B]/40' 
                : 'bg-[#1E2329] text-gray-400 hover:text-[#EAECEF] border-[#2B3139]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F0B90B]" />
            {showGreeks ? 'Hide Greeks' : 'Show Greeks (Δ, Γ, Θ, V)'}
          </button>
        </div>

        {/* Core F&O Derived Analytics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-3 font-mono text-xs">
          {/* Put-Call Ratio (PCR) */}
          <div className="p-2.5 rounded-lg bg-[#1E2329] border border-[#2B3139]">
            <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase">
              <span>Put-Call Ratio (PCR)</span>
              <span className={`font-bold px-1.5 py-0.2 rounded text-[9px] ${
                optionChain.pcrSentiment === 'Bullish' ? 'bg-[#00C087]/20 text-[#00C087]' : 'bg-[#181A20] text-gray-300'
              }`}>
                {optionChain.pcrSentiment}
              </span>
            </div>
            <div className="text-base font-extrabold text-[#EAECEF] mt-1">
              {optionChain.pcr}
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              {optionChain.pcr > 1.2 ? 'Heavy Put writing (Support strong)' : 'Balanced OI profile'}
            </div>
          </div>

          {/* Max Pain */}
          <div className="p-2.5 rounded-lg bg-[#1E2329] border border-[#2B3139]">
            <span className="text-[10px] text-gray-400 uppercase block">Max Pain Strike</span>
            <div className="text-base font-extrabold text-[#F0B90B] mt-1">
              ₹{optionChain.maxPain.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-gray-400 block mt-0.5">
              Target convergence for expiry
            </span>
          </div>

          {/* Major OI Resistance & Support */}
          <div className="p-2.5 rounded-lg bg-[#1E2329] border border-[#2B3139]">
            <span className="text-[10px] text-gray-400 uppercase block">OI Resistance (Call Wall)</span>
            <div className="text-base font-extrabold text-[#FF3B69] mt-1">
              ₹{optionChain.highestCallOIStrike.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-gray-400 block mt-0.5">
              Max Call OI Concentration
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#1E2329] border border-[#2B3139]">
            <span className="text-[10px] text-gray-400 uppercase block">OI Support (Put Base)</span>
            <div className="text-base font-extrabold text-[#00C087] mt-1">
              ₹{optionChain.highestPutOIStrike.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-gray-400 block mt-0.5">
              Max Put OI Concentration
            </span>
          </div>

          {/* Futures Basis & Buildup */}
          <div className="p-2.5 rounded-lg bg-[#1E2329] border border-[#2B3139] col-span-2 sm:col-span-1">
            <span className="text-[10px] text-gray-400 uppercase block">Futures Basis</span>
            <div className="text-base font-extrabold text-[#3772FF] mt-1">
              +{(optionChain.futuresBasis ?? 0).toFixed(1)} pts
            </div>
            <span className="text-[10px] text-[#00C087] block mt-0.5 font-bold">
              {optionChain.oiBuildup}
            </span>
          </div>
        </div>

        {/* AI F&O Interpretation Callout */}
        <div className="mt-3 p-3 rounded-lg bg-[#1E2329] border border-[#2B3139] flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#F0B90B] shrink-0 mt-0.5" />
          <div className="text-gray-300 leading-relaxed">
            <span className="font-bold text-[#EAECEF]">AI F&amp;O Synthesis for {selectedSymbol}: </span>
            Market structure exhibits persistent <strong>{optionChain.oiBuildup}</strong>. Put writers are aggressively defending the <strong>₹{optionChain.highestPutOIStrike}</strong> strike zone with PCR holding at <strong>{optionChain.pcr}</strong>. Resistance is firmly stacked at <strong>₹{optionChain.highestCallOIStrike}</strong>. Favorable setups favor Bull Call Spreads or Buying ATM Call on dips toward ₹{optionChain.highestPutOIStrike}.
          </div>
        </div>
      </div>

      {/* 2. Comprehensive Option Chain Table */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl overflow-hidden shadow-sm">
        <div className="p-3 bg-[#1E2329] border-b border-[#2B3139] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold text-[#00C087]">
            <span className="w-2 h-2 rounded-full bg-[#00C087]"></span>
            CALLS (CE)
          </div>
          <div className="font-mono font-extrabold text-[#EAECEF]">
            STRIKE PRICE (ATM: ₹{optionChain.maxPain})
          </div>
          <div className="flex items-center gap-2 font-bold text-[#FF3B69]">
            PUTS (PE)
            <span className="w-2 h-2 rounded-full bg-[#FF3B69]"></span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center font-mono text-[11px] border-collapse">
            <thead>
              <tr className="bg-[#181A20] text-gray-400 border-b border-[#2B3139] text-[10px] uppercase">
                <th className="py-2 px-2">OI</th>
                <th className="py-2 px-2">Chg OI</th>
                <th className="py-2 px-2">Vol</th>
                <th className="py-2 px-2">IV</th>
                {showGreeks && <th className="py-2 px-1 text-[#F0B90B]">Delta</th>}
                {showGreeks && <th className="py-2 px-1 text-[#F0B90B]">Theta</th>}
                <th className="py-2 px-2 text-[#00C087] font-bold">LTP</th>
                
                {/* Center Strike Column */}
                <th className="py-2 px-4 bg-[#1E2329] text-[#EAECEF] font-black text-xs">Strike</th>

                <th className="py-2 px-2 text-[#FF3B69] font-bold">LTP</th>
                {showGreeks && <th className="py-2 px-1 text-[#F0B90B]">Delta</th>}
                {showGreeks && <th className="py-2 px-1 text-[#F0B90B]">Theta</th>}
                <th className="py-2 px-2">IV</th>
                <th className="py-2 px-2">Vol</th>
                <th className="py-2 px-2">Chg OI</th>
                <th className="py-2 px-2">OI</th>
              </tr>
            </thead>
            <tbody>
              {optionChain.strikes.map((s) => {
                const isATM = s.strikePrice === optionChain.maxPain;
                const isCallITM = s.calls.inTheMoney;
                const isPutITM = s.puts.inTheMoney;

                const callOIWidth = (s.calls.oi / maxCallOI) * 100;
                const putOIWidth = (s.puts.oi / maxPutOI) * 100;

                return (
                  <tr 
                    key={s.strikePrice}
                    className={`border-b border-[#2B3139]/60 hover:bg-[#1E2329]/60 transition-colors ${
                      isATM ? 'bg-[#F0B90B]/10' : ''
                    }`}
                  >
                    {/* CALLS */}
                    <td className={`py-2 px-2 relative ${isCallITM ? 'bg-[#00C087]/5' : ''}`}>
                      <div 
                        className="absolute right-0 top-1 bottom-1 bg-[#00C087]/15 rounded-l" 
                        style={{ width: `${callOIWidth}%` }}
                      />
                      <span className="relative z-10 text-gray-300 font-medium">
                        {(((s.calls?.oi ?? 0)) / 1000).toFixed(1)}k
                      </span>
                    </td>

                    <td className={`py-2 px-2 ${(s.calls?.oiChange ?? 0) >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                      {(s.calls?.oiChange ?? 0) >= 0 ? '+' : ''}{(((s.calls?.oiChange ?? 0)) / 1000).toFixed(1)}k
                    </td>

                    <td className="py-2 px-2 text-gray-400">
                      {(((s.calls?.volume ?? 0)) / 1000).toFixed(0)}k
                    </td>

                    <td className="py-2 px-2 text-gray-400">
                      {s.calls?.iv ?? 15}%
                    </td>

                    {showGreeks && (
                      <td className="py-2 px-1 text-[#F0B90B] font-bold">
                        {s.calls?.delta ?? 0.5}
                      </td>
                    )}
                    {showGreeks && (
                      <td className="py-2 px-1 text-gray-400">
                        {s.calls?.theta ?? -5}
                      </td>
                    )}

                    <td className={`py-2 px-2 font-bold ${isCallITM ? 'text-[#00C087]' : 'text-[#EAECEF]'}`}>
                      ₹{(s.calls?.ltp ?? 0).toFixed(2)}
                    </td>

                    {/* STRIKE PRICE */}
                    <td className={`py-2 px-4 font-black text-xs border-x border-[#2B3139] ${
                      isATM 
                        ? 'bg-[#F0B90B]/20 text-[#F0B90B]' 
                        : 'bg-[#1E2329] text-[#EAECEF]'
                    }`}>
                      ₹{s.strikePrice}
                      {isATM && <span className="text-[9px] block text-[#F0B90B] font-sans uppercase">ATM</span>}
                    </td>

                    {/* PUTS */}
                    <td className={`py-2 px-2 font-bold ${isPutITM ? 'text-[#FF3B69]' : 'text-[#EAECEF]'}`}>
                      ₹{(s.puts?.ltp ?? 0).toFixed(2)}
                    </td>

                    {showGreeks && (
                      <td className="py-2 px-1 text-[#F0B90B] font-bold">
                        {s.puts?.delta ?? -0.5}
                      </td>
                    )}
                    {showGreeks && (
                      <td className="py-2 px-1 text-gray-400">
                        {s.puts?.theta ?? -5}
                      </td>
                    )}

                    <td className="py-2 px-2 text-gray-400">
                      {s.puts?.iv ?? 15}%
                    </td>

                    <td className="py-2 px-2 text-gray-400">
                      {(((s.puts?.volume ?? 0)) / 1000).toFixed(0)}k
                    </td>

                    <td className={`py-2 px-2 ${(s.puts?.oiChange ?? 0) >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                      {(s.puts?.oiChange ?? 0) >= 0 ? '+' : ''}{(((s.puts?.oiChange ?? 0)) / 1000).toFixed(1)}k
                    </td>

                    <td className={`py-2 px-2 relative ${isPutITM ? 'bg-[#FF3B69]/5' : ''}`}>
                      <div 
                        className="absolute left-0 top-1 bottom-1 bg-[#FF3B69]/15 rounded-r" 
                        style={{ width: `${putOIWidth}%` }}
                      />
                      <span className="relative z-10 text-gray-300 font-medium">
                        {(((s.puts?.oi ?? 0)) / 1000).toFixed(1)}k
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
