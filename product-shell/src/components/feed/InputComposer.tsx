'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Input Composer (Pure Monochromatic X/Twitter Lights Out Design)
// Minimalist black surface, white ask pill, clean grey icons
// ============================================================================

import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  Paperclip,
  MapPin,
  Clock,
  SlidersHorizontal,
  ChevronDown,
  Loader2,
  Database,
  Info,
  Mic,
  Square,
  ImagePlus
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';
import { InputMode } from '@/types/shell';
import { QUERY_INPUT_RULE, QUERY_INPUT_RULE_EN } from '@/data/engineFieldGuide';
import { t } from '@/i18n/copy';

const PLACEHOLDERS_HI = [
  'ओडिशा में अगले 3 दिन क्या हो रहा है?',
  'विदर्भ सोयाबीन में बारिश 15% कम हो तो क्या होगा?',
  'तटीय आंध्र में बाढ़ का खतरा दिखाओ...',
  'नाशिक प्याज मंडी पर भारी बारिश का असर बताओ...',
  'चक्रवात से धान की फूल अवस्था को कितना नुकसान?'
];
const PLACEHOLDERS_EN = [
  'What is happening on the Odisha coast in the next 3 days?',
  'What if Vidarbha soybean rain falls 15%?',
  'Show flood risk on the Andhra coast...',
  'How will heavy rain move Nashik onion mandi prices?',
  'How much flowering-stage paddy risk from this cyclone?'
];

type BrowserSpeechResult = {
  0: { transcript: string };
};

