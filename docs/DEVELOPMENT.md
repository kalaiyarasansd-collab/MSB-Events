# Development notes

## Prototype boundaries

The ZIP uses Vite + React, not Next.js. The source has no Supabase integration yet. The booking context persists state to localStorage, and the authentication components are demonstrations rather than secure account services. The admin portal can be opened at `/#admin`.

The original archive's embedded admin credential hash was removed from source before this import. Demo admin login is disabled until a developer supplies their own hash. This is configuration hygiene, not production security: anyone can inspect client code or modify browser storage.

## Optional demo admin configuration

Copy `.env.example` to `.env.local`. To generate your own demo hash, open the browser console at localhost and run:

```js
const username = prompt('Demo username');
const password = prompt('Unique throwaway demo password');
if (username && password) {
  const text = 'msb_event_portal_salt_2026_v1:' + username.toLowerCase().trim() + ':' + password.trim();
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  console.log(Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join(''));
}
```

Paste the output as `VITE_DEMO_ADMIN_CREDENTIALS_HASH` in `.env.local` and restart Vite. Do not use an existing personal or production password. All `VITE_` environment variables are browser-visible after building.

## Before a real launch

Replace browser-only authentication and storage with a backend. Enforce admin roles server-side, apply database access policies, and enforce booking conflicts in the database. Verify business contact details, external links, prices, gallery permissions, and legal copy with the business owner. Configure the real site URL in SEO utilities, sitemap, and robots file.

External images, fonts, and WhatsApp links may require an internet connection. Opening WhatsApp does not prove an enquiry was delivered or a booking confirmed.
