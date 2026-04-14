import { NextResponse } from 'next/server';
import { getWaitlistCount, insertWaitlistEntry, type Segment } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type SheetsResult =
  | { ok: true; duplicate?: boolean }
  | { ok: false; error?: string };

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSegment(value: string): value is Segment {
  return value === 'solo' || value === 'family' || value === 'caregiver';
}

async function insertGoogleSheetsEntry(email: string, segment: Segment) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!webhookUrl || !secret) {
    return null;
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify({
      secret,
      email,
      segment,
      source: 'landing_page'
    })
  });

  if (!response.ok) {
    return {
      ok: false as const,
      error: 'Something went wrong. Try again.'
    };
  }

  const result = (await response.json()) as SheetsResult;

  if (result.ok) {
    return {
      ok: true as const,
      duplicate: result.duplicate === true
    };
  }

  return {
    ok: false as const,
    error: result.error ?? 'Something went wrong. Try again.'
  };
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

    const sheetsResult = await insertGoogleSheetsEntry(email, segment);

    if (sheetsResult) {
      if (sheetsResult.ok) {
        return NextResponse.json(
          sheetsResult.duplicate
            ? { ok: false, code: 'duplicate', error: "You're already on the list!" }
            : { ok: true },
          { status: sheetsResult.duplicate ? 409 : 200 }
        );
      }

      return NextResponse.json(
        {
          error: sheetsResult.error,
          code: 'sheets_error'
        },
        { status: 500 }
      );
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
