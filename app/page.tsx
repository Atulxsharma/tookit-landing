import { BrandLogo } from '@/components/BrandLogo';
import { HeroSection } from '@/components/HeroSection';
import { PhoneShowcase } from '@/components/PhoneMockup';
import { Reveal } from '@/components/Reveal';
import { WaitlistForm } from '@/components/WaitlistForm';

const painPoints = [
  {
    label: 'Caregivers',
    labelClasses: 'border-[#16A34A3A] bg-[#0D2010] text-[#4ADE80]',
    title: 'The daily call',
    body: "You call every morning. 'Did you take it?' She says yes. You're never really sure. You were never sure."
  },
  {
    label: 'ADHD & brain fog',
    labelClasses: 'border-[#A78BFA3A] bg-[#1A1230] text-[#A78BFA]',
    title: 'Did I take it or just think about it?',
    body: "You walked to the bathroom. You opened the bottle. But did you actually swallow it? Twenty minutes of spiral later — still not sure."
  },
  {
    label: 'Chronic illness',
    labelClasses: 'border-[#F59E0B3A] bg-[#1F1500] text-[#F59E0B]',
    title: 'The 3pm panic',
    body: "You took your meds at 8am. It's 3pm now. You genuinely can't remember. Do you take another? Skip it? Call your doctor?"
  }
];

const pricing = [
  {
    name: 'Solo',
    price: '$6.99',
    annual: '$39.99/year',
    savings: 'save 52%',
    featured: false,
    features: [
      'Track your own medications',
      'Back-edit past doses',
      'Full dose history',
      'Medication archive'
    ]
  },
  {
    name: 'Family',
    price: '$14.99',
    annual: '$99.99/year',
    savings: 'save 44%',
    featured: true,
    features: [
      'Everything in Solo',
      'Up to 5 family members',
      'Caregivers see doses in real-time',
      'No more daily check-in calls',
      'Per-person medication schedules'
    ]
  }
];

const trustItems = [
  {
    title: 'Private by design.',
    body: 'Your medication data never leaves your account. No ads, no data selling, ever.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
        <rect x="5" y="10" width="14" height="10" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    )
  },
  {
    title: 'Built to last.',
    body: 'Enterprise-grade infrastructure. Your history is safe across all your devices.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
        <path d="m12 3 7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z" />
        <path d="m9.5 12 1.8 1.8 3.7-4.3" />
      </svg>
    )
  },
  {
    title: 'Made from experience.',
    body: 'Built by someone who knows what it feels like to stare at a pill bottle and not remember.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
        <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />
      </svg>
    )
  }
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-[10px]">
      {items.map((item) => (
        <li key={item} className="flex gap-[10px] text-[14px] text-[#A1A1AA]">
          <span className="text-[14px] text-[#4ADE80]">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <div className="sticky top-0 z-50 flex h-10 items-center justify-center bg-[#16A34A] px-4 text-center text-[13px] font-medium text-white">
        Tookit launches soon — join the waitlist for 30 days free
      </div>

      <HeroSection />

      <PhoneShowcase />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[960px]">
          <div className="text-center">
            <h2 className="text-[28px] font-bold tracking-[-0.5px] text-white">Sound familiar?</h2>
            <p className="mt-2 text-[16px] text-[#A1A1AA]">These moments happen every day.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {painPoints.map((item, index) => (
              <Reveal key={item.title} delay={index * 100}>
                <article className="min-h-[250px] rounded-[20px] border border-[#1C1C1C] bg-[#111111] p-8 transition hover:border-[#2A2A2A]">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium ${item.labelClasses}`}
                  >
                    {item.label}
                  </span>
                  <h3 className="mt-5 text-[18px] font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#777777]">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0D0D0D] px-6 py-24">
        <div className="mx-auto max-w-[640px]">
          <div className="text-center">
            <h2 className="text-[32px] font-bold tracking-[-0.5px] text-white">Simple pricing.</h2>
            <p className="mt-3 text-[16px] text-[#A1A1AA]">Less than a coffee a month. Cancel anytime.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-[20px] bg-[#111111] p-8 ${
                  plan.featured ? 'border-2 border-[#16A34A]' : 'border border-[#1C1C1C]'
                }`}
              >
                {plan.featured ? (
                  <span className="absolute right-0 top-0 rounded-bl-[12px] rounded-tr-[18px] bg-[#16A34A] px-3 py-1 text-[11px] font-semibold text-white">
                    Most popular
                  </span>
                ) : null}

                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A1A1AA]">
                  {plan.name}
                </p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-[42px] font-bold leading-none tracking-[-1px] text-white">
                    {plan.price}
                  </span>
                  <span className="pb-[5px] text-[16px] text-[#555555]">/month</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-[13px] text-[#4ADE80]">{plan.annual}</span>
                  <span className="rounded-full bg-[#0D2010] px-2 py-0.5 text-[11px] text-[#4ADE80]">
                    {plan.savings}
                  </span>
                </div>
                <div className="my-5 h-px bg-[#1C1C1C]" />
                <FeatureList items={plan.features} />
              </div>
            ))}
          </div>

          <p className="mt-5 text-center text-[13px] text-[#444444]">
            30-day free trial at launch · No credit card at signup · Cancel anytime
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 pt-24">
        <div className="mx-auto grid max-w-[780px] grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {trustItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <div className="px-4 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#1C1C1C] bg-[#111111] text-[#4ADE80]">
                  {item.icon}
                </div>
                <h3 className="mt-3 text-[15px] font-semibold text-white">{item.title}</h3>
                <p className="mt-[6px] text-[13px] leading-[1.6] text-[#555555]">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2A1A] bg-[#0D2010] px-6 py-24">
        <div className="mx-auto max-w-[480px] text-center">
          <h2 className="text-[32px] font-bold tracking-[-0.5px] text-white">Be the first to know.</h2>
          <p className="mt-3 text-[16px] text-[#A1A1AA]">Early access members get 30 days free.</p>
          <WaitlistForm className="mx-auto mt-8" />
        </div>
      </section>

      <footer className="border-t border-[#161616] bg-[#0A0A0A] px-6 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <BrandLogo size="sm" />
            <div className="flex items-center gap-5 text-[13px] text-[#444444]">
              <a href="/privacy" className="transition hover:text-[#777777]">
                Privacy Policy
              </a>
              <a href="mailto:support@usetookit.com" className="transition hover:text-[#777777]">
                Support
              </a>
            </div>
          </div>
          <p className="mt-5 text-center text-[12px] text-[#333333]">© 2026 Tookit. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
