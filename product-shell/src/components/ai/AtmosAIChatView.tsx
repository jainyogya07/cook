'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Atmos AI — Dedicated Full-Page Conversational Intelligence View
// Clean Aarivi-inspired layout: centered chat, suggestion cards, bottom input
// ============================================================================

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, ArrowUpRight, Loader2, CloudRain, Wheat, TrendingUp, Shield, Mic, Square, Info } from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { parseAndRouteQuery } from '@/services/intentRouter';
import { useVoiceCapture } from '@/hooks/useVoiceCapture';
import { QUERY_INPUT_RULE, QUERY_INPUT_RULE_EN } from '@/data/engineFieldGuide';
import { buildHumanReply } from '@/services/plainReply';
import FeatureLock from '@/components/shell/FeatureLock';
import { canPost, t } from '@/i18n/copy';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionButtons?: {
    label: string;
    targetModule: number;
    targetPort: number;
  }[];
  evidenceMetrics?: { label: string; value: string }[];
}

const SUGGESTION_CARDS_HI = [
  { icon: CloudRain, label: 'ओडिशा में चक्रवात?', query: 'ओडिशा तट पर अगले 3 दिन चक्रवात का कितना खतरा है?' },
  { icon: Wheat, label: 'पंजाब गेहूं सलाह', query: 'पंजाब में इस हफ्ते गेहूं के लिए क्या सलाह है?' },
  { icon: TrendingUp, label: 'नाशिक प्याज भाव', query: 'नाशिक प्याज मंडी में भारी बारिश से भाव कैसे बदलेंगे?' },
  { icon: Shield, label: 'बाढ़ से बचाव', query: 'बंगाल की खाड़ी के डिप्रेशन से गाँवों को क्या तैयारी करनी चाहिए?' }
];
const SUGGESTION_CARDS_EN = [
  { icon: CloudRain, label: 'Odisha cyclone?', query: 'How much cyclone risk on the Odisha coast in the next 3 days?' },
  { icon: Wheat, label: 'Punjab wheat advice', query: 'What should Punjab wheat do this week?' },
  { icon: TrendingUp, label: 'Nashik onion price', query: 'How will heavy rain move Nashik onion mandi prices?' },
  { icon: Shield, label: 'Flood prep', query: 'What should villages prepare for a Bay of Bengal depression?' }
];

