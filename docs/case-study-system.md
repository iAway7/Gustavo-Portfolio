# Case Study System, Strategy & Structure

Portfolio: Gustavo Polin · Product Designer
Status: Proposal (no code changes yet)

---

## 0. Diagnosis of the current system

One type (`ProjectCaseStudy`) forces all four projects through the same skeleton: `overview → contributions → context → 3 processSections → 3 selectedArtifacts → outcomes`. The consequences:

1. **A field-operations product and a marketing website read identically.** The structure flattens what makes each project interesting. Field Operations should read like a product story (constraints, decisions, system). InstallPros' website should read like a business story (audience, conversion, messaging). Right now both read like a generic "design process."
2. **The copy describes activity, not judgment.** "The work focused on clarity, task sequencing, and decision support" tells a reviewer nothing they can evaluate. Senior portfolios are read by people scanning for evidence of *decisions under constraint*, not evidence that design happened.
3. **`contributions` is a deliverables list** ("wireframing, A/B testing, prototyping"). Listing methods is the strongest junior signal on the page. Methods belong inside decisions, as evidence, never as a section.
4. **`outcomes` are unverifiable adjectives** ("clearer workflows," "stronger bridge"). An outcome with no number, proxy, or consequence is a claim, not an outcome.
5. **`selectedArtifacts` is a captioned gallery**, structurally identical to Behance. Images appear because they exist, not because they prove something.

The fix is not better copy inside the same boxes. It's two narrative architectures sharing one spine.

---

## 1. Global case study strategy

### One spine, two narratives

Every case study answers the same five questions in the same order, this is the **shared spine** that makes the portfolio feel like a coherent system (the Linear/Stripe quality: consistent rhythm, different content):

1. **What was at stake?** (business reality, not project brief)
2. **What made it hard?** (constraints, technical, organizational, human)
3. **What did I decide, and what did it cost?** (decisions + trade-offs, the heart)
4. **What shipped?** (curated proof, not exhaustive documentation)
5. **What happened, and what would I do next?** (honest outcome + reflection)

How each question gets answered differs by project **kind**:

| | Product case studies | Digital Experience case studies |
|---|---|---|
| Projects | Field Operations Platform, AgencyHub | Digital Service Experience, Emmvi |
| Narrative engine | Decisions under operational constraint | Strategy serving a business goal |
| The "user" | A worker inside a workflow | A visitor with intent and skepticism |
| Proof of seniority | Trade-offs, system thinking, engineering alignment | Conversion logic, IA, messaging, business literacy |
| Reads like | A product spec with a point of view | A strategy memo with a finished surface |

### Positioning rule

Every case study must demonstrate the user–business–technology triangle at least once, explicitly. Each section should be attributable to one of the three. If a paragraph serves none of them, cut it. This is what makes "Product Designer" credible rather than asserted.

### Voice rules (apply everywhere)

- First person, ownership verbs: "I chose X over Y because…", never "the work focused on…"
- Every claim is followed by evidence or an honest qualifier.
- Name what was rejected or cut. Showing the road not taken is the cheapest, most credible seniority signal available.
- Where there's no metric, use an honest proxy ("support questions about scheduling stopped" / "engineering adopted the pattern without a handoff doc") rather than an adjective.

---

## 2. Template A, Product case studies

*Field Operations Platform, AgencyHub*

### Section hierarchy

| # | Section | Purpose | Length |
|---|---|---|---|
| 1 | **Hero** | Title, one-line value claim (what the product does, for whom), badges, meta strip: role · timeline · platform · team shape | Compact |
| 2 | **At a glance** | 3-column TL;DR: *The challenge · My role · The outcome*. A hiring manager must get the whole story in 30 seconds here. | 3 short blocks |
| 3 | **Context** | Why this product exists as a business: who pays, what breaks when it fails, why now. For Field Ops: Starlink install operations, cost of a failed truck roll. For AgencyHub: agency operations economics, cost of fragmented tooling. | 2–3 paragraphs |
| 4 | **Users & operating conditions** | Not personas, *conditions*. Field Ops: gloves, glare, dead zones, time pressure, one-handed use. AgencyHub: multi-role teams, context switching, tool fatigue. This section replaces "research" sections; research findings appear here as facts about reality. | 2 paragraphs + optional 1 visual |
| 5 | **Constraints** | 3–4 named constraints: technical (offline, legacy API), organizational (no dedicated PM, eng capacity), timeline. Constraints are what make the decisions in §6 meaningful. | Short list-style blocks |
| 6 | **Key decisions** ★ | 2–4 decision blocks. Each block: *the question → options considered → what I chose → why → the trade-off accepted*. Each block pairs with one annotated visual. This is the longest section and the spine of the page. | 2–4 blocks |
| 7 | **The solution** | 3–4 screens, each captioned with *what to notice and which decision it embodies*. No screen appears unless it's referenced by the narrative. | 3–4 visuals |
| 8 | **System & workflows** | Design system and pattern thinking: tokens, component reuse, how patterns reduced engineering ambiguity. For AgencyHub this section is the centerpiece (Design Systems badge); for Field Ops it's supporting. | 1–2 paragraphs + 1 visual |
| 9 | **Outcome & reflection** | Measured or proxied results, then 2–3 sentences of honest reflection: what's unresolved, what I'd do next. | Short |
| 10 | **Footer** | Optional PDF/archive link · next project | Minimal |

