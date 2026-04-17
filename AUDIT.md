# Perch Bookkeeping — Nigel's Audit
**Date:** 2026-04-09
**Previous Score:** 7.0
**Audited at:** 375px mobile viewport (primary), 1280px desktop (secondary)

---

## Overall Score: 7.5 / 10

Delta from prior: **+0.5**

The changes since the last audit are genuine and material. Four previously-flagged issues are now resolved or substantially improved: the contact form is wired to Formspree and submits real data; the hero stat has been corrected from the awkward "10yr Military Service" to "98% Client Retention" — a meaningful conversion signal; the testimonial section has been expanded to two attributed cards with a social proof bar (ProAdvisor badge, 5-star rating, 150+ clients); and the colour inconsistency in the third service card number badge has been brought into the sky-blue system. These are not cosmetic adjustments — they directly address the three highest-priority items from the prior cycle. The score reflects honest improvement.

What keeps this below 8.0: the mobile hero is still a generic Unsplash workspace photo rather than Ryan himself; the Why Perch grid is still 950px of scroll depth on mobile with no skip; and the design archetype is still identifiably AI-generated single-page-app. Real differentiation from a competitor would require at least one of those three to close.

---

## Section Scores

### 1. First Impression / Hero — 7.5 / 10

Desktop: The two-column split reads well. The scanline animation sweeping across the hero is a considered detail — 9-second cycle, subtle enough to not register consciously on most users but it adds life to what would otherwise be a static photo panel. The three orbs parallax correctly with scroll. The eyebrow glow pulse at 4s is appropriate.

The "98% Client Retention" stat is a strong correction. It is a specific, believable number with direct conversion weight. "150+ Clients Served" and "100% Virtual & Secure" alongside it form a coherent trio.

Mobile: The Unsplash generic workspace photo remains. This was flagged in audits one, two, and three. At 375px a user sees a desk that could belong to any of ten thousand SaaS landing pages. Ryan's photo exists — it is used on desktop and in About. Using it as the mobile hero background (blurred, darkened with the existing gradient overlay) would take one line of CSS and eliminate the most significant trust gap on mobile. The current implementation is not harmful but it is a missed opportunity with an unusually low fix cost.

The hero eyebrow text is now "Veteran-Owned · 100% Virtual" — this is tighter and better than the prior three-part string. No longer straining on 375px.

### 2. Navigation (Mobile) — 7.5 / 10

Unchanged and correctly implemented. The full-screen overlay, aria-expanded toggle, X animation, and outside-click close all work as expected. The nav CTA pulse animation at 3s is now present — it is at the right intensity. The `.nav-cta` animation was not in prior audits and is a welcome addition.

The logo filter issue (`brightness(0) invert(1)` always applied) persists. On a white or near-white section with a transparent nav background, the white logo could float on white. The dark gradient on the nav default mitigates this in practice, but it is still a brittle implementation that would break on any light-coloured hero redesign.

### 3. Why Perch — 7.0 / 10

Cards carry the same quality copy as prior audits. The hover data-grid overlay (`.why-card::before`) is subtle enough to work — it reveals at `opacity: 1` on hover but at `rgba(45,142,212,0.025)` line weight it is virtually invisible to all users. It registers as polish to developers; it registers as nothing to users. Harmless.

The fundamental mobile problem is unchanged: four full-width cards stacked vertically on a single column means a visitor must scroll approximately 950px to exit the Why section. No section jump, no collapsed accordion, no "Read more" pattern. A small-business owner who found this via a Google Ad for bookkeeping in Pennsylvania is unlikely to scroll through four cards before either converting or bouncing. This is the single highest structural risk on the page after the form fix.

The amber icon treatment, the `translateY(-10px)` hover lift, and the border + shadow interaction on hover are all well-calibrated.

### 4. Services — 8.0 / 10

The largest single-section improvement this cycle. The third card service number badge is now confirmed in the sky-blue system (`.service-card:nth-child(3) .service-num` uses `var(--sky-bright)` and `rgba(45,142,212,0.14)` background), consistent with card one. Card two uses amber. Card three uses sky. This is a deliberate and now-coherent three-tier numbering palette.

