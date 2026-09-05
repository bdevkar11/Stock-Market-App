import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Smartphone, 
  Monitor, 
  Sun, 
  Moon, 
  Clock, 
  Activity, 
  Radio, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  Wallet
} from 'lucide-react';
import { DataFreshness } from '../types';

interface HeaderProps {
  isAndroidFrame: boolean;
  setIsAndroidFrame: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  dataFreshness: DataFreshness;
  setDataFreshness: (val: DataFreshness) => void;
  virtualBalance: number;
  onOpenOrderModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAndroidFrame,
  setIsAndroidFrame,
  isDarkMode,
  setIsDarkMode,
  dataFreshness,
  setDataFreshness,
  virtualBalance,
  onOpenOrderModal
}) => {
  const [istTime, setIstTime] = useState('');
  const [showRiskNotice, setShowRiskNotice] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST format
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setIstTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-[#181A20] border-b border-[#2B3139]">
      {/* SEBI Compliance Risk Disclosure Marquee / Banner */}
      <div className="bg-[#1E2329] border-b border-[#2B3139] px-3 py-1 text-xs text-[#EAECEF] flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <ShieldAlert className="w-3.5 h-3.5 text-[#F0B90B] shrink-0" />
          <span className="font-bold text-[#F0B90B] shrink-0 text-[11px] uppercase tracking-wide">SEBI Notice:</span>
          <span className="text-gray-400 truncate text-[11px]">
            9 out of 10 individual traders in equity F&amp;O segment incurred net losses (~₹50,000 avg loss). AI signals are probabilistic statistical models and not guaranteed returns.
          </span>
        </div>
        <button
          onClick={() => setShowRiskNotice(!showRiskNotice)}
          className="text-[#F0B90B] hover:text-amber-300 font-medium text-[11px] flex items-center gap-0.5 ml-2 shrink-0 underline cursor-pointer"
        >
          {showRiskNotice ? 'Hide' : 'Details'}
          {showRiskNotice ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Expanded SEBI Study Details Modal / Accordion */}
      {showRiskNotice && (
        <div className="bg-[#14171D] border-b border-[#2B3139] p-4 text-xs text-[#EAECEF] space-y-2 animate-in fade-in duration-150">
          <p className="font-bold text-[#F0B90B]">SEBI Study on Derivatives Market Participants (Key Takeaways):</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>89% of individual traders in equity Futures and Options segment incurred net losses during FY22.</li>
            <li>On average, loss makers registered net trading loss close to ₹50,000 each during FY22.</li>
            <li>Only 11% of individual traders made a net profit, skewed towards institutional algorithmic desks.</li>
            <li><strong>Probabilistic Signals:</strong> All AI Buy/Sell signals and options probabilities shown are mathematical estimates based on historical backtesting. Always use strict stop-losses.</li>
          </ul>
        </div>
      )}

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Market Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#F0B90B] rounded-lg flex items-center justify-center text-[#0B0E11] font-black text-xl italic shadow-md shadow-[#F0B90B]/10">
              Σ
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-base tracking-tight text-[#EAECEF]">
                  FINVANT <span className="text-[#F0B90B]">AI</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#1E2329] text-[#F0B90B] border border-[#2B3139]">
                  NSE/BSE
                </span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium mt-0.5 hidden sm:block">Institutional Probability Terminal</p>
            </div>
          </div>

          {/* Institutional Top Ticker Strip (NIFTY, BANK NIFTY, FINNIFTY) */}
          <div className="hidden xl:flex items-center space-x-4 border-l border-[#2B3139] pl-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">NIFTY 50</span>
              <span className="text-xs font-mono font-bold text-[#00C087]">24,852.15 (+0.82%)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">BANK NIFTY</span>
              <span className="text-xs font-mono font-bold text-[#FF3B69]">51,280.45 (-0.12%)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">FINNIFTY</span>
              <span className="text-xs font-mono font-bold text-[#00C087]">23,410.80 (+0.45%)</span>
            </div>
          </div>

          {/* Live Market Status Badge */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[#2B3139]">
            <div className="px-2.5 py-1 bg-[#1E2329] rounded-lg flex items-center space-x-2 border border-[#2B3139]">
              <div className="w-2 h-2 rounded-full bg-[#00C087] animate-pulse"></div>
              <span className="text-[10px] font-bold text-gray-400">MARKET OPEN</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{istTime || '09:15:00 AM'} IST</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Data Freshness Selector */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#1E2329] px-2.5 py-1 rounded-lg border border-[#2B3139] text-xs">
            <Radio className="w-3 h-3 text-[#00C087] animate-pulse" />
            <span className="text-gray-400 text-[11px]">Feed:</span>
            <select
              value={dataFreshness}
              onChange={(e) => setDataFreshness(e.target.value as DataFreshness)}
              className="bg-transparent text-[#00C087] font-semibold text-[11px] outline-none cursor-pointer"
            >
              <option value="Real-time" className="bg-[#181A20] text-[#EAECEF]">Real-time (0.2s)</option>
              <option value="15m Delayed" className="bg-[#181A20] text-[#EAECEF]">NSE 15m Delayed</option>
              <option value="EOD" className="bg-[#181A20] text-[#EAECEF]">End of Day (EOD)</option>
            </select>
          </div>

          {/* Virtual Margin / Balance Badge */}
          <button
            onClick={onOpenOrderModal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1E2329] hover:bg-[#2B3139] border border-[#2B3139] text-xs transition-colors cursor-pointer"
          >
            <Wallet className="w-3.5 h-3.5 text-[#F0B90B]" />
            <div className="text-right">
              <span className="text-[9px] text-gray-500 block leading-none font-mono">PAPER</span>
              <span className="font-mono font-bold text-[#EAECEF] text-xs">
                ₹{(virtualBalance / 100000).toFixed(2)}L
              </span>
            </div>
          </button>

          {/* Android Mobile Frame Toggle */}
          <button
            id="toggle-android-view"
            onClick={() => setIsAndroidFrame(!isAndroidFrame)}
            title={isAndroidFrame ? "Switch to Full-Screen Terminal" : "Switch to Android Mobile Device View"}
            className={`px-2.5 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              isAndroidFrame 
                ? 'bg-[#F0B90B] text-[#0B0E11] border-[#F0B90B] shadow-sm' 
                : 'bg-[#1E2329] text-gray-400 hover:text-[#EAECEF] hover:bg-[#2B3139] border-[#2B3139]'
            }`}
          >
            {isAndroidFrame ? <Smartphone className="w-3.5 h-3.5 text-[#0B0E11]" /> : <Monitor className="w-3.5 h-3.5 text-gray-400" />}
            <span className="hidden sm:inline">{isAndroidFrame ? 'Android View' : 'Full Screen'}</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            id="toggle-theme"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
            className="p-1.5 rounded-lg bg-[#1E2329] hover:bg-[#2B3139] border border-[#2B3139] text-gray-400 hover:text-[#EAECEF] transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#F0B90B]" /> : <Moon className="w-4 h-4 text-gray-300" />}
          </button>
        </div>
      </div>
    </header>
  );
};
