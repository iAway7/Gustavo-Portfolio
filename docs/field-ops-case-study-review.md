# Field Operations Platform (InstallPros Technician App), Director Review

Reviewed: live page at `/work/installpros-technician-app` + all 13 boards in `ONLY FRAMES/`
Lens: deciding whether to invite this designer to a Senior Product Designer interview.

---

## The verdict first

The boards reveal a product that is more interesting than the page admits: a paid contractor network where technicians accept jobs, get addresses only after committing, document work with photo evidence, charge for scope changes on-site, and get paid through Stripe/PayPal with full payout visibility. The live page tells a calmer, more generic story about "clarity and next actions" and never mentions money once. The money is the story.

There is also one credibility problem that must be fixed before anything else: the page and the deck disagree about what this project is. The boards say "Internal Product Concept." The page's outcome section implies a shipped product ("engineering ships new screens from the established pattern set"). A hiring manager who notices, and the good ones will, stops trusting everything else on the page. Pick the truth (the deck's version) and align every sentence with it.

---

## 1. Overall story flow

The skeleton (context → conditions → constraints → decisions → system → outcome) is right and reads well. The problem is what fills it.

**Redundant:** nothing structurally; the page is already lean.

**Missing, in order of importance:**
- **The money.** Technicians here are contractors paid per job. Payment visibility was, by the deck's own words, "one of the biggest concerns." A technician app where the user's income flows through the app is a fundamentally higher-stakes design problem than a checklist app, and the page never says so.
- **The trust mechanics.** Identity verification, access security, address-revealed-after-acceptance, photo evidence chains. These are real product decisions about a marketplace-like workforce, and they're absent.
- **Operational scale.** 9,163 installations and $7.1M processed across the network. The page says "a small dispatch team" and leaves the reader imagining a 5-person shop.

**The current three decisions** (one next action / recoverable states / dispatch boundary) are coherent but partially generic; two of them could appear in any field-service case study. The deck offers decisions only *this* product forces. Use them.

## 2. Cover section

Title, badges, and summary are solid. Three upgrades:

- The summary should name the economic relationship: technicians aren't staff, they're a paid network. "A mobile platform that guides InstallPros' technician network through accepting, completing, and getting paid for Starlink installations."
- Add honesty to the meta: the deck openly labels this "Internal Product Concept," and that label should appear on the page (scope or a small note). Concepts are not weaknesses; misrepresented concepts are.
- "Period: 2024 - Present" is vague for a concept. The deck's framing (internal concept, Austin, tools including AI) is more specific and more interesting.

## 3. Context & constraints

Useful, and the right idea, but underpowered against what you actually have.

- **Context** should open with scale: "InstallPros' technician network has completed 9,163 installations and processed over $7.1M." That single sentence converts 'small business side project' into 'operational platform with real stakes' before the reader forms an opinion. This is also the correct home for those metrics (see §6).
- **Constraints** are good (connectivity, attention, delivery) but miss the two the deck proves: **mixed digital fluency** (from tech-savvy installers to first-smartphone users, which is why onboarding and personalization exist) and **trust in both directions** (a stranger enters a home; a contractor commits time before knowing the address). Swap "Delivery" down, bring these up.

## 4. Key decisions

This is where the rewrite pays for itself. The strongest decision set, all evidenced by your own screens:

1. **"What does a technician see before committing?"** Job details show pay, time, distance, and description, but the full address only after acceptance. That's a two-sided trust decision (customer privacy vs. contractor information) with a marketplace's no-show economics behind it. Almost nobody has this in a portfolio.
2. **"What happens when the job changes on-site?"** The Add Additional Costs flow (custom materials, trip fee, additional labor) turns scope creep, the classic profit leak of field services, into a structured, billable event. This is design protecting revenue, the purest product-thinking evidence in the whole deck.
3. **"Why does the app handle the money?"** Earnings dashboard, pending/paid states, Stripe/PayPal, W-9 collection. Payment opacity is the top churn driver for contractor networks; payout visibility is a retention feature wearing a UI. Say exactly that.
4. *(Keep, compressed)* **"One next action"** for the home screen still earns a place; it's true and the screen proves it. The current decisions 2 and 3 (state machine, dispatch boundary) can merge into the workflow narrative or move to the PDF.

