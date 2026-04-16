# Perch Bookkeeping — Nigel's Audit
**Date:** 2026-04-09
**Previous Score:** 6.8
**Audited at:** 375px mobile viewport (primary), 1280px desktop (secondary)

---

## Overall Score: 7.2 / 10

A meaningful step forward from 6.8. The amber palette integration is cohesive rather than tacked-on, the mobile hero redesign is structurally sound, and the services section now degrades gracefully on mobile (snap-scroll, `transform: none !important`). Several issues from the prior audit have been genuinely resolved. What holds this back from 7.5 and above: the site still reads as a competent AI-generated template rather than a distinct identity for Ryan Hoover's specific business, the form remains a lead-killing dummy, and some execution details at the detail level still need tightening.

---

## Section Scores

### 1. First Impression / Hero — 7.0 / 10
The workspace photo background on mobile (Unsplash `photo-1454165804606-c3d57bc86b40`) is a practical improvement over relying on Ryan's headshot. Content now stacks from the bottom — headline, sub, CTAs, stats — which is the right reading order for a high-stakes hero.

What is working:
- The gradient overlay (`rgba(7,15,28,0.35)` to `0.98`) is well-calibrated: the photo is visible at the top without compromising text legibility.
- Content-from-bottom layout prevents the eyebrow pill crowding the top nav area.
- Full-width amber CTA is prominent and immediately tappable.

Remaining concerns:
- The eyebrow pill text at `font-size: 10px` and `letter-spacing: 0.08em` on a 375px viewport is genuinely strained. "Veteran-Owned · Pennsylvania-Based · 100% Virtual" is 45 characters; at 10px the middle separator dots read as noise. Consider two lines or just "Veteran-Owned · 100% Virtual".
- The workspace background photo is entirely generic — it communicates "professional office" but nothing about bookkeeping, Ryan, or Pennsylvania. The previous build's intent (Ryan's face) was personally differentiated. This replaces identity with aesthetics.
- Stats row at the bottom: "10yr Military Service" is still an awkward stat in a bookkeeping context. A prospect visiting for the first time reads "150+ Clients Served" and "100% Virtual" as useful. "10yr Military Service" reads as a resume detail, not a trust signal for someone who needs their receipts sorted.

### 2. Navigation (Mobile) — 7.5 / 10
Resolves prior issues. Full-screen overlay is clean, centered links at `1.2rem` with 52px min-height are proper. The `aria-expanded` toggle, X animation, and outside-click close are all correctly implemented.

One remaining technical concern: the nav-logo has `filter: brightness(0) invert(1)` permanently applied — meaning the white logo sits against the transparent (pre-scroll) header. At page top this is fine against the dark hero. But the `scrolled` class only applies at `scrollY > 20`. On a slow 3G device or if the scroll event fires slightly late, there is a 1–2 frame flash where the white logo is invisible against the white background sections as the user scrolls from the hero into the `#f7f5f2` why-section. This was flagged in the prior audit and has not been fixed. It requires setting a fallback background on `.site-header` when NOT scrolled (e.g., a dark-to-transparent gradient at the very top), or keeping the header dark by default.

### 3. Why Perch — 7.0 / 10
The amber icon boxes replacing sky-blue is a genuine visual improvement. The amber-glow icon hover (`box-shadow: 0 0 24px rgba(232,146,58,0.35)`) is tasteful and adds warmth without looking garish. "Always Responsive" replacing "Feels Like Family" is strictly better copy.

However: four cards in a single-column stack on mobile means a prospect on a 375px phone scrolls through all four before reaching Services. At 375px each card is roughly 220–240px tall. Four cards = approximately 960–1000px of scroll. That is a long single-column section. No affordance exists to skip it. Consider either limiting to three cards on mobile, or adding a "See all" toggle.

The amber top-bar (`height: 3px; background: linear-gradient(to right, var(--amber), var(--amber-soft))`) on hover is a nice detail but at 3px is nearly invisible on some non-Retina displays.

### 4. Services — 7.0 / 10
This is the section with the largest delta from the prior audit (5.5 to 7.0). The mobile degradation to snap-scroll is correct and well-executed:
- `scroll-snap-type: x mandatory` on the wrapper
- `scroll-snap-align: start` on each card
- `transform: none !important` overriding the JS translateX
- JS correctly bails out at `window.innerWidth <= 768`

What remains imperfect:
- Card width of `310px` on a `375px` viewport leaves 65px of visible gutter, of which 20px is left padding. The second card peeks approximately 25–30px, which is marginal as a scroll affordance. A width of `290px` would give the second card a more visible 45px peek. Not broken, but close.
- No scroll affordance label ("swipe" / "→") exists. The progress bar is hidden on mobile. A user landing cold has no signal that horizontal content exists.
- The JS `initServicesScroll` re-fires on `resize` and `load` but measures `getBoundingClientRect` at call time. If fonts load after the measurement, `sectionTop` may be slightly off on desktop. Low priority but worth noting.

### 5. About Ryan — 7.5 / 10
Solid improvement. The badge overflow fix (`right: 4px; bottom: -12px` at mobile) resolves the prior layout bleed. The directional reveal is correctly converted to a vertical fade on mobile (`reveal-left` overridden at 768px breakpoint). Copy is genuine and readable. About-content `text-align: center` on mobile with centered CTAs is handled properly.

