import React, { useState, useRef } from 'react';
import { Candle, TechnicalIndicators } from '../types';
import { TrendingUp, Eye, Layers } from 'lucide-react';

interface Props {
  candles: Candle[];
  technicals: TechnicalIndicators;
  symbol: string;
  currentPrice: number;
}

export const CandlestickChart: React.FC<Props> = ({ candles, technicals, symbol, currentPrice }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1m' | '5m' | '15m' | '1h' | '1D'>('15m');
  const [showEMA20, setShowEMA20] = useState(true);
  const [showVWAP, setShowVWAP] = useState(true);
  const [showBollinger, setShowBollinger] = useState(false);
  const [subChart, setSubChart] = useState<'VOLUME' | 'RSI' | 'MACD'>('VOLUME');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  if (!candles || candles.length === 0) {
    return <div className="p-8 text-center text-slate-400">No chart data available</div>;
  }

  // Determine price bounds
  const prices = candles.flatMap(c => [c.high, c.low]);
  const minPrice = Math.min(...prices) * 0.998;
  const maxPrice = Math.max(...prices) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  // Max volume for volume bars
  const maxVol = Math.max(...candles.map(c => c.volume), 1);

  // SVG dimensions
  const svgWidth = 720;
  const mainChartHeight = 260;
  const subChartHeight = 80;
  const paddingBottom = 24;
  const totalHeight = mainChartHeight + subChartHeight + paddingBottom;

  const candleWidth = Math.max(4, Math.min(14, (svgWidth - 60) / candles.length - 3));
  const getX = (index: number) => 15 + index * ((svgWidth - 70) / (candles.length - 1 || 1));
  const getY = (price: number) => mainChartHeight - ((price - minPrice) / priceRange) * (mainChartHeight - 20) - 10;

  // Active hover candle
  const activeCandle = hoverIndex !== null ? candles[hoverIndex] : candles[candles.length - 1];

  return (
    <div className="bg-[#181A20] rounded-xl border border-[#2B3139] p-4 select-none shadow-sm">
      {/* Chart Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#2B3139] text-xs">
        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-[#1E2329] p-1 rounded-lg border border-[#2B3139]">
          {(['1m', '5m', '15m', '1h', '1D'] as const).map(tf => (
            <button
              key={tf}
              id={`btn-tf-${tf}`}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-2.5 py-1 rounded font-mono text-xs transition-colors cursor-pointer ${
                selectedTimeframe === tf 
                  ? 'bg-[#F0B90B] text-[#0B0E11] font-bold' 
                  : 'text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Indicators toggle */}
        <div className="flex items-center gap-2">
          <button
            id="toggle-ema20"
            onClick={() => setShowEMA20(!showEMA20)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
              showEMA20 
                ? 'bg-[#F0B90B]/15 text-[#F0B90B] border-[#F0B90B]/40' 
                : 'bg-[#1E2329] text-gray-400 border-[#2B3139]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#F0B90B]"></span>
            EMA 20
          </button>

          <button
            id="toggle-vwap"
            onClick={() => setShowVWAP(!showVWAP)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
              showVWAP 
                ? 'bg-[#3772FF]/15 text-[#3772FF] border-[#3772FF]/40' 
                : 'bg-[#1E2329] text-gray-400 border-[#2B3139]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#3772FF]"></span>
            VWAP
          </button>

          <button
            id="toggle-bb"
            onClick={() => setShowBollinger(!showBollinger)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
              showBollinger 
                ? 'bg-[#848E9C]/20 text-[#EAECEF] border-[#848E9C]/40' 
                : 'bg-[#1E2329] text-gray-400 border-[#2B3139]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            Bollinger
          </button>
        </div>

        {/* Sub-chart toggle */}
        <div className="flex items-center gap-1 bg-[#1E2329] p-1 rounded-lg border border-[#2B3139]">
          {(['VOLUME', 'RSI', 'MACD'] as const).map(sc => (
            <button
              key={sc}
              id={`btn-subchart-${sc}`}
              onClick={() => setSubChart(sc)}
              className={`px-2 py-0.5 rounded font-mono text-[11px] transition-colors cursor-pointer ${
                subChart === sc 
                  ? 'bg-[#2B3139] text-[#EAECEF] font-bold' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {sc}
            </button>
          ))}
        </div>
      </div>

      {/* OHLC Bar */}
      <div className="flex flex-wrap items-center gap-4 py-2 text-xs font-mono text-gray-400 border-b border-[#2B3139]">
        <span className="text-[#EAECEF] font-semibold">{symbol}</span>
        <span>O: <span className="text-[#EAECEF]">₹{activeCandle?.open.toFixed(2)}</span></span>
        <span>H: <span className="text-[#00C087]">₹{activeCandle?.high.toFixed(2)}</span></span>
        <span>L: <span className="text-[#FF3B69]">₹{activeCandle?.low.toFixed(2)}</span></span>
        <span>C: <span className={activeCandle?.close >= activeCandle?.open ? 'text-[#00C087] font-bold' : 'text-[#FF3B69] font-bold'}>₹{activeCandle?.close.toFixed(2)}</span></span>
        <span>Vol: <span className="text-gray-300">{(activeCandle?.volume / 1000).toFixed(1)}k</span></span>
        {activeCandle?.time && <span className="text-gray-500 ml-auto">{activeCandle.time} IST</span>}
      </div>

      {/* Interactive SVG Canvas */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden mt-1 cursor-crosshair"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <svg 
          viewBox={`0 0 ${svgWidth} ${totalHeight}`} 
          className="w-full h-auto"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width * svgWidth;
            const index = Math.min(
              candles.length - 1, 
              Math.max(0, Math.round((relX - 15) / ((svgWidth - 70) / (candles.length - 1 || 1))))
            );
            setHoverIndex(index);
          }}
        >
          <defs>
            <linearGradient id="volGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00C087" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00C087" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="volRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF3B69" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF3B69" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="rsiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F0B90B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F0B90B" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio, i) => {
            const y = mainChartHeight * ratio;
            const priceLevel = maxPrice - ratio * priceRange;
            return (
              <g key={i}>
                <line x1="10" y1={y} x2={svgWidth - 55} y2={y} stroke="#2B3139" strokeDasharray="3,3" />
                <text x={svgWidth - 50} y={y + 4} fill="#848E9C" fontSize="10" fontFamily="monospace">
                  ₹{priceLevel.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Subchart divider */}
          <line x1="10" y1={mainChartHeight} x2={svgWidth - 10} y2={mainChartHeight} stroke="#2B3139" />

          {/* Support and Resistance Pivot Lines */}
          {technicals.pivots && (
            <g opacity="0.65">
              {/* R1 */}
              <line 
                x1="15" 
                y1={getY(technicals.pivots.r1)} 
                x2={svgWidth - 60} 
                y2={getY(technicals.pivots.r1)} 
                stroke="#f43f5e" 
                strokeDasharray="4,4" 
                strokeWidth="1" 
              />
              <text x={svgWidth - 52} y={getY(technicals.pivots.r1) + 3} fill="#f43f5e" fontSize="9" fontFamily="JetBrains Mono">
                R1
              </text>
              {/* Pivot */}
              <line 
                x1="15" 
                y1={getY(technicals.pivots.pivot)} 
                x2={svgWidth - 60} 
                y2={getY(technicals.pivots.pivot)} 
                stroke="#94a3b8" 
                strokeDasharray="2,2" 
                strokeWidth="1" 
              />
              <text x={svgWidth - 52} y={getY(technicals.pivots.pivot) + 3} fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono">
                PP
              </text>
              {/* S1 */}
              <line 
                x1="15" 
                y1={getY(technicals.pivots.s1)} 
                x2={svgWidth - 60} 
                y2={getY(technicals.pivots.s1)} 
                stroke="#10b981" 
                strokeDasharray="4,4" 
                strokeWidth="1" 
              />
              <text x={svgWidth - 52} y={getY(technicals.pivots.s1) + 3} fill="#10b981" fontSize="9" fontFamily="JetBrains Mono">
                S1
              </text>
            </g>
          )}

          {/* Bollinger Bands Overlay */}
          {showBollinger && technicals.bollinger && (
            <g opacity="0.35">
              <line 
                x1="15" 
                y1={getY(technicals.bollinger.upper)} 
                x2={svgWidth - 60} 
                y2={getY(technicals.bollinger.upper)} 
                stroke="#c084fc" 
                strokeWidth="1.5" 
              />
              <line 
                x1="15" 
                y1={getY(technicals.bollinger.lower)} 
                x2={svgWidth - 60} 
                y2={getY(technicals.bollinger.lower)} 
                stroke="#c084fc" 
                strokeWidth="1.5" 
              />
            </g>
          )}

          {/* EMA 20 Line */}
          {showEMA20 && (
            <path
              d={candles.map((c, idx) => {
                const x = getX(idx);
                // synthetic EMA20 smoothing for path
                const emaVal = c.close * 0.998 + (technicals.ema20 - c.close) * (idx / candles.length);
                const y = getY(emaVal);
                return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.6"
            />
          )}

          {/* VWAP Line */}
          {showVWAP && (
            <path
              d={candles.map((c, idx) => {
                const x = getX(idx);
                const y = getY(c.vwap || technicals.vwap);
                return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.6"
              strokeDasharray="5,2"
            />
          )}

          {/* Candlesticks */}
          {candles.map((c, idx) => {
            const x = getX(idx);
            const isGreen = c.close >= c.open;
            const color = isGreen ? '#00C087' : '#FF3B69';
            const bodyTop = getY(Math.max(c.open, c.close));
            const bodyBottom = getY(Math.min(c.open, c.close));
            const bodyHeight = Math.max(2, bodyBottom - bodyTop);

            return (
              <g key={idx}>
                {/* Upper and Lower Wick */}
                <line
                  x1={x}
                  y1={getY(c.high)}
                  x2={x}
                  y2={getY(c.low)}
                  stroke={color}
                  strokeWidth="1.2"
                />
                {/* Candle Body */}
                <rect
                  x={x - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={color}
                  rx="1"
                />
              </g>
            );
          })}

          {/* Subchart rendering */}
          {subChart === 'VOLUME' && (
            <g transform={`translate(0, ${mainChartHeight + 10})`}>
              {candles.map((c, idx) => {
                const x = getX(idx);
                const isGreen = c.close >= c.open;
                const vHeight = (c.volume / maxVol) * (subChartHeight - 20);
                const vY = subChartHeight - vHeight - 5;
                return (
                  <rect
                    key={idx}
                    x={x - candleWidth / 2}
                    y={vY}
                    width={candleWidth}
                    height={vHeight}
                    fill={isGreen ? 'url(#volGreen)' : 'url(#volRed)'}
                    stroke={isGreen ? '#00C087' : '#FF3B69'}
                    strokeWidth="0.5"
                  />
                );
              })}
              <text x={svgWidth - 50} y={15} fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">
                VOL
              </text>
            </g>
          )}

          {subChart === 'RSI' && (
            <g transform={`translate(0, ${mainChartHeight + 10})`}>
              {/* RSI 70 Overbought & 30 Oversold lines */}
              <line x1="15" y1={subChartHeight * 0.3} x2={svgWidth - 60} y2={subChartHeight * 0.3} stroke="#f43f5e" strokeDasharray="2,2" />
              <line x1="15" y1={subChartHeight * 0.7} x2={svgWidth - 60} y2={subChartHeight * 0.7} stroke="#10b981" strokeDasharray="2,2" />
              <text x={svgWidth - 50} y={subChartHeight * 0.3 + 3} fill="#f43f5e" fontSize="9" fontFamily="JetBrains Mono">70</text>
              <text x={svgWidth - 50} y={subChartHeight * 0.7 + 3} fill="#10b981" fontSize="9" fontFamily="JetBrains Mono">30</text>
              
              {/* RSI Line */}
              <path
                d={candles.map((c, idx) => {
                  const x = getX(idx);
                  // Dynamic RSI variation based on price momentum
                  const rsiVal = Math.min(85, Math.max(20, technicals.rsi + (c.close - technicals.vwap) / 8));
                  const y = subChartHeight - (rsiVal / 100) * subChartHeight;
                  return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="#c084fc"
                strokeWidth="1.8"
              />
            </g>
          )}

          {subChart === 'MACD' && (
            <g transform={`translate(0, ${mainChartHeight + 10})`}>
              <line x1="15" y1={subChartHeight / 2} x2={svgWidth - 60} y2={subChartHeight / 2} stroke="#475569" />
              {candles.map((c, idx) => {
                const x = getX(idx);
                const hist = technicals.macd.histogram * (0.8 + (c.close - c.open) / 10);
                const hHeight = Math.min(subChartHeight / 2 - 4, Math.abs(hist) * 4);
                const y = hist >= 0 ? subChartHeight / 2 - hHeight : subChartHeight / 2;
                return (
                  <rect
                    key={idx}
                    x={x - candleWidth / 2}
                    y={y}
                    width={candleWidth}
                    height={hHeight}
                    fill={hist >= 0 ? '#10b981' : '#f43f5e'}
                  />
                );
              })}
              <text x={svgWidth - 50} y={15} fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">
                MACD
              </text>
            </g>
          )}

          {/* Crosshair when hovering */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={10}
                x2={getX(hoverIndex)}
                y2={totalHeight - 10}
                stroke="#94a3b8"
                strokeDasharray="3,3"
                strokeWidth="1"
              />
              <line
                x1={10}
                y1={getY(activeCandle.close)}
                x2={svgWidth - 55}
                y2={getY(activeCandle.close)}
                stroke="#94a3b8"
                strokeDasharray="3,3"
                strokeWidth="1"
              />
              {/* Hover Price Tag */}
              <rect
                x={svgWidth - 54}
                y={getY(activeCandle.close) - 9}
                width="48"
                height="18"
                fill="#38bdf8"
                rx="3"
              />
              <text
                x={svgWidth - 30}
                y={getY(activeCandle.close) + 4}
                fill="#0f172a"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="JetBrains Mono"
              >
                ₹{activeCandle.close.toFixed(0)}
              </text>
            </g>
          )}

          {/* Current Live Price Line */}
          <line
            x1="10"
            y1={getY(currentPrice)}
            x2={svgWidth - 55}
            y2={getY(currentPrice)}
            stroke="#10b981"
            strokeDasharray="2,2"
            strokeWidth="1.2"
          />
          <rect
            x={svgWidth - 54}
            y={getY(currentPrice) - 9}
            width="50"
            height="18"
            fill="#10b981"
            rx="3"
          />
          <text
            x={svgWidth - 29}
            y={getY(currentPrice) + 4}
            fill="#ffffff"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="JetBrains Mono"
          >
            ₹{currentPrice.toFixed(0)}
          </text>
        </svg>
      </div>

      {/* Chart Legend & Technical Footprint */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/40 mt-1">
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-amber-400"></span> 20 EMA: ₹{technicals.ema20.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-cyan-400"></span> VWAP: ₹{technicals.vwap.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span> RSI (14): {technicals.rsi.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            ATR: ₹{technicals.atr.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-slate-500">Breakout Status:</span>
          <span className={`px-2 py-0.5 rounded font-semibold ${
            technicals.breakoutStatus.includes('Bullish') 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
              : technicals.breakoutStatus.includes('Bearish')
              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              : 'bg-slate-800 text-slate-300'
          }`}>
            {technicals.breakoutStatus}
          </span>
        </div>
      </div>
    </div>
  );
};