Memorability rule: each decision should be quotable in one line by a recruiter relaying it to a hiring panel. "She hid the address until acceptance" is quotable. "He prioritized clarity" is not.

## 5. System & workflows

Keep, at current length (short). With photo-evidence checklists, verification gates, and payment states, the system story improves: the patterns aren't just visual consistency, they encode operational rules (every job ends with evidence, every payout has a state). One paragraph saying that is worth more than the current two about component reuse.

## 6. The ending (your question)

**Direct answer: the metrics ending as proposed would be weaker, and risky.** Here's why: $7.1M and 9,163 installations are the *company's* operational results, not the concept's measured impact, and your own Operational Context board says so ("this concept explored how…"). End the case study on those numbers and every sharp reviewer asks the same interview question: "Your concept generated $7.1M?" The honest answer deflates the ending you just built. Unattributed, "+25% Faster Job Completion" has the same problem: measured where, against what baseline? If it's a projection or a target, label it; if it's measured from a shipped slice of this work, that attribution is gold and must be stated.

**The strong move is to split the metrics:**
- **$7.1M / 9,163 installs go to the TOP, into Context,** as the scale of the operation this design serves. There they are 100% honest, instantly raise the stakes, and no one can challenge them. A stat band under Context ("The operation: 9,163 installations · $7.1M processed · multi-region contractor network") is the single highest-impact addition available to this page.
- **The ending stays Outcome & Reflection, rewritten.** Senior case studies end with judgment, not confetti. Structure of the final 20%:
  1. **Outcome:** what the concept made possible, stated concretely (a contractor can find, accept, document, bill, and get paid for a job in one tool), plus the +25% figure *with its honest label* ("projected from removing X and Y from the flow" or "measured in Z").
  2. **Reflection:** 2-3 sentences. What you'd validate first if this shipped fully (I'd nominate: do payment-visibility features reduce contractor churn; does address-gating reduce no-shows). Naming what you'd measure is what separates "designer who made screens" from "designer who owns outcomes."
  3. PDF link + next project, unchanged.

Keep Outcome & Reflection. Rewrite it. Don't replace it with a metrics billboard.

## 7. Brutal review

**What would impress me:** the operational scale, if you surface it early. The address-after-acceptance decision. The additional-costs flow. The payment system depth (W-9s, payout states, Stripe/PayPal) in a designer's portfolio, because it signals comfort with the unglamorous machinery that products actually live or die on. The honest "internal concept" label, if you have the nerve to keep it, because it reads as integrity and as initiative ("I built the concept that the company's operation needed").

**What feels average:** the current three decisions (competent, transferable to any field app), the persona board (standard), onboarding/personalization (fine, not differentiating), and every sentence about "clarity" and "reducing friction," which is the vocabulary of ten thousand portfolios.

**What feels weak:** no money anywhere in a story about paid contractors; metrics that don't yet exist on the page while the deck has them; the shipped-vs-concept ambiguity, which is the only thing here that could actively cost you an interview rather than merely fail to win one; "+25%" with no attribution.

**The changes with the highest return, in order:**
1. Reconcile the concept/shipped story everywhere (kills the only disqualifier).
2. Add the operational stat band to Context (biggest impact for least work).
3. Replace decisions 2-3 with address-gating, additional-costs, and payment visibility (turns a generic story into a singular one).
4. Rewrite the ending per §6.
5. Mention the AI-assisted workflow (Figma + ChatGPT + Lovable) once, factually, in the meta. In 2026 it's a hiring signal, not a confession.

**Interview decision, as the page stands today:** maybe; the writing is above average but the evidence is thin and a probing question about outcomes would wobble. **With the five changes above:** yes, and the address-gating decision is what I'd remember after the call.
