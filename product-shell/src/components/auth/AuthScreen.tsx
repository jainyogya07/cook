'use client';

import React, { FormEvent, useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import AtmosphericBackgroundCanvas from '@/components/canvas/BackgroundCanvas';
import AtmosAnimatedLogo from '@/components/common/AtmosAnimatedLogo';
import { t } from '@/i18n/copy';
import { useShellStore } from '@/services/useShellStore';
import { authEndpoint } from '@/lib/api';

interface AuthScreenProps {
  onAuthenticated: (user: { id: number; email: string; name: string; plan?: 'free' | 'pro' }) => void;
  onBack?: () => void;
}

export default function AuthScreen({ onAuthenticated, onBack }: AuthScreenProps) {
  const { locale, setLocale } = useShellStore();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const response = await fetch(authEndpoint(mode), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, ...(mode === 'signup' ? { name } : {}) })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail = payload?.detail;
        const message = typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
            ? detail.map((item: { msg?: string }) => item?.msg || '').join(' ')
            : (locale === 'hi' ? 'साइन इन नहीं हो पाया।' : 'Authentication failed.');
        throw new Error(message);
      }
      localStorage.setItem('atmos_auth_token', payload.token);
      onAuthenticated(payload.user);
    } catch (err) {
      const raw = err instanceof Error ? err.message : '';
      const network = !raw || raw === 'Failed to fetch' || raw.includes('NetworkError') || raw.includes('Load failed') || raw.includes('Timeout');
      setError(network
        ? (locale === 'hi' ? 'सर्वर अभी जवाब नहीं दे रहा। 20 सेकंड बाद फिर कोशिश करें — पहली बार में सर्वर जागता है।' : 'The server is not answering yet. Wait 20 seconds and try again — the first request can wake it.')
        : raw);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-screen">
      <AtmosphericBackgroundCanvas variant="landing" />
      <div className="auth-orbit auth-orbit-one" />
      <div className="auth-orbit auth-orbit-two" />
      <section className="auth-card">
        <div className="auth-brand">
          <AtmosAnimatedLogo size={42} variant="rich" glowColor="gold" showBadge={false} interactive={false} />
          <span>ATMOS 4D</span>
        </div>
        <div className="auth-kicker">{t(locale, 'landingKicker')}</div>
        <h1>{mode === 'login' ? t(locale, 'welcomeBack') : t(locale, 'createAccount')}</h1>
        <p className="auth-copy">{t(locale, 'authCopy')}</p>

        <form onSubmit={submit} className="auth-form" autoComplete="on">
          {mode === 'signup' && <label><span>{t(locale, 'name')}</span><div className="auth-input"><UserRound size={16} /><input value={name} onChange={(e) => setName(e.target.value)} placeholder={t(locale, 'name')} required autoComplete="name" /></div></label>}
          <label><span>{t(locale, 'email')}</span><div className="auth-input"><Mail size={16} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" /></div></label>
          <label><span>{t(locale, 'password')}</span><div className="auth-input"><LockKeyhole size={16} /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t(locale, 'password')} minLength={mode === 'signup' ? 8 : undefined} required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-submit" disabled={busy}>{busy ? '…' : mode === 'login' ? t(locale, 'enter') : t(locale, 'create')} <ArrowRight size={16} /></button>
        </form>

        <button className="auth-switch" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}>
          {mode === 'login' ? t(locale, 'newHere') : t(locale, 'haveAccount')}
        </button>
        <div className="auth-note">{t(locale, 'guestHint')}</div>
        <div className="auth-actions-row">
          <button type="button" className="auth-switch" onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}>{locale === 'en' ? 'हिन्दी' : 'English'}</button>
          {onBack && <button type="button" className="auth-switch" onClick={onBack}>{t(locale, 'back')}</button>}
        </div>
      </section>
    </main>
  );
}
