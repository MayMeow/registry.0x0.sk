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
domain_puny = idna.encode(domain_unicode).decode('ascii')  # xn--e28h.0x0.sk
```

💡 You can also write your domain name in your address bar - most browsers will translate it to punnycode.

## Notes

* Never commit **private salts** or **personal info**.
* Hidden hashes protect reserved/premium domains from being scraped.
* PRs adding new subdomains without prior confirmation will **not** be merged.
