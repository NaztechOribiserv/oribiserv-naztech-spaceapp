# KasiRooms — Static Site (Vercel-Ready)

Production-ready, zero-build static site. Single `index.html` + `vercel.json`.

## Run locally

```bash
cd kasirooms
python3 -m http.server 8080
# open http://localhost:8080
```

No npm, no build steps. Tailwind via Play CDN, Lucide via CDN, vanilla JS.

## Deploy to Vercel (2 options)

**Option A — Set Root Directory (recommended in this monorepo):**
1. Vercel Dashboard → Add New Project → import `oribiserv-naztech-spaceapp`
2. Set **Root Directory** to `kasirooms`
3. Framework Preset: **Other**. Build Command: *(empty)*. Output Directory: *(empty)*
4. Deploy. `vercel.json` handles clean URLs + caching automatically.

**Option B — Standalone repo:**
Copy `kasirooms/index.html` + `kasirooms/vercel.json` into a new repo root and deploy.

## File structure

```text
kasirooms/
├── index.html    # entire app: layout + styling + vanilla JS (Tailwind + Lucide via CDN)
├── vercel.json   # cleanUrls + security headers + immutable asset caching
└── README.md     # this file
```
