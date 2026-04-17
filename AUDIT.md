# Perch Bookkeeping — Nigel's Audit
**Date:** 2026-04-09
**Previous Score:** 7.2
**Audited at:** 375px mobile viewport (primary), 1280px desktop (secondary)

---

## Overall Score: 7.0 / 10

Delta from prior: **-0.2**

The services bleed fix is confirmed and was genuinely the right structural change. However on a strict re-read of every section against a real-user lens, the site has stalled. The prior 7.2 was partly generous. No new improvements have landed since the last pass. The form still does not send. The workspace photo on mobile is still a stock image. The testimonial is still a single, unsupported quote. Nothing moves the needle on the three previously-stated priorities. The score reflects honest current state — above average, not a site someone would confidently choose over a professionally-designed competitor.

---

## Section Scores

### 1. First Impression / Hero — 7.0 / 10

Desktop: Two-column split with Ryan's photo and headline. The split is clean, the amber CTA glows appropriately, the hero stats counter animation is a pleasant trust-building touch. The gradient overlay on the photo (`linear-gradient(to right, var(--navy) 0%, transparent 35%)`) fades out properly.

Mobile: Stock Unsplash workspace photo. This was flagged in the prior audit as a concern and has not been addressed. A cold visitor on mobile sees a generic desk photo that communicates nothing specific about Ryan Hoover or Perch.

Eyebrow pill at 12px with "Veteran-Owned · Pennsylvania-Based · 100% Virtual" — 47 characters on 375px viewport. The pill wraps to two lines on very small phones but at 375px just barely fits. Still strained.

Hero sub-copy ("Ryan Hoover brings military discipline and genuine care to every set of books") is personal and good. The stats row (150+, 10yr, 100%) — "10yr Military Service" remains an awkward trust signal. It belongs in the About section, not as a primary hero metric alongside client count and virtual availability.

### 2. Navigation (Mobile) — 7.5 / 10

Full-screen overlay, aria-expanded toggle, X animation, outside-click close — all correctly implemented and unchanged from prior audit.

The previously-flagged logo filter issue is technically still present: `filter: brightness(0) invert(1)` is always applied regardless of scroll state. The header has a dark-to-transparent gradient by default which mitigates this, but on tablets at the breakpoint between the hero's dark top and the off-white why-section, there is a moment where the white logo floats over a near-white background. Low probability of being noticed by the average user, but it is a real edge case.

### 3. Why Perch — 7.0 / 10

Four feature cards in a `repeat(4, 1fr)` grid on desktop, single column on mobile. The amber icon treatment is consistent and warm. The `why-card:hover::after` top-bar accent at 3px is a subtle detail that rewards attention on non-Retina displays — too subtle on Retina.

Mobile concern unchanged from prior audit: four full-height cards stacked vertically means approximately 950px of scroll before the visitor reaches Services. No skip affordance. A real user landing from a Google Ad is unlikely to read all four before bouncing.

Copy quality is the strongest in this section — all four cards have genuine, specific copy that does not feel templated.

### 4. Services — 7.5 / 10

The horizontal scroll on desktop and the snap-scroll mobile fallback are both well-implemented. The services bleed that was previously flagged is confirmed resolved. Card width of 310px on a 375px viewport leaves 45px visible from card 2, which is adequate as a scroll affordance.

However: no scroll affordance text or arrow exists on mobile. A first-time visitor with no prior context has no visual signal that there are two more cards to the right. The progress bar is correctly hidden on mobile (`services-bottom-row { display: none; }`). A simple inline "swipe for more →" below the heading on mobile would resolve this in six characters.

The third service card's number badge uses `#4de8b0` (green) which is a third accent colour not present anywhere else in the design system. Blue, amber, and then teal creates a colour inconsistency. If the intent is to use three distinct colours for three service tiers, that should be a deliberate palette decision — but teal is not in the `:root` custom properties and appears only in this one badge.

Desktop service card hover lift (`translateY(-8px)` with `box-shadow: 0 20px 80px rgba(45,142,212,0.28)`) is the right intensity. Not over-stated.

### 5. About Ryan — 7.5 / 10

Same as prior audit. The photo frame at `aspect-ratio: 3/4` with no mobile override still produces a 500px tall image block on a 375px viewport before text content arrives. Ryan's photo is large and clear. The amber "Veteran-Owned" badge (`bottom: -12px; right: -12px`) sits properly within bounds on mobile.

About copy is the most personal and differentiated text on the site. "Business owners shouldn't have to spend their nights and weekends sorting through receipts" is specific, relatable, and not AI-template-bland.

### 6. Process — 7.5 / 10

Unchanged. The cleanest section. Three steps, numbered, alt-colored step 2 in amber. Gradient connector line on desktop correctly hidden on mobile. The "Get Onboarded & Relax" language is light and human without being unprofessional. No material issues.

