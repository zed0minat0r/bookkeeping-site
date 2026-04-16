# Perch Bookkeeping — Nigel's Audit
**Date:** 2026-04-09
**Audited at:** 375px mobile viewport
**Build status:** New build

---

## Overall Score: 6.8 / 10

A genuinely competent first build. The design language is consistent, the copy is strong, and the mobile structure is mostly sound. However the aesthetic skews too far toward fintech/SaaS and not enough toward the warm, personal feel a small-business owner expects from a bookkeeper. Several mobile layout details need tightening before this earns trust from a real prospect landing cold.

---

## Section Scores

### 1. First Impression / Hero — 6.5 / 10
The mobile hero is a bold concept: Ryan's photo fills the background, content floats over a navy-to-dark gradient. In principle this is strong. In practice at 375px:

- The eyebrow pill ("Veteran-Owned · Pennsylvania-Based · 100% Virtual") is forced into `white-space: nowrap` at 10px and clips or strains readability on very small screens. `text-overflow: ellipsis` masks the problem rather than solving it.
- The headline ("Your books, finally under control.") is excellent copy and scans well at mobile sizes.
- The CTA stack (two full-width buttons) is well-executed — good tap targets, clear hierarchy.
- The three stat counters at the bottom (150+ clients, 10yr service, 100% virtual) animate nicely but feel out of place at the foot of a hero that is already visually dense. The "10yr Military Service" label is an awkward read for someone who came looking for a bookkeeper — it signals the human story but the phrasing is terse.
- The background photo gradient works but the darkened photo loses Ryan's face almost entirely on older OLED phones — defeating the purpose of putting a human face front-and-centre.

### 2. Navigation (Mobile) — 7.0 / 10
- Hamburger is correctly sized, aria-labeled, and animates cleanly into an X.
- Full-screen drawer is readable: 16px font, white on near-black, good tap targets.
- The logo (inverted white on the navy hero) is correct but disappears on scroll when the header hasn't yet turned dark — there is a brief moment scrolling out of the hero where the white logo sits against a white background before the `scrolled` class kicks in. At 375px this is a flash users will see.
- "Free Consult" pill CTA in the drawer is centered and prominent. Good.

### 3. Content Sections — Why Perch — 6.5 / 10
- Single-column card stack on mobile is appropriate.
- Cards are `max-width: 440px; margin: 0 auto;` but at 375px with 24px side padding there is no centering issue.
- The icon squares (52px, rounded, sky-blue tint) are tasteful and not overworked.
- "Feels Like Family" is the weakest card heading — vague for a B2B service. A prospect scanning quickly may read it as folksy and skip.
- Body text at 14px / 1.7 line-height on `#526378` is marginally low contrast on the `#f7faff` card background. Passes WCAG AA just barely; worth testing on a physical device.

### 4. Services (Horizontal Scroll) — 5.5 / 10
This is the most problematic section at mobile. The horizontal scroll-jacking mechanic — 300vh of vertical scroll driving a translateX — is a well-known desktop pattern that consistently breaks trust on mobile:

- At 375px, users encounter a section that does not behave like any section before it. There is no affordance (no "swipe" label, no visible second card peeking) to indicate horizontal content exists.
- The progress bar at the bottom is 2px tall and nearly invisible.
- Service cards at 300px width at 375px viewport leave 75px of visible gutter — the second card peeks barely 15–20px before the right edge, which is not enough visual signal.
- The scroll-jacking requires the user to scroll the entire 300vh distance before the page continues, which on mobile feels like the page is frozen.
- **Recommendation:** On mobile, abandon the sticky scroll-jacking entirely and render the three service cards as a simple swipeable snap-carousel or a stacked layout. The JS already degrades for `prefers-reduced-motion` — a similar path should be taken for narrow viewports.

### 5. About Ryan — 7.0 / 10
- Photo-plus-text stacked layout works well at 375px.
- The "Veteran-Owned" badge positioned `bottom: -18px; right: -18px` clips against the page edge at 375px. The badge is absolutely positioned relative to `.about-photo-col` which has no overflow:hidden, so it can escape, but right: -18px on a 375px viewport means it bleeds 18px outside the photo frame. At minimum it should be `right: 0` on mobile.
- Copy is warm and credible — the three paragraphs tell a genuine story without over-claiming.
- Email Ryan and phone number as paired CTAs is good. Both links are properly tappable.

