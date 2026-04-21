# Grow Electronics PWA — Deployment Guide

## Project contents
- index.html, services.html, contact.html, 404.html
- style.css (system fonts, CSS Grid, clamp(), dark mode)
- script.js (IntersectionObserver, scroll-to-top, SW register, GA4 events)
- manifest.json, sw.js
- /icons/ (favicon.svg, favicon.ico, apple-touch-icon.png, 192, 512)
- /img/ (hero WebP srcset)
- dylan-grow.vcf
- robots.txt, sitemap.xml, _headers

## 1) Update business info
Edit in all HTML files:
- Phone: replace +12523490830 and 252-349-0830
- Address in LocalBusiness JSON-LD (index.html)
- Canonical domain: change https://growelectronics.example to your domain
- Google Form: in contact.html replace iframe src with your form embed URL
- Google Map: in index.html replace maps src if you have a specific address
- WeatherWidget: already set to New Bern

Text/Call links are live:
- Call: tel:+12523490830
- Text: sms:+12523490830
- vCard: /dylan-grow.vcf

## 2) Images
- Replace /img/hero-*.webp with your shop photos. Keep <100KB each, export WebP quality 75-80.
- Replace icons in /icons/ with your logo. Maintain same filenames.

## 3) Performance budget
- Inline critical CSS is in <head>. Keep style.css <20KB after PurgeCSS.
- JS is deferred. Total JS <10KB gzipped.
- Preload hero via <link rel="preload"> already set.
- All iframes have skeleton loaders (.iframe-wrap) to avoid blank space.

## 4) SEO / Schemas included
- LocalBusiness, Product + AggregateRating, FAQ, Breadcrumb
- Update ratingCount and reviews in services.html as you collect them
- Open Graph image points to /img/hero-1200.webp

## 5) Analytics
- GA4 placeholder G-XXXXXXX in script.js cookie accept handler. Replace with your ID.
- Events tracked via data-ga attributes: call_header, get_quote_hero, call_hero, text_hero, vcf_download

## 6) Security headers (_headers)
Works on Netlify / Cloudflare Pages. Enforces:
- Strict CSP, X-Content-Type-Options, X-Frame-Options DENY, Referrer-Policy
- Long cache for assets, short for HTML

## 7) GitHub Actions CI/CD
Create .github/workflows/deploy.yml:
```yaml
name: build
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm i -g purgecss terser
      - run: purgecss --css style.css --content "*.html" --output .
      - run: terser script.js -c -m -o script.min.js && mv script.min.js script.js
      - uses: actions/upload-artifact@v4
        with: { name: site, path: . }
```

## 8) Husky pre-commit
```bash
npm init -y
npm i -D husky lint-staged
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```
package.json:
```json
"lint-staged": {
  "*.css": "purgecss --css",
  "*.js": "terser --compress --mangle"
}
```

## 9) Monthly maintenance
- Run Lighthouse (target 95+). Check LCP <2.5s, CLS <0.1
- Update sitemap dates, refresh testimonials
- Test offline mode (DevTools > Application > Service Workers)
- Rotate hero image seasonally, keep WebP <100KB

## 10) UTM parameters
Use on Get Quote CTA:
- /contact.html#get-quote?utm_source=google&utm_medium=organic&utm_campaign=local
- For flyers: ?utm_source=flyer&utm_medium=qr&utm_campaign=newbern

## Deploy
- Netlify: drag folder, set 404 to /404.html
- Vercel: import repo, framework = Other
- Cloudflare Pages: upload, add _headers

Footer shows: © 2026 Dylan Grow as requested.