The swipe hint is present and visible on mobile (`services-swipe-hint` with `hint-pulse` animation at 45% opacity). This resolves the prior audit's highest-priority UX gap for the services section.

The scroll progress bar (amber-to-sky gradient with box-shadow glow) on desktop is the strongest single detail in the entire site. It is functional, it communicates state, and the glow at `0 0 18px rgba(232,146,58,0.85)` is visible without being garish.

Service card width at 290px on 375px viewport leaves approximately 65px visible from the second card. This is a correct affordance. The `scroll-snap-align: start` ensures a clean snap behaviour.

The only remaining issue: the horizontal sticky scroll on desktop relies on `280vh` section height. On ultrawide viewports (>1400px) the cards may fully traverse within less scroll distance than expected. This is an edge case for a small bookkeeping business with primarily mobile and standard laptop users, but it is worth noting.

### 5. About Ryan — 7.5 / 10

The copy quality in this section remains the best on the site. "Business owners shouldn't have to spend their nights and weekends sorting through receipts" is specific and relatable.

The mobile photo frame cap (`max-height: 360px`) is correctly applied and prevents the prior overflow issue on 375px. The `aspect-ratio: 3/4` with `object-fit: cover` and `object-position: center top` correctly prioritises Ryan's face.

The amber "Veteran-Owned" badge sits at `right: 4px; bottom: -12px` on mobile — tight but not clipped. Desktop badge at `right: -18px; bottom: -18px` works against the rounded photo frame.

No new issues. No regressions.

### 6. Process — 7.5 / 10

Unchanged and clean. Three steps, alternating sky/amber/sky, the gradient connector hidden on mobile, "Get Onboarded & Relax" copy light without being unprofessional.

The step-pulse and step-pulse-amber animations at 3.4s cycle are on the cusp of "too many animations simultaneously" when viewed alongside the orb floats, the scanline, the dot pulse, the eyebrow glow, the CTA glow, and the nav CTA pulse. On desktop all of these run concurrently. Each is individually justified; the aggregate animation load is high. Users with motion sensitivity below the `prefers-reduced-motion` threshold may find the page busy. This is not scored against the site in this audit per instructions, but it is noted.

### 7. Testimonials / Quote Section — 7.5 / 10

The upgrade from one quote to a two-card grid is the second-most impactful change this cycle. The social proof bar (ProAdvisor badge, five-star icons, 150+ clients) above the testimonials provides the volume signal that was missing.

Maria T. and James K. are both attributed with industry and city — landscaping, Lancaster PA; HVAC, York PA. Both are local Pennsylvania businesses, which is authentic for a Pennsylvania-based bookkeeper. Both quotes are specific rather than generic ("two years of messy books in a matter of weeks" is a real claim).

The `quote-mark-sm` at 56px / `opacity: 0.28` amber is well-proportioned against the card size. This was improved from the prior 120px oversized decoration.

The quote card hover (amber border + box-shadow) is a nice reinforcement that these are interactive elements, though the cards are not actually interactive beyond hover.

Minor remaining issue: the social proof bar wraps to a vertical stack on mobile (`flex-direction: column`). At 375px the ProAdvisor badge reads fine but "QuickBooks ProAdvisor Certified" at 13px is 26 characters — it may wrap on very small phones. The `white-space: nowrap` on `.proof-badge` means the entire badge line is one non-wrapping unit, which is correct.

### 8. Contact Form — 7.5 / 10

The prior 6.0 was the most urgent score on the site and the change is the most consequential fix across four audit cycles. The form now posts to `https://formspree.io/f/xkgjrkge` via fetch with `Accept: application/json`. The success state (`#16a34a` green button with "Request Sent! ✓") and the error handling (red button with "Error — Try Again") are both correctly implemented. Ryan will now receive submissions.

The client-side validation correctly highlights empty required fields in `#ef4444` red and focuses the first error. The `novalidate` attribute disables browser-native validation popups in favour of the custom inline treatment — consistent and intentional.

