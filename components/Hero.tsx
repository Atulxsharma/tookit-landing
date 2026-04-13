'use client';

import { motion } from 'framer-motion';
import { WaitlistForm } from './WaitlistForm';

export function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-auto flex max-w-[640px] flex-col items-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-[13px] text-[var(--text-muted)] shadow-[0_8px_30px_rgba(20,83,45,0.05)]">
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
        200+ caregivers and patients on the waitlist
      </div>

      <div className="mt-6 text-center">
        <h1 className="text-[clamp(32px,6vw,56px)] font-bold leading-[1.02] tracking-[-0.5px] text-[var(--deep)]">
          The worst part isn&apos;t forgetting.
          <br />
          <span className="text-[var(--primary)]">It&apos;s not knowing.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[480px] text-[18px] leading-[1.55] text-[var(--text-soft)]">
          Tookit lets families know doses were taken — without the daily call, without the guilt,
          without the guessing.
        </p>
      </div>

      <WaitlistForm className="mt-8" />
    </motion.div>
  );
}
