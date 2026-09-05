import React, { useState, useEffect } from 'react';
import { 
  Home, 
  TrendingUp, 
  Layers, 
  Bot, 
  Target, 
  Compass, 
  ShieldCheck, 
  Wallet, 
  Calculator, 
  Building2, 
  Server,
  Wifi,
  Battery,
  Signal,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';

import { 
  MarketIndex, 
  StockQuote, 
  AISignal, 
  PortfolioHolding, 
  PaperTradeOrder, 
  DataFreshness 
} from './types';

import { 
  INITIAL_INDICES, 
  INITIAL_STOCKS, 
  INITIAL_SIGNALS, 
  INITIAL_PORTFOLIO 
} from './data/mockMarketData';

import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { StockAnalysisView } from './components/StockAnalysisView';
import { OptionChainView } from './components/OptionChainView';
import { SignalsView } from './components/SignalsView';
import { OptionStrategiesView } from './components/OptionStrategiesView';
import { MultiTimeframeView } from './components/MultiTimeframeView';
import { PerformanceView } from './components/PerformanceView';
import { PortfolioView } from './components/PortfolioView';
import { RiskManagementView } from './components/RiskManagementView';
import { AlertsView } from './components/AlertsView';
import { BrokerIntegrationView } from './components/BrokerIntegrationView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { OrderModal } from './components/OrderModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isAndroidFrame, setIsAndroidFrame] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [dataFreshness, setDataFreshness] = useState<DataFreshness>('Real-time');

  // Market & Trading State
  const [indices, setIndices] = useState<MarketIndex[]>(INITIAL_INDICES);
  const [stocks, setStocks] = useState<StockQuote[]>(INITIAL_STOCKS);
  const [signals, setSignals] = useState<AISignal[]>(INITIAL_SIGNALS);
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>(INITIAL_PORTFOLIO);
  const [orders, setOrders] = useState<PaperTradeOrder[]>([
    {
      id: 'ORD-98214',
      symbol: 'RELIANCE',
      side: 'BUY',
      product: 'CNC',
      orderType: 'MARKET',
      quantity: 50,
      price: 2840.50,
      status: 'EXECUTED',
      timestamp: 'Today, 09:35 AM',
      instrument: 'EQUITY'
    },
    {
      id: 'ORD-98215',
      symbol: 'NIFTY 50',
      side: 'BUY',
      product: 'NRML',
      orderType: 'LIMIT',
      quantity: 50,
      price: 185.00,
      status: 'EXECUTED',
      timestamp: 'Today, 10:15 AM',
      instrument: 'OPTIONS'
    }
  ]);

  const [virtualBalance, setVirtualBalance] = useState<number>(685000); // Out of initial 10 Lakhs
  const [watchlist, setWatchlist] = useState<string[]>(['RELIANCE', 'TCS', 'HDFCBANK', 'TATAMOTORS']);
  const [selectedStock, setSelectedStock] = useState<StockQuote>(INITIAL_STOCKS[0]);

  // Live Proxy Feed State
  const [isLiveFeedActive, setIsLiveFeedActive] = useState<boolean>(true);
  const [isLiveLoading, setIsLiveLoading] = useState<boolean>(false);
  const [lastLiveSyncTime, setLastLiveSyncTime] = useState<string>('');
  const [marketStatus, setMarketStatus] = useState<'OPEN' | 'CLOSED'>('OPEN');

  // Order Placement Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalStock, setOrderModalStock] = useState<StockQuote>(INITIAL_STOCKS[0]);
  const [orderModalSide, setOrderModalSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderModalSL, setOrderModalSL] = useState<number | undefined>();
  const [orderModalTarget, setOrderModalTarget] = useState<number | undefined>();

  // Fetch real market quotes from our backend Yahoo Finance proxy
  const fetchLiveFeed = async () => {
    setIsLiveLoading(true);
    try {
      const res = await fetch('/api/market/live-feed');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.indices && data.indices.length > 0) {
        setIndices(data.indices);
      }
      if (data.stocks && data.stocks.length > 0) {
        setStocks(data.stocks);
        // Sync selectedStock with latest price and candles
        setSelectedStock(prev => {
          const updated = data.stocks.find((s: StockQuote) => s.symbol === prev.symbol);
          return updated || prev;
        });
      }
      if (data.marketStatus) {
        setMarketStatus(data.marketStatus);
      }
      const now = new Date();
      setLastLiveSyncTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    } catch (err) {
      console.warn('Live NSE feed unavailable, continuing with cached/algorithmic stream:', err);
    } finally {
      setIsLiveLoading(false);
    }
  };

  // Live Feed or Simulation Polling Effect
  useEffect(() => {
    if (isLiveFeedActive) {
      // Fetch immediately upon activation
      fetchLiveFeed();
      // Poll every 10 seconds (aligned with server cache TTL)
      const interval = setInterval(fetchLiveFeed, 10000);
      return () => clearInterval(interval);
    } else {
      // Offline / Sandbox random tick simulation for realistic testing
      const interval = setInterval(() => {
        setStocks(prev => prev.map(s => {
          const deltaPct = (Math.random() - 0.49) * 0.0016;
          const newPrice = +(s.price * (1 + deltaPct)).toFixed(2);
          const newHigh = Math.max(s.high, newPrice);
          const newLow = Math.min(s.low, newPrice);
          const newChange = +(newPrice - s.prevClose).toFixed(2);
          const newChangePercent = +((newChange / s.prevClose) * 100).toFixed(2);

          return {
            ...s,
            price: newPrice,
            high: newHigh,
            low: newLow,
            change: newChange,
            changePercent: newChangePercent
          };
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLiveFeedActive]);

  const handleToggleWatchlist = (symbol: string) => {
    setWatchlist(prev => 
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    );
  };

  const handleSelectStock = (stock: StockQuote) => {
    setSelectedStock(stock);
    setActiveTab('stocks');
  };

  const handleTradeStock = (stock: StockQuote, side: 'BUY' | 'SELL' = 'BUY') => {
    setOrderModalStock(stock);
    setOrderModalSide(side);
    setOrderModalSL(undefined);
    setOrderModalTarget(undefined);
    setIsOrderModalOpen(true);
  };

  const handleTradeSignal = (stock: StockQuote, signal: AISignal) => {
    setOrderModalStock(stock);
    setOrderModalSide(signal.action === 'SELL' ? 'SELL' : 'BUY');
    setOrderModalSL(signal.stopLoss);
    setOrderModalTarget(signal.target1);
    setIsOrderModalOpen(true);
  };

  const handleExecuteOrder = (newOrder: PaperTradeOrder) => {
    setOrders([newOrder, ...orders]);
    
    // Update Virtual Margin & Holdings
    const tradeValue = newOrder.price * newOrder.quantity;
    setVirtualBalance(prev => Math.max(0, prev - tradeValue));

    // Update or add holding
    setPortfolio(prev => {
      const existing = prev.find(h => h.symbol === newOrder.symbol && h.product === newOrder.product);
      if (existing) {
        const totalQty = existing.quantity + newOrder.quantity;
        const totalCost = existing.investedAmount + tradeValue;
        const avgPrice = totalCost / totalQty;
        return prev.map(h => h.id === existing.id ? {
          ...h,
          quantity: totalQty,
          avgBuyPrice: avgPrice,
          investedAmount: totalCost,
          currentValue: totalQty * h.currentPrice,
          pnl: (totalQty * h.currentPrice) - totalCost,
          pnlPercent: (((totalQty * h.currentPrice) - totalCost) / totalCost) * 100
        } : h);
      } else {
        const newHolding: PortfolioHolding = {
          id: `H-${Date.now()}`,
          symbol: newOrder.symbol,
          companyName: orderModalStock.name,
          product: newOrder.product,
          quantity: newOrder.quantity,
          avgBuyPrice: newOrder.price,
          currentPrice: newOrder.price,
          investedAmount: tradeValue,
          currentValue: tradeValue,
          pnl: 0,
          pnlPercent: 0,
          dayPnl: 0,
          instrument: newOrder.instrument || 'EQUITY'
        };
        return [newHolding, ...prev];
      }
    });
  };

  const handleClosePosition = (holdingId: string) => {
    setPortfolio(prev => {
      const target = prev.find(h => h.id === holdingId);
      if (target) {
        setVirtualBalance(bal => bal + target.currentValue);
      }
      return prev.filter(h => h.id !== holdingId);
    });
  };

  const handleResetPortfolio = () => {
    setVirtualBalance(1000000);
    setPortfolio([]);
    setOrders([]);
  };

  // Nav items
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'stocks', label: 'Stock Analysis', icon: TrendingUp },
    { id: 'fno', label: 'Option Chain', icon: Layers },
    { id: 'signals', label: 'AI Signals', icon: Bot },
    { id: 'strategies', label: 'F&O Setups', icon: Target },
    { id: 'multitf', label: 'Multi-TF', icon: Compass },
    { id: 'performance', label: 'Validation', icon: ShieldCheck },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'risk', label: 'Risk Suite', icon: Calculator },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'brokers', label: 'Brokers', icon: Building2 },
    { id: 'admin', label: 'Admin', icon: Server }
  ];

  // Android Mobile Screen Content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            indices={indices}
            stocks={stocks}
            signals={signals}
            portfolio={portfolio}
            onSelectStock={handleSelectStock}
            onNavigateTab={setActiveTab}
            onTradeStock={handleTradeStock}
            watchlist={watchlist}
            onToggleWatchlist={handleToggleWatchlist}
          />
        );
      case 'stocks':
        return (
          <StockAnalysisView
            stocks={stocks}
            selectedStock={selectedStock}
            onSelectStock={setSelectedStock}
            onTradeStock={handleTradeStock}
            onNavigateTab={setActiveTab}
          />
        );
      case 'fno':
        return <OptionChainView onNavigateTab={setActiveTab} />;
      case 'signals':
        return (
          <SignalsView
            signals={signals}
            stocks={stocks}
            onTradeSignal={handleTradeSignal}
            onSelectStock={handleSelectStock}
          />
        );
      case 'strategies':
        return <OptionStrategiesView />;
      case 'multitf':
        return (
          <MultiTimeframeView
            stocks={stocks}
            onSelectStock={handleSelectStock}
            onTradeStock={handleTradeStock}
          />
        );
      case 'performance':
        return <PerformanceView />;
      case 'portfolio':
        return (
          <PortfolioView
            holdings={portfolio}
            orders={orders}
            virtualBalance={virtualBalance}
            onResetPortfolio={handleResetPortfolio}
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
            onClosePosition={handleClosePosition}
          />
        );
      case 'risk':
        return <RiskManagementView />;
      case 'alerts':
        return <AlertsView stocks={stocks} />;
      case 'brokers':
        return <BrokerIntegrationView />;
      case 'admin':
        return <AdminDashboardView />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0B0E11] text-[#EAECEF]' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* Top Application Header */}
      <Header
        isAndroidFrame={isAndroidFrame}
        setIsAndroidFrame={setIsAndroidFrame}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        dataFreshness={dataFreshness}
        setDataFreshness={setDataFreshness}
        virtualBalance={virtualBalance}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        isLiveFeedActive={isLiveFeedActive}
        setIsLiveFeedActive={setIsLiveFeedActive}
        isLiveLoading={isLiveLoading}
        lastLiveSyncTime={lastLiveSyncTime}
        onRefreshLiveFeed={fetchLiveFeed}
        marketStatus={marketStatus}
        indices={indices}
      />

      {/* Main Container: Android Mobile Frame or Full Screen Terminal */}
      <div className={isAndroidFrame ? 'py-6 px-4 flex justify-center items-start' : 'max-w-7xl mx-auto px-4 py-4'}>
        {isAndroidFrame ? (
          /* Android Hardware Device Wrapper */
          <div className="w-[412px] h-[892px] bg-[#0B0E11] rounded-[48px] border-[10px] border-[#2B3139] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative ring-1 ring-[#2B3139]/80">
            {/* Android Punch Hole Camera & Speaker */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-[#2B3139]" />
            </div>

            {/* Android Status Bar */}
            <div className="pt-2 px-6 pb-1 flex items-center justify-between text-[11px] font-mono font-semibold text-gray-400 z-30 select-none bg-[#0B0E11]">
              <span>09:15</span>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Signal className="w-3 h-3 text-[#00C087]" />
                <span className="text-[9px] font-black text-[#00C087]">5G</span>
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5 text-gray-300" />
              </div>
            </div>

            {/* Scrollable Android Content Viewport */}
            <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-none space-y-4 bg-[#0B0E11]">
              {renderTabContent()}
            </div>

            {/* Material 3 Bottom Navigation Bar */}
            <div className="bg-[#181A20] border-t border-[#2B3139] px-2 py-1.5 flex items-center justify-around z-30">
              {navTabs.slice(0, 5).map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
                      isActive ? 'text-[#F0B90B] font-bold' : 'text-gray-400 hover:text-[#EAECEF]'
                    }`}
                  >
                    <div className={`p-1 rounded-full ${isActive ? 'bg-[#F0B90B]/15 text-[#F0B90B]' : ''}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] tracking-tight">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Android Home Gesture Pill */}
            <div className="py-1 flex justify-center bg-[#181A20]">
              <div className="w-28 h-1 rounded-full bg-[#2B3139]" />
            </div>
          </div>
        ) : (
          /* Full Desktop / Tablet Terminal View */
          <div className="space-y-4">
            {/* Primary Horizontal Terminal Navigation Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none bg-[#181A20] p-1.5 rounded-xl border border-[#2B3139] text-xs shadow-md">
              {navTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`nav-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold font-mono transition-all shrink-0 ${
                      isActive 
                        ? 'bg-[#F0B90B] text-[#0B0E11] shadow-sm' 
                        : 'text-gray-400 hover:text-[#EAECEF] hover:bg-[#1E2329]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Screen */}
            <main>
              {renderTabContent()}
            </main>
          </div>
        )}
      </div>

      {/* Interactive Paper Trade Order Pad Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        stock={orderModalStock}
        initialSide={orderModalSide}
        initialStopLoss={orderModalSL}
        initialTarget={orderModalTarget}
        onExecuteOrder={handleExecuteOrder}
        virtualBalance={virtualBalance}
      />
    </div>
  );
}
