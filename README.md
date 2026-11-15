# JS Central — Public Archive

> A static, read-only snapshot of [JS Central](https://jscentral.org/), preserved for reference.

[![Static site](https://img.shields.io/badge/site-static-202124?style=flat-square)](https://jscentral.org/)
[![Archive](https://img.shields.io/badge/status-archive-8fb339?style=flat-square)](#archive-scope)

This repository contains the public-facing pages and browser-side experiments from JS Central. It is an archive copy, not the live website or a complete backup of hosting configuration, accounts, databases, or other server-side data. The live site may change independently; this copy may become out of date.

## What’s here

| Page | Description |
| --- | --- |
| [`index.html`](index.html) | Archived homepage and project index |
| [`lab.html`](lab.html) | Small, client-side browser experiments |
| [`embedded-guide.html`](embedded-guide.html) | Embedded-systems troubleshooting guide and local notes |
| [`journal.html`](journal.html) | Engineering notes and implementation write-ups |
| [`seasonal.html`](seasonal.html) | Seasonal page and optional YouTube Music embeds |
| [`legal.html`](legal.html) | Archive privacy, use, and copyright notices |
| [`style.css`](style.css), [`script.js`](script.js) | Shared presentation and browser-side behavior |

`index2.html` is an additional archived page retained from the source site. Static assets are kept alongside the pages that use them.

## Archive scope

- The archive is a manually maintained snapshot; changes to the live site are **not** synchronized automatically.
- Pages are marked `noindex` to discourage search engines from treating this copy as the primary site.
- Advertising scripts, publisher identifiers, and the original site-verification file are not included.
- Theme preferences and embedded-guide records are stored in the visitor’s browser only. They are not submitted by those features to this repository.
- Google Fonts and the optional YouTube player are external services. Their providers may receive normal request information when a page loads fonts or a visitor opens the seasonal player.
- The hosting provider may process request data to deliver and secure the archive. See [`legal.html`](legal.html) for details.

## Run locally

No build step or package installation is required. Open `index.html` in a browser, or serve this directory with any static file server. For example:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000/>.

## Deploy with Cloudflare Workers

The included [`wrangler.json`](wrangler.json) configures the repository as a static-asset Worker. After installing Wrangler and authenticating with your own Cloudflare account, deploy from the repository root:

```sh
npx wrangler deploy
```

Review the Cloudflare account and deployment target before publishing. Do not put credentials, account secrets, private configuration, or personal contact details in this public repository.

## Updating the archive

To refresh the snapshot, update the relevant public pages and assets from the live site, then review the changes for private information before publishing. In particular, avoid adding private contact details, precise personal location data, credentials, verification tokens, or analytics/advertising identifiers.

## Legal and reuse

The site content is provided for reference and educational purposes, without warranty. Unless a file or asset says otherwise, this repository does not grant a general license to reuse site text, designs, or images. Third-party material remains subject to its respective owner’s rights and license. See [`legal.html`](legal.html) for the archive’s terms and correction/removal process.

## Corrections and removal requests

Open an issue in this repository for a correction or removal request. Issues are public, so do not include sensitive or confidential information. This archive is not monitored for emergencies or private support requests.
