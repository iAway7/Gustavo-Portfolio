# AgencyHub Case Study, Director-Level Audit & Redesign

Target page: `/work/agencyhub-platform`
Source material reviewed: all 14 boards in `AgencyHub WebApp/` + Overview PDF
Reviewer lens: hiring manager for a Senior Product Designer at a SaaS company, 3 minutes on the page.

---

## A. Executive critique

### What the source material actually contains

15 numbered boards in design-sprint order: Cover → Overview → Problem Statement → Design Process → Lightning Demos → HMW → Personas → User Flow → Paper Sketch → High-Fidelity Wireframes → UI Colors → Typography → Buttons → Components → UI Showcase.

### The verdict in one sentence

The strongest product thinking in this project is invisible, it's buried inside the user-flow diagram and the checkout screens, while two-thirds of the page is spent proving that a standard design process was followed.

### Five specific problems

**1. The structure is a curriculum, not a story.** Numbered chapters (02 Understanding the Challenges, 06 User Flow, 13 UI Showcase) read like a bootcamp submission: "here is evidence I did each step." A hiring manager doesn't doubt you can run HMW exercises. They doubt you can make product decisions, and the current structure never shows one.

**2. The real differentiator is hidden in plain sight.** Read the user flow closely and a genuinely senior story appears: this is a *two-sided marketplace with a three-party money and communication flow*. Agencies don't buy for themselves, they resell to clients. That's why checkout has a "Create a Payment Link" path, why there's a 3-way chat room, why providers pass an approval gate before publishing. None of this is narrated anywhere. The single most impressive design problem in the project, designing checkout for someone who is buying on behalf of someone else, is currently one unlabeled screen in board 13.

**3. The problem statement exists but isn't doing its job.** Board 02 is decent raw material (vendor vetting is slow, trial-and-error partnerships waste money), but it's framed as "Understanding the Challenges", a process step, instead of as stakes. It also jumps straight from problem to solution in two paragraphs, skipping everything a senior portfolio is evaluated on: options, decisions, trade-offs.

**4. The artifact-to-insight ratio is inverted.** Personas, HMW boards, Lightning Demos, paper sketches, colors, typography, buttons, components: ~9 of 15 boards are artifacts whose only message is "this deliverable exists." UI Colors alone is a 7,000px-tall board. Meanwhile impact, evolution, and outcomes get zero boards.

**5. No ending.** The case study stops at UI Showcase. Nothing shipped? Nothing learned? Nothing measured? A story without an ending reads junior even when the work is strong.

### What survives the cut

The problem statement (as raw material), the user flow (as the system map of a two-sided marketplace), the UI showcase screens (as decision evidence, recropped), and the component thinking (one breath, not four boards). Everything else moves to an appendix.

---

## B. Recommended structure

Eight sections. This maps onto the portfolio's existing product template (hero → at a glance → context → users → constraints → decisions → system → outcome), so it ships without new layout work.

