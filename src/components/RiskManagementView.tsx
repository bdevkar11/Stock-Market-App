import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Calculator, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Lock, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { TradingJournalEntry } from '../types';

export const RiskManagementView: React.FC = () => {
  // Position Sizing Calculator state
  const [totalCapital, setTotalCapital] = useState(500000);
  const [riskPercent, setRiskPercent] = useState(1.5);
  const [entryPrice, setEntryPrice] = useState(2850);
  const [stopLossPrice, setStopLossPrice] = useState(2810);

  // Daily Loss Limit State
  const [dailyLossLimit, setDailyLossLimit] = useState(15000);
  const [currentDayLoss, setCurrentDayLoss] = useState(3200);

  // Trading Journal state
  const [journalEntries, setJournalEntries] = useState<TradingJournalEntry[]>([
    {
      id: 'J-1',
      date: '2026-03-24',
      symbol: 'RELIANCE',
      tradeType: 'Intraday Long',
      pnl: 4500,
      mistake: 'None. Followed 15m breakout rule strictly.',
      disciplineScore: 9,
      notes: 'Exited at Target 1 with 1:2 R:R as planned.'
    },
    {
      id: 'J-2',
      date: '2026-03-23',
      symbol: 'BANKNIFTY 51200 CE',
      tradeType: 'Options Buying',
      pnl: -3200,
      mistake: 'Held past 3:00 PM against stop-loss theta rule.',
      disciplineScore: 6,
      notes: 'Premium decay eroded profits. Next time, adhere strictly to 20-min time stop.'
    }
  ]);

  const [newMistake, setNewMistake] = useState('');
  const [newSymbol, setNewSymbol] = useState('');
  const [newPnl, setNewPnl] = useState<number>(0);
  const [newScore, setNewScore] = useState<number>(8);

  // Position Sizing Calculations
  const riskAmount = (totalCapital * (riskPercent / 100));
  const riskPerShare = Math.max(0.1, Math.abs(entryPrice - stopLossPrice));
  const recommendedQuantity = Math.floor(riskAmount / riskPerShare);
  const totalTradeCapital = recommendedQuantity * entryPrice;

  const handleAddJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol) return;

    const entry: TradingJournalEntry = {
      id: `J-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      symbol: newSymbol.toUpperCase(),
      tradeType: 'Intraday Equity',
      pnl: newPnl,
      mistake: newMistake || 'Followed trading playbook.',
      disciplineScore: newScore,
      notes: 'Logged via Risk Suite.'
    };

    setJournalEntries([entry, ...journalEntries]);
    setNewSymbol('');
    setNewMistake('');
    setNewPnl(0);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#F0B90B]/10 border border-[#F0B90B]/30">
            <ShieldAlert className="w-5 h-5 text-[#F0B90B]" />
          </div>
          <h1 className="text-base sm:text-lg font-black text-[#EAECEF] tracking-tight">
            Institutional Risk Management &amp; Capital Preservation
          </h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          "Risk management is not about avoiding loss; it's about sizing positions so that any single loss cannot impair your ability to play the game."
        </p>
      </div>

      {/* Calculator & Daily Loss Guardrails Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. Position Sizing Calculator */}
        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#2B3139]">
            <Calculator className="w-4 h-4 text-[#F0B90B]" />
            <h2 className="text-xs uppercase tracking-wider font-bold text-[#EAECEF]">
              Optimal Position Sizing Calculator
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-gray-400 mb-1 font-mono">Trading Capital (₹)</label>
              <input
                type="number"
                value={totalCapital}
                onChange={(e) => setTotalCapital(Number(e.target.value))}
                className="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg px-3 py-2 text-[#EAECEF] font-mono font-bold outline-none focus:border-[#F0B90B]"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-mono">Risk Per Trade (%)</label>
              <input
                type="number"
                step="0.1"
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                className="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg px-3 py-2 text-[#EAECEF] font-mono font-bold outline-none focus:border-[#F0B90B]"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-mono">Planned Entry (₹)</label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
                className="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg px-3 py-2 text-[#EAECEF] font-mono font-bold outline-none focus:border-[#F0B90B]"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-mono">Stop-Loss Price (₹)</label>
              <input
                type="number"
                value={stopLossPrice}
                onChange={(e) => setStopLossPrice(Number(e.target.value))}
                className="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg px-3 py-2 text-[#FF3B69] font-mono font-bold outline-none focus:border-[#FF3B69]"
              />
            </div>
          </div>

          {/* Computed Recommended Position Output */}
          <div className="p-4 bg-[#1E2329] rounded-lg border border-[#2B3139] space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center text-gray-400">
              <span>Risk Budget per Trade ({riskPercent}%):</span>
              <span className="font-bold text-[#FF3B69]">₹{(riskAmount ?? 0).toFixed(0)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span>Risk Per Share:</span>
              <span className="font-bold text-[#EAECEF]">₹{(riskPerShare ?? 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[#EAECEF] text-sm pt-2 border-t border-[#2B3139]">
              <span className="font-sans font-bold">Recommended Quantity:</span>
              <span className="text-xl font-black text-[#00C087]">{recommendedQuantity} Shares</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 text-[11px]">
              <span>Total Margin Deployment:</span>
              <span className="text-gray-300">₹{totalTradeCapital.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>

        {/* 2. Daily Loss Limit & Account Circuit Breaker */}
        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#2B3139]">
            <Lock className="w-4 h-4 text-[#FF3B69]" />
            <h2 className="text-xs uppercase tracking-wider font-bold text-[#EAECEF]">
              Daily Loss Guardrail &amp; Circuit Breaker
            </h2>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Configured Max Daily Loss:</span>
              <span className="font-mono font-bold text-[#EAECEF]">₹{dailyLossLimit.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Current Day Cumulative Loss:</span>
              <span className="font-mono font-bold text-[#FF3B69]">₹{currentDayLoss.toLocaleString('en-IN')}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#1E2329] h-3 rounded-full overflow-hidden border border-[#2B3139]">
              <div 
                className="h-full bg-gradient-to-r from-[#F0B90B] to-[#FF3B69] transition-all duration-300"
                style={{ width: `${Math.min(100, (currentDayLoss / dailyLossLimit) * 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>Used: {(((currentDayLoss || 0) / (dailyLossLimit || 1)) * 100).toFixed(0)}%</span>
              <span>Headroom: ₹{(dailyLossLimit - currentDayLoss).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-3 bg-[#00C087]/10 border border-[#00C087]/30 rounded-lg text-xs text-[#00C087] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00C087] shrink-0 mt-0.5" />
            <span>
              <strong>Circuit Breaker Status: NORMAL.</strong> If intraday loss breaches ₹{dailyLossLimit.toLocaleString('en-IN')}, order placement will automatically lock out for the remainder of the session to protect psychological discipline.
            </span>
          </div>
        </div>
      </div>

      {/* 3. Trading Journal */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 pb-3 border-b border-[#2B3139] mb-4">
          <BookOpen className="w-4 h-4 text-[#F0B90B]" />
          <h2 className="text-xs uppercase tracking-wider font-bold text-[#EAECEF]">
            Discipline &amp; Mistake Tracking Journal
          </h2>
        </div>

        {/* Quick Log Form */}
        <form onSubmit={handleAddJournalEntry} className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 mb-4 text-xs">
          <input
            type="text"
            placeholder="Symbol (e.g. TCS)"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            className="bg-[#1E2329] border border-[#2B3139] rounded-lg px-3 py-2 text-[#EAECEF] font-mono outline-none focus:border-[#F0B90B]"
          />
          <input
            type="number"
            placeholder="P&L (₹)"
            value={newPnl || ''}
            onChange={(e) => setNewPnl(Number(e.target.value))}
            className="bg-[#1E2329] border border-[#2B3139] rounded-lg px-3 py-2 text-[#EAECEF] font-mono outline-none focus:border-[#F0B90B]"
          />
          <input
            type="text"
            placeholder="Mistake or rule followed"
            value={newMistake}
            onChange={(e) => setNewMistake(e.target.value)}
            className="bg-[#1E2329] border border-[#2B3139] rounded-lg px-3 py-2 text-[#EAECEF] outline-none sm:col-span-2 focus:border-[#F0B90B]"
          />
          <button
            type="submit"
            className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-[#0B0E11] font-bold rounded-lg px-4 py-2 transition-all shadow-sm text-xs cursor-pointer"
          >
            Log Entry
          </button>
        </form>

        {/* Entries List */}
        <div className="space-y-2.5">
          {journalEntries.map(entry => (
            <div key={entry.id} className="p-3 bg-[#1E2329] border border-[#2B3139] rounded-lg text-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-[#EAECEF] text-sm">{entry.symbol}</span>
                <span className={`font-mono font-bold text-xs ${entry.pnl >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                  {entry.pnl >= 0 ? '+' : ''}₹{entry.pnl.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-400 font-mono text-[10px]">({entry.tradeType})</span>
              </div>

              <div className="text-gray-300 text-xs italic">
                "{entry.mistake}"
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                <span>Discipline: <strong className="text-[#F0B90B]">{entry.disciplineScore}/10</strong></span>
                <span>{entry.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
