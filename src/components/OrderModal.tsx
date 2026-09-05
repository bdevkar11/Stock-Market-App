import React, { useState } from 'react';
import { X, ShieldCheck, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { StockQuote, PaperTradeOrder } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: StockQuote;
  initialSide?: 'BUY' | 'SELL';
  initialOrderPrice?: number;
  initialStopLoss?: number;
  initialTarget?: number;
  onExecuteOrder: (order: PaperTradeOrder) => void;
  virtualBalance: number;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  stock,
  initialSide = 'BUY',
  initialOrderPrice,
  initialStopLoss,
  initialTarget,
  onExecuteOrder,
  virtualBalance
}) => {
  const [side, setSide] = useState<'BUY' | 'SELL'>(initialSide);
  const [product, setProduct] = useState<'CNC' | 'MIS' | 'NRML'>('MIS');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'SL'>('MARKET');
  const [quantity, setQuantity] = useState<number>(stock.lotSize || 10);
  const [limitPrice, setLimitPrice] = useState<number>(initialOrderPrice || stock.price);
  const [triggerPrice, setTriggerPrice] = useState<number>(initialStopLoss || stock.price * 0.98);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const executionPrice = orderType === 'MARKET' ? stock.price : limitPrice;
  const leverageMultiplier = product === 'MIS' ? 0.2 : 1.0; // 5x leverage for MIS intraday
  const requiredMargin = +(executionPrice * quantity * leverageMultiplier).toFixed(2);
  const isAffordable = requiredMargin <= virtualBalance;

  const handlePlaceOrder = () => {
    if (!isAffordable) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newOrder: PaperTradeOrder = {
        id: `ORD-${Date.now()}`,
        symbol: stock.symbol,
        side,
        product,
        orderType,
        quantity,
        price: executionPrice,
        triggerPrice: orderType === 'SL' ? triggerPrice : undefined,
        status: 'EXECUTED',
        timestamp: new Date().toLocaleTimeString('en-IN'),
        instrument: stock.isFnO && product === 'NRML' ? 'FUTURES' : 'EQUITY'
      };

      onExecuteOrder(newOrder);
      setIsSubmitting(false);
      setSuccessMessage(`Order #${newOrder.id.slice(-6)} Executed Successfully!`);
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1200);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#181A20] border border-[#2B3139] w-full max-w-md rounded-xl shadow-2xl overflow-hidden text-[#EAECEF]">
        {/* Modal Header */}
        <div className={`px-5 py-3.5 flex items-center justify-between border-b border-[#2B3139] ${
          side === 'BUY' ? 'bg-[#00C087]/10' : 'bg-[#FF3B69]/10'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
              side === 'BUY' ? 'bg-[#00C087] text-[#0B0E11]' : 'bg-[#FF3B69] text-white'
            }`}>
              {side}
            </span>
            <span className="font-extrabold text-base text-[#EAECEF]">{stock.symbol}</span>
            <span className="text-xs text-gray-400 font-mono">NSE • ₹{stock.price.toFixed(2)}</span>
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#2B3139] text-gray-400 hover:text-[#EAECEF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Side Toggle: BUY vs SELL */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#1E2329] rounded-lg border border-[#2B3139]">
            <button
              onClick={() => setSide('BUY')}
              className={`py-2 rounded-md font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                side === 'BUY' 
                  ? 'bg-[#00C087] text-[#0B0E11] shadow-sm' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              BUY
            </button>
            <button
              onClick={() => setSide('SELL')}
              className={`py-2 rounded-md font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                side === 'SELL' 
                  ? 'bg-[#FF3B69] text-white shadow-sm' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              <ArrowDownRight className="w-4 h-4" />
              SELL
            </button>
          </div>

          {/* Product Type (MIS Intraday vs CNC Delivery) */}
          <div>
            <label className="block text-gray-400 mb-1 font-medium">Product</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'MIS', label: 'MIS (Intraday)', desc: '5x Margin' },
                { id: 'CNC', label: 'CNC (Delivery)', desc: 'Cash 1x' },
                { id: 'NRML', label: 'NRML (F&O)', desc: 'Overnight' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setProduct(item.id as any)}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    product === item.id 
                      ? 'bg-[#1E2329] border-[#F0B90B] text-[#EAECEF]' 
                      : 'bg-[#1E2329]/60 border-[#2B3139] text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <div className="font-semibold text-xs">{item.label}</div>
                  <div className="text-[10px] text-gray-400">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Order Type (Market vs Limit vs SL) */}
          <div>
            <label className="block text-gray-400 mb-1 font-medium">Order Type</label>
            <div className="flex gap-2">
              {(['MARKET', 'LIMIT', 'SL'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setOrderType(t)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    orderType === t 
                      ? 'bg-[#2B3139] border-[#2B3139] text-[#EAECEF] font-bold' 
                      : 'bg-[#1E2329] border-[#2B3139] text-gray-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Price Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 mb-1 font-medium">
                Qty {stock.lotSize ? `(Lot: ${stock.lotSize})` : '(Shares)'}
              </label>
              <div className="flex items-center bg-[#1E2329] rounded-lg border border-[#2B3139] px-3 py-2">
                <input
                  type="number"
                  min="1"
                  step={stock.lotSize || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-transparent w-full text-sm font-mono font-bold text-[#EAECEF] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-medium">
                Price (₹) {orderType === 'MARKET' ? '(At Mkt)' : ''}
              </label>
              <div className={`flex items-center bg-[#1E2329] rounded-lg border px-3 py-2 ${
                orderType === 'MARKET' ? 'border-[#2B3139] opacity-60' : 'border-[#2B3139]'
              }`}>
                <input
                  type="number"
                  step="0.05"
                  disabled={orderType === 'MARKET'}
                  value={orderType === 'MARKET' ? stock.price : limitPrice}
                  onChange={(e) => setLimitPrice(parseFloat(e.target.value) || stock.price)}
                  className="bg-transparent w-full text-sm font-mono font-bold text-[#EAECEF] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Stop Loss & Target Assistance */}
          {(initialStopLoss || initialTarget) && (
            <div className="p-2.5 rounded-lg bg-[#1E2329] border border-[#2B3139] flex items-center justify-between text-[11px] font-mono">
              <div>
                <span className="text-gray-400">AI Stop Loss: </span>
                <span className="text-[#FF3B69] font-bold">₹{initialStopLoss?.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-400">AI Target 1: </span>
                <span className="text-[#00C087] font-bold">₹{initialTarget?.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Margin & Account Summary */}
          <div className="p-3 rounded-lg bg-[#1E2329] border border-[#2B3139] space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between text-gray-400">
              <span>Required Margin:</span>
              <span className="font-bold text-[#EAECEF]">₹{requiredMargin.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Virtual Available Margin:</span>
              <span className={isAffordable ? 'text-[#00C087] font-bold' : 'text-[#FF3B69] font-bold'}>
                ₹{virtualBalance.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Success or Error Banner */}
          {successMessage && (
            <div className="p-2.5 rounded-lg bg-[#00C087]/20 border border-[#00C087]/40 text-[#00C087] text-center font-bold text-xs flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00C087]" />
              {successMessage}
            </div>
          )}

          {!isAffordable && (
            <div className="p-2 rounded-lg bg-[#FF3B69]/20 border border-[#FF3B69]/40 text-[#FF3B69] text-center text-[11px]">
              Insufficient virtual margin. Lower quantity or switch to MIS product.
            </div>
          )}

          {/* Action Button */}
          <button
            id="btn-execute-order"
            disabled={!isAffordable || isSubmitting}
            onClick={handlePlaceOrder}
            className={`w-full py-3 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer ${
              side === 'BUY'
                ? 'bg-[#00C087] hover:bg-[#00a876] text-[#0B0E11] disabled:opacity-50'
                : 'bg-[#FF3B69] hover:bg-[#e0325b] text-white disabled:opacity-50'
            }`}
          >
            {isSubmitting ? 'Routing to Paper OMS...' : `${side} ${quantity} ${stock.symbol}`}
          </button>
        </div>
      </div>
    </div>
  );
};
