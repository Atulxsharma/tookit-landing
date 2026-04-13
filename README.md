# Tookit waitlist landing page

Production-ready Next.js 14 landing page for Tookit.

## Stack
- Next.js 14 App Router
- Tailwind CSS
- Framer Motion (hero only)
- Supabase or Tally form submission
- Vercel-ready

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables
Choose one backend path:

### Option A — Supabase
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Run `supabase.sql` in your existing Supabase project.

### Option B — Tally
- `TALLY_WEBHOOK_URL` or `TALLY_FORM_ID`

If you use Tally later, the landing page UI does not need to change — only the environment variables.

## Vercel deploy
1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables from `.env.example`.
4. Deploy.

## Notes
- Analytics events are stubbed with `window.gtag` and ready for your GA4 ID.
- Update the social proof count manually in `components/Hero.tsx`.
- Replace `/app/privacy/page.tsx` with your final privacy copy.
