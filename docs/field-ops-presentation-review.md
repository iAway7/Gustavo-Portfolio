# InstallPros Technician App, Presentation & Layout Review

Focus: storytelling, visual hierarchy, and presentation quality. No new content.
Kept as requested: Users & Operating Conditions, Operational Context.
Lens: a recruiter scanning for under 2 minutes.

---

## The core problem, in one line

Almost every board uses the same layout: three equal phones in a row, each about 23% of the board width, floating in a large empty canvas. The phones are too small to read, the empty bottom third of each board adds nothing, and because every section looks the same, nothing feels important. When everything has equal size, nothing is the hero.

## Global layout rules (apply to every section)

1. **One board, one idea, two phones maximum.** Use three phones only when the screens are a true sequence (step 1 → 2 → 3) and the step headers prove it.
2. **Make phones 1.5x to 2x bigger.** Target: a solo phone takes 45-55% of the board width; in a pair, each phone takes 32-38%. Today they take ~23%.
3. **Kill the dead space.** Boards are 3864x3453 but the phones only fill a middle band. Either crop the canvas tighter or let the phones grow into the space.
4. **Use bleed crops for dense screens.** For screens with a lot of UI (Job Details, Payments overview), show the phone larger and let the bottom run off the board edge. A cropped large phone reads better than a complete small one, and it looks more premium.
5. **Primary + secondary, not equals.** When two screens appear, make one clearly bigger or in front. Overlapping compositions (one phone front, one behind at ~80% scale) create depth and hierarchy at the same time.
6. **Stop repeating screens.** "Add Additional Costs" and "You've received the payment" each appear on multiple boards. A recruiter notices repeats fast, and repeats read as filler.
7. **Reconsider the 3D clipart icons as board decoration.** Inside the app screens they are product choices and they stay. But as large decorative elements floating on boards, they soften the premium feel. The stats and the UI are stronger without them.

---

## Section-by-section critique and layouts

**01 Overview.** The collage works; it's the only board with depth and overlap. Keep the concept, but enlarge the Job Details phone (the one with pay, distance, and the address note); it's your best single screen and here it's the same size as everything else. Layout: keep collage, one phone 25% larger than the rest.

**02 Problem Statement.** Text-only is correct. No screens needed. Strongest "quiet" board in the deck. Keep.

**03 User Personas.** Very tall board (6339px), two personas stacked. For a 2-minute scan, that's a long scroll for low-new-information. Put the two personas side by side on one screen-height board. Don't cut it; compress it.

**04 Access & Security + 05 Identity Verification: merge into one chapter.** Two thin sections about the same idea (trust before the first job) dilute each other. The email/password login screen is the least interesting screen in any portfolio; cut it. Layout: the biometric lock screen as large primary (it's visual and instantly understood), the 2FA code screen as secondary behind it, and the ID verification camera screen as the second large element. One strong "Trust & Verification" board instead of two weak ones.

**06 Onboarding & Personalization.** The availability scheduler is the differentiator; it shows this is a gig-style product where technicians control their schedule. Make it the large primary. The "Welcome, Alex" home screen also appears in Job Management territory, and the Profile Settings form with a keyboard is filler; cut both here. Layout: solo large scheduler, or scheduler primary + welcome screen secondary.

**07 Job Management.** Your single best screen lives here: Job Details with pay, distance, time estimate, and "Full address shown after acceptance." That line is the most senior product decision visible in the entire app, and right now it's small print in a small phone. Layout: Job Details as a SOLO HERO, the largest phone in the whole case study, with the address line readable without zooming. Home/job list as a small secondary if needed. If a recruiter remembers one screen, make it this one.

**09 Installation Workflow.** Mislabeled content: the three screens shown (Add Additional Costs, Payment Details, payment received) are billing screens, not installation. The actual installation evidence, the Take Photos checklist (satellite, mount, cable run, speed check), is the screen that proves operational depth, and it's not here. Fix: this is the one section that earns a true 3-up sequence, because the screens carry "1 of 3 / 2 of 3 / 3 of 3" headers. Sequence: Take Photos → Add Additional Costs → Collect Payment. Make all three large (32% width each), equal size, because the sequence is the story.

**10 Payment Flow.** Right screens, wrong hierarchy. The earnings overview (pending $450, total $1,200, recent payments) is the hero; it's the screen that says "this app handles the user's income." Make it large primary. Payment settings (Stripe/PayPal/W-9) is the credibility screen; secondary. The individual payment detail can go; it repeats information. Layout: primary + secondary overlap.

**11 Completion & Feedback.** Two screens is already right. The QR feedback screen is visually distinctive (recruiters remember it); make it primary. Signature secondary. Enlarge both; currently they sit small with a third of the board empty on the left. Layout: two large phones, slight overlap, QR in front.

**12 Operational Context.** Keep, as agreed; it's the credibility anchor. Two presentation fixes: make the three numbers much bigger (they are the point of the board; let $7.1M+ be as tall as a section heading), and drop the 3D money/house/clock icons; big clean numerals over plain background reads executive, icons read decorative. Layout: full-width stat band, three columns, numbers first, labels small underneath.

**13 Final Reflection.** Currently re-shows four screens the reader has already seen, which turns your closing thought into a gallery rerun. The reflection text is good; let it stand nearly alone. Layout: text-led board with at most ONE composition (a single angled phone), or no screens at all. Endings are about the thought, not the tour.

---

## Increasing screen size: practical export specs

- Board canvas for feature sections: 2400x1800 (4:3) instead of the current wide-and-empty canvas. Less canvas, same phones = bigger phones.
- Solo hero phone: phone height = 85-90% of canvas height.
- Pair: each phone height = 75-80% of canvas height, 5-8% overlap between them.
- True 3-up sequence: each phone height = 65% of canvas height, equal spacing.
- Keep one consistent shadow and corner radius across all boards; the current soft shadow is good.
- For the website specifically: tall-ish 4:3 compositions render much larger in the case study column than wide 16:9 boards do. Same screens, one export decision, roughly double the on-screen phone size.

---

## Proposed final structure (12 → 10 boards)

1. Cover / Overview (collage, Job Details enlarged)
2. The Problem (text only)
3. User Personas (side by side, one screen tall)
4. Trust & Verification (merged 04+05: biometric primary, 2FA + ID scan secondary)
5. Onboarding & Personalization (scheduler hero)
6. Job Management (Job Details SOLO HERO, the biggest phone in the deck)
7. Installation Workflow (true 3-step sequence: photos → costs → payment)
8. Payment Flow (earnings hero + settings secondary)
9. Completion & Feedback (QR primary + signature)
10. Operational Context (full-width stat band, big numerals) → short Final Reflection text on the same board or a slim closing board

The 2-minute scan this produces: big numbers early context, one unforgettable hero screen in the middle (address gating), one true sequence that proves workflow thinking, and a stats ending that proves scale. Every section now has a different layout, so the deck has rhythm instead of repetition, and every screen that survives is large enough to actually read.