type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { resultIndex: number; results: ArrayLike<BrowserSpeechResult> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

const QUERY_EXAMPLES_HI: { text: string; mode: InputMode }[] = [
  { text: 'ओडिशा में अगले 3 दिन धान का कितना खतरा है?', mode: 'ASK' },
  { text: 'नाशिक प्याज मंडी पर भारी बारिश का असर बताओ', mode: 'ANALYZE' },
  { text: 'विदर्भ सोयाबीन में बारिश 15% कम हो तो क्या होगा?', mode: 'SIMULATE' },
  { text: 'तटीय आंध्र में बाढ़ का खतरा दिखाओ', mode: 'INVESTIGATE' }
];
const QUERY_EXAMPLES_EN: { text: string; mode: InputMode }[] = [
  { text: 'How much paddy risk on the Odisha coast in the next 3 days?', mode: 'ASK' },
  { text: 'How will heavy rain move Nashik onion mandi prices?', mode: 'ANALYZE' },
  { text: 'What if Vidarbha soybean rain falls 15%?', mode: 'SIMULATE' },
  { text: 'Show flood risk on the Andhra coast', mode: 'INVESTIGATE' }
];

export default function InputComposer() {
  const {
    activeInputMode,
    setActiveInputMode,
    composerText,
    setComposerText,
    attachedLocation,
    setAttachedLocation,
    attachedHorizon,
    setAttachedHorizon,
    attachedDataset,
    attachedImage,
    setAttachedImage,
    submitComposerQuery,
    isRouting,
    setDatasetModalOpen,
    userProfile,
    showToast,
    locale
  } = useShellStore();

  const placeholders = locale === 'hi' ? PLACEHOLDERS_HI : PLACEHOLDERS_EN;
  const queryExamples = locale === 'hi' ? QUERY_EXAMPLES_HI : QUERY_EXAMPLES_EN;

  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  // Rotate helpful placeholders every 4.5 seconds when input is empty
  useEffect(() => {
    if (composerText.trim()) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [composerText, placeholders.length]);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  const modes: { id: InputMode; label: string; desc: string }[] = locale === 'hi'
    ? [
        { id: 'ASK', label: 'पूछें', desc: 'साधारण सवाल' },
        { id: 'INVESTIGATE', label: 'देखें', desc: 'खतरा कहाँ है' },
        { id: 'ANALYZE', label: 'समझें', desc: 'फसल, मिट्टी, भाव' },
        { id: 'SIMULATE', label: 'अगर…', desc: 'अगर बारिश बदल जाए' }
      ]
    : [
        { id: 'ASK', label: 'Ask', desc: 'A plain question' },
        { id: 'INVESTIGATE', label: 'Look', desc: 'Where the hazard sits' },
        { id: 'ANALYZE', label: 'Read', desc: 'Crop, soil, price' },
        { id: 'SIMULATE', label: 'What if', desc: 'If rain changes' }
      ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      submitComposerQuery();
    }
  };

  const toggleVoiceCapture = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!Recognition) {
      showToast('Voice input is not supported by this browser. Try Chrome or Edge.', 'warning');
      return;
    }

    const recognition = new Recognition();
    recognition.lang = navigator.language || 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      let transcript = '';
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += `${event.results[index][0].transcript} `;
      }
      const cleanedTranscript = transcript.trim();
      if (cleanedTranscript) {
        setComposerText(`${composerText.trim()}${composerText.trim() ? ' ' : ''}${cleanedTranscript}`);
      }
    };
    recognition.onerror = () => showToast('I could not hear that. Please allow microphone access and try again.', 'warning');
    recognition.onend = () => {
      recognitionRef.current = null;
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
      showToast('Voice input could not start. Please try again.', 'warning');
    }
  };

  return (
    <div className="x-composer" style={{ borderBottom: '1px solid var(--border)', padding: '14px 16px', backgroundColor: 'transparent', display: 'flex', gap: '12px' }}>
      {/* User Avatar (Monochrome) */}
      <div className="x-avatar" style={{ backgroundColor: '#202327', color: '#FFFFFF', border: '1px solid var(--border)' }}>
        {userProfile.avatarInitials}
      </div>

      {/* Input Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Mode Selector Pill (Ask ▾) */}
        <div style={{ position: 'relative', marginBottom: '6px' }}>
          <button
            onClick={() => setModeDropdownOpen(!modeDropdownOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#FFFFFF',
              border: '1px solid var(--border)',
              backgroundColor: '#16181C',
              cursor: 'pointer'
            }}
          >
            <Sparkles style={{ width: '12px', height: '12px', color: '#FFFFFF' }} />
            <span>{modes.find((m) => m.id === activeInputMode)?.label}</span>
            <ChevronDown style={{ width: '12px', height: '12px', color: '#71767B' }} />
          </button>

          {/* Mode Dropdown Popover */}
          {modeDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: '100%',
                marginTop: '6px',
                width: '260px',
                borderRadius: '16px',
                backgroundColor: '#000000',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 40px rgba(255,255,255,0.06)',
                padding: '6px',
                zIndex: 40,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              {modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveInputMode(m.id);
                    setModeDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: activeInputMode === m.id ? 'var(--surface-hover)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{m.label}</span>
                    {activeInputMode === m.id && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#FFFFFF' }} />
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: '#71767B' }}>{m.desc}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clean Borderless Textarea */}
        <textarea
          value={composerText}
          onChange={(e) => setComposerText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={composerText.split('\n').length > 1 ? 3 : 2}
          placeholder={placeholders[placeholderIndex]}
          className="x-composer-textarea"
          style={{
            width: '100%',
            background: 'transparent',
            resize: 'none',
            fontSize: '16px',
            lineHeight: 1.5,
            color: '#E7E9EA',
            fontFamily: 'var(--font-sans)',
            border: 'none',
            outline: 'none',
            padding: '4px 0'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '7px', color: '#71767B', fontSize: '11px', lineHeight: 1.4 }}>
          <Info style={{ width: '13px', height: '13px', flex: '0 0 auto' }} />
          <span>{locale === 'hi' ? QUERY_INPUT_RULE : QUERY_INPUT_RULE_EN}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '9px', marginBottom: '2px' }}>
          {queryExamples.map((example) => (
            <button
              key={example.text}
              onClick={() => {
                setActiveInputMode(example.mode);
                setComposerText(example.text);
              }}
              style={{
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                padding: '5px 9px',
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                background: '#16181C',
                color: '#AAB1B7',
                fontSize: '10px',
                cursor: 'pointer'
              }}
              title={`Use ${example.mode.toLowerCase()} query: ${example.text}`}
            >
              {example.text}
            </button>
          ))}
        </div>

        {/* Attached Filters Chips (if selected) */}
        {(attachedLocation || attachedHorizon || attachedDataset) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '8px 0' }}>
            {attachedLocation && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 10px', borderRadius: '9999px', fontSize: '11px', fontFamily: 'var(--font-mono)', backgroundColor: '#16181C', color: '#E7E9EA', border: '1px solid var(--border)' }}>
                <MapPin style={{ width: '10px', height: '10px' }} />
                {attachedLocation}
              </span>
            )}
            {attachedHorizon && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 10px', borderRadius: '9999px', fontSize: '11px', fontFamily: 'var(--font-mono)', backgroundColor: '#16181C', color: '#E7E9EA', border: '1px solid var(--border)' }}>
                <Clock style={{ width: '10px', height: '10px' }} />
                {attachedHorizon}
              </span>
            )}
            {attachedDataset && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 10px', borderRadius: '9999px', fontSize: '11px', fontFamily: 'var(--font-mono)', backgroundColor: '#16181C', color: '#E7E9EA', border: '1px solid var(--border)' }}>
                <Database style={{ width: '10px', height: '10px' }} />
                {attachedDataset}
              </span>
            )}
          </div>
        )}

        {/* Bottom Action Bar (Icons on Left, Clean White Pill on Right) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
          {/* Attachment Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => setDatasetModalOpen(true)}
              style={{ padding: '6px', borderRadius: '9999px', color: '#71767B', cursor: 'pointer', background: 'transparent', border: 'none' }}
              title="Attach NetCDF / GRIB Dataset"
            >
              <Paperclip style={{ width: '16px', height: '16px' }} />
            </button>

            <button
              onClick={() =>
                setAttachedLocation(
                  attachedLocation ? null : 'Odisha Coastal Delta'
                )
              }
              style={{ padding: '6px', borderRadius: '9999px', color: attachedLocation ? '#FFFFFF' : '#71767B', cursor: 'pointer', background: 'transparent', border: 'none' }}
              title="Toggle Regional Focus"
            >
              <MapPin style={{ width: '16px', height: '16px' }} />
            </button>

            <button
              onClick={() =>
                setAttachedHorizon(attachedHorizon ? null : '+72h Lead')
              }
              style={{ padding: '6px', borderRadius: '9999px', color: attachedHorizon ? '#FFFFFF' : '#71767B', cursor: 'pointer', background: 'transparent', border: 'none' }}
              title="Forecast Horizon"
            >
              <Clock style={{ width: '16px', height: '16px' }} />
            </button>

            <button
              onClick={() =>
                setComposerText(
                  locale === 'hi'
                    ? 'ओडिशा में अगले 72 घंटे धान का कितना खतरा है?'
                    : 'How much paddy risk in Odisha over the next 72 hours?'
                )
              }
              style={{ padding: '6px', borderRadius: '9999px', color: '#71767B', cursor: 'pointer', background: 'transparent', border: 'none' }}
              title="Load Sample Query"
            >
              <SlidersHorizontal style={{ width: '16px', height: '16px' }} />
            </button>

            <label
              title={t(locale, 'attachImage')}
              style={{ padding: '6px', borderRadius: '9999px', color: attachedImage ? '#FFFFFF' : '#71767B', cursor: 'pointer' }}
            >
              <ImagePlus style={{ width: '16px', height: '16px' }} />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setAttachedImage(typeof reader.result === 'string' ? reader.result : null);
                  reader.readAsDataURL(file);
                }}
              />
            </label>
            {attachedImage && (
              <img
                src={attachedImage}
                alt=""
                onClick={() => setAttachedImage(null)}
                title={locale === 'hi' ? 'फोटो हटाएँ' : 'Remove photo'}
                style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--stroke)', cursor: 'pointer' }}
              />
            )}

            <button
              onClick={toggleVoiceCapture}
              aria-pressed={isListening}
              style={{
                padding: '6px',
                borderRadius: '9999px',
                color: isListening ? '#FFFFFF' : '#71767B',
                cursor: 'pointer',
                background: isListening ? 'rgba(255,255,255,0.16)' : 'transparent',
                border: 'none',
                boxShadow: isListening ? '0 0 0 1px rgba(255,255,255,0.24)' : 'none'
              }}
              title={isListening ? 'Stop listening' : 'Speak your query (Hindi or English)'}
            >
              {isListening ? <Square style={{ width: '15px', height: '15px' }} /> : <Mic style={{ width: '16px', height: '16px' }} />}
            </button>
          </div>

          {/* Submit Button (Exact X-Style White Pill) */}
          <button
            onClick={() => submitComposerQuery()}
            disabled={isRouting || (!composerText.trim() && !attachedLocation)}
            style={{
              padding: '8px 22px',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '14px',
              backgroundColor: isRouting || (!composerText.trim() && !attachedLocation) ? 'rgba(239, 243, 244, 0.4)' : '#EFF3F4',
              color: isRouting || (!composerText.trim() && !attachedLocation) ? 'rgba(15, 20, 25, 0.6)' : '#0F1419',
              cursor: isRouting || (!composerText.trim() && !attachedLocation) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              transition: 'background-color 0.15s ease'
            }}
          >
            {isRouting ? (
              <>
                <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                <span>Routing...</span>
              </>
            ) : (
              <span>{locale === 'hi' ? 'पूछें' : 'Ask'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
