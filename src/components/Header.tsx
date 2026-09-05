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
  Wallet,
  RefreshCw,
  Zap,
  Download,
  CheckCircle2,
  X
} from 'lucide-react';
import { DataFreshness, MarketIndex } from '../types';

interface HeaderProps {
  isAndroidFrame: boolean;
  setIsAndroidFrame: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  dataFreshness: DataFreshness;
  setDataFreshness: (val: DataFreshness) => void;
  virtualBalance: number;
  onOpenOrderModal: () => void;
  isLiveFeedActive: boolean;
  setIsLiveFeedActive: (val: boolean) => void;
  isLiveLoading: boolean;
  lastLiveSyncTime: string;
  onRefreshLiveFeed: () => void;
  marketStatus: 'OPEN' | 'CLOSED';
  indices: MarketIndex[];
}

export const Header: React.FC<HeaderProps> = ({
  isAndroidFrame,
  setIsAndroidFrame,
  isDarkMode,
  setIsDarkMode,
  dataFreshness,
  setDataFreshness,
  virtualBalance,
  onOpenOrderModal,
  isLiveFeedActive,
  setIsLiveFeedActive,
  isLiveLoading,
  lastLiveSyncTime,
  onRefreshLiveFeed,
  marketStatus,
  indices
}) => {
  const [istTime, setIstTime] = useState('');
  const [showRiskNotice, setShowRiskNotice] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const niftyIndex = indices.find(i => i.symbol === 'NIFTY 50');
  const bankNiftyIndex = indices.find(i => i.symbol === 'BANKNIFTY');
  const sensexIndex = indices.find(i => i.symbol === 'SENSEX');

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowInstallModal(true);
    }
  };

  const appUrl = window.location.origin;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

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

          {/* Institutional Top Ticker Strip (NIFTY, BANK NIFTY, SENSEX) */}
          <div className="hidden xl:flex items-center space-x-4 border-l border-[#2B3139] pl-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">NIFTY 50</span>
              <span className={`text-xs font-mono font-bold ${(niftyIndex?.change ?? 0) >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                {niftyIndex ? niftyIndex.value.toLocaleString('en-IN') : '23,897.70'} ({niftyIndex ? (niftyIndex.change >= 0 ? '+' : '') + niftyIndex.changePercent + '%' : '+0.58%'})
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">BANK NIFTY</span>
              <span className={`text-xs font-mono font-bold ${(bankNiftyIndex?.change ?? 0) >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                {bankNiftyIndex ? bankNiftyIndex.value.toLocaleString('en-IN') : '51,280.45'} ({bankNiftyIndex ? (bankNiftyIndex.change >= 0 ? '+' : '') + bankNiftyIndex.changePercent + '%' : '+0.76%'})
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider">SENSEX</span>
              <span className={`text-xs font-mono font-bold ${(sensexIndex?.change ?? 0) >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                {sensexIndex ? sensexIndex.value.toLocaleString('en-IN') : '76,515.40'} ({sensexIndex ? (sensexIndex.change >= 0 ? '+' : '') + sensexIndex.changePercent + '%' : '+0.51%'})
              </span>
            </div>
          </div>

          {/* Live Market Status Badge */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[#2B3139]">
            <div className="px-2.5 py-1 bg-[#1E2329] rounded-lg flex items-center space-x-2 border border-[#2B3139]">
              <div className={`w-2 h-2 rounded-full ${marketStatus === 'OPEN' ? 'bg-[#00C087] animate-pulse' : 'bg-[#F0B90B]'}`}></div>
              <span className="text-[10px] font-bold text-gray-400">
                {marketStatus === 'OPEN' ? 'MARKET LIVE' : 'MARKET CLOSED'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{istTime || '09:15:00 AM'} IST</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live NSE Proxy Feed Toggle & Manual Sync */}
          <div className="flex items-center bg-[#1E2329] border border-[#2B3139] rounded-lg p-0.5">
            <button
              onClick={() => setIsLiveFeedActive(!isLiveFeedActive)}
              title={isLiveFeedActive ? "Live NSE Feed Active (via Free Yahoo Finance Proxy). Click to switch to simulation." : "Simulation Mode Active. Click to enable Live NSE Feed."}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                isLiveFeedActive 
                  ? 'bg-[#00C087]/15 text-[#00C087] border border-[#00C087]/30' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              <Zap className={`w-3 h-3 ${isLiveFeedActive ? 'text-[#00C087]' : 'text-gray-500'}`} />
              <span className="text-[11px] font-mono">
                {isLiveFeedActive ? 'LIVE NSE' : 'SIMULATION'}
              </span>
            </button>

            {isLiveFeedActive && (
              <button
                onClick={onRefreshLiveFeed}
                disabled={isLiveLoading}
                title={`Last synced: ${lastLiveSyncTime || 'Just now'}. Click to pull latest NSE quotes.`}
                className="p-1 hover:bg-[#2B3139] text-gray-400 hover:text-[#00C087] rounded transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLiveLoading ? 'animate-spin text-[#00C087]' : ''}`} />
              </button>
            )}
          </div>
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

          {/* Install on Android Button */}
          <button
            id="install-android-app-btn"
            onClick={handleInstallClick}
            title="Download & Install FINVANT Terminal on Android"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F0B90B]/10 hover:bg-[#F0B90B]/20 border border-[#F0B90B]/40 text-[#F0B90B] text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Download App</span>
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

      {/* Android Mobile Download & Install Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#181A20] border border-[#2B3139] rounded-2xl max-w-md w-full p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0B90B] flex items-center justify-center text-[#0B0E11] font-black text-xl italic shadow-md">
                  Σ
                </div>
                <div>
                  <h2 className="text-base font-black text-[#EAECEF]">Download on Android Mobile</h2>
                  <p className="text-xs text-gray-400">Install FINVANT AI Terminal as a standalone native app</p>
                </div>
              </div>
              <button
                onClick={() => setShowInstallModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-[#EAECEF] hover:bg-[#2B3139]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#1E2329] border border-[#2B3139] rounded-xl p-3.5 space-y-2">
              <span className="text-[11px] font-mono text-gray-400 block uppercase font-semibold">Your Direct App Link:</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={appUrl}
                  className="bg-[#14171D] border border-[#2B3139] rounded-lg px-3 py-1.5 text-xs font-mono text-[#F0B90B] w-full select-all outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer ${
                    copiedLink 
                      ? 'bg-[#00C087] text-[#0B0E11]' 
                      : 'bg-[#F0B90B] text-[#0B0E11] hover:bg-amber-400'
                  }`}
                >
                  {copiedLink ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-gray-300">
              <p className="font-bold text-[#EAECEF] text-xs">How to install on Android in 3 easy steps:</p>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1E2329] border border-[#2B3139] text-[#F0B90B] font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                <span>Open the link above in <strong>Google Chrome</strong> on your Android mobile device.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1E2329] border border-[#2B3139] text-[#F0B90B] font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <span>Tap the <strong>⋮ (three dots menu)</strong> in the top-right corner of Chrome.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#1E2329] border border-[#2B3139] text-[#F0B90B] font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <span>Tap <strong>&ldquo;Install app&rdquo;</strong> (or &ldquo;Add to Home screen&rdquo;).</span>
              </div>
            </div>

            <div className="bg-[#00C087]/10 border border-[#00C087]/20 rounded-xl p-3 flex items-center gap-2 text-xs text-[#00C087]">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Full standalone Android app experience with offline capability, 0 browser bar, and fast launch!</span>
            </div>

            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#1E2329] hover:bg-[#2B3139] border border-[#2B3139] text-xs font-bold text-[#EAECEF] transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
