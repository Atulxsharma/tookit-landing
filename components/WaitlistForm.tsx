'use client';

import { useState, type FormEvent } from 'react';
import { CheckIcon } from './icons';

type Segment = 'solo' | 'family' | 'caregiver';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const segments: { label: string; value: Segment }[] = [
  { label: '👤 Just me', value: 'solo' },
  { label: '👨‍👩‍👧 My family', value: 'family' },
  { label: "🏥 I'm a caregiver", value: 'caregiver' }
];

function track(event: string, params?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params ?? {});
    return;
  }
  console.info('[gtag stub]', event, params ?? {});
}

export function WaitlistForm({ className = '' }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [segment, setSegment] = useState<Segment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTrackedFocus, setHasTrackedFocus] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!segment) {
      setError('Select who Tookit is for before joining the waitlist.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, segment })
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? 'Something went wrong.');
      }

      setIsSuccess(true);
      track('waitlist_joined', { segment });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to save your spot right now. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-[480px] ${className}`} noValidate>
      <div className="space-y-3">
        <input
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="your@email.com"
          aria-label="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onFocus={() => {
            if (!hasTrackedFocus) {
              track('waitlist_form_started');
              setHasTrackedFocus(true);
            }
          }}
          className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-[14px] text-base text-[var(--deep)] outline-none transition placeholder:text-[#86A18D] focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(22,163,74,0.12)]"
        />

        <div className="grid grid-cols-3 gap-2">
          {segments.map((item) => {
            const isSelected = segment === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  setSegment(item.value);
                  setError(null);
                  track('waitlist_segment_selected', { value: item.value });
                }}
                className={`min-h-[46px] rounded-lg border px-2 py-2 text-[13px] font-medium leading-snug transition sm:px-4 sm:text-sm ${
                  isSelected
                    ? 'border-[var(--primary)] bg-[#ECFDF3] text-[var(--deep)]'
                    : 'border-[var(--border)] bg-white text-[var(--deep)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-soft)]'
                }`}
                aria-pressed={isSelected}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full rounded-xl bg-[var(--primary)] px-4 py-4 text-base font-semibold text-white transition hover:bg-[#15803D] disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isSuccess ? (
            <span className="flex items-center justify-center gap-2">
              <CheckIcon className="h-5 w-5" />
              You&apos;re on the list. We&apos;ll email you at launch.
            </span>
          ) : isSubmitting ? (
            'Saving your spot...'
          ) : (
            'Save my spot — free early access →'
          )}
        </button>
      </div>

      <div className="mt-3 min-h-[24px] text-center text-[13px] text-[#86A18D]">
        {error ? <p className="text-[#dc2626]">{error}</p> : <p>No credit card. No spam. Unsubscribe anytime.</p>}
      </div>
    </form>
  );
}
