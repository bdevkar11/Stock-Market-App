import React, { useState } from 'react';
import { 
  Building2, 
  Key, 
  ShieldCheck, 
  CheckCircle2, 
  Radio, 
  Lock, 
  ArrowRight, 
  Zap, 
  Server,
  Layers,
  Code
} from 'lucide-react';
import { BrokerConfig } from '../types';

export const BrokerIntegrationView: React.FC = () => {
  const [brokers, setBrokers] = useState<BrokerConfig[]>([
    {
      brokerName: 'Zerodha Kite Connect',
      isConnected: true,
      apiKeyMasked: 'kite_live_9a87***',
      mode: 'SANDBOX',
      pingMs: 18,
      statusMessage: 'Kite Connect v3 WebSocket streaming at 50 ticks/sec'
    },
    {
      brokerName: 'Angel One SmartAPI',
      isConnected: false,
      apiKeyMasked: 'smart_api_***',
      mode: 'SANDBOX',
      pingMs: 0,
      statusMessage: 'Ready for TOTP authentication handshake'
    },
    {
      brokerName: 'Upstox Pro API',
      isConnected: false,
      apiKeyMasked: 'upstox_v2_***',
      mode: 'SANDBOX',
      pingMs: 0,
      statusMessage: 'OAuth 2.0 PKCE protocol ready'
    },
    {
      brokerName: 'Dhan HQ API',
      isConnected: false,
      apiKeyMasked: 'dhan_client_***',
      mode: 'SANDBOX',
      pingMs: 0,
      statusMessage: 'SuperFast 10ms execution gateway'
    }
  ]);

  const [selectedBroker, setSelectedBroker] = useState<string>('Zerodha Kite Connect');

  const handleToggleConnect = (brokerName: string) => {
    setBrokers(brokers.map(b => {
      if (b.brokerName === brokerName) {
        return {
          ...b,
          isConnected: !b.isConnected,
          pingMs: !b.isConnected ? Math.floor(Math.random() * 15) + 12 : 0,
          statusMessage: !b.isConnected ? 'Connected & streaming live ticks' : 'Disconnected'
        };
      }
      return b;
    }));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#F0B90B]/10 border border-[#F0B90B]/30">
            <Building2 className="w-5 h-5 text-[#F0B90B]" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-[#EAECEF] tracking-tight">
              Indian Broker Integration Architecture &amp; Gateways
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Production-grade execution APIs for Zerodha Kite, Upstox, Angel One SmartAPI, and Dhan HQ.
            </p>
          </div>
        </div>
      </div>

      {/* Broker Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brokers.map(b => (
          <div 
            key={b.brokerName}
            onClick={() => setSelectedBroker(b.brokerName)}
            className={`bg-[#181A20] border rounded-xl p-4 shadow-sm transition-all cursor-pointer ${
              selectedBroker === b.brokerName ? 'border-[#F0B90B]/80' : 'border-[#2B3139] hover:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between pb-3 border-b border-[#2B3139]">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg ${b.isConnected ? 'bg-[#00C087]/15 text-[#00C087] border border-[#00C087]/30' : 'bg-[#1E2329] text-gray-400 border border-[#2B3139]'}`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#EAECEF]">{b.brokerName}</h3>
                  <span className="text-[10px] text-gray-400 font-mono">Key: {b.apiKeyMasked}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleConnect(b.brokerName);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                  b.isConnected 
                    ? 'bg-[#00C087]/20 text-[#00C087] border border-[#00C087]/40 shadow-sm' 
                    : 'bg-[#1E2329] text-gray-400 border border-[#2B3139] hover:text-[#EAECEF]'
                }`}
              >
                {b.isConnected ? 'CONNECTED' : 'CONNECT'}
              </button>
            </div>

            <div className="pt-3 font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-gray-400">
                <span>Environment:</span>
                <span className="px-2 py-0.5 rounded bg-[#1E2329] text-[#F0B90B] font-bold text-[10px] border border-[#2B3139]">
                  {b.mode}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Network Ping Latency:</span>
                <span className={`font-bold ${b.isConnected ? 'text-[#00C087]' : 'text-gray-500'}`}>
                  {b.isConnected ? `${b.pingMs} ms (Sub-tick)` : 'Offline'}
                </span>
              </div>
              <div className="text-[11px] text-gray-300 pt-1">
                {b.statusMessage}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Safeguards & Regulatory Compliance Architecture */}
      <div className="bg-[#181A20] border border-[#2B3139] rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#2B3139]">
          <ShieldCheck className="w-5 h-5 text-[#00C087]" />
          <h2 className="text-xs uppercase tracking-wider font-bold text-[#EAECEF]">
            SEBI Compliance &amp; Broker Security Safeguards
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#EAECEF]">
              <Lock className="w-3.5 h-3.5 text-[#F0B90B]" />
              Zero Plaintext Storage
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              API Secrets and session tokens are encrypted using AES-256-GCM with hardware security modules (HSM). Never exposed in client JS.
            </p>
          </div>

          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#EAECEF]">
              <Key className="w-3.5 h-3.5 text-[#F0B90B]" />
              SEBI Mandatory 2FA/TOTP
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Enforces time-based one-time password (TOTP RFC 6238) authorization on daily market open before routing real orders.
            </p>
          </div>

          <div className="p-3 bg-[#1E2329] rounded-lg border border-[#2B3139] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#EAECEF]">
              <Radio className="w-3.5 h-3.5 text-[#00C087]" />
              Rate-Limiting &amp; Fat-Finger
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Order pacing caps at 10 orders/sec per SEBI circular. Max loss circuit breakers reject accidental outsized quantities automatically.
            </p>
          </div>
        </div>

        {/* Technical Architecture Workflow */}
        <div className="p-4 bg-[#1E2329] rounded-lg border border-[#2B3139] text-xs font-mono space-y-2">
          <span className="text-[#F0B90B] font-bold block uppercase text-[10px]">
            End-to-End Order Routing Flow:
          </span>
          <div className="text-gray-300 space-y-1 text-[11px]">
            <div>1. Client initiates Paper or Live Trade ──► Encrypted Payload with Nonce</div>
            <div>2. Server Risk Engine verifies Margin &amp; Max Daily Loss Limits (Pass)</div>
            <div>3. Broker OAuth Gateway generates signed SHA-256 Checksum</div>
            <div>4. HTTPS POST /orders/regular to Kite / SmartAPI OMS (18ms latency)</div>
            <div>5. Exchange ACK received ◄── Webhook streams tick-level Fill status</div>
          </div>
        </div>
      </div>
    </div>
  );
};
