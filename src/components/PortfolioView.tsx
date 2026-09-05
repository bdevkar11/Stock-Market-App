import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  RotateCcw, 
  Plus, 
  History, 
  PieChart, 
  TrendingUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PortfolioHolding, PaperTradeOrder } from '../types';

interface PortfolioViewProps {
  holdings: PortfolioHolding[];
  orders: PaperTradeOrder[];
  virtualBalance: number;
  onResetPortfolio: () => void;
  onOpenOrderModal: () => void;
  onClosePosition?: (holdingId: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  holdings,
  orders,
  virtualBalance,
  onResetPortfolio,
  onOpenOrderModal,
  onClosePosition
}) => {
  const [activeTab, setActiveTab] = useState<'HOLDINGS' | 'ORDERS'>('HOLDINGS');

  const totalInvested = holdings.reduce((acc, h) => acc + h.investedAmount, 0);
  const totalCurrent = holdings.reduce((acc, h) => acc + h.currentValue, 0);
  const totalPnl = totalCurrent - totalInvested;
  const totalPnlPct = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
  const totalNetWorth = virtualBalance + totalCurrent;

  return (
    <div className="space-y-4">
      {/* Portfolio Header Metric Bar */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2B3139]">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-gray-400">
              Total Account Net Worth (Paper Trading)
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-2xl sm:text-3xl font-black font-mono text-[#EAECEF]">
                ₹{totalNetWorth.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
              <span className={`text-xs font-mono font-bold flex items-center ${totalPnl >= 0 ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                {totalPnl >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                ₹{totalPnl.toLocaleString('en-IN', { maximumFractionDigits: 0 })} ({(totalPnlPct ?? 0).toFixed(2)}%)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenOrderModal}
              className="px-4 py-2 rounded-lg bg-[#00C087] hover:bg-[#00a876] text-[#0B0E11] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Order
            </button>

            <button
              onClick={onResetPortfolio}
              title="Reset virtual account back to ₹10,00,000"
              className="p-2 rounded-lg bg-[#1E2329] hover:bg-[#2B3139] text-gray-400 hover:text-[#FF3B69] border border-[#2B3139] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Financial Sub-Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono text-xs">
          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 text-[10px] uppercase block">Available Virtual Margin</span>
            <span className="text-base font-bold text-[#00C087]">
              ₹{virtualBalance.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>

          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 text-[10px] uppercase block">Current Holding Value</span>
            <span className="text-base font-bold text-[#EAECEF]">
              ₹{totalCurrent.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>

          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 text-[10px] uppercase block">Total Capital Invested</span>
            <span className="text-base font-bold text-gray-300">
              ₹{totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>

          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139]">
            <span className="text-gray-400 text-[10px] uppercase block">Active Positions / Orders</span>
            <span className="text-base font-bold text-[#F0B90B]">
              {holdings.length} Assets / {orders.length} Trades
            </span>
          </div>
        </div>
      </div>

      {/* Tabs: Holdings vs Order Book */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl overflow-hidden shadow-sm">
        <div className="p-3 bg-[#1E2329] border-b border-[#2B3139] flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-[#181A20] p-1 rounded-lg border border-[#2B3139] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('HOLDINGS')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'HOLDINGS' 
                  ? 'bg-[#2B3139] text-[#EAECEF] font-bold shadow-sm' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              Open Holdings ({holdings.length})
            </button>
            <button
              onClick={() => setActiveTab('ORDERS')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'ORDERS' 
                  ? 'bg-[#2B3139] text-[#EAECEF] font-bold shadow-sm' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              Order Log ({orders.length})
            </button>
          </div>

          <span className="text-xs text-gray-400 font-mono hidden sm:inline">
            Simulated Zerodha / NSE OMS
          </span>
        </div>

        {/* Tab 1: Holdings */}
        {activeTab === 'HOLDINGS' && (
          <div className="overflow-x-auto">
            {holdings.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                No open positions currently. Click "New Order" or select an AI signal to place a paper trade.
              </div>
            ) : (
              <table className="w-full text-center font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-[#181A20] text-gray-400 border-b border-[#2B3139] text-[10px] uppercase">
                    <th className="py-2.5 px-3 text-left">Instrument</th>
                    <th className="py-2.5 px-2">Type</th>
                    <th className="py-2.5 px-2">Qty</th>
                    <th className="py-2.5 px-2">Avg Buy</th>
                    <th className="py-2.5 px-2">LTP</th>
                    <th className="py-2.5 px-2">Current Val</th>
                    <th className="py-2.5 px-2">P&amp;L (₹)</th>
                    <th className="py-2.5 px-2">P&amp;L (%)</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map(h => {
                    const isProfit = h.pnl >= 0;
                    return (
                      <tr key={h.id} className="border-b border-[#2B3139]/60 hover:bg-[#1E2329]/60 transition-colors">
                        <td className="py-2.5 px-3 text-left">
                          <span className="font-bold text-[#EAECEF] block">{h.symbol}</span>
                          <span className="text-[10px] text-gray-400 font-sans">{h.instrument}</span>
                        </td>
                        <td className="py-2.5 px-2">
                          <span className="px-2 py-0.5 rounded bg-[#1E2329] text-gray-300 text-[10px] font-bold border border-[#2B3139]">
                            {h.product}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-gray-200 font-bold">{h.quantity}</td>
                        <td className="py-2.5 px-2 text-gray-300">₹{(h.avgBuyPrice ?? 0).toFixed(2)}</td>
                        <td className="py-2.5 px-2 text-[#EAECEF] font-bold">₹{(h.currentPrice ?? 0).toFixed(2)}</td>
                        <td className="py-2.5 px-2 text-gray-300">₹{(h.currentValue ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className={`py-2.5 px-2 font-black ${isProfit ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                          {isProfit ? '+' : ''}₹{(h.pnl ?? 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </td>
                        <td className={`py-2.5 px-2 font-bold ${isProfit ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                          {isProfit ? '+' : ''}{(h.pnlPercent ?? 0).toFixed(2)}%
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => onClosePosition && onClosePosition(h.id)}
                            className="px-2.5 py-1 rounded-md bg-[#FF3B69]/15 text-[#FF3B69] hover:bg-[#FF3B69]/25 border border-[#FF3B69]/30 text-[11px] font-bold transition-all cursor-pointer"
                          >
                            Exit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'ORDERS' && (
          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                No orders executed today.
              </div>
            ) : (
              <table className="w-full text-center font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-[#181A20] text-gray-400 border-b border-[#2B3139] text-[10px] uppercase">
                    <th className="py-2.5 px-3 text-left">Time</th>
                    <th className="py-2.5 px-2">Symbol</th>
                    <th className="py-2.5 px-2">Side</th>
                    <th className="py-2.5 px-2">Product</th>
                    <th className="py-2.5 px-2">Qty</th>
                    <th className="py-2.5 px-2">Exec Price</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-b border-[#2B3139]/60 hover:bg-[#1E2329]/60 transition-colors">
                      <td className="py-2.5 px-3 text-left text-gray-400 text-[11px]">{o.timestamp}</td>
                      <td className="py-2.5 px-2 font-bold text-[#EAECEF]">{o.symbol}</td>
                      <td className="py-2.5 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.side === 'BUY' ? 'bg-[#00C087]/20 text-[#00C087]' : 'bg-[#FF3B69]/20 text-[#FF3B69]'
                        }`}>
                          {o.side}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-gray-400">{o.product}</td>
                      <td className="py-2.5 px-2 font-bold text-gray-200">{o.quantity}</td>
                      <td className="py-2.5 px-2 font-mono text-gray-200">₹{(o.price ?? 0).toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-[#00C087]/15 text-[#00C087] border border-[#00C087]/30 text-[10px] font-bold">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
