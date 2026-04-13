import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

type Segment = 'solo' | 'family' | 'caregiver';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const { email, segment } = (await request.json()) as {
      email?: string;
      segment?: Segment;
    };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    if (!segment || !['solo', 'family', 'caregiver'].includes(segment)) {
      return NextResponse.json({ error: 'Choose who Tookit is for.' }, { status: 400 });
    }

    const tallyFormId = process.env.TALLY_FORM_ID;
    const tallyWebhookUrl = process.env.TALLY_WEBHOOK_URL;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (tallyWebhookUrl || tallyFormId) {
      const targetUrl =
        tallyWebhookUrl ?? `https://tally.so/forms/${tallyFormId}/submissions`;

      const tallyResponse = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, segment })
      });

      if (!tallyResponse.ok) {
        const text = await tallyResponse.text();
        return NextResponse.json(
          { error: `Tally submission failed: ${text || 'Unknown error.'}` },
          { status: 500 }
        );
      }

      return NextResponse.json({ ok: true, provider: 'tally' });
    }

    if (!supabaseUrl || !supabaseServiceRole) {
      return NextResponse.json(
        {
          error:
            'Missing backend configuration. Add Tally or Supabase environment variables before deploying.'
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRole, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    const { error } = await supabase.from('waitlist').insert({ email, segment });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, provider: 'supabase' });
  } catch {
    return NextResponse.json({ error: 'Unable to submit right now.' }, { status: 500 });
  }
}
