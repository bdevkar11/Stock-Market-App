import { Candle } from '../types';

export function generateCandles(basePrice: number, count: number = 32, volatilityPct: number = 0.007): Candle[] {
  const candles: Candle[] = [];
  let currentPrice = basePrice * (1 - volatilityPct * 6);
  const now = new Date();
  
  for (let i = count; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15 * 60 * 1000);
    const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    const delta = (Math.random() - 0.48) * basePrice * volatilityPct;
    const open = +currentPrice.toFixed(2);
    const close = +(open + delta).toFixed(2);
    const high = +(Math.max(open, close) + Math.random() * basePrice * volatilityPct * 0.7).toFixed(2);
    const low = +(Math.min(open, close) - Math.random() * basePrice * volatilityPct * 0.7).toFixed(2);
    const volume = Math.floor(25000 + Math.random() * 180000);
    const vwap = +((high + low + close) / 3).toFixed(2);
    
    currentPrice = close;
    candles.push({ time: timeStr, open, high, low, close, volume, vwap });
  }
  return candles;
}