One note: the `about-photo-frame` has `aspect-ratio: 3/4` on desktop but no mobile aspect-ratio override. At `max-width: 100%` on a 375px viewport the photo frame becomes 375px wide at a 3:4 ratio, resulting in a 500px tall photo. That is a significant amount of screen real estate before the text content. Worth constraining with `max-height: 360px` at mobile.

### 6. Process — 7.5 / 10
Unchanged from prior audit. Continues to be the cleanest, best-written section. Single-column mobile, centered, alt-colored step-2 in amber — all correct. Step-2 amber number circle (`background: var(--amber)`) adds a pleasant rhythm to the otherwise blue-dominant section. The gradient connector line (`::before` pseudo) hidden correctly on mobile.

### 7. Quote Section — 7.0 / 10 (up from 6.0)
Prior audit's top recommendation was addressed: attribution changed to "Maria T., owner of a landscaping company in Lancaster, PA" — specific, credible, and local. This is a meaningful improvement. The quote itself remains strong copy.

The `quote-mark` at `font-size: 120px` (80px on mobile) is still decorative excess. At `opacity: 0.35` it is not a readability problem, but at 80px on a 375px viewport it occupies roughly 15% of the screen before the quote text arrives. It is a visual convention that signals "template" to design-literate visitors.

The dual radial glow (`rgba(232,146,58,0.08)` and `rgba(45,142,212,0.08)`) behind the quote is so subtle as to be invisible in most viewing conditions, which is fine — it does not distract.

### 8. Contact Form — 6.5 / 10
No change from prior audit. The form still does not send. This is the most commercially damaging issue on the entire site. A landscaping company owner in Lancaster fills this form out at 9pm because they finally got around to it — they get a success message, Ryan gets nothing, and the lead is permanently lost. This is not a polish item; it is a functional gap that makes the site harmful to Ryan's business rather than helpful.

Form-field amber focus ring (`border-color: var(--amber); box-shadow: 0 0 0 3px rgba(232,146,58,0.12)`) is a nice consistency touch. The form-note text at `rgba(255,255,255,0.3)` is borderline unreadable — at least `0.45` on a dark background.

The `form-title` at `1.4rem / Syne` is well-sized and readable. The field labels at `12px / rgba(255,255,255,0.5) / uppercase` are marginally low contrast — contrast ratio approximately 4.2:1 against `rgba(255,255,255,0.06)` background, which passes AA (4.5:1 is the threshold for small text) only narrowly. On a real device in sunlight this will fail.

### 9. Visual Identity / Design Consistency — 7.0 / 10
The amber integration has meaningfully warmed the palette. The marquee in amber (rather than navy or sky) signals energy and draws the eye. The amber accent on `why-icon` backgrounds, `process-step-2`, and CTAs creates a consistent warmth thread through the site.

What has not changed: the macro layout template fingerprint. Hero with stat row, feature grid, horizontal-scroll services, single testimonial, split contact — this is the exact same structural skeleton as hundreds of AI-generated sites. Nothing signals "this is specifically Perch, specifically Ryan, specifically Pennsylvania." The workspace background photo is a stock image. The site could, without any copy changes, represent a law firm, a marketing agency, or an IT managed services company.

The SVG wave dividers are well-executed technically. Six unique waves prevents monotony. However, six waves in a single-page site (one between every section) is visually heavy — each one is 70px of non-content, totalling 420px of pure decoration. On a site where every section change already has a colour shift (dark → light → dark), the waves double up on an existing signal. Consider removing every other wave; the alternating backgrounds communicate section changes without them.

### 10. Trust and Conversion — 7.0 / 10
Real phone, real email, real hours, specific client count, specific local attribution on the testimonial — all good. The Veteran-Owned angle is surfaced consistently without being exploitative.

Remaining gaps:
- Form does not send (flagged repeatedly — highest priority).
- No Google Reviews link, no ProAdvisor badge, no BBB.
- No pricing signal (standard for industry; fine).
- No social proof volume: one testimonial is better than zero, but a single quote from "Maria T." carries less weight than "over 150 clients served" — which is already in the hero stats. A second testimonial or a Google review count would close the loop.

---

## Delta from Previous Audit

| Section | Prior | Current | Delta |
|---|---|---|---|
| Hero | 6.5 | 7.0 | +0.5 |
| Navigation | 7.0 | 7.5 | +0.5 |
| Why Perch | 6.5 | 7.0 | +0.5 |
| Services | 5.5 | 7.0 | +1.5 |
| About Ryan | 7.0 | 7.5 | +0.5 |
| Process | 7.5 | 7.5 | 0 |
| Quote | 6.0 | 7.0 | +1.0 |
| Contact Form | 7.0 | 6.5 | -0.5 |
| Visual Identity | 6.0 | 7.0 | +1.0 |
| Trust/Conversion | 6.5 | 7.0 | +0.5 |

---

## Top 3 Priorities

1. **Wire up the contact form.** Use Formspree, Netlify Forms, or any real backend. This is a hard commercial requirement. Every lead currently submitted is permanently lost. The site is actively damaging Ryan's business until this is fixed.

2. **Give the site a specific visual identity.** Replace the generic Unsplash workspace photo with something that says Perch or Pennsylvania. Add one differentiating design detail that does not appear in any other bookkeeping or fintech site. The amber palette is warm but the layout template is indistinguishable from a hundred competitors.

3. **Reduce the six SVG wave dividers to three.** Six consecutive waves across one page is visual overload and adds 420px of non-content scroll. Keep waves at the three most important transitions (hero-to-marquee, services-to-about, quote-to-contact) and let the alternating background colours do the work elsewhere.
