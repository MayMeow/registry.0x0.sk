# registry.0x0.sk
Registered subodmains in 0x0 space

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D5DMOTA)

This repository publicly lists assigned **0x0.sk** subdomains. It is intended for transparency while keeping some reserved or premium domains hidden using SHA‑256 hashes.

Subdomains can be used for **Bluesky handles**. (for now), considering allowing to use it for other projects and/or email.

## Categories

| Category            | Description                       |
| ------------------- | --------------------------------- |
| **Top Premium**     | 1–2 letters, extremely rare       |
| **Premium**         | 3–4 letters, short and catchy     |
| **Standard / Base** | 5+ letters, included as club perk |
| **Emoji**           | Emoji domains (Unicode/Punycode)  |

## How to Request a Subdomain

1. **Send a message** via Ko-fi (or another contact method) with your desired subdomain.
2. I will check availability and confirm it with you.
3. Once confirmed, you can **submit a Pull Request (PR)** adding your subdomain to `subdomains.json`.
   * **Do not add subdomains without contacting me first.**
   * If you are not familiar with GIT I will add domain for you.
4. I send you other instructions over Ko-fi.

💡 *Note:* If a DNS TXT/MX record is removed, the subdomain will stop working.

---

## Emoji Domains

* Convert Unicode emoji to **Punycode** before adding to JSON or generating hashes.
* Python example:

```python
import idna
domain_unicode = "🐱.0x0.sk"
domain_puny = idna.encode(domain_unicode).decode('ascii')  # xn--5o8h.0x0.sk
```

💡 You can also write your domain name in your address bar - most browsers will translate it to punnycode.

## Notes

* Never commit **private salts** or **personal info**.
* Hidden hashes protect reserved/premium domains from being scraped.
* PRs adding new subdomains without prior confirmation will **not** be merged.

## Development

1. `npm install`
2. `npm run dev` — launches Eleventy with hot reload at <http://localhost:8080>
3. `npm run build` — produces the static site in `_site/`
4. `npm test` — runs the Vitest suite that validates domain normalization/hashing helpers and enforces the `subdomains.json` schema (hashes or punycode FQDNs only)

Every pull request runs the same `npm test` + `npm run build` pipeline through GitHub Actions (`.github/workflows/ci.yml`).

## Domain search logic

The web UI normalizes user input by trimming whitespace, lowercasing ASCII, auto-appending `.0x0.sk`, and converting emoji labels to punycode (using the browser’s URL parser). It then checks entries in `subdomains.json` two ways:

1. direct string comparison for any visible domain (e.g., `meow.0x0.sk`)
2. SHA‑256 digest comparison for hashed/hidden reservations

If either check matches, the domain is reported as taken without revealing private names.

## Deployment

Vercel builds the site with `npm run build` and serves the generated `_site` directory (see `vercel.json`). No server-side code is required; all availability checks happen client-side.
