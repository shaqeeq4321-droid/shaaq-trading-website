# Shaaq Trading Limited — website

Custom garment specification site for Shaaq Trading Limited: build a shirt,
t-shirt, trousers or tuxedo detail-by-detail, preview your own logo on the
garment, book a sample-viewing appointment, or request a trade quote.

An independent codebase — plain Vite + React + TypeScript + Tailwind CSS.
No dependency on any website builder platform; it deploys to any static host
(Vercel, Netlify, Cloudflare Pages, GitHub Pages, or your own Hostinger plan).

## Stack

- React 18 + TypeScript, built with Vite
- Tailwind CSS v4 for styling, shadcn/ui-style primitives (Button, Input,
  Calendar, etc.) for form controls
- React Router for client-side routing
- All garment/brand artwork is hand-built SVG (no external image/licensing
  dependency) — see `src/components/garment-visual.tsx`,
  `src/components/exploded-shirt.tsx` and `src/components/brand-mark.tsx`

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build       # production build -> dist/
npm run preview     # preview the production build locally
```

## Pages

- `/` — home, with the exploded-shirt hero and an overview of the four
  garment categories
- `/about` — the UK-spec / overseas-manufacture model and who it serves
- `/customise` — the garment builder: pick a garment, set every construction
  detail via option buttons, upload and drag-position a logo, add fabric and
  stitching notes, and submit a quote request
- `/collection` — a catalogue gallery of representative shirt styles
- `/appointments` — calendar-based booking for sample/quality visits
- `/enquiry` — a general trade quote request form
- `/contact` — contact details and social links
- `/automotive` — public gallery of car listings (photos, description, In
  Stock / Sold)
- `/admin` — passcode-gated page for managing the car gallery (see below)

## Form submissions (quotes & appointments)

`src/lib/submissions.ts` is a small, swappable submission layer:

- If `VITE_FORM_ENDPOINT` is set (see `.env.example`), submissions are POSTed
  there as JSON — point this at Formspree, Netlify Forms, a serverless
  function, or your own API.
- If it's unset, submissions fall back to opening a pre-filled `mailto:` to
  `info@shaaqtrading.com`, so the site is fully functional with zero backend
  setup.

To wire up persistent storage later (e.g. Supabase, Airtable, a database),
replace the body of `submitQuoteRequest` / `submitAppointment` in that file.

## Automotive gallery & admin page

The `/automotive` tab is a public gallery of car listings. It's driven by
`src/data/cars.json` — a plain JSON file in this repo, no database or third
party account required. Visitors see whatever is currently committed there;
you edit it from `/admin`.

### One-time setup

1. Set `VITE_GITHUB_OWNER` and `VITE_GITHUB_REPO` in your deployment's
   environment variables (e.g. in Vercel/Netlify's project settings — not
   just your local `.env`, since the live site needs them too) to this repo's
   owner and name. Optionally set `VITE_ADMIN_PASSCODE` to hide `/admin`
   behind a simple passcode prompt.
2. Redeploy so those variables are baked into the build.
3. Create a GitHub **fine-grained personal access token**
   (github.com → Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token): scope it to **only this
   repository**, with **Contents: Read and write** permission, and nothing
   else. Set an expiry you're comfortable with — you can always generate a
   new one later.

### Using it

1. Go to `yoursite.com/admin`, enter the passcode (if set), then paste in
   your token once — it's saved only in that browser's local storage, never
   committed anywhere.
2. Add a car, fill in its details, upload photos (they're resized
   client-side before upload) and set **In Stock** / **Sold**.
3. Click **Publish to GitHub** — this commits the updated `cars.json` (and
   any new photos) straight to the repo. The public gallery reads the file
   live from GitHub, so changes typically appear within moments, ahead of
   your host's own rebuild.

### Security note

The passcode on `/admin` is a convenience, not a lock: anything shipped in a
static site's JavaScript (including `VITE_ADMIN_PASSCODE`) can be read by
anyone who opens the browser's dev tools. What actually protects your repo
is the GitHub token itself — keep it private, scope it to just this repo as
above, and revoke/regenerate it from GitHub any time you want to cut off
access.

## Deploying

Any static host works, since this builds to a plain `dist/` folder:

- **Vercel / Netlify**: connect the GitHub repo, build command `npm run
  build`, output directory `dist`.
- **Hostinger / any shared host**: run `npm run build` and upload the
  contents of `dist/` to your hosting's public directory.

## Pushing to GitHub

```bash
git add -A
git commit -m "Initial Shaaq Trading website"
git branch -M main
git remote add origin https://github.com/your-username/shaaq-trading-website.git
git push -u origin main
```