### Why this order

Context before users (business frames everything), constraints before decisions (decisions are meaningless without them), decisions before screens (screens become *evidence* rather than decoration). The reader who skims gets §1–2; the reader who evaluates gets §5–6; the reader who hires gets §9.

---

## 3. Template B, Digital Experience / Website case studies

*Digital Service Experience (InstallPros website), Emmvi*

### Section hierarchy

| # | Section | Purpose | Length |
|---|---|---|---|
| 1 | **Hero** | Same pattern as Template A, shared component | Compact |
| 2 | **At a glance** | Same 3-column TL;DR, shared component | 3 blocks |
| 3 | **Business context** | The commercial situation: market, offer, competition, why a redesign now. Emmvi: growth-stage positioning. InstallPros: multi-service trust business competing on credibility. | 2–3 paragraphs |
| 4 | **Audience & intent** | Who arrives, what they already believe, what they need to believe to act. Frame as *intent states* ("needs Starlink installed this week" vs. "comparing providers"), not demographics. | 2 paragraphs |
| 5 | **Strategy & messaging** | Positioning and message hierarchy decided *before* design: what the site claims, in what order, and why. Demonstrates business thinking, most differentiating section vs. generic UX portfolios. | 2–3 paragraphs |
| 6 | **Information architecture** ★ | How content was restructured and why: service grouping logic, navigation model, page roles. One IA diagram maximum, designed in site style (not a Miro export). | 1–2 paragraphs + 1 visual |
| 7 | **Conversion design** ★ | Trust signals, CTA strategy, friction removal, page-level decisions tied to the funnel. Written as decisions with rationale, same decision-block voice as Template A §6. | 2–3 blocks |
| 8 | **Visual direction** | Brief: type, color, tone and what they signal commercially. One sentence of rationale beats three paragraphs of moodboard talk. | 1 paragraph + 1 visual |
| 9 | **The final experience** | 3–4 key pages/views, captioned with what each page must accomplish. | 3–4 visuals |
| 10 | **Outcome & reflection** | Conversion/traffic/SEO results where available; honest proxies otherwise. Same component as Template A. | Short |
| 11 | **Footer** | Same as Template A | Minimal |

### Why this order

The deliberate signal: *strategy precedes pixels*. Sections 3–5 contain no UI at all. A reviewer who sees a website case study open with business context and messaging immediately re-categorizes the author from "web designer" to "designer who understands why the site exists." Visual direction is intentionally late and short, it's the least differentiating part of the story.

---

## 4. Shared vs. type-specific

### Shared across all four projects (one set of components)

- **Hero** (title, value claim, badges, meta strip)
- **At a glance** TL;DR
- **Decision block** pattern (the question/choice/trade-off unit, used in §6 Product, §7 Website)
- **Annotated visual** pattern (image + "what to notice" caption)
- **Outcome & reflection**
- **Footer** (archive link + next project)

### Type-specific

- Product only: Users & operating conditions, Constraints, System & workflows
- Website only: Audience & intent, Strategy & messaging, Information architecture, Conversion design, Visual direction

### Data model implication (for later, no code yet)

`ProjectCaseStudy` becomes a discriminated union, `kind: "product" | "experience"`, with a shared base (hero, glance, outcome, archive) and kind-specific narrative fields. `case-study-presentation.tsx` branches on `kind` while reusing the shared section components. This keeps one rendering system with two storytelling structures, which mirrors the strategy exactly.

---

## 5. Content rules

### Emphasize

- Business stakes in concrete terms (money, time, risk, churn, truck rolls)
- Named constraints and what they forced
- Decisions with visible trade-offs, including options rejected
- Engineering collaboration and implementation awareness (the "technology" corner of the triangle)
- Numbers, or honest proxies, or honest absence ("we couldn't measure X; the signal we watched was Y")
- What was cut or de-scoped, scope judgment is senior judgment

