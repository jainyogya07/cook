'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Atmos AI Conversational Intelligence Assistant (Grok / Pi Style)
// Seamless conversational surface that directly controls scientific viewports
// Pure Vanilla CSS with inline styles and design tokens
// ============================================================================

import React, { useState } from 'react';
import {
  X,
  Send,
  Sparkles,
  ArrowUpRight,
  Compass,
  Layers,
  MapPin,
  Flame,
  CheckCircle2,
  Loader2,
  Mic,
  Square
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { parseAndRouteQuery } from '@/services/intentRouter';
import { useVoiceCapture } from '@/hooks/useVoiceCapture';
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
    actionType: string;
  }[];
  evidenceMetrics?: { label: string; value: string }[];
}

const DEFAULT_MESSAGES: ChatMessage[] = [];

export default function AtmosAIChatModal() {
  const {
    aiChatModalOpen,
    setAiChatModalOpen,
    openModuleWorkspace,
    showToast,
    locale,
    accessPlan
  } = useShellStore();

  const [messages, setMessages] = useState<ChatMessage[]>(DEFAULT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { isListening, toggle: toggleVoice } = useVoiceCapture(
    (transcript) => setInputText((prev) => `${prev.trim()}${prev.trim() ? ' ' : ''}${transcript}`),
    (message) => showToast(message, 'warning')
  );

  if (!aiChatModalOpen) return null;

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

    // Call intent router for real model-driven response
    await new Promise((res) => setTimeout(res, 500));
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
          targetPort: routingResult.targetModuleLaunch?.port || 3006,
          actionType: 'open_module'
        },
        {
          label: locale === 'hi' ? 'गाँव वाला नक्शा' : 'Village map',
          targetModule: 7,
          targetPort: 3007,
          actionType: 'open_module'
        },
        {
          label: locale === 'hi' ? 'फसल सलाह' : 'Crop advice',
          targetModule: 10,
          targetPort: 3010,
          actionType: 'open_module'
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

  const promptSuggestions = locale === 'hi'
    ? [
        'ओडिशा तट पर अगले 3 दिन बारिश का कितना खतरा है?',
        'फूल आने वाली धान को कितना नुकसान हो सकता है?',
        'नाशिक प्याज मंडी में भारी बारिश से भाव कैसे बदलेंगे?',
        'अगर बारिश अनुमान से 20% ज्यादा हुई तो क्या होगा?'
      ]
    : [
        'How much rain risk on the Odisha coast in the next 3 days?',
        'How much flowering-stage paddy could be hurt?',
        'How will heavy rain move Nashik onion mandi prices?',
        'What if rain runs 20% above the estimate?'
      ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        userSelect: 'none'
      }}
      onClick={() => setAiChatModalOpen(false)}
    >
      <div
        style={{
          backgroundColor: '#0B1728',
          border: '1px solid rgba(110, 170, 220, 0.22)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '680px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden',
          color: '#F4F8FC'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(110, 170, 220, 0.14)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(7, 17, 31, 0.85)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(24, 169, 232, 0.12)',
              border: '1px solid rgba(24, 169, 232, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#36C5FF'
            }}>
              <Sparkles style={{ width: '18px', height: '18px' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#F4F8FC', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                  ATMOS AI // CONVERSATIONAL CONTROLLER
                </h3>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  backgroundColor: '#10b981'
                }} />
              </div>
              <p style={{ fontSize: '11px', color: '#9BAFC3', marginTop: '2px' }}>
                Grok-style assistant that inspects data and controls scientific viewports
              </p>
            </div>
          </div>

          <button
            onClick={() => setAiChatModalOpen(false)}
            style={{
              padding: '8px',
              borderRadius: '9999px',
              color: '#9BAFC3',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>

        {/* Chat History Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              {msg.sender === 'ai' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(24, 169, 232, 0.15)',
                  border: '1px solid rgba(24, 169, 232, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#36C5FF',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  AI
                </div>
              )}

              <div
                style={{
                  maxWidth: '520px',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  backgroundColor: msg.sender === 'user' ? '#18A9E8' : '#07111F',
                  color: msg.sender === 'user' ? '#07111F' : '#F4F8FC',
                  fontWeight: msg.sender === 'user' ? 600 : 400,
                  border: msg.sender === 'user' ? 'none' : '1px solid rgba(110, 170, 220, 0.15)',
                  boxShadow: msg.sender === 'user' ? '0 4px 14px rgba(24, 169, 232, 0.25)' : 'none'
                }}
              >
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>

                {/* Evidence Metrics */}
                {msg.evidenceMetrics && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(110, 170, 220, 0.12)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px'
                  }}>
                    {msg.evidenceMetrics.map((em, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '6px',
                          borderRadius: '8px',
                          backgroundColor: '#0B1728',
                          border: '1px solid rgba(110, 170, 220, 0.1)',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ color: '#61768B', textTransform: 'uppercase' }}>{em.label}</div>
                        <div style={{ color: '#36C5FF', fontWeight: 700, marginTop: '2px' }}>{em.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interactive Visualization Controller Action Buttons */}
                {msg.actionButtons && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(110, 170, 220, 0.12)'
                  }}>
                    {msg.actionButtons.map((btn, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setAiChatModalOpen(false);
                          openModuleWorkspace(btn.targetModule, btn.targetPort, btn.label);
                          showToast(`Opened Engine ${btn.targetModule} workspace`, 'info');
                        }}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(24, 169, 232, 0.15)',
                          color: '#36C5FF',
                          border: '1px solid rgba(24, 169, 232, 0.35)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span>{btn.label}</span>
                        <ArrowUpRight style={{ width: '13px', height: '13px' }} />
                      </button>
                    ))}
                  </div>
                )}

                <div style={{
                  fontSize: '10px',
                  color: msg.sender === 'user' ? 'rgba(7, 17, 31, 0.7)' : '#61768B',
                  textAlign: 'right',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9999px',
                  backgroundColor: '#0B1728',
                  border: '1px solid rgba(110, 170, 220, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#36C5FF',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  YJ
                </div>
              )}
            </div>
          ))}

          {isGenerating && (
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              color: '#9BAFC3',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)'
            }}>
              <Loader2 style={{ width: '16px', height: '16px', color: '#36C5FF' }} />
              <span>सोच रहा हूँ — मौसम से फसल तक...</span>
            </div>
          )}
        </div>

        {/* Prompt Suggestions */}
        <div style={{
          padding: '8px 16px',
          borderTop: '1px solid rgba(110, 170, 220, 0.1)',
          backgroundColor: 'rgba(7, 17, 31, 0.7)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)'
        }}>
          <span style={{ color: '#61768B', textTransform: 'uppercase', fontSize: '10px', marginRight: '4px' }}>उदाहरण:</span>
          {promptSuggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug)}
              style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: '#0B1728',
                color: '#9BAFC3',
                border: '1px solid rgba(110, 170, 220, 0.14)',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <FeatureLock>
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid rgba(110, 170, 220, 0.14)',
          backgroundColor: '#07111F',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <button
            onClick={toggleVoice}
            aria-pressed={isListening}
            title={isListening ? (locale === 'hi' ? 'सुनना बंद करें' : 'Stop listening') : (locale === 'hi' ? 'हिन्दी में बोलें' : 'Speak in English')}
            style={{
              padding: 10,
              borderRadius: 999,
              color: isListening ? '#fff' : '#9BAFC3',
              background: isListening ? 'rgba(24,169,232,.2)' : '#0B1728',
              border: '1px solid rgba(110, 170, 220, 0.18)'
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
              backgroundColor: '#0B1728',
              border: '1px solid rgba(110, 170, 220, 0.18)',
              borderRadius: '9999px',
              padding: '10px 18px',
              fontSize: '13px',
              color: '#F4F8FC'
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isGenerating}
            style={{
              padding: '10px',
              borderRadius: '9999px',
              backgroundColor: '#18A9E8',
              color: '#07111F',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: !inputText.trim() || isGenerating ? 0.4 : 1,
              transition: 'all 0.15s ease'
            }}
          >
            <Send style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
        </FeatureLock>
      </div>
    </div>
  );
}
