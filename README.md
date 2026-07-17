# Сербский на каждый день · Serbian everyday phrasebook

A lightweight offline-first PWA phrasebook for Russian speakers learning Serbian. Open a category, find the phrase, say it — no googling, no internet required.

**Live demo:** _(add your Netlify / GitHub Pages URL here)_

## Features

- 19 everyday categories: supermarket, pijaca, bakery, café, pharmacy, doctor, transport, taxi, post office, emergencies and more — 360+ entries
- Every phrase in three lines: Russian → Serbian (Latin script) → pronunciation in Cyrillic with stress marks
- Installable on the home screen (PWA), works fully offline after the first visit
- Zero dependencies: vanilla HTML/CSS/JS, no build step, no frameworks
- Automatic light/dark theme following system settings

## Project structure

```
index.html      app shell
style.css       styles (light + dark theme)
app.js          rendering, hash routing, inline SVG icons
data.json       all content: categories and phrases
manifest.json   PWA manifest
sw.js           service worker (offline cache)
icons/          app icons (192, 512)
```

## Editing content

All phrases live in `data.json`. Each entry has three fields:

```json
{ "ru": "Счёт, пожалуйста", "sr": "Račun, molim vas", "tr": "ра́чун, мо́лим вас" }
```

To add a category, append an object to `categories` with a unique `id`, a `title` and an `items` array. To give it a custom icon, add a matching entry to the `ICONS` map in `app.js` (any 24×24 stroke SVG); otherwise a default icon is used.

After changing `data.json`, bump the cache name in `sw.js` (`srpski-v1` → `srpski-v2`) so installed clients pick up the new content.

## Running locally

Any static server works:

```
npx serve .
```

Opening `index.html` directly from disk won't work — `fetch('data.json')` and the service worker require HTTP.

## Deploying

- **Netlify:** drag and drop the folder, or connect this repository for auto-deploys on push.
- **GitHub Pages:** Settings → Pages → deploy from branch.

HTTPS (provided by both) is required for PWA installation.

## License

MIT
