import type { ReactNode } from 'react';
import { Hero } from '@/components/Hero';
import { WaitlistForm } from '@/components/WaitlistForm';
import { CheckIcon, HeartIcon, LockIcon, ShieldIcon } from '@/components/icons';

function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`font-sans text-[20px] font-bold tracking-[-0.04em] ${className}`}>
      <span className="text-[var(--deep)]">took</span>
      <span className="text-[var(--primary)]">it</span>
    </div>
  );
}

function LabelPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-[var(--border)] bg-[var(--surface-tint)] px-3 py-1 text-[12px] text-[var(--text-muted)]">
      {children}
    </span>
  );
}

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[32px] border border-[var(--border)] bg-[#E7FBEF] p-3 shadow-[0_16px_50px_rgba(20,83,45,0.08)]">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--surface)] px-4 pb-5 pt-6">
        <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-[var(--deep)]" />
        {children}
      </div>
    </div>
  );
}

function PhoneRow({
  dotColor,
  title,
  subtitle
}: {
  dotColor: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-3">
      <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: dotColor }} />
      <div>
        <p className="text-[14px] font-medium text-[var(--deep)]">{title}</p>
        <p className="mt-1 text-[12px]" style={{ color: subtitle.includes('✓') ? '#16A34A' : '#86A18D' }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function FamilyRow({
  initial,
  avatarColor,
  title,
  subtitle,
  subtitleColor
}: {
  initial: string;
  avatarColor: string;
  title: string;
  subtitle: string;
  subtitleColor: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-3">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: avatarColor }}
      >
        {initial}
      </div>
      <div>
        <p className="text-[14px] font-medium text-[var(--deep)]">{title}</p>
        <p className="mt-1 text-[12px]" style={{ color: subtitleColor }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

const featureItems = {
  solo: [
    'Track your own medications',
    'Back-edit past doses',
    'Full dose history',
    'Medication archive'
  ],
  family: [
    'Everything in Solo',
    'Up to 5 family members',
    'Caregivers see doses in real-time',
    'No more daily check-in calls',
    'Per-person medication schedules'
  ]
};

export default function Page() {
  return (
    <main className="bg-[var(--bg)] text-[var(--deep)]">
      <section className="bg-[var(--primary)] px-4 py-2 text-center text-[14px] text-white">
        Tookit is launching soon — join the waitlist for free early access
      </section>

      <section className="px-6 pb-16 pt-8 sm:pb-20 sm:pt-10">
        <Hero />
      </section>

      <section className="px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-[960px]">
          <h2 className="text-center text-[28px] font-semibold text-[var(--deep)]">Sound familiar?</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                label: 'Caregivers',
                title: 'The daily call',
                body: "You call every morning. 'Did you take it?' She says yes. You're still not sure. You were never sure."
              },
              {
                label: 'ADHD & brain fog',
                title: 'Did I take it or just think about it?',
                body: 'You walked to the bathroom. You opened the bottle. But did you actually take it? Now it\'s been 20 minutes and you\'re still not sure.'
              },
              {
                label: 'Chronic illness',
                title: 'The 3pm panic',
                body: 'You took your meds at 8am. It\'s 3pm now. You genuinely cannot remember. Do you take another? Do you skip? Do you call your doctor?'
              }
            ].map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_12px_40px_rgba(20,83,45,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
              >
                <LabelPill>{card.label}</LabelPill>
                <h3 className="mt-3 text-[20px] font-semibold text-[var(--deep)]">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-[var(--text-soft)]">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-center text-[28px] font-semibold text-[var(--deep)]">One tap. You know.</h2>
          <p className="mt-3 text-center text-[16px] text-[var(--text-soft)]">
            No more guessing. No more calling. No more panic.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <PhoneShell>
              <div className="pt-6">
                <h3 className="text-[17px] font-bold text-[var(--deep)]">Today</h3>
                <div className="mt-5 space-y-3">
                  <PhoneRow dotColor="#16A34A" title="Metformin 500mg" subtitle="took it ✓ 8:02am" />
                  <PhoneRow dotColor="#D1FAE5" title="Lisinopril 10mg" subtitle="due 1:00pm" />
                  <PhoneRow dotColor="#D1FAE5" title="Vitamin D" subtitle="tonight" />
                </div>
              </div>
            </PhoneShell>

            <PhoneShell>
              <div className="pt-6">
                <h3 className="text-[17px] font-bold text-[var(--deep)]">Family</h3>
                <div className="mt-5 space-y-3">
                  <FamilyRow initial="M" avatarColor="#16A34A" title="Mom — 3 meds" subtitle="all done ✓" subtitleColor="#16A34A" />
                  <FamilyRow initial="D" avatarColor="#F59E0B" title="Dad — 5 meds" subtitle="2 remaining" subtitleColor="#D97706" />
                  <FamilyRow initial="Y" avatarColor="#4ADE80" title="You — 2 meds" subtitle="done ✓" subtitleColor="#16A34A" />
                </div>
              </div>
            </PhoneShell>

            <PhoneShell>
              <div className="flex h-full flex-col items-center justify-center pt-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF3] text-[var(--primary)]">
                  <CheckIcon className="h-12 w-12" />
                </div>
                <p className="mt-6 text-[28px] font-bold text-[var(--primary)]">took it</p>
                <p className="mt-2 text-[17px] text-[var(--deep)]">Metformin 500mg</p>
                <p className="mt-2 text-[13px] text-[#86A18D]">logged 8:02am · Jan 14</p>
                <p className="mt-6 text-[13px] text-[var(--text-muted)]">Your family can see this</p>
              </div>
            </PhoneShell>
          </div>
        </div>
      </section>

      <section className="bg-[#EAFBF0] px-6 py-16">
        <div className="mx-auto max-w-[640px]">
          <h2 className="text-center text-[28px] font-semibold text-[var(--deep)]">Simple pricing. No surprises.</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-[var(--border)] bg-white p-7 shadow-[0_12px_40px_rgba(20,83,45,0.04)]">
              <p className="text-[13px] uppercase tracking-[0.1em] text-[var(--text-muted)]">Solo</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-[40px] font-bold leading-none text-[var(--deep)]">$6.99</span>
                <span className="pb-1 text-[16px] text-[var(--text-soft)]">/month</span>
              </div>
              <p className="mt-3 text-[14px] text-[var(--primary)]">$39.99/year — saves 52%</p>
              <ul className="mt-6 space-y-3 text-[13px] text-[var(--text-soft)]">
                {featureItems.solo.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[var(--primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="relative rounded-3xl border-2 border-[var(--primary)] bg-white p-7 shadow-[0_18px_50px_rgba(22,163,74,0.10)]">
              <span className="absolute right-4 top-4 rounded-full bg-[var(--primary)] px-2.5 py-1 text-[11px] font-medium text-white">
                Most popular
              </span>
              <p className="text-[13px] uppercase tracking-[0.1em] text-[var(--text-muted)]">Family</p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-[40px] font-bold leading-none text-[var(--deep)]">$14.99</span>
                <span className="pb-1 text-[16px] text-[var(--text-soft)]">/month</span>
              </div>
              <p className="mt-3 text-[14px] text-[var(--primary)]">$99.99/year — saves 44%</p>
              <ul className="mt-6 space-y-3 text-[13px] text-[var(--text-soft)]">
                {featureItems.family.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[var(--primary)]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mt-6 text-center text-[14px] text-[#86A18D]">
            30-day free trial at launch · Cancel anytime · No credit card at signup
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: <LockIcon className="h-7 w-7 text-[var(--primary)]" />,
              title: 'Private by design',
              body: "Your medication data never leaves your account. We don't sell it, share it, or use it for ads."
            },
            {
              icon: <ShieldIcon className="h-7 w-7 text-[var(--primary)]" />,
              title: 'Built to last',
              body: 'Enterprise-grade Supabase infrastructure. Your history is safe even if you switch devices.'
            },
            {
              icon: <HeartIcon className="h-7 w-7 text-[var(--primary)]" />,
              title: 'Made from experience',
              body: 'Built by someone who knows what it feels like to stare at a pill bottle and not remember.'
            }
          ].map((item) => (
            <div key={item.title} className="text-center md:text-left">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-white md:mx-0">
                {item.icon}
              </div>
              <h3 className="text-[16px] font-bold text-[var(--deep)]">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[var(--text-soft)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[#EAFBF0] px-6 py-16">
        <div className="mx-auto max-w-[480px] text-center">
          <h2 className="text-[32px] font-bold tracking-[-0.03em] text-[var(--deep)]">Be first when we launch.</h2>
          <p className="mt-3 text-[16px] text-[var(--text-soft)]">
            Early access members get 30 days free. No card required.
          </p>
          <WaitlistForm className="mt-8" />
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-8">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <div className="flex items-center gap-5 text-[14px] text-[#86A18D]">
            <a href="/privacy" className="transition hover:text-[var(--text-muted)]">
              Privacy Policy
            </a>
            <a href="mailto:support@usetookit.com" className="transition hover:text-[var(--text-muted)]">
              Support
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-[12px] text-[#9CA3AF]">© 2026 Tookit. All rights reserved.</p>
      </footer>
    </main>
  );
}
