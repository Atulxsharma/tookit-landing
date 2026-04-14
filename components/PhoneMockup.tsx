'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Reveal } from './Reveal';

function IosStatusBar() {
  return (
    <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-[#14532D]">
      <span>9:41</span>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="flex items-end gap-[2px]">
          <span className="h-[4px] w-[2px] rounded-full bg-[#14532D]" />
          <span className="h-[6px] w-[2px] rounded-full bg-[#14532D]" />
          <span className="h-[8px] w-[2px] rounded-full bg-[#14532D]" />
        </span>
        <span className="relative h-[10px] w-[18px] rounded-[3px] border border-[#14532D]">
          <span className="absolute left-[2px] top-[2px] h-[4px] w-[11px] rounded-[1px] bg-[#14532D]" />
          <span className="absolute -right-[3px] top-[2px] h-[4px] w-[2px] rounded-r-full bg-[#14532D]" />
        </span>
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[315px] rounded-[32px] border border-[#1C1C1C] bg-[#111111] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.38)]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-[60px] -translate-x-1/2 rounded-full bg-[#050505]" />
      <div className="aspect-[9/19.5] overflow-hidden rounded-[24px] bg-[#F0FDF4]">
        {children}
      </div>
    </div>
  );
}

function AppShell({ title, children, topChrome }: { title: string; children: ReactNode; topChrome?: ReactNode }) {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-[#F0FDF4] px-[14px] pb-[14px] pt-6">
        <IosStatusBar />
        {topChrome}
        <div className="mt-4 flex items-center justify-center">
          <p className="text-[16px] font-semibold text-[#14532D]">{title}</p>
        </div>
        <div className="mt-3 min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </PhoneFrame>
  );
}

function SummaryPanel() {
  return (
    <div className="rounded-[24px] border border-[#D1FAE5] bg-white p-[14px] shadow-[0_8px_24px_rgba(20,83,45,0.08)]">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[1.3px] text-[#2D5F3E]">Taken</p>
          <p className="mt-1 text-[20px] font-bold leading-none text-[#14532D]">1/3</p>
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[1.3px] text-[#2D5F3E]">Status</p>
          <p className="mt-1 text-[20px] font-bold leading-none text-[#14532D]">On track</p>
        </div>
      </div>
    </div>
  );
}

function Chip({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'amber' | 'red' | 'muted' }) {
  const colors = {
    green: 'bg-[#DCFCE7] text-[#16A34A]',
    amber: 'bg-[#FEF3C7] text-[#D97706]',
    red: 'bg-[#FEE2E2] text-[#DC2626]',
    muted: 'bg-[#F7FFF9] text-[#2D5F3E]'
  };

  return (
    <span className={`whitespace-nowrap rounded-full px-[9px] py-[5px] text-[10px] font-semibold ${colors[tone]}`}>
      {children}
    </span>
  );
}

function DateNavigator() {
  return (
    <div className="flex items-center gap-[8px]">
      <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#F7FFF9] text-[15px] font-semibold text-[#14532D]">
        ‹
      </span>
      <span className="rounded-full border border-[#16A34A59] bg-white px-3 py-[8px] text-[11px] font-semibold text-[#14532D]">
        Apr 13, 2026
      </span>
      <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#F7FFF9] text-[15px] font-semibold text-[#14532D]">
        ›
      </span>
    </div>
  );
}

function MedicineRow({
  name,
  status,
  selected = false,
  dim = false
}: {
  name: string;
  status?: ReactNode;
  selected?: boolean;
  dim?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-[10px] rounded-[16px] border px-[10px] py-[9px] ${
        selected ? 'border-[#16A34A59] bg-[#DCFCE7]' : 'border-[#D1FAE5] bg-[#F7FFF9]/80'
      } ${dim ? 'opacity-45' : ''}`}
    >
      <span className={`text-[15px] ${selected ? 'text-[#16A34A]' : 'text-[#2D5F3E]'}`}>
        {selected ? '✓' : '○'}
      </span>
      <p className="min-w-0 flex-1 truncate text-[12px] font-semibold text-[#14532D]">{name}</p>
      {status}
    </div>
  );
}

function DoseCard() {
  return (
    <div className="flex items-start gap-[12px]">
      <div className="flex w-[48px] flex-col items-center gap-[7px]">
        <p className="whitespace-pre-line text-center text-[13px] font-bold leading-[1.05] text-[#14532D]">
          8:00{'\n'}AM
        </p>
        <span className="h-[168px] w-[2px] rounded-full bg-[#D1FAE5]" />
      </div>
      <div className="min-w-0 flex-1 rounded-[24px] border border-[#D1FAE5] bg-white p-[14px] shadow-[0_8px_24px_rgba(20,83,45,0.08)]">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[20px] font-bold leading-none text-[#14532D]">Morning</p>
          <Chip tone="amber">Upcoming</Chip>
        </div>
        <div className="mt-3 space-y-[7px]">
          <MedicineRow name="Metformin 500mg" status={<Chip>Taken</Chip>} selected dim />
          <MedicineRow name="Lisinopril 10mg" selected />
          <MedicineRow name="Vitamin D" />
        </div>
        <div className="mt-[10px] grid grid-cols-2 gap-[8px]">
          <button className="h-[38px] rounded-[16px] bg-[#16A34A] text-[13px] font-semibold text-white">
            Taken
          </button>
          <button className="h-[38px] rounded-[16px] border border-[#D1FAE5] bg-[#F7FFF9] text-[13px] font-semibold text-[#14532D]">
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

function TodayMockup() {
  return (
    <AppShell title="Today">
      <div className="space-y-[12px]">
        <SummaryPanel />
        <DateNavigator />
        <DoseCard />
      </div>
    </AppShell>
  );
}

function ModeSwitcher() {
  return (
    <div className="mt-3 flex items-center justify-between gap-2">
      <div className="flex rounded-full border border-[#D1FAE5] bg-[#DCFCE7] p-[4px]">
        <span className="rounded-full px-[11px] py-[7px] text-[11px] font-semibold text-[#2D5F3E]">Self</span>
        <span className="rounded-full bg-[#14532D] px-[11px] py-[7px] text-[11px] font-semibold text-[#F0FDF4]">
          Caregiver
        </span>
      </div>
      <span className="relative flex h-[34px] w-[34px] items-center justify-center rounded-[14px] bg-[#F7FFF9] text-[#14532D]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
        <span className="absolute right-[5px] top-[4px] h-[8px] w-[8px] rounded-full bg-[#DC2626]" />
      </span>
    </div>
  );
}

function CareProfileCard({
  name,
  count,
  status,
  active,
  warning
}: {
  name: string;
  count: string;
  status: string;
  active?: boolean;
  warning?: boolean;
}) {
  return (
    <div
      className={`w-[156px] shrink-0 rounded-[22px] p-[13px] shadow-[0_8px_20px_rgba(20,83,45,0.07)] ${
        active
          ? 'border-2 border-[#16A34A] bg-[#DCFCE7]'
          : 'border border-[#D1FAE5] bg-[#F7FFF9] opacity-70'
      }`}
    >
      <p className="truncate text-[15px] font-semibold text-[#14532D]">{name}</p>
      <p className="mt-[5px] text-[11px] text-[#2D5F3E]">{count} taken</p>
      <div className="mt-[8px]">
        <Chip tone={warning ? 'amber' : 'green'}>{status}</Chip>
      </div>
    </div>
  );
}

function FamilyMockup() {
  return (
    <AppShell title="Today" topChrome={<ModeSwitcher />}>
      <div className="space-y-[12px]">
        <div className="hide-scrollbar -mx-[2px] flex gap-[10px] overflow-hidden">
          <CareProfileCard name="Mom" count="3/3" status="All doses done" active />
          <CareProfileCard name="Dad" count="3/5" status="2 needs action" warning />
        </div>

        <SummaryPanel />

        <div className="rounded-[24px] border border-[#D1FAE5] bg-white p-[14px] shadow-[0_8px_24px_rgba(20,83,45,0.08)]">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[1.3px] text-[#2D5F3E]">Caregiver</p>
              <p className="mt-1 text-[19px] font-bold leading-tight text-[#14532D]">Know when someone misses a dose</p>
            </div>
            <span className="flex rotate-[-14deg] items-start gap-[4px] pt-1" aria-hidden="true">
              <span className="h-[32px] w-[8px] rounded-full bg-[#16A34A]" />
              <span className="h-[52px] w-[8px] rounded-full bg-[#14532D]/80" />
              <span className="h-[32px] w-[8px] rounded-full bg-[#16A34A]" />
            </span>
          </div>
          <p className="mt-3 text-[12px] leading-[1.45] text-[#2D5F3E]">
            Invite a parent, partner, or child. After they accept, you see missed doses and can help manage their schedule.
          </p>
          <div className="mt-3 space-y-[8px]">
            <div className="rounded-[16px] bg-[#F7FFF9] px-3 py-[10px] text-[12px] text-[#2D5F3E]">mom@email.com</div>
            <button className="h-[38px] w-full rounded-[16px] bg-[#16A34A] text-[13px] font-semibold text-white">
              Send caregiver invite
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function HistoryBar({ value, label, active }: { value: string; label: string; active?: boolean }) {
  const heights: Record<string, string> = {
    '3/3': 'h-[96px]',
    '2/3': 'h-[68px]',
    '1/3': 'h-[38px]',
    '0/2': 'h-[12px]'
  };

  return (
    <div className={`rounded-[18px] px-[7px] py-[7px] ${active ? 'bg-[#DCFCE7]' : ''}`}>
      <div className="flex h-[100px] items-end justify-center rounded-full border border-[#D1FAE5] bg-[#F7FFF9] px-[6px]">
        <span className={`w-[22px] rounded-full ${active ? 'bg-[#14532D]' : 'bg-[#16A34A]'} ${heights[value] ?? 'h-[56px]'}`} />
      </div>
      <p className={`mt-[7px] text-center text-[10px] font-semibold ${active ? 'text-[#14532D]' : 'text-[#2D5F3E]'}`}>
        {value}
      </p>
      <p className="text-center text-[9px] text-[#2D5F3E]">{label}</p>
    </div>
  );
}

function HistoryEntry({ name, detail, tone }: { name: string; detail: string; tone: 'green' | 'red' | 'muted' }) {
  return (
    <div className="flex items-center gap-2 rounded-[18px] border border-[#D1FAE5] bg-[#F7FFF9]/80 px-3 py-[9px]">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-semibold text-[#14532D]">{name}</p>
        <p className="mt-[2px] truncate text-[10px] text-[#2D5F3E]">{detail}</p>
      </div>
      <Chip tone={tone}>{tone === 'green' ? 'Taken' : tone === 'red' ? 'Missed' : 'Skipped'}</Chip>
    </div>
  );
}

function HistoryMockup() {
  return (
    <AppShell title="History">
      <div className="space-y-[12px]">
        <div className="rounded-[24px] border border-[#D1FAE5] bg-white p-[14px] shadow-[0_8px_24px_rgba(20,83,45,0.08)]">
          <p className="text-[9px] font-semibold uppercase tracking-[1.3px] text-[#2D5F3E]">History</p>
          <p className="mt-1 text-[18px] font-semibold text-[#14532D]">Mon, Apr 13, 2026</p>
          <div className="mt-3 flex items-end gap-[6px] overflow-hidden">
            <HistoryBar value="3/3" label="Apr 9" />
            <HistoryBar value="2/3" label="Apr 10" />
            <HistoryBar value="3/3" label="Apr 11" />
            <HistoryBar value="0/2" label="Apr 12" />
            <HistoryBar value="2/3" label="Apr 13" active />
          </div>
        </div>

        <div className="rounded-[24px] border border-[#D1FAE5] bg-white p-[14px] shadow-[0_8px_24px_rgba(20,83,45,0.08)]">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[1.3px] text-[#2D5F3E]">Selected day</p>
              <p className="mt-1 text-[17px] font-semibold text-[#14532D]">Mon, Apr 13</p>
            </div>
            <Chip>67% adherence</Chip>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-[8px]">
            {[
              ['Taken', '2/3'],
              ['Missed', '1'],
              ['Skipped', '0'],
              ['Open', '0']
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[8px] font-semibold uppercase tracking-[1px] text-[#2D5F3E]">{label}</p>
                <p className="mt-1 text-[15px] font-bold text-[#14532D]">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-[7px]">
            <HistoryEntry name="Metformin 500mg" detail="Morning at 8:00 AM" tone="green" />
            <HistoryEntry name="Lisinopril 10mg" detail="Morning at 8:00 AM" tone="red" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

const slides = [
  { id: 'today', render: <TodayMockup /> },
  { id: 'caregiver', render: <FamilyMockup /> },
  { id: 'history', render: <HistoryMockup /> }
];

export function PhoneShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateActive = () => {
      if (window.innerWidth >= 768) {
        setActive(0);
        return;
      }

      const firstSlide = container.querySelector<HTMLElement>('[data-slide]');
      if (!firstSlide) return;

      const gap = parseFloat(getComputedStyle(container).gap || '0');
      const width = firstSlide.offsetWidth + gap;
      const index = width === 0 ? 0 : Math.round(container.scrollLeft / width);
      setActive(Math.max(0, Math.min(slides.length - 1, index)));
    };

    updateActive();
    container.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      container.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  return (
    <section className="px-6 pb-20 pt-10 sm:pt-12 lg:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-[560px] text-center">
          <h2 className="text-[28px] font-bold tracking-[-0.5px] text-white">One tap. You know.</h2>
          <p className="mt-3 text-[16px] text-[#A1A1AA]">
            No more guessing. No more panic. No more daily calls.
          </p>
        </div>

        <div
          ref={containerRef}
          className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible"
        >
          {slides.map((slide, index) => (
            <Reveal
              key={slide.id}
              delay={index * 100}
              className="min-w-full snap-center md:min-w-0"
            >
              <div data-slide>{slide.render}</div>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 md:hidden">
          {slides.map((slide, index) => (
            <span
              key={slide.id}
              className={`h-2 rounded-full transition-all ${
                active === index ? 'w-6 bg-[#4ADE80]' : 'w-2 bg-[#2A2A2A]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