### Reduce or remove

- **`contributions` section, remove entirely.** Role goes in the hero meta strip; methods appear only as evidence inside decisions.
- **Process narration** ("we ran card sorting, then wireframed…"). Nobody hires the process; they hire the judgment it produced. Card sorting survives only as: "card sorting showed users grouped X with Y, which broke our nav assumption, so we restructured."
- **Generic UX vocabulary**: "user-centric," "seamless," "delightful," "friction" used decoratively, "elevate." Each one lowers perceived seniority.
- **Double-stated abstractions**, the current overview and context sections often say the same thing twice in different words. One context section per page.
- **Decorative artifacts**: personas, journey maps, wireframe wallpapers, sticky-note photos. If an artifact must appear, it appears cropped, recolored to the site's visual language, and in service of one specific point.

---

## 6. Visual budget

Scarcity is the anti-Behance mechanism. Hard caps:

| Project | Total visuals | Composition |
|---|---|---|
| Field Operations Platform (featured) | 6–7 | 1 hero · 3–4 decision-tied screens · 1 system/pattern visual · 1 optional detail (e.g., offline state) |
| AgencyHub | 5–6 | 1 hero · 2–3 decision-tied screens · 1–2 system visuals (this project leads with the design system) |
| Digital Service Experience | 5–6 | 1 hero · 1 IA diagram · 3 final pages · 1 optional before/after |
| Emmvi | 4–5 | 1 hero · 1 strategy/IA visual · 2–3 final views |

Rules: every visual gets a caption that says *what to notice and why it matters*, captions are arguments, not labels. No mockup-perspective renders, no floating devices, no image without a narrative anchor. Real product UI at honest crops beats polished compositions.

---

## 7. PDF / archive placement

One quiet text link in the footer area, after Outcome & reflection, before next-project navigation: *"Full case study archive (PDF) →"*. Never mid-narrative, never as a button competing with content. Rationale: the page is the curated argument; the PDF is the appendix for the reviewer who's already convinced and wants depth. Placing it earlier invites the reader to leave the story. `deckUrl` already exists in the data model, only its placement and styling change.

---

## 8. How this reads as senior (and not Behance)

**Senior signals built into the structure:**

- The page leads with stakes and constraints, so every screen that follows is pre-justified.
- Decision blocks force the trade-off format, you cannot fill one without demonstrating judgment.
- Reflection sections admit unresolved problems, which paradoxically increases trust.
- Websites are framed as business instruments, products as operational systems, both framings are PM-legible, which is who often sits in the hiring loop.

**Behance-avoidance, structurally enforced:**

- Visual caps (§6) make a gallery impossible.
- No visual may exist without a narrative reference, the layout should alternate text-led and visual sections rather than stacking images.
- Typography-led sections (Context, Strategy, Decisions) occupy more vertical space than imagery, the page's center of gravity is thinking, not screens.
- Captions argue; they don't label.
- Total page length is bounded: a reviewer should finish any case study in 3–4 minutes of reading.

---

## 9. Per-project application notes

**Field Operations Platform** (featured, deepest treatment): the operating-conditions section is the differentiator; almost no portfolio shows design for gloves/glare/offline. Candidate decision blocks: offline-first task state, action hierarchy under time pressure, status model legibility. The technical constraint story (connectivity, device reality) carries the "technology" corner.

**AgencyHub**: lead with the system. Center of gravity moves to §8 (System & workflows), pattern consolidation, fragmentation reduction, how systemization changed team velocity. Research (card sorting) appears only as decision evidence. This page proves the Design Systems badge.

**Digital Service Experience** (rename from "InstallPros website" framing in copy, keep the service-business angle): the conversion-design section is the page's heart. Intent-state framing (urgent install vs. comparison shopper) drives both IA and CTA decisions. SEO/implementation awareness earns the technology corner.

**Emmvi**: the most strategy-weighted page and the shortest. Business growth and positioning dominate; visuals are minimal. It's acceptable, and senior, for this case study to be 60% text. It exists to prove business literacy, not UI volume.

---

## 10. What changes next (when approved)

1. Split `ProjectCaseStudy` into a discriminated union with shared base + `product`/`experience` variants.
2. Decompose `case-study-presentation.tsx` into shared section components + two narrative compositions.
3. Rewrite content per project following §2/§3 and the voice rules in §1, content first, then layout.
4. Re-curate imagery to the budgets in §6; move PDFs to the footer pattern in §7.
