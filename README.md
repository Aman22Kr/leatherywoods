# LeatheryWoods

A front-end **demo furniture storefront** (Vite + React + Tailwind CSS 3 + React Router + Framer Motion + Lucide). All products, prices and reviews are **sample data**. Layout is inspired by a mainstream Indian furniture retailer's structure; all copy, branding and imagery are original placeholders.

## Quick settings
Edit `src/config.js`: `BRAND`, `ANIMATION` (`speed`: SLOW/NORMAL/FAST/OFF, `intensity`: SUBTLE/MEDIUM/STRONG), `STORAGE_PREFIX`. Catalogue lives in `src/data/catalog.js`.

## Run locally
```bash
npm install
npm run dev
npm run build && npm run preview
```

## Deploy to GitHub Pages (GitHub Actions only)
```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Aman22kr/<REPO>.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.
Routing uses `HashRouter` and `base: './'`, so refreshes, direct links and any repo name work without server rewrites.

## localStorage & demo limits
Cart, wishlist, recently viewed, search history and the contact draft are stored under `leatherywoods:v1:*` in your browser only. They don't sync across devices and aren't an account. Checkout, contact and tracking are mocks: no payment, login, order or submission ever happens. Never enter real personal or payment data.
Images are generated placeholders (see `Img` in `src/components/ui.jsx`); swap in licensed photos as needed.