export default function AtmosAIChatView() {
  const { openModuleWorkspace, showToast, userProfile, locale, accessPlan } = useShellStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { isListening, toggle: toggleVoice } = useVoiceCapture(
    (transcript) => setInputText((prev) => `${prev.trim()}${prev.trim() ? ' ' : ''}${transcript}`),
    (message) => showToast(message, 'warning')
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (queryText?: string) => {
    const text = queryText || inputText;
    if (!text.trim()) return;
    if (!canPost(accessPlan)) {
      window.dispatchEvent(new CustomEvent('atmos-open-auth'));
      showToast(t(locale, 'lockTitle'), 'warning');
      return;
    }

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsGenerating(true);

    await new Promise((res) => setTimeout(res, 600));
    const routingResult = parseAndRouteQuery(text, 'ASK');

    const aiMsg: ChatMessage = {
      id: `ai_${Date.now()}`,
      sender: 'ai',
      text: buildHumanReply(routingResult, useShellStore.getState().locale),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionButtons: [
        {
          label: locale === 'hi' ? 'नक्शा खोलें' : 'Open the map',
          targetModule: routingResult.targetModuleLaunch?.moduleNumber || 6,
          targetPort: routingResult.targetModuleLaunch?.port || 3006
        },
        {
          label: locale === 'hi' ? 'गाँव वाला नक्शा' : 'Village map',
          targetModule: 7,
          targetPort: 3007
        }
      ],
      evidenceMetrics: [
        { label: locale === 'hi' ? 'भरोसा' : 'Confidence', value: `${Math.round((routingResult.entities.confidenceScore || 0.9) * 100)}%` },
        { label: locale === 'hi' ? 'समय' : 'Horizon', value: routingResult.entities.horizon || '+72h' },
        { label: locale === 'hi' ? 'इंजन' : 'Engines', value: `${routingResult.activatedModules.length}` }
      ]
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsGenerating(false);
  };

  const hasMessages = messages.length > 0;

  return (
    <main
      className="x-center-feed"
      style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden', position: 'relative', minHeight: 0, flex: 1 }}
    >
      {/* Scrollable Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '0 16px' }}>

        {/* Empty State — Centered hero when no messages */}
        {!hasMessages && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '28px',
            paddingBottom: '80px'
          }}>
            {/* Handcrafted National Mission Emblem */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '9999px',
              border: '2px solid rgba(212, 175, 55, 0.55)',
              boxShadow: '0 0 24px rgba(212, 175, 55, 0.22), inset 0 0 10px rgba(0, 0, 0, 0.8)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#05070B'
            }}>
              <img
                src="/emblem.jpg"
                alt="Bharatiya Mausam aur Krishi Vigyan Emblem"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.18)' }}
              />
            </div>

            <div style={{ textAlign: 'center', maxWidth: '440px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '3px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.28)',
                marginBottom: '10px'
              }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#E6C65C', letterSpacing: '0.04em' }}>
                  गगनात् भूमौ, ज्ञानात् समृद्धौ
                </span>
              </div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--text-0)',
                letterSpacing: '-0.02em',
                marginBottom: '8px'
              }}>
              क्या जानना है?
            </h2>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-2)',
                lineHeight: 1.5
              }}>
                जगह, समय, फसल या खतरा लिखें। हिंदी में पूछें — जवाब हिंदी में मिलेगा।
              </p>
            </div>

            {/* Suggestion Cards — 2x2 grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              maxWidth: '480px',
              width: '100%'
            }}>
              {(locale === 'hi' ? SUGGESTION_CARDS_HI : SUGGESTION_CARDS_EN).map((card, idx) => {
                const Icon = card.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(card.query)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 16px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--stroke)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.borderColor = 'var(--stroke)';
                    }}
                  >
                    <Icon style={{ width: '16px', height: '16px', color: 'var(--text-2)', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-1)', fontWeight: 500, lineHeight: 1.3 }}>
                      {card.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Messages */}
        {hasMessages && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            paddingTop: '24px',
            paddingBottom: '24px',
            maxWidth: '680px',
            margin: '0 auto',
            width: '100%'
          }}>
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  {msg.sender === 'ai' && (
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--stroke)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Sparkles style={{ width: '14px', height: '14px', color: 'var(--text-2)' }} />
                    </div>
                  )}

                  <div style={{
                    maxWidth: '520px',
                    borderRadius: '16px',
                    padding: '14px 16px',
                    fontSize: '13.5px',
                    lineHeight: 1.55,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    backgroundColor: msg.sender === 'user'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.03)',
                    color: 'var(--text-0)',
                    border: `1px solid ${msg.sender === 'user' ? 'rgba(255, 255, 255, 0.15)' : 'var(--stroke)'}`,
                  }}>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>

                    {/* Evidence Metrics */}
                    {msg.evidenceMetrics && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '6px',
                        paddingTop: '8px',
                        borderTop: '1px solid var(--stroke)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px'
                      }}>
                        {msg.evidenceMetrics.map((em, i) => (
                          <div key={i} style={{
                            padding: '6px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            border: '1px solid var(--stroke)',
                            textAlign: 'center'
                          }}>
                            <div style={{ color: 'var(--text-2)', textTransform: 'uppercase' }}>{em.label}</div>
                            <div style={{ color: '#38BDF8', fontWeight: 700, marginTop: '2px' }}>{em.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    {msg.actionButtons && (
                      <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: '6px',
                        paddingTop: '6px', borderTop: '1px solid var(--stroke)'
                      }}>
                        {msg.actionButtons.map((btn, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              openModuleWorkspace(btn.targetModule, btn.targetPort, btn.label);
                              showToast(`Opened Engine ${btn.targetModule}`, 'info');
                            }}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '9999px',
                              backgroundColor: 'rgba(56, 189, 248, 0.1)',
                              color: '#38BDF8',
                              border: '1px solid rgba(56, 189, 248, 0.25)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              cursor: 'pointer'
                            }}
                          >
                            <span>{btn.label}</span>
                            <ArrowUpRight style={{ width: '11px', height: '11px' }} />
                          </button>
                        ))}
                      </div>
                    )}

                    <div style={{
                      fontSize: '10px',
                      color: 'var(--text-2)',
                      textAlign: 'right',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div style={{
                      width: '30px', height: '30px', borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--stroke)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
                      color: 'var(--text-0)', flexShrink: 0
                    }}>
                      {userProfile.avatarInitials}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isGenerating && (
              <div style={{
                display: 'flex', gap: '8px', alignItems: 'center',
                color: 'var(--text-2)', fontSize: '12px', fontFamily: 'var(--font-mono)'
              }}>
                <Loader2 style={{ width: '14px', height: '14px', color: '#38BDF8', animation: 'spin 1s linear infinite' }} />
                <span>{t(locale, 'thinking')}</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* Bottom Input Bar — always visible */}
      <FeatureLock>
      <div style={{
        borderTop: '1px solid var(--stroke)',
        padding: '14px 20px',
        backgroundColor: 'rgba(5, 5, 6, 0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)', fontSize: 11 }}>
          <Info style={{ width: 13, height: 13 }} />
          {locale === 'hi' ? QUERY_INPUT_RULE : QUERY_INPUT_RULE_EN}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={toggleVoice}
          aria-pressed={isListening}
          title={isListening ? 'Stop listening' : 'Speak in Hindi or English'}
          style={{
            padding: 10,
            borderRadius: 999,
            color: isListening ? '#fff' : 'var(--text-2)',
            background: isListening ? 'rgba(255,255,255,.16)' : 'rgba(255,255,255,.04)',
            border: '1px solid var(--stroke)'
          }}
        >
          {isListening ? <Square size={15} /> : <Mic size={16} />}
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t(locale, 'placeholder')}
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--stroke)',
            borderRadius: '9999px',
            padding: '12px 20px',
            fontSize: '14px',
            color: 'var(--text-0)',
            transition: 'border-color 0.15s ease'
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--stroke)')}
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim() || isGenerating}
          style={{
            padding: '10px',
            borderRadius: '9999px',
            backgroundColor: '#FFFFFF',
            color: '#050506',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: !inputText.trim() || isGenerating ? 0.3 : 1,
            transition: 'all 0.15s ease'
          }}
        >
          <Send style={{ width: '16px', height: '16px' }} />
        </button>
        </div>
      </div>
      </FeatureLock>
    </main>
  );
}
