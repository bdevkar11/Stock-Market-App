import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, Layers, Zap, ArrowRight, Check } from 'lucide-react';
import { StockQuote } from '../types';
import { ALL_SECTORS } from '../data/allStocksData';

interface StockSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: StockQuote[];
  selectedSymbol: string;
  onSelectStock: (stock: StockQuote) => void;
  onTradeStock?: (stock: StockQuote, side: 'BUY' | 'SELL') => void;
}

export const StockSearchModal: React.FC<StockSearchModalProps> = ({
  isOpen,
  onClose,
  stocks,
  selectedSymbol,
  onSelectStock,
  onTradeStock
}) => {
  const [query, setQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [sortBy, setSortBy] = useState<'default' | 'gainers' | 'losers' | 'volume'>('default');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedSector('All Sectors');
    }
  }, [isOpen]);

  // Handle keyboard navigation (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Memoized filter and sort for lightweight, 60fps performance
  const filteredStocks = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = stocks;

    if (selectedSector !== 'All Sectors') {
      list = list.filter(s => s.sector.toLowerCase().includes(selectedSector.toLowerCase()));
    }

    if (q) {
      list = list.filter(s => 
        s.symbol.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'gainers') {
      return [...list].sort((a, b) => (b.changePercent ?? 0) - (a.changePercent ?? 0));
    }
    if (sortBy === 'losers') {
      return [...list].sort((a, b) => (a.changePercent ?? 0) - (b.changePercent ?? 0));
    }
    if (sortBy === 'volume') {
      return [...list].sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0));
    }

    return list;
  }, [stocks, query, selectedSector, sortBy]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-[#181A20] border border-[#2B3139] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Bar */}
        <div className="p-3.5 sm:p-4 border-b border-[#2B3139] flex items-center gap-3 bg-[#1E2329]/50">
          <Search className="w-5 h-5 text-[#F0B90B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all 54+ live stocks by symbol, name, or sector (e.g., RELIANCE, Zomato, Auto)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[#EAECEF] text-sm sm:text-base outline-none placeholder-gray-500 font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-[#EAECEF] rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-mono font-bold text-gray-400 hover:text-[#EAECEF] bg-[#2B3139]/60 hover:bg-[#2B3139] rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filters & Quick Chips Strip */}
        <div className="px-3 sm:px-4 py-2 border-b border-[#2B3139] bg-[#14151A] flex items-center justify-between gap-2 overflow-x-auto scrollbar-none text-xs">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-gray-500 text-[11px]">Sector:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-[#1E2329] text-gray-300 text-xs px-2 py-1 rounded border border-[#2B3139] outline-none cursor-pointer"
            >
              {ALL_SECTORS.map(sec => (
                <option key={sec} value={sec} className="bg-[#181A20] text-[#EAECEF]">{sec}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSortBy(sortBy === 'gainers' ? 'default' : 'gainers')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                sortBy === 'gainers' ? 'bg-[#00C087]/20 text-[#00C087] border border-[#00C087]/40' : 'text-gray-400 hover:bg-[#1E2329]'
              }`}
            >
              Top Gainers
            </button>
            <button
              onClick={() => setSortBy(sortBy === 'losers' ? 'default' : 'losers')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                sortBy === 'losers' ? 'bg-[#FF3B69]/20 text-[#FF3B69] border border-[#FF3B69]/40' : 'text-gray-400 hover:bg-[#1E2329]'
              }`}
            >
              Top Losers
            </button>
            <button
              onClick={() => setSortBy(sortBy === 'volume' ? 'default' : 'volume')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                sortBy === 'volume' ? 'bg-[#F0B90B]/20 text-[#F0B90B] border border-[#F0B90B]/40' : 'text-gray-400 hover:bg-[#1E2329]'
              }`}
            >
              High Volume
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="px-4 py-1.5 bg-[#181A20] text-[11px] font-mono text-gray-500 border-b border-[#2B3139]/40 flex justify-between items-center">
          <span>Found {filteredStocks.length} of {stocks.length} Live Stocks</span>
          <span className="text-gray-500 hidden sm:inline">Click any stock to open chart & live technicals</span>
        </div>

        {/* Stock List Scrollable Area */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#2B3139]/50">
          {filteredStocks.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-600 opacity-50" />
              <p className="text-sm">No stocks matched "{query}"</p>
              <p className="text-xs text-gray-600 mt-1">Try searching by symbol like TATAMOTORS, MARUTI, or sector like Banking</p>
            </div>
          ) : (
            filteredStocks.map(stock => {
              const isSelected = stock.symbol === selectedSymbol;
              const isBull = (stock.change ?? 0) >= 0;

              return (
                <div
                  key={stock.symbol}
                  onClick={() => {
                    onSelectStock(stock);
                    onClose();
                  }}
                  className={`px-4 py-2.5 sm:py-3 flex items-center justify-between hover:bg-[#1E2329] cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#1E2329]/80 border-l-2 border-[#F0B90B]' : ''
                  }`}
                >
                  {/* Left info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isBull ? 'bg-[#00C087]/15 text-[#00C087]' : 'bg-[#FF3B69]/15 text-[#FF3B69]'
                    }`}>
                      {isBull ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#EAECEF] font-mono tracking-tight">
                          {stock.symbol}
                        </span>
                        {stock.isFnO && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-[#2B3139] text-[#F0B90B]">
                            F&amp;O
                          </span>
                        )}
                        {isSelected && (
                          <span className="text-[10px] text-[#F0B90B] font-bold flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Active
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-[180px] sm:max-w-[280px]">
                        {stock.name} • <span className="text-gray-500">{stock.sector}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Price & Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right font-mono">
                      <div className="text-sm font-black text-[#EAECEF]">
                        ₹{(stock.price ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className={`text-xs font-bold ${isBull ? 'text-[#00C087]' : 'text-[#FF3B69]'}`}>
                        {isBull ? '+' : ''}{(stock.change ?? 0).toFixed(2)} ({isBull ? '+' : ''}{(stock.changePercent ?? 0).toFixed(2)}%)
                      </div>
                    </div>

                    {onTradeStock && (
                      <div 
                        className="hidden sm:flex items-center gap-1 pl-2 border-l border-[#2B3139]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            onTradeStock(stock, 'BUY');
                            onClose();
                          }}
                          className="px-2 py-1 text-[11px] font-bold bg-[#00C087]/15 hover:bg-[#00C087] text-[#00C087] hover:text-black rounded border border-[#00C087]/30 transition-colors"
                        >
                          BUY
                        </button>
                        <button
                          onClick={() => {
                            onTradeStock(stock, 'SELL');
                            onClose();
                          }}
                          className="px-2 py-1 text-[11px] font-bold bg-[#FF3B69]/15 hover:bg-[#FF3B69] text-[#FF3B69] hover:text-white rounded border border-[#FF3B69]/30 transition-colors"
                        >
                          SELL
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#14151A] border-t border-[#2B3139] flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#00C087]" />
            Live NSE Quotes • Free Real-Time Proxy
          </span>
          <span className="font-mono text-[11px] text-gray-400">
            Press <kbd className="px-1.5 py-0.5 bg-[#2B3139] rounded text-[10px] text-gray-300">ESC</kbd> to exit
          </span>
        </div>
      </div>
    </div>
  );
};
