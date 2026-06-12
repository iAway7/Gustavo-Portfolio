# Experience Page, Hiring Manager Review

Reviewed: `/experience` (layout in `app/experience/page.tsx`, content in `experienceEntries`)
Lens: recruiter and design manager, 15-second scan, deciding "senior or not."

---

## The 15-second test, honestly

What a recruiter actually does on this page: eyes land on the left edge of each card, which is the date column. They scan down: 2024, 2023, 2020, 2017, 2015. Then they catch the role lines: "UX/UI Designer, Co-Founder, UX/UI Designer, Web Designer, HTML Developer." Verdict formed in 10 seconds: *mid-level UX/UI designer, long tenure, nothing measurable.* They never read the paragraphs. Nobody reads paragraphs on an experience page.

The page is clean, your instinct is right. But clean and scannable are different things, and right now the scan tells the wrong story.

## 1. Information hierarchy

**What attracts attention first:** the date column. It sits at the left edge of every card, exactly where scanning starts, in the same size as the company name area. Dates are the least persuasive information you have; they currently have the best real estate.

**What is getting lost:** the role, which is the single thing recruiters scan for, is the smallest, most muted line in the meta column. And the only two facts on this page that prove seniority, that you co-founded a business and that your current product serves a $7.1M operation, are invisible: one is a small role label, the other isn't on the page at all.

**What should be emphasized:** role first, outcomes second. What should be reduced: dates, summaries, and everything before 2020.

**The flatness problem:** all five cards are identical in size and weight. Your current role and a 2015 HTML research job get exactly the same visual importance. A senior page has recency hierarchy: the present is large, the past is compact.

## 2. Readability

Each card carries a summary paragraph plus three full-sentence highlights, about 80-100 words, five times. That's a 450-word reading assignment formatted as identical gray blocks. The highlights are styled as stacked paragraphs, not scannable items, and they're nearly the same color and size as the summaries, so nothing pops.

Worse, the highlights are responsibility lists ("UX strategy, UI design, product design, and design systems", "Design systems, card sorting, A/B testing, wireframing, and prototyping"). We removed exactly this pattern from the case studies because method lists read junior; the experience page still has them. And "design systems" appears in three different entries, "UX/UI" in nearly all five. Repetition reads as padding.

## 3. Layout

**Current structure:** five equal bordered cards, two columns inside (meta left, text right). The borders create five competing boxes; the eye restarts at every card.

**Recommendation: drop the cards, use an editorial ledger.** One continuous list separated by hairline rules (the `section-rule` you already use everywhere). This reads like a beautifully typeset CV, scans like a table, and matches the Linear/Read.cv aesthetic better than boxes. Within it, use a two-tier structure:

- **Tier 1, "Now" (2 entries):** Install Pros and Emmvi, expanded. Role large, one outcome line, one metric line, compact scope tags.
- **Tier 2, "Before" (3 entries):** AgencyHub x2 and AccelOne compressed to single rows: role, company, dates, one phrase. The 2015 job earns one line, not a card. Compressing your early career is itself a seniority signal; it says the recent work is what matters.

Spacing: more air between tiers than between rows (group separation > item separation). Dates move to the right edge, right-aligned, small and muted, where metadata belongs.

## 4. Content

**Cut:** the per-card summary paragraphs (they restate the highlights), the tool lists ("Figma, ChatGPT, Codex, Lovable, Miro" belongs in a footer line, not a career highlight), the phrase "differentiates me from screen-only designers" (show it, don't claim it), and the AccelOne details.

**Rewrite responsibilities as outcomes.** One strong line each:

- **Install Pros:** "Designing the technician platform behind a network that has completed 9,163 installations and processed $7.1M+." (The page's only numbers, and they're currently missing entirely.)
- **Emmvi:** "Co-founded a growth studio. Accountable for offer, web system, and revenue, not just deliverables."
- **AgencyHub (2020-2024):** "Designed a two-sided B2B marketplace end to end and turned a fragmented platform into one product language."
- **AgencyHub (2017-2020):** "Web delivery and infrastructure: hosting, DNS, migrations. The technical base I still design with."
- **AccelOne:** "HTML implementation and web research. Where execution started."

**Role titles:** the case studies now say "Product Designer"; this page still says "UX/UI Designer" twice. Align them. The inconsistency undercuts the whole positioning effort, and the title on your own portfolio is yours to frame.

**Certifications: the hard truth.** Sixteen beginner-to-intermediate course certificates is a junior signal. Seniors don't list "Foundations of UX/UI Interface Design"; the volume reads as compensating. Collapse to one quiet line ("16 certifications in research, UX writing, and IA · Platzi") with the list behind a toggle or removed. This single change does more for senior perception than any layout fix.

## 5. Ideal hierarchy inside each entry, and why

1. **Role** (largest, strongest): it's the question the visitor is asking: "what are you?"
2. **Company** (medium, beside or under the role): context for the role.
3. **Outcome line** (body size, the only sentence): proof, not duties.
4. **Metric or scope tags** (small, scannable): evidence and keywords for the 5-second skim.
5. **Dates** (small, muted, right-aligned): necessary metadata, never the anchor.

Why: this matches the order in which a hiring decision is actually made: what are you → where → what happened because of you → when. The current card puts "when" first and "what happened" nowhere.

### Wireframe per Tier-1 entry

```
Product Designer                                    2024 - Present
Install Pros · Austin, TX

Designing the technician platform behind a network that has
completed 9,163 installations and processed $7.1M+.

[ Field operations ] [ Mobile platform ] [ Design system ]
```

### Wireframe per Tier-2 row

```
Product Designer · AgencyHub                          2020 - 2024
Designed a two-sided B2B marketplace end to end.
```

## 6. The four senior signals, scored today

- **Product thinking:** weak. Responsibilities, no decisions or outcomes. Fixed by the outcome lines.
- **Business understanding:** invisible, despite being your strongest card (co-founder + $7.1M operation). Fixed by surfacing both in Tier 1.
- **Systems thinking:** asserted ("design systems" x3) but never evidenced. One mention, attached to an outcome, is worth more than three list items.
- **Execution ability:** half-told. The infrastructure background is genuinely differentiating but currently reads as a paragraph of acronyms. One sharp line keeps the signal, loses the noise.

## Summary of the redesign direction

Ledger instead of cards. Two tiers instead of five equals. Role first, dates last. One outcome sentence per role instead of four responsibility sentences. Numbers on the page. Certifications demoted to a footnote. Total text drops from ~450 words to ~120, and every one of those 120 words works toward "senior product designer." The page becomes readable in 15 seconds because there is finally a hierarchy deciding what those 15 seconds land on.
