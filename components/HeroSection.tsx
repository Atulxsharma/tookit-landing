'use client';

import { LazyMotion, animate, domAnimation, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { WaitlistForm } from './WaitlistForm';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __tookitPageViewed?: boolean;
  }
}

export function HeroSection() {
  const [count, setCount] = useState(200);
  const [targetCount, setTargetCount] = useState(200);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.__tookitPageViewed) {
      window.gtag?.('event', 'waitlist_page_view');
      window.__tookitPageViewed = true;
    }

    let active = true;

    async function loadCount() {
      try {
        const response = await fetch('/api/waitlist', {
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error('Unable to load count.');
        }

        const data = (await response.json()) as { count?: number };
        const nextCount = Number.isFinite(data.count) ? Math.max(0, data.count ?? 0) : 200;

        if (active) {
          setTargetCount(nextCount);
        }
      } catch {
        if (active) {
          setTargetCount(200);
        }
      }
    }

    loadCount();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const controls = animate(count, targetCount, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        setCount(Math.round(value));
      }
    });

    return () => controls.stop();
    // Intentionally keyed to targetCount so the displayed social proof never dips to 0 on first paint.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetCount]);

  return (
    <LazyMotion features={domAnimation}>
      <section className="mx-auto w-full max-w-[760px] px-6 pb-6 pt-10 sm:pt-12 lg:pb-0 lg:pt-10">
        <div className="mx-auto flex w-full max-w-[760px] items-start justify-start">
          <BrandLogo />
        </div>

        <div className="mt-8 flex flex-col items-center lg:mt-7">
          <m.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#141414] px-5 py-[9px]"
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-[#4ADE80]" />
            <p className="text-[13px] text-[#A1A1AA]">
              <span className="font-semibold text-white">{count}</span> families on the waitlist
            </p>
          </m.div>

          <m.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="mt-7 max-w-[690px] text-center text-[clamp(32px,6.2vw,52px)] font-bold leading-[1.03] tracking-[-0.5px] text-white"
          >
            The worst part isn&apos;t forgetting.
            <br />
            <span className="text-[#4ADE80]">It&apos;s not knowing.</span>
          </m.h1>

          <m.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="mt-5 max-w-[520px] text-center text-[16px] leading-[1.65] text-[#A1A1AA] sm:text-[17px]"
          >
            Tookit shows caregivers and families when doses were taken — without the daily
            call, without the guilt, without the guessing.
          </m.p>

          <m.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="mt-8 w-full"
          >
            <WaitlistForm className="mx-auto" />
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