### 6. Process — 7.5 / 10
- Three steps in a single-column stack on mobile is clean.
- The connector line (`::before` pseudo-element) correctly hidden on mobile.
- Step numbers are large, blue circles — immediately scannable.
- Copy under each step is crisp and benefit-led. This is the best-written section.
- CTA at the bottom duplicates the hero CTA — consistent and low-friction.

### 7. Quote Section — 6.0 / 10
- "Small business owner, Perch client" is an anonymous attribution. Real users are rightly skeptical of unattributed quotes. It reads as filler.
- The quote text itself ("I used to dread opening QuickBooks...") is specific enough to feel real, which partially rescues it.
- The giant `"` at 80px on mobile dominates the visual before the quote arrives — it is more decorative than useful at this size.
- The navy-mid background with radial glow is tasteful, not overwrought.

### 8. Contact Form — 7.0 / 10
- Form fields are full-width and well-sized (min-height: 44px) — good touch targets.
- Two-column first/last name row correctly collapses to single column on mobile.
- Label typography (12px uppercase, 50% white opacity) is somewhat hard to read in ambient light.
- The form simulates a submission (setTimeout 1200ms then success) but does not actually send data. For a real business, this is a significant gap — any lead who fills this out is lost. The form needs a real backend (Formspree, Netlify Forms, or similar) before launch.
- "We'll be in touch within one business day" is a good micro-copy promise.

### 9. Visual Identity / Design Consistency — 6.0 / 10
- The deep navy + electric blue palette is professional but heavily associated with fintech, SaaS, and crypto. For a bookkeeping firm targeting local small businesses (plumbers, landscapers, boutique shops), this creates a subtle tone mismatch. The prospect may feel it is built for a tech company, not for them.
- Typography pairing (Syne headings + Inter body) is clean and readable. The italic accent on section headings (e.g., "finally", "clean books") is a nice touch.
- The glow-orb background elements, pulsing dot, and scroll-line animation add atmosphere without being distracting — these are handled with restraint.
- The site looks AI-generated in its layout conventions: hero with stat bar, 4-up feature grid, horizontal scroll services, testimonial strip. Each element is well-executed but the combination is a Claude/Framer template fingerprint. Nothing signals "this is specifically Perch Bookkeeping."

### 10. Trust & Conversion — 6.5 / 10
- Real phone number and email are present — high trust signal.
- Business hours are listed — good.
- No testimonials with names, no Google reviews link, no BBB or ProAdvisor badge.
- The Veteran-Owned angle is surfaced in four places (eyebrow, stats, badge, about) — appropriate repetition without being exploitative.
- "150+ Clients Served" is a credible specific number. Believable at this stage of business.
- No pricing information, which is standard for the industry — fine.
- The form not sending is a hard launch blocker.

---

## Top 5 Recommendations

1. **Fix the Services section on mobile.** The scroll-jacking 300vh mechanic at 375px gives users the sensation that the page is frozen. Replace with a CSS `scroll-snap` swipeable row or a fully stacked layout on viewports under 768px. This is the single largest UX failure on the site.

2. **Wire up the contact form to a real backend before launch.** Every lead submitted is currently silently discarded. Use Formspree (free tier) or Netlify Forms. This takes under 30 minutes and is a hard business requirement, not a polish item.

3. **Fix the About section badge overflow on mobile.** `right: -18px` on `.about-badge` causes it to escape the layout boundary at 375px. Change to `right: 4px` and `bottom: -12px` on the `@media (max-width: 768px)` breakpoint.

4. **Rethink the palette or the supporting imagery to feel more accessible to non-tech small business owners.** The deep navy / electric blue SaaS aesthetic is competent but generic for this client profile. Even a supporting texture, warmer accent, or a more local/human detail (Pennsylvania imagery, handshake, desk) would differentiate. The hero photo of Ryan is the warmest element — lean into it more, not less.

5. **Replace the anonymous quote with a real attributed testimonial or remove it.** "Small business owner, Perch client" signals placeholder copy to a discerning visitor. A real first name, business type, and location (e.g., "Jane D., owner of a landscaping company in Lancaster, PA") increases conversion meaningfully. If real testimonials are not yet available, remove the section entirely rather than use a generic attribution.
