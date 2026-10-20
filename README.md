# courtneyroot.dev

Personal site built with [Astro](https://astro.build), hosted on Cloudflare Pages.

## Run it locally

```sh
npm install
npm run dev        # http://localhost:4321
```

## Write a post

Add a Markdown file to `src/content/posts/`:

```md
---
title: "Post title"
description: "One sentence for the list page and search results."
date: 2026-10-19
pillar: securing-ai   # securing-ai | ai-for-defenders | security-leadership | post-quantum | general
draft: false          # true keeps it off the live site
---

Your post here.
```

Push to GitHub and Cloudflare rebuilds the site automatically.

## Schedule a post

A post goes live when **both** are true: `draft: false`, and its `date` has arrived.

1. Write the post and set `date` to the day you want it published.
2. When it's ready, change `draft: true` to `draft: false` and upload it.
3. That's it. A GitHub Action rebuilds the site every morning (about 7 a.m. Pacific),
   and the post appears on its date. Until then it stays hidden, even though it's in the repo.

Keep `draft: true` on anything you haven't reviewed yet. To publish right away, set today's date.

**One-time setup for the daily rebuild** (also written at the top of `.github/workflows/scheduled-publish.yml`):
1. Cloudflare dashboard → your Pages project → Settings → Builds → **Deploy hooks** → create one for `main`, copy the URL.
2. GitHub repo → Settings → Secrets and variables → Actions → **New repository secret** named
   `CLOUDFLARE_DEPLOY_HOOK`, value = that URL.
3. Test it: GitHub repo → Actions → Scheduled publish → **Run workflow**.

## Where things live

| What | File |
| --- | --- |
| Name, email, social links, pillar descriptions | `src/site.ts` |
| Homepage (headline, "Now" box) | `src/pages/index.astro` |
| Speaking topics and talk list | `src/pages/speaking.astro` |
| About page and bios | `src/pages/about.astro` |
| Colors and type | `src/styles/global.css` |
| Security headers (CSP, HSTS, etc.) | `public/_headers` |
| Vulnerability disclosure contact | `public/.well-known/security.txt` |
| LinkedIn versions of each blog post (not part of the website) | `linkedin/` |
| Content and projects roadmaps (not part of the website) | `roadmap/` |

## Cloudflare Pages settings

- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`

## Security notes

- No JavaScript ships to visitors and no third-party requests are made, so the CSP is `'self'` only.
  If you add analytics, embeds or fonts from another domain, update `public/_headers` too.
- Renew the `Expires` date in `security.txt` each year.