Field labels at `rgba(255,255,255,0.5) / 12px / uppercase` are borderline on contrast against the dark form background. They pass WCAG AA for large text by scale equivalence, but 12px uppercase with 50% opacity white is at the limit in ambient light conditions. Raising to `rgba(255,255,255,0.65)` would provide meaningful improvement without changing the visual character.

The `form-note` ("We'll be in touch within one business day.") at `rgba(255,255,255,0.5) / 12px` is the same concern — marginal but within passing range.

### 9. Visual Identity / Design Consistency — 7.0 / 10

Amber+navy+sky palette is internally consistent. The Syne/Inter pairing is established. The scroll journey bar at the top (3px, amber-to-sky gradient) is a small but considered addition.

The teal colour issue (`#4de8b0`) has been resolved — confirmed. All three service number badges now use palette colours.

The structural fingerprint remains: hero stats, four-card grid, horizontal-scroll services, photo+text about, three-step process, testimonials, two-column contact. This is the standard AI-generated single-page template. Nothing about the visual identity is uniquely Perch's — a competitor could deploy the same layout with different copy. At 7.0 this is above average but it is not distinctive. For a local service business competing on trust and personality, a more specific visual identity would have compounding benefits on conversion.

Three section dividers remain (marquee→why, services→about, quote→contact). The alternating dark/light/dark backgrounds accomplish the same visual separation. The dividers are redundant but at 3px and 0.4 opacity they are not actively harmful.

### 10. Trust and Conversion — 7.5 / 10

The form is now functional. The testimonial section now provides two data points with industry specificity. The social proof bar adds a third credential layer (ProAdvisor certification). The "98% Client Retention" hero stat is a strong, specific, credible number.

What remains:
- No Google Reviews link or count. A "See our Google Reviews" link would take 60 seconds to add and would provide third-party verification that the site currently cannot offer.
- No pricing signals. Small business owners deciding between bookkeepers often eliminate candidates based on visible pricing. "Custom proposals" is correct positioning but adding a "Starting from $X/month" anchor would reduce friction on the consultation decision.
- The email CTA in About ("Email Ryan") opens `mailto:ryan@perchbookkeeping.com` — this is correct and personal.

---

## Delta from Previous Audit

| Section | Prior | Current | Delta |
|---|---|---|---|
| Hero | 7.0 | 7.5 | +0.5 |
| Navigation | 7.5 | 7.5 | 0 |
| Why Perch | 7.0 | 7.0 | 0 |
| Services | 7.5 | 8.0 | +0.5 |
| About Ryan | 7.5 | 7.5 | 0 |
| Process | 7.5 | 7.5 | 0 |
| Testimonials | 7.0 | 7.5 | +0.5 |
| Contact Form | 6.0 | 7.5 | +1.5 |
| Visual Identity | 7.0 | 7.0 | 0 |
| Trust/Conversion | 7.0 | 7.5 | +0.5 |

**Net gain: +0.5 overall. Contact form fix accounts for +1.5 on that section alone — the single most impactful change across four audit cycles. Dual testimonials and social proof bar provide a genuine +0.5. Service palette consistency and swipe hint combine for +0.5 on Services. Hero stat correction lifts hero +0.5.**

---

## Top 3 Priorities

1. **Replace the mobile hero background photo with Ryan's actual photo.** The Unsplash generic desk image has been flagged across four consecutive audits. Ryan's photo is already loaded on the desktop hero and in the About section — the asset exists. Change one CSS line (`background-image` in the `.hero::before` mobile media query) to the Perch photo URL already in use. A real face builds trust. A stock desk does not.

2. **Address the Why Perch mobile scroll depth.** Four full-height cards stacked on mobile = 950px of scroll before the visitor reaches Services. Add a "More reasons →" collapsed section or convert the four cards to a two-card visible + two-card reveal pattern on mobile. Alternatively, reduce Why Perch to three cards on mobile only (drop one) — the copy quality would allow this without information loss.

3. **Add a Google Reviews anchor.** The site now has two testimonials and a social proof bar. The missing link is third-party verification. Even a single line — "Read our Google Reviews →" with an external link icon — closes the credibility loop. This is approximately 10 minutes of work and zero design change required.
