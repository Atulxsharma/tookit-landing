import { NextResponse } from 'next/server';
import { getWaitlistCount, insertWaitlistEntry, type Segment } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSegment(value: string): value is Segment {
  return value === 'solo' || value === 'family' || value === 'caregiver';
}

export async function GET() {
  const result = await getWaitlistCount();

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      email?: string;
      segment?: string;
    };

    const email = payload.email?.trim().toLowerCase() ?? '';
    const segment = payload.segment ?? '';

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    if (!isSegment(segment)) {
      return NextResponse.json({ error: 'Please select one.', code: 'segment_required' }, { status: 400 });
    }

    const result = await insertWaitlistEntry(email, segment);

    if (result.ok) {
      return NextResponse.json({ ok: true });
    }

    const status = result.code === 'duplicate' ? 409 : result.code === 'config' ? 503 : 500;

    return NextResponse.json(
      {
        error: result.message,
        code: result.code
      },
      { status }
    );
  } catch {
    return NextResponse.json(
      {
        error: 'Something went wrong. Try again.',
        code: 'unknown'
      },
      { status: 500 }
    );
  }
}
