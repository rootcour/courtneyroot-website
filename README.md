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

## Cloudflare Pages settings

- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`

## Security notes

- No JavaScript ships to visitors and no third-party requests are made, so the CSP is `'self'` only.
  If you add analytics, embeds or fonts from another domain, update `public/_headers` too.
- Renew the `Expires` date in `security.txt` each year.