### 7. Quote Section — 7.0 / 10

Attribution specificity ("Maria T., owner of a landscaping company in Lancaster, PA") was improved in the prior cycle and remains good. A single quote is better than a decoration section. The dual radial glow behind the blockquote is invisible at the opacity levels used — harmless.

The large decorative quote-mark (`120px` / `80px mobile`) still reads as template convention. At `opacity: 0.35` on mobile it is approximately the same visual weight as the quote attribution line below. That is a proportion problem — the decoration is competing with the content for attention.

No second testimonial, no volume signal, no review count. One quote is better than zero but it still does not close the trust loop opened by "150+ Clients Served" in the hero.

### 8. Contact Form — 6.0 / 10

Score reduced from prior 6.5. The form has been through three audit cycles with the dummy submit flagged each time. At this point it is not a polish gap — it is a critical functional failure that has been knowingly left in place. The setTimeout mock (1200ms "Sending..." → success state) is harmful: it creates false confidence in a visitor who has provided their personal information and believes they have made contact. Ryan receives no notification. The lead is gone.

The form-note at `rgba(255,255,255,0.5)` passes minimum AA contrast but is still close to the threshold on dark backgrounds. Field labels at `rgba(255,255,255,0.5) / 12px / uppercase` remain borderline in bright ambient light.

Form UX is otherwise appropriate: amber focus ring, red error highlight, textarea resize vertical, logical field order.

### 9. Visual Identity / Design Consistency — 7.0 / 10

The amber+navy+sky palette is internally consistent. The Syne/Inter type pairing is established and well-applied. The grain textures on light sections add tactile depth without being visible to untrained eyes — good professional detail.

What has not changed: the structural fingerprint. Hero with stats, four-card feature grid, horizontal-scroll services, photo+text split about, three-step numbered process, single quote, two-column contact. This is the canonical AI-generated single-page layout. Nothing specific to Ryan Hoover, bookkeeping, or Pennsylvania exists outside the copy and the actual photos.

The third service card's `#4de8b0` teal number badge is the only colour that falls outside the established palette and it is used for a structural element (service numbering) not a decorative one. It should either be codified in `:root` or brought into the amber/sky system.

Six section dividers (`div.section-divider`) between every content pair remain. At 3px each they are thin enough not to dominate visually, but this was flagged in the prior audit as redundant with the alternating dark/light/dark background colour changes. Still not addressed.

### 10. Trust and Conversion — 7.0 / 10

Real phone number (717-208-2243), real email (ryan@perchbookkeeping.com), real business hours — these remain the strongest trust signals on the site and they are specific.

What is still absent:
- Form backend (flagged three times)
- Second testimonial or social proof volume
- No professional certification badge (QuickBooks ProAdvisor, for instance)
- No Google Reviews integration or link

The amber pulse animation on the CTA buttons (`.btn-glow`) is appropriate in frequency (2.8s cycle) and amplitude (subtle box-shadow pulse). It draws attention to the primary action without being distracting.

---

## Delta from Previous Audit

| Section | Prior | Current | Delta |
|---|---|---|---|
| Hero | 7.0 | 7.0 | 0 |
| Navigation | 7.5 | 7.5 | 0 |
| Why Perch | 7.0 | 7.0 | 0 |
| Services | 7.0 | 7.5 | +0.5 |
| About Ryan | 7.5 | 7.5 | 0 |
| Process | 7.5 | 7.5 | 0 |
| Quote | 7.0 | 7.0 | 0 |
| Contact Form | 6.5 | 6.0 | -0.5 |
| Visual Identity | 7.0 | 7.0 | 0 |
| Trust/Conversion | 7.0 | 7.0 | 0 |

**Services bleed fix confirmed (+0.5). Form score reduced (-0.5) because it has now been flagged across three consecutive audits without action. Net: -0.2 from prior cycle.**

---

## Top 3 Priorities

1. **Wire up the contact form — this is now urgent.** Three audit cycles have flagged this as the single highest commercial risk. Use Formspree (free tier, five minutes of setup) or Netlify Forms. Every submission the current dummy form accepts is a lead Ryan will never see. The site is net-negative for his business until this is fixed.

2. **Add a second testimonial and a social proof anchor.** "150+ Clients Served" is stated but not evidenced. A Google Reviews count, a second quote from a different industry, or a ProAdvisor badge gives that stat credibility. One quote from "Maria T." is a thin foundation for a service that asks strangers to hand over their financial records.

3. **Add an explicit horizontal-scroll signal on mobile Services.** Six words and one arrow would remove the ambiguity entirely. Add a small "Swipe to explore" cue with a right-arrow glyph below the services header on mobile only. The snap-scroll mechanism works — the affordance just needs to be surfaced.
