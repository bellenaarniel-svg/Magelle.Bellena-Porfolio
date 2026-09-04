# Magelle Bellena — Virtual Assistant Portfolio

A fast, fully static one-page portfolio site. No build step, no frameworks, no dependencies —
just `index.html`, `styles.css`, `script.js` and an `assets/` folder.

**Theme:** "Blush Studio" — soft pink / rose / lavender with Playfair Display + Poppins,
floating petals, gradient text, animated counters and scroll reveals.

---

## 📁 Files

```
magelle-portfolio/
├── index.html                        # the whole page
├── styles.css                        # theme + layout (edit colors at the top)
├── script.js                         # nav, scroll reveal, counters, form
├── render.yaml                       # Render Blueprint (one-click deploy config)
├── robots.txt
└── assets/
    ├── Magelle-Bellena-Resume.pdf    # linked by the "Download CV" buttons
    ├── hero-placeholder.png          # ⚠️ REPLACE with Magelle's real photo
    └── about-placeholder.png         # optional: replace with a workspace photo
```

---

## ✅ Before you publish — 2 quick things

### 1. Swap in her real photo
Replace `assets/hero-placeholder.png` with a real photo (keep the same filename, or update
the `src` in `index.html`). For the best look, use a **PNG with the background removed**
(remove.bg or Canva does this in one click) so she sits nicely on the pink brush shape.
Recommended size: ~900×1000px. (Send it over and I can do the cutout for you.)

Same idea for `assets/about-placeholder.png` — a photo of her desk/workspace works great.

### 2. Activate the contact form (one click, no account)
The form posts to **FormSubmit**, which forwards messages straight to
`magelletingcoy@yahoo.com`. There's nothing to sign up for — but it needs a one-time activation:

1. Deploy the site (see below), open it, and send yourself a test message through the form.
2. FormSubmit emails `magelletingcoy@yahoo.com` a confirmation link. **Click it once.**
3. Done — every message from then on lands in her inbox automatically.

> Check the Yahoo **spam folder** for that first confirmation email.

If the request ever fails (offline, service down), the form automatically falls back to
opening the visitor's own email app addressed to her — so no message is ever lost.

**Optional — hide the email address from bots:** after activating, FormSubmit gives you a
random alias like `https://formsubmit.co/ajax/a1b2c3d4e5f6`. Paste that into the form's
`action` in `index.html` and her address disappears from the page source.

**To change the destination address:** edit the `action` attribute in `index.html`
(`https://formsubmit.co/ajax/NEW-EMAIL-HERE`) **and** the `FALLBACK_EMAIL` value near the
bottom of `script.js`.

### 3. Double-check the details
Phone, email, location, availability and the experience bullets all come straight from the
resume. Search `index.html` for `magelletingcoy` or `0919` if anything needs changing.
Social links (LinkedIn, Upwork, OnlineJobs.ph) can be added in the hero — just ask.

---

## 🚀 Deploy to Render (free)

### Option A — Blueprint (uses `render.yaml`, recommended)
1. Push this folder to a **GitHub** (or GitLab) repository.
2. In Render: **New → Blueprint** → connect the repo → **Apply**.
3. Render reads `render.yaml` and creates a free Static Site. Done.

### Option B — Manual (no `render.yaml` needed)
1. Push the folder to GitHub.
2. In Render: **New → Static Site** → pick the repo.
3. Settings:
   - **Build Command:** *(leave completely empty)*
   - **Publish Directory:** `.`
4. **Create Static Site.**

You'll get a free URL like `https://magelle-portfolio.onrender.com`.
Static Sites on Render are free, always-on (they don't sleep like free web services),
and get automatic HTTPS. Every `git push` redeploys automatically.

**Custom domain:** Render dashboard → your site → *Settings → Custom Domains* →
add e.g. `magellebellena.com` and point the DNS records Render shows you.

---

## 🎨 Customising the look

All colors live in one place — the `:root` block at the top of `styles.css`:

```css
--rose:      #E85D8A;   /* main pink       */
--lav:       #B58BE0;   /* lavender accent */
--plum:      #3B1E37;   /* headings        */
--cream:     #FFF9F6;   /* page background */
```

Change those four and the entire site re-themes.
Prefer a dustier rose? Try `--rose: #D98BA4`. Want more purple? `--rose: #C77DD8`.

**Turn off the falling petals:** delete the `<div class="petals">…</div>` block in `index.html`.

---

## 🖥️ Preview locally

```bash
cd magelle-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

---

## ♿ Notes

- Fully responsive (desktop / tablet / phone) with a slide-down mobile menu.
- Respects `prefers-reduced-motion` — animations switch off for users who ask for that.
- Semantic HTML, alt text, keyboard-accessible nav, SEO meta + Open Graph tags.
- Google Fonts load from CDN; if they're blocked the site falls back to Georgia/Segoe UI
  and still looks fine.
