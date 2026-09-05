import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Cpu, 
  Database, 
  Server, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  RefreshCw,
  GitBranch,
  Terminal
} from 'lucide-react';
import { SystemHealth } from '../types';

export const AdminDashboardView: React.FC = () => {
  const [health, setHealth] = useState<SystemHealth>({
    status: 'OPTIMAL',
    feedLatencyMs: 14,
    activeTraders: 1420,
    signalsGenerated24h: 38,
    modelAccuracy30d: 74.2,
    dataProviderStatus: {
      nseTicks: 'CONNECTED',
      optionChainFeed: 'CONNECTED',
      historicalDatabase: 'CONNECTED',
      aiEngine: 'CONNECTED'
    },
    lastUpdated: 'Just now'
  });

  const [activeModelVersion, setActiveModelVersion] = useState<'v3.8-flash' | 'v3.7-quant'>('v3.8-flash');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setHealth(prev => ({
        ...prev,
        feedLatencyMs: Math.floor(Math.random() * 8) + 11,
        activeTraders: prev.activeTraders + Math.floor(Math.random() * 10) - 4,
        lastUpdated: 'Just now'
      }));
      setIsRefreshing(false);
    }, 400);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#F0B90B]/10 border border-[#F0B90B]/30">
              <Server className="w-5 h-5 text-[#F0B90B]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-[#EAECEF] tracking-tight">
                System Health &amp; Administrative Telemetry
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Real-time operational monitoring for NSE/BSE feeds, ML signal drift, and database queries.
              </p>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-1.5 rounded-lg bg-[#1E2329] hover:bg-[#2B3139] border border-[#2B3139] text-[#EAECEF] font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#F0B90B]' : ''}`} />
            Refresh Telemetry
          </button>
        </div>
      </div>

      {/* 4 Health Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-3 shadow-sm">
          <div className="flex justify-between items-center text-[10px] uppercase text-gray-400">
            <span>NSE Feed Latency</span>
            <span className="w-2 h-2 rounded-full bg-[#00C087] animate-pulse"></span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#00C087] mt-1">
            {health.feedLatencyMs} ms
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">Co-located WebSocket</span>
        </div>

        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-3 shadow-sm">
          <span className="text-[10px] uppercase text-gray-400 block">Active App Traders</span>
          <div className="text-xl sm:text-2xl font-black text-[#EAECEF] mt-1">
            {health.activeTraders.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">Real-time sessions</span>
        </div>

        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-3 shadow-sm">
          <span className="text-[10px] uppercase text-gray-400 block">Signals Generated (24h)</span>
          <div className="text-xl sm:text-2xl font-black text-[#F0B90B] mt-1">
            {health.signalsGenerated24h}
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">Across 100 Instruments</span>
        </div>

        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-3 shadow-sm">
          <span className="text-[10px] uppercase text-gray-400 block">30D Rolling Accuracy</span>
          <div className="text-xl sm:text-2xl font-black text-[#00C087] mt-1">
            {health.modelAccuracy30d}%
          </div>
          <span className="text-[10px] text-gray-400 block mt-0.5">Zero Model Drift</span>
        </div>
      </div>

      {/* Feed Statuses & Model Deployment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Data Feeds Status */}
        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm space-y-3">
          <h2 className="text-xs uppercase tracking-wider font-bold text-[#EAECEF] flex items-center gap-1.5">
            <Database className="w-4 h-4 text-[#F0B90B]" />
            Core Data Pipeline &amp; Provider Gateways
          </h2>

          <div className="divide-y divide-[#2B3139]/60 font-mono text-xs">
            <div className="py-2 flex items-center justify-between">
              <span className="text-gray-300">NSE Tick Ingestion (Binary Packets)</span>
              <span className="px-2 py-0.5 rounded bg-[#00C087]/15 text-[#00C087] border border-[#00C087]/30 text-[10px] font-bold">
                {health.dataProviderStatus.nseTicks}
              </span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span className="text-gray-300">NSE Option Chain Stream (15s polling)</span>
              <span className="px-2 py-0.5 rounded bg-[#00C087]/15 text-[#00C087] border border-[#00C087]/30 text-[10px] font-bold">
                {health.dataProviderStatus.optionChainFeed}
              </span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span className="text-gray-300">PostgreSQL Cloud Database (Tick Storage)</span>
              <span className="px-2 py-0.5 rounded bg-[#00C087]/15 text-[#00C087] border border-[#00C087]/30 text-[10px] font-bold">
                {health.dataProviderStatus.historicalDatabase}
              </span>
            </div>

            <div className="py-2 flex items-center justify-between">
              <span className="text-gray-300">Gemini 3.8 Flash AI Inference Server</span>
              <span className="px-2 py-0.5 rounded bg-[#00C087]/15 text-[#00C087] border border-[#00C087]/30 text-[10px] font-bold">
                {health.dataProviderStatus.aiEngine}
              </span>
            </div>
          </div>
        </div>

        {/* Model Version Control & Rollback */}
        <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm space-y-3">
          <h2 className="text-xs uppercase tracking-wider font-bold text-[#EAECEF] flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-[#F0B90B]" />
            AI Model Deployment &amp; Versioning
          </h2>

          <div className="space-y-2 text-xs">
            <div 
              onClick={() => setActiveModelVersion('v3.8-flash')}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                activeModelVersion === 'v3.8-flash' 
                  ? 'bg-[#1E2329] border-[#F0B90B] text-[#EAECEF]' 
                  : 'bg-[#1E2329]/60 border-[#2B3139] text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold">Gemini 3.8 Flash (Production Primary)</span>
                {activeModelVersion === 'v3.8-flash' && (
                  <span className="px-2 py-0.5 rounded bg-[#F0B90B]/20 text-[#F0B90B] text-[10px] font-bold border border-[#F0B90B]/30">
                    ACTIVE
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-1 font-sans">
                Real-time synthesis of technical indicators, Greeks, and order-flow sentiment.
              </p>
            </div>

            <div 
              onClick={() => setActiveModelVersion('v3.7-quant')}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                activeModelVersion === 'v3.7-quant' 
                  ? 'bg-[#1E2329] border-[#F0B90B] text-[#EAECEF]' 
                  : 'bg-[#1E2329]/60 border-[#2B3139] text-gray-400 hover:text-[#EAECEF]'
              }`}
            >
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold">Quant Backtested Engine v3.7 (Fallback)</span>
                {activeModelVersion === 'v3.7-quant' && (
                  <span className="px-2 py-0.5 rounded bg-[#F0B90B]/20 text-[#F0B90B] text-[10px] font-bold border border-[#F0B90B]/30">
                    ACTIVE
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-1 font-sans">
                Deterministic mathematical scoring rulebook based on 3-year historical ticks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