| # | Section | Goal | Include | Remove |
|---|---|---|---|---|
| 1 | **Hero** | Reposition from "UX/UI Design" to product design in 5 seconds | Title + one line that names the product type: *two-sided B2B marketplace*. Badges: B2B SaaS · Marketplace. Meta: role, 3 months, scope | The "UX/UI Design" label on the cover; the deliverables list as a role description |
| 2 | **At a glance** | Full story in 30 seconds for the skimming hiring manager | Challenge (vetting cost + two-sided trust), role (end-to-end product design), outcome (a marketplace where browsing, buying, reselling, and fulfillment work as one system) | Process vocabulary entirely, no "sprint," "HMW," "personas" here |
| 3 | **Context** | Establish business stakes before any design talk | Why agencies white-label (margin, capacity), what failed vetting costs them, and what the marketplace must do for *both* sides to work | "Understanding the Challenges" framing; the solution paragraph (it belongs in decisions, earned not asserted) |
| 4 | **Two sides, three parties** (users) | Show the structural insight that drives everything | The marketplace's real shape: providers list and fulfill, agencies buy and resell, *the agency's client* pays and receives, a third actor who never logs in but defines the hardest flows | Persona cards. The insight they contained fits in two paragraphs; demographic details add nothing |
| 5 | **Constraints** | Make the decisions meaningful | 3 named constraints: trust is the product (curation vs. growth tension), three-party money flow, solo designer / 3-month window | Generic constraints like "limited time" without consequence |
| 6 | **Key decisions** ★ | The heart, judgment under constraint, ~60% of reading time | 3 decision blocks (see D): payment links, provider approval gate, order-anchored 3-way communication. Each: question → decision → why → trade-off → one screen as evidence | Lightning Demos, HMW, sketches, wireframe progression. Their *conclusions* appear inside rationale ("competitor checkouts assumed the buyer was the end customer…"); the boards themselves go to the appendix |
| 7 | **System** | Systems thinking in one breath, tied to velocity | 2 short paragraphs: component logic let marketplace, cart, orders, and store views ship coherently in 3 months. At most one tight crop | Colors, Typography, Buttons, Components as separate boards. A palette proves nothing about judgment |
| 8 | **Outcome & reflection** | End the story; show honesty | What shipped, what the design made possible (an agency can sell a service it doesn't deliver, with payment and fulfillment handled), 2–3 sentences of honest reflection + what you'd measure | Adjective-only claims. If there are no numbers, say what you *would* measure (payment-link conversion, approval turnaround, time-to-first-order) |

Footer: one quiet link, "View full process (PDF)", after the outcome.

---

## C. Recommended storytelling flow

The 3-minute read, engineered:

- **0:00–0:10, Hero.** "Two-sided marketplace, B2B, this person designed the whole product." Category established.
- **0:10–0:40, At a glance.** Problem, role, result. A rushed reviewer can stop here with the correct impression.
- **0:40–1:10, Context + the three-party insight.** This is where "UX designer" becomes "product thinker": the reader learns the buyer isn't the end customer, and immediately understands why this project was hard.
- **1:10–2:30, Three decisions.** Each one is a mini-story: tension → choice → cost. The screens appear *here*, as evidence, so the reviewer never experiences a gallery.
- **2:30–3:00, System + outcome.** Competence at scale, an honest ending, the PDF link for the 1-in-10 reviewer who wants the full process.

Narrative spine in one line: *"Agencies waste money on unvetted vendors → I designed a marketplace where trust is enforced by the system → the hard part was that the buyer resells to a third party → here are the three decisions that made that work."*

---

## D. Suggested headings and copy (B2 English)

**Hero**

> **AgencyHub**
> A two-sided marketplace where digital agencies buy white-label services from vetted providers, and resell them to their own clients.
> *Role: Product Designer (end to end) · Duration: 3 months · Scope: marketplace, checkout, orders, provider tools*

**At a glance**

> **The challenge.** Agencies wanted to offer more services without hiring. But finding reliable vendors was slow, and a bad vendor costs an agency its client.
> **My role.** I designed the product end to end: research, flows, information architecture, UI, and the component system, for both sides of the marketplace.
> **The outcome.** A marketplace where an agency can find a vetted provider, buy a service, charge its own client, and manage delivery, in one system.

**Context**

> **Why this product exists**
> Digital agencies grow by saying yes. When a client asks for SEO and the agency only does ads, the agency either hires, refuses, or finds a white-label partner. Most choose partners, and most find them by trial and error. Every failed partnership costs money twice: the wasted spend, and the client who leaves.
> AgencyHub's bet was that vetting could be a platform feature instead of a private struggle. For that to work, the product had to serve two sides with opposite needs: providers want to list fast, agencies want to trust what they find.

**The three-party insight** (section heading: *Two sides, three parties*)

> The flows looked like a normal marketplace until one detail changed everything: the agency is not the end customer. The agency buys a service, marks it up, and delivers it to its own client. That third party never logs in, but they pay, they give requirements, and they judge the result.
> Most of the hardest design decisions came from this triangle, not from the marketplace itself.

**Decision 01**, heading: *Who pays at checkout?*

> **The decision: checkout can end with a payment link instead of a payment.**
> A normal checkout assumes the buyer pays. Here, the agency often needs its client to pay first. So checkout offers two endings: pay now, or create a payment link and send it to the client. The order starts when the client pays, and the agency never has to front the money.
> **Trade-off accepted:** an order can now exist in a "waiting for client" state, which made order status logic more complex for every other part of the system.

**Decision 02**, heading: *How does trust get into the catalog?*

> **The decision: no service goes live without approval.**
> Providers can create a listing in minutes, but publishing requires review. This is slower for providers and adds operational work for the platform. We accepted both costs, because the entire value of AgencyHub is that agencies stop vetting vendors themselves. A marketplace that lists everyone is just another search problem.
> **Trade-off accepted:** slower catalog growth in exchange for the one thing competitors couldn't claim.

**Decision 03**, heading: *Where does the client fit in delivery?*

> **The decision: communication lives inside the order, with room for three parties.**
> Requirements, revisions, and updates flow through a shared space connected to the order, agency, provider, and client when needed, instead of email threads the platform can't see. The platform can only resolve disputes about work it can observe.
> **Trade-off accepted:** building communication into the product is expensive, and asking users to leave email is a real adoption risk.

**System** (heading: *One system, four surfaces*)

> Marketplace, cart, orders, and the provider's store were built from one set of components and layout rules. For a solo designer on a 3-month timeline, this wasn't aesthetic discipline, it was the only way to ship four coherent surfaces at once.

**Outcome & reflection** (heading: *Where it landed*)

> The design made a new behavior possible: an agency can sell a service it doesn't deliver, with payment, requirements, and fulfillment handled by the platform instead of spreadsheets and email.
> **Reflection.** If I continued this work, I would instrument the two riskiest decisions: how many checkouts end in a payment link (is the third-party flow real demand?), and how long provider approval takes (trust is only a feature if it doesn't strangle supply).

---

## E. Artifact visibility plan

**Visible on the page (5 visuals max):**

| Artifact | Where | Treatment |
|---|---|---|
| Cover / marketplace overview | Hero | As-is |
| Checkout + "Payment Link Created" screens | Decision 01 | Crop from UI Showcase board, the two screens side by side ARE the decision |
| Marketplace browsing or provider listing screen | Decision 02 | Tight crop; caption points at the approval/vetting signal |
| User flow | Two sides, three parties (or Decision 03) | Recrop/simplify, ideally redrawn as one clean diagram of the agency–provider–client triangle in the site's visual language, not the full Figma export |
| Cart/orders screen | Decision 03 or System | One crop showing the order as the unit of communication |

**Hidden behind "View full process (PDF)":** Personas, HMW, Lightning Demos, Paper Sketch, Design Process, High-Fidelity Wireframes, UI Colors, Typography, Buttons, Components. Compile the existing 15 boards into one PDF (`/docs/agencyhub-case-study.pdf`), they're good appendix material and prove rigor to the reviewer who goes looking. The page mentions their conclusions; the PDF holds their existence.

**Rule applied:** an artifact is visible only if removing it would break a decision's argument. Everything else is rigor, and rigor belongs in the appendix.

---

## Implementation note

The current `agencyhub-platform` entry in `lib/site-data.ts` describes AgencyHub as an internal agency-operations platform, the source boards show it's actually a marketplace, which is a materially stronger story. Implementing this redesign means rewriting that entry's content (the product template already supports every section above), recropping 3–4 screens from the boards into `public/projects/agencyhub/`, and compiling the appendix PDF.
