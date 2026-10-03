'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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

export function useVoiceCapture(
  onTranscript: (text: string) => void,
  onUnsupported?: (message: string) => void
) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;

  useEffect(() => () => recognitionRef.current?.stop(), []);

  const toggle = useCallback(() => {
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
      onUnsupported?.('Voice input needs Chrome or Edge. Allow the microphone, then try again.');
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
      const cleaned = transcript.trim();
      if (cleaned) onTranscriptRef.current(cleaned);
    };
    recognition.onerror = () => onUnsupported?.('Microphone was blocked or nothing was heard. Allow access and retry.');
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
      onUnsupported?.('Voice input could not start. Please try again.');
    }
  }, [isListening, onUnsupported]);

  return { isListening, toggle };
}
