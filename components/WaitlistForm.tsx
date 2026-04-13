'use client';

import { useState, type FormEvent } from 'react';
import type { Segment } from '@/lib/supabase';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __tookitFormStarted?: boolean;
  }
}

const segments: { label: string; value: Segment }[] = [
  { label: '👤 Just me', value: 'solo' },
  { label: '👨‍👩‍👧 My family', value: 'family' },
  { label: "🏥 I'm a caregiver", value: 'caregiver' }
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function track(eventName: string, segment?: Segment) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', eventName, segment ? { segment } : undefined);
}

function Spinner() {
  return (
    <span
      className="spin inline-flex h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
      aria-hidden="true"
    />
  );
}

function SuccessIcon() {
  return (
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#16A34A]">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m6 12.5 4 4 8-9"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function WaitlistForm({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [segment, setSegment] = useState<Segment | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [segmentError, setSegmentError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ tone: 'green' | 'red'; text: string } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakeSegment, setShakeSegment] = useState(false);

  function triggerShake(type: 'email' | 'segment') {
    if (type === 'email') {
      setShakeEmail(false);
      requestAnimationFrame(() => setShakeEmail(true));
      setTimeout(() => setShakeEmail(false), 350);
      return;
    }

    setShakeSegment(false);
    requestAnimationFrame(() => setShakeSegment(true));
    setTimeout(() => setShakeSegment(false), 350);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let hasError = false;

    if (!isValidEmail(email.trim())) {
      setEmailError('Enter a valid email.');
      triggerShake('email');
      hasError = true;
    } else {
      setEmailError(null);
    }

    if (!segment) {
      setSegmentError('Please select one');
      triggerShake('segment');
      hasError = true;
    } else {
      setSegmentError(null);
    }

    if (hasError) return;

    setSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          segment
        })
      });

      const data = (await response.json()) as { error?: string; code?: string };

      if (!response.ok) {
        if (data.code === 'duplicate') {
          setStatusMessage({ tone: 'green', text: "You're already on the list!" });
          return;
        }

        setStatusMessage({
          tone: 'red',
          text: data.error ?? 'Something went wrong. Try again.'
        });
        return;
      }

      setSuccess(true);
      track('waitlist_joined', segment ?? undefined);
    } catch {
      setStatusMessage({
        tone: 'red',
        text: 'Something went wrong. Try again.'
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className={`success-spring mx-auto w-full max-w-[440px] rounded-[20px] border border-[#1C1C1C] bg-[#111111] px-6 py-8 text-center ${className}`}>
        <div className="flex flex-col items-center gap-4">
          <SuccessIcon />
          <div>
            <p className="text-[17px] font-medium text-white">
              You&apos;re on the list. We&apos;ll email you at launch.
            </p>
            <p className="mt-2 text-[13px] text-[#A1A1AA]">Check your email for confirmation.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-[440px] ${className}`}
      noValidate
      aria-label="Join the Tookit waitlist"
    >
      <div className="space-y-0">
        <div className={shakeEmail ? 'shake' : ''}>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (emailError) setEmailError(null);
            }}
            onFocus={() => {
              if (typeof window !== 'undefined' && !window.__tookitFormStarted) {
                track('waitlist_form_started');
                window.__tookitFormStarted = true;
              }
            }}
            className="h-[52px] w-full rounded-[12px] border border-[#2A2A2A] bg-[#161616] px-4 text-[16px] text-white outline-none transition focus:border-[#16A34A] placeholder:text-[#444444]"
            aria-invalid={emailError ? 'true' : 'false'}
            aria-describedby={emailError ? 'waitlist-email-error' : undefined}
          />
        </div>
        {emailError ? (
          <p id="waitlist-email-error" className="mt-2 text-[12px] text-[#EF4444]">
            {emailError}
          </p>
        ) : null}

        <div className={`mt-[10px] flex flex-wrap gap-2 ${shakeSegment ? 'shake' : ''}`}>
          {segments.map((item) => {
            const selected = segment === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setSegment(item.value);
                  setSegmentError(null);
                  track('waitlist_segment_selected', item.value);
                }}
                className={`h-[40px] min-w-[100px] flex-1 rounded-[8px] border px-3 text-[13px] transition ${
                  selected
                    ? 'border-[#16A34A] bg-[#0D1F0D] font-medium text-[#4ADE80]'
                    : 'border-[#2A2A2A] bg-[#161616] text-[#A1A1AA]'
                }`}
                aria-pressed={selected}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {segmentError ? <p className="mt-2 text-[12px] text-[#EF4444]">{segmentError}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-[10px] flex h-[52px] w-full items-center justify-center rounded-[12px] bg-[#16A34A] text-[16px] font-semibold tracking-[-0.2px] text-white transition hover:bg-[#15803D] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-90"
        >
          {submitting ? <Spinner /> : 'Save my spot — free early access →'}
        </button>

        <p className="mt-2 text-center text-[12px] text-[#444444]">
          No credit card. No spam. Cancel anytime.
        </p>

        {statusMessage ? (
          <p
            className={`mt-3 text-center text-[13px] ${
              statusMessage.tone === 'green' ? 'text-[#4ADE80]' : 'text-[#EF4444]'
            }`}
          >
            {statusMessage.text}
          </p>
        ) : null}
      </div>
    </form>
  );
}
