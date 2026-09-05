import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  Zap, 
  SlidersHorizontal,
  Volume2
} from 'lucide-react';
import { StockQuote } from '../types';

interface AlertItem {
  id: string;
  symbol: string;
  condition: string;
  targetValue: string;
  status: 'ACTIVE' | 'TRIGGERED';
  createdTime: string;
}

interface AlertsViewProps {
  stocks: StockQuote[];
}

export const AlertsView: React.FC<AlertsViewProps> = ({ stocks }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 'A-1',
      symbol: 'RELIANCE',
      condition: 'Price Crosses Above',
      targetValue: '₹3,000.00',
      status: 'ACTIVE',
      createdTime: 'Today, 09:30 AM'
    },
    {
      id: 'A-2',
      symbol: 'NIFTY 50',
      condition: 'RSI Crosses Below 30 (Oversold)',
      targetValue: 'RSI < 30',
      status: 'ACTIVE',
      createdTime: 'Today, 10:15 AM'
    },
    {
      id: 'A-3',
      symbol: 'BANKNIFTY',
      condition: 'Call OI Unwinding Surge',
      targetValue: '51,500 Strike (-25% OI)',
      status: 'TRIGGERED',
      createdTime: 'Yesterday, 02:45 PM'
    }
  ]);

  const [symbol, setSymbol] = useState(stocks[0]?.symbol || 'RELIANCE');
  const [condition, setCondition] = useState('Price Crosses Above');
  const [targetValue, setTargetValue] = useState('');
  const [showSimulatedNotification, setShowSimulatedNotification] = useState(false);

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetValue) return;

    const newAlert: AlertItem = {
      id: `A-${Date.now()}`,
      symbol,
      condition,
      targetValue,
      status: 'ACTIVE',
      createdTime: 'Just now'
    };

    setAlerts([newAlert, ...alerts]);
    setTargetValue('');
  };

  const handleDelete = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const handleSimulateTrigger = () => {
    setShowSimulatedNotification(true);
    setTimeout(() => {
      setShowSimulatedNotification(false);
    }, 4500);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#F0B90B]/10 border border-[#F0B90B]/30">
              <Bell className="w-5 h-5 text-[#F0B90B]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-[#EAECEF] tracking-tight">
                Real-Time Market Alerts &amp; Triggers
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Set latency-critical triggers for price breaches, technical indicator crossovers, and sudden F&amp;O OI buildups.
              </p>
            </div>
          </div>

          <button
            onClick={handleSimulateTrigger}
            className="px-3.5 py-1.5 rounded-lg bg-[#F0B90B]/15 hover:bg-[#F0B90B]/25 border border-[#F0B90B]/30 text-[#F0B90B] font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#F0B90B]" />
            Simulate Alert Push
          </button>
        </div>
      </div>

      {/* Simulated Live Toast Popup */}
      {showSimulatedNotification && (
        <div className="p-4 rounded-xl bg-[#1E2329] border border-[#F0B90B] shadow-2xl flex items-start gap-3 animate-in slide-in-from-top duration-300">
          <div className="p-2 rounded-lg bg-[#F0B90B] text-[#0B0E11]">
            <Bell className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#EAECEF] text-sm">ALERT TRIGGERED: RELIANCE</span>
              <span className="text-gray-400 font-mono text-[10px]">Just Now</span>
            </div>
            <p className="text-gray-300 mt-0.5">
              Price crossed above target threshold of ₹2,990.00 with 1.4x 20-DMA volume surge.
            </p>
          </div>
        </div>
      )}

      {/* Create Alert Form */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-5 shadow-sm">
        <h2 className="text-xs uppercase tracking-wider font-bold text-[#EAECEF] mb-3 flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#F0B90B]" />
          Configure New Smart Alert
        </h2>

        <form onSubmit={handleCreateAlert} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-gray-400 mb-1 font-mono">Select Symbol</label>
            <select
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg px-3 py-2 text-[#EAECEF] font-mono outline-none"
            >
              {stocks.map(s => (
                <option key={s.symbol} value={s.symbol} className="bg-[#181A20] text-[#EAECEF]">
                  {s.symbol} (₹{s.price.toFixed(0)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-1 font-mono">Trigger Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg px-3 py-2 text-[#EAECEF] font-mono outline-none"
            >
              <option value="Price Crosses Above" className="bg-[#181A20]">Price Crosses Above</option>
              <option value="Price Crosses Below" className="bg-[#181A20]">Price Crosses Below</option>
              <option value="RSI Crosses Below 30" className="bg-[#181A20]">RSI &lt; 30 (Oversold)</option>
              <option value="RSI Crosses Above 70" className="bg-[#181A20]">RSI &gt; 70 (Overbought)</option>
              <option value="EMA 9 Crosses 20 EMA" className="bg-[#181A20]">EMA 9/20 Golden Cross</option>
              <option value="OI Spike (>15%)" className="bg-[#181A20]">Option OI Spike &gt; 15%</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-1 font-mono">Target Threshold</label>
            <input
              type="text"
              placeholder="e.g. ₹3,020 or 30 RSI"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              className="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg px-3 py-2 text-[#EAECEF] font-mono outline-none focus:border-[#F0B90B]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-[#F0B90B] hover:bg-[#dfaa07] text-[#0B0E11] font-bold rounded-lg py-2 transition-all shadow-sm text-xs cursor-pointer"
            >
              Save Alert
            </button>
          </div>
        </form>
      </div>

      {/* Active Alerts List */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl overflow-hidden shadow-sm">
        <div className="p-3 bg-[#1E2329] border-b border-[#2B3139] flex items-center justify-between text-xs">
          <span className="font-bold text-[#EAECEF]">Configured Alert Rules ({alerts.length})</span>
          <span className="text-gray-400 font-mono text-[11px]">Push Notifications Active</span>
        </div>

        <div className="divide-y divide-[#2B3139]/60">
          {alerts.map(a => (
            <div key={a.id} className="p-3 flex items-center justify-between gap-3 hover:bg-[#1E2329]/60 transition-colors text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${a.status === 'ACTIVE' ? 'bg-[#00C087] animate-pulse' : 'bg-gray-500'}`} />
                <div>
                  <span className="font-bold text-[#EAECEF] text-sm mr-2">{a.symbol}</span>
                  <span className="text-gray-300 font-sans">{a.condition}</span>
                  <span className="text-[#F0B90B] font-bold ml-1.5">({a.targetValue})</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  a.status === 'ACTIVE' ? 'bg-[#00C087]/20 text-[#00C087]' : 'bg-[#1E2329] text-gray-400'
                }`}>
                  {a.status}
                </span>
                <span className="text-gray-400 text-[11px] hidden sm:inline">{a.createdTime}</span>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#FF3B69] hover:bg-[#2B3139] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
