# The healthy-eating game — the sweep, consolidated

*Four research lenses, run 2026-09-13 against the owner's ask of the same night (logged verbatim at
`docs/ASKS.md:43`). Consolidated into one file by Chuy on 2026-09-14.*

**What happened to the raw version.** On the night of 2026-09-13 the four lenses came back and the
rate limit stopped the crew before anyone could merge them, so this path held the four returns
stacked end to end, unconsolidated, with a note saying the consolidation was the next window's work.
**That is what this file replaces.** Nothing was dropped: every `[WEB]` URL from all four lenses is
in §9 below, every `[TRAINING]` claim is still marked as one, and every "what I did not check" is in
§10. The original four-lens dump is in this repo's git history at this path if anybody wants to see
which lens said what.

**The transferable rules out of this sweep live in `docs/GENRE-RULES.md` (R10's planner tell, R15,
R16, R17).** That is the file an agent about to build should open. This one is the evidence.

---

## 0 · The sourcing caveat, and it governs everything below

**The egress proxy refused CONNECT to almost every primary host all four lenses tried.** Between
them they logged roughly a hundred blocked fetches across PubMed/PMC, ScienceDirect, Springer,
Wiley, SAGE, Cochrane, JAMA, the Lancet, JMIR, MDPI, PLOS, Frontiers, Nature, Cambridge, ACM, arXiv,
Wikipedia, Semantic Scholar, WHO, FAO, USDA FoodData Central, MyPlate, MEXT, RDA Korea, data.go.kr,
CREA, gob.mx, INCMNSZ, UNESCO, FDA, FTC, EUR-Lex, Steam, Metacritic, every app vendor and every
recipe site. **Only `github.com` and `raw.githubusercontent.com` opened.**

So: **every `[WEB]` claim in this file carries a real URL, and unless it is marked `(read)` it
reached the researcher as a search-result extract, not as a read of the page.** Quoted figures are
as the search tool returned them.

> **Nothing sourced here may be published outside this repo until a person opens the pages.** That
> is not a formality — there are roughly eighty numbers below and none of them has been read off its
> source. Inside the repo they are good enough to design against; in a README, a store page or a
> character's mouth they are not.

`(read)` pages, all of them GitHub: the Open Food Facts server docs, README and LICENCE; the
`recipe-scrapers` registry and factory; the `schema.org` TTL source; the Cooklang spec; MDN's CORS
guide and `share_target` reference; MDN browser-compat-data for `share_target`.

`[CODE]` claims were grepped on 2026-09-13 and the load-bearing ones re-grepped on 2026-09-14 for
this file — see §8, and see `docs/GENRE-RULES.md`'s drift warning, which this sweep tripped three
separate times.

---

## 1 · How eating habits actually form

**1.1 · A habit is context-dependent repetition, it takes about ten weeks not three, and missing a
day does not matter.** Lally et al. 2010: 96 volunteers repeated one eating/drinking/activity
behaviour in the same context daily for 12 weeks; median 66 days to automaticity, range 18–254, and
only ~48% reached it, simpler behaviours fastest; *"missing one opportunity to perform the behaviour
did not materially affect the habit formation process."* Singh et al. 2024 (systematic review,
health habits including eight diet studies) puts medians at 59–66 days, means 106–154, range 4–335,
and finds habit strength rises with *individual choice*, affective judgements and **preparatory
habits**, morning practices strongest.
**For the game:** the unit is one small action tied to one moment the player already meets; the
horizon is a season, not a sprint; the pantry *is* the preparatory habit (stocking, planning,
thawing), and cooking is the payoff.

**1.2 · The clinically-used version of 1.1 is three sentences.** Gardner, Lally & Wardle 2012 (BJGP)
turn it into GP advice with a patient leaflet and a weekly self-rating of automaticity: pick a small
behaviour, pick a cue you already meet daily, repeat.
**For the game:** the plan screen asks *when and where*, never *how much*.

**1.3 · Durable change needs repetition, stable cues and rewards — especially uncertain ones — plus
friction against the old behaviour.** Wood & Neal 2016: habit-forming = repetition + context cues +
intermittent rewards; habit-breaking = cue disruption, environmental re-engineering (add friction to
the unwanted, remove it from the wanted), vigilant monitoring.
**For the game:** rewards warm and *unpredictable* (a neighbour turns up with a story), never a
ladder. "Pantry organisation" has real evidence only as **friction design — where things live** —
not as decoration.

**1.4 · A context change opens a window; a date opens a smaller one.** Verplanken & Roy 2016: people
re-decide habits when they move house and interventions land better then. Milkman/Dai's fresh-start
effect does the weaker version for Mondays, new months and birthdays.
**For the game:** a new season or a new shelf is the correct — and the only — moment to offer a new
habit. It also means **moving day is an evidence-backed opening scene**, and it makes an empty
pantry true rather than contrived.

**1.5 · If-then plans work, and they work better for adding than for cutting.** Gollwitzer & Sheeran
2006, 94 studies, 8,000+ participants: d = 0.65 on goal attainment, d = 0.61 on getting started.
Adriaanse et al. 2011, 23 studies: implementation intentions are *"somewhat more effective in
promoting healthy eating than in diminishing unhealthy eating"*, with a caveat that some promotion
effects were inflated by weak controls.
**For the game:** *"Thursday, if I'm home by seven, the caldo"* is the single most evidence-backed
sentence this game can ask anyone to write, it needs no clock and no score — and **every goal is
framed as adding, never removing.**

**1.6 · Habit advice is cheap, real and modest.** 10 Top Tips RCT (Beeken et al. 2017): 537 adults
with obesity across 14 English practices; the habit leaflet arm lost 0.87 kg more than usual care at
3 months; by 24 months the arms were similar; cost ≈ £23 per person.
**For the game:** the strongest habit intervention in a health service produced under a kilo and it
washed out. **A game must never promise weight.**

---

## 2 · Cooking, planning, food literacy, company — the behaviours with evidence

**2.1 · Cooking dinner at home most nights is associated with eating better.** Wolfson & Bleich 2015
(NHANES 2007–10, n ≈ 9,569): 6–7 dinners a week averaged 2,164 kcal, 81 g fat, 119 g sugar against
2,301 kcal, 84 g, 135 g for ≤ 1/week, and less when eating out too; Wolfson 2020 (n = 8,668) finds a
higher HEI-2015 with more frequent cooking. **Both cross-sectional — say "associated with", never
"causes".**

**2.2 · Meal planning is associated with variety, guideline adherence and lower odds of
overweight.** Ducrot et al. 2017, NutriNet-Santé, n = 40,554; 57% plan at least occasionally; lower
odds of overweight and obesity in women and obesity in men; cross-sectional.
**For the game:** "organize future meals" is the feature with evidence behind it — and **planning is
not counting.** The plan is a list of dishes, not a budget.

**2.3 · Plan + list + storage cuts household food waste, fast.** Coaching on plan/list/storage cut
vegetable waste 38–49%; an article plus a planning tool cut waste 24% inside a week; "make a
shopping list" and "freeze excess food" rank high-impact and easy.
**For the game:** the pantry's honest job is **a list and a freezer**. Waste is the calm goal: it is
about the kitchen and not the body, and it is bilingual for free.

**2.4 · Cooking confidence is the outcome that predicts diet years later.** Utter et al. 2018,
longitudinal over 10 years: adequate cooking skills in emerging adulthood predicted ≥ 3 vegetable
servings/day and less fast food later. The 2024 scoping review maps food literacy as four domains —
**plan/manage · select · prepare/cook · eat** — and finds interventions improve behaviour and diet
quality on mostly single-group designs; a culinary-intervention evidence map reports higher
fruit/veg and confidence with *"low or very low"* certainty and no BMI effect.
**For the game:** design for *"I can do this"*, not for a score. The four domains are a ready map of
four rooms and four chapters.

**2.5 · Eating with other people is associated with better intake and lower psychological risk, and
every one of the four national guideline systems names it.** 2026 meta-analysis in older adults:
solitary eating → lower energy and protein and higher psychological risk; social facilitation
lengthens meals.
**For the game:** a town with named neighbours is *already* the evidence-shaped feature. **"Who is
this for?" is both the design question and the nutrition answer.**

---

## 3 · Tracking, counting and streaks — where a food game does harm

**3.1 · Self-monitoring is associated with weight loss in trials and almost nobody keeps doing it in
the wild.** Burke 2011: consistent association, weak methods. Helander 2014: of 189,770 downloads of
a free photo food-diary app, **2.58%** were active (≥ 10 photos over ≥ 1 week).
**For the game:** a loop built on logging inherits ~97% churn. **Do not build a logger.**

**3.2 · Calorie counting is contraindicated for a meaningful slice of adults.** Levinson 2017: of 105
people with an eating disorder, ~75% used MyFitnessPal and **73% of those felt it contributed** to
their disorder. Rigid (versus flexible) dietary control relates to disordered eating and body
concern; Linardon 2021 (97 studies, 89% cross-sectional): intuitive eating ↔ less binge and
restraint, more body appreciation and self-compassion. A 38-study review (Flinders) found regular
diet/fitness-app users more likely to have problematic food and exercise habits; one RCT in low-risk
women found no harm over a month.
**For the game:** **no calorie totals, no weight entry, no "over budget" red.** If numbers appear at
all they are about *kinds*, never kcal, and never about a body.

**3.3 · Streaks are loss aversion in a costume, and the vendors who sell them ship streak freezes
because they know it.** The science is 1.1 — a missed day does not matter. Duolingo-attributed
figures (vendor, primary unread): 7+ day streaks retain at 2.4×, Streak Freeze cut churn 21% among
at-risk users. The mechanism of harm is the abstinence-violation effect: one miss reads as total
failure, and the longer the streak the harder the quit.
**One number this sweep refuses to carry:** a *"78% of users who reach a 14-day streak quit within
72 hours of a miss (UCSF)"* figure circulates on a product-marketing page with no traceable study.
**Untraceable. Do not cite it.**
**For the game:** no streaks. If anything counts, it **counts up and never resets**.

**3.4 · After a lapse, self-kindness protects the next hour; guilt does not prevent the next lapse
either way.** EMA study, 140 people in a weight-loss trial, 6 prompts a day for 7 days:
self-compassion after a dietary lapse was associated with less negative affect and greater perceived
self-control afterwards, and none of it predicted fewer lapses that day.
**For the game:** the line after a missed week is kind and practical, never a verdict. It costs two
strings per character per language.

**3.5 · Most health apps are abandoned in weeks and the reasons are design.** Scoping review, 18
studies, 525,824 participants: abandonment is curvilinear and sharp early, *"a median of 70% of
users discontinuing use within the first 100 days"*; 22 reasons in six themes. Cordeiro et al. CHI
2015 (141 journalers, 5,526 forum posts): apps *"made me too focused and obsessive"*, designs *"that
create feelings of judgment can be self-defeating"*, and people hid their tracking from friends and
colleagues. A widely-quoted *"3–4% day-30 retention"* is a vendor figure; a *"90% abandon within 30
days"* figure appears in vendor copy with no source found — **treat both as marketing.**
**For the game:** design for the return, not the streak. Nothing red, no ledger, and a first session
that ends with one real dish on the plan.

---

## 4 · Gamification psychology — what it supplies, and what it does not

**4.1 · Autonomous motivation predicts whether a habit lasts; controlled motivation predicts whether
it starts and then stops.** Ng et al.'s SDT systematic review: autonomy support raised autonomous
motivation across physical activity, healthy eating, smoking and adherence, and autonomous
motivation predicted long-term maintenance *"far better than controlled motivation."* A 2026
SDT-informed wellness framework maps autonomy → user-defined goals with structured guidance,
competence → adaptive challenges, relatedness → collaboration-focused sharing, and warns that
ranking systems are read *"as forms of surveillance rather than motivation."*
**For the game:** she picks the dish, the goal and the pace. Nothing is assigned.

**4.2 · Expected tangible rewards reduce the wish to do the thing unrewarded; informational feedback
does not.** Deci, Koestner & Ryan's 128-study meta-analysis: engagement-, completion- and
performance-contingent rewards undermined free-choice intrinsic motivation at d = −0.40, −0.36,
−0.28. The distinction that verbal/informational feedback and *unexpected* rewards do not undermine
is `[TRAINING]` beyond what the extract stated.
**For the game:** no points for cooking. A character's remark about the dish is feedback, not
payment; an unannounced gift is fine; a "claim your reward" ladder is the thing to refuse.

**4.3 · The gamification-for-health base leans positive, is thin and mixed, and is mostly points,
badges, leaderboards and steps.** Johnson et al. 2016: 19 empirical papers, 59% positive, 41% mixed,
*"mostly of moderate or lower quality"*. Koivisto & Hamari 2019, 819 studies: leans positive, *"the
amount of mixed results is remarkable."*
**For the game:** a calm cooking-and-pantry game is essentially untested territory. Say so when the
owner asks whether it works.

**4.4 · In RCTs, gamification moves steps modestly and moves diet not at all.** Mazeas 2022, 16
RCTs, 2,407 people: Hedges g = 0.42 during the intervention, g = 0.15 (95% CI 0.07–0.23) at
follow-up averaging 14 weeks. Nishi/Kavanagh 2024, 36 RCTs of gamified versus non-gamified apps over
≥ 8 weeks: *"No significant effects were observed on blood pressure, lipids, glycemic control, and
dietary factors."*
**For the game:** **the game layer may not claim it changes what anyone eats.** It may claim it
helps you plan, cook, remember and learn. That is the honest pitch and it is enough.

**4.5 · The one nutrition app with game-like process motivators that moved vegetables did it on a
wait-list control and self-report.** Vegethon (Stanford, n = 135 overweight adults): goal-setting,
self-monitoring, feedback plus *"fun, surprise, choice, control, social comparison, competition"*;
at 8 weeks +0.7 servings/day against −1.7 in control, difference +2.4 servings/day, p = 0.04, with a
*"weak"* dose–response.
**For the game:** goal, self-monitoring of *what was cooked*, and feedback are the working parts.
Surprise and choice are on the supported side; competition is what a solo game drops anyway.

**4.6 · Leaderboards and social comparison harm the people a self-help game is for.** In
leaderboard-only settings 31.3% reported negative psychological effects and 43.8% made upward
comparisons that *"amplif[ied] feelings of inadequacy"*; macro leaderboards accumulate *"perceptions
of repeated failure"* for lower performers. Nutrition-app users in a best-worst-scaling study ranked
goals, progress bars and rewards **highest** and *"leaderboards, narratives, social interaction, and
badges"* **lowest**.
**The honest counterweight:** STEP UP (JAMA IM 2019, ~600 adults) found the *competitive* arm best
for steps (+920/day) and the only arm that held at follow-up — steps, among strangers, and it does
not transfer to a solo kitchen.
**For the game:** no leaderboard, no feed. It is one person's kitchen.

**4.7 · Relatedness can come from a character, and that is the channel a solo game has.** Bickmore's
RCT (n = 263 older adults, an embodied conversational agent versus a pedometer) is the primary
evidence that a relational agent sustains a health behaviour; the 12-month outcome was not readable
and `[TRAINING]` says the effect faded — unverified. Finch's retention thesis is that people will
reliably do healthy things *for someone that depends on them*; Animal Crossing players in lockdown
described autonomy, competence and relatedness being met.
**And the named trap, from Finch's own reviewers:** the pet *"can start to feel like one more thing
to tend in month three."*

**4.8 · The novelty effect has a measured shape.** Rodrigues et al.: gamification's effect began
falling after four weeks, dipped for two to six weeks, then partially recovered between weeks six
and ten (a *"familiarization effect"*).
**For the game:** the mechanic must be about the food, not about the mechanic, so that week five
still has something in it.

**4.9 · Autonomy-supportive wording is safe, cheap, and not a lever on its own.** Theory says
"should/must" provokes reactance; the one digital 2×2 experiment found (n = 526, vegetable intake)
found **no difference** between framings.
**For the game:** write kindly in both languages because it costs nothing; do not expect wording to
carry retention.

**4.10 · Calm play has a measured calming effect, and obligation cancels it.** Johannes, Vuorre &
Przybylski (2,700+ Animal Crossing and ~500 Plants vs Zombies players, telemetry-linked): a small
positive relation between play time and well-being, with enjoyment and need satisfaction mattering
more than hours — correlational. *Flower* against a 20-minute body-scan meditation (n = 80): heart
rate and blood pressure fell equally; meditation won on self-reported stress.
**For the game:** "twenty minutes in this town is calming" is a legitimate claim. *"Log in daily"*
is the sentence that turns it off.

**4.11 · Meaningful gamification names when rewards are acceptable.** Nicholson's **RECIPE** —
Reflection, Exposition, Choice, Information, Play, Engagement: reward-based gamification *"can be
useful for short-term goals and situations where the participants have no personal connections or
intrinsic motivation"*, but *"rewards can reduce intrinsic motivation and the long-term desire to
engage."*
**For the game:** Information = a fact with its source on the card; Exposition = the cast;
Reflection = *"who taught you this one?"*; Play = a wrong dish adds dialogue.

**4.12 · Serious games teach nutrition knowledge reliably and change behaviour unreliably.** Reviews
2018–2022: *"immediate post-play improvements were common, particularly for knowledge and
self-reported diet"*, while *"durable change and objective transfer to real-world behaviour were
less consistent"*; dietary-habit improvements *"were not significant."* A 2018–2022 review reports
93.33% of included studies "confirmed the effectiveness", attributed to behaviour-change techniques
and implicit learning — **children, school-delivered, parents enrolled.** Squire's Quest! II (400
parent/child dyads, 4th–5th graders): the children who **wrote action plans** had higher
fruit/vegetable intake six months later.
**For the game:** *"learn about nutrition"* is a claim the evidence backs. *"Eat better"* is not.
And the transferable ingredient from the children's work is **making a specific plan**, not fighting
junk-food monsters.

### The mechanic table — the whole of §3 and §4 in one place

| Mechanic | Evidence says | Verdict |
|---|---|---|
| Player-chosen goal, dish and pace | supports (4.1, 1.1) | **yes — the core** |
| An if-then meal plan | supports (1.5, 2.2) | **yes — the calendar is the behaviour-change technique** |
| Self-monitoring of *what was cooked*, not of calories | supports (4.5) | **yes — a cookbook that fills, no numbers** |
| Informational feedback from a character | supports (4.2, 3.4, 4.7) | **yes — the cast remembers** |
| Unexpected small gifts | not undermining (4.2) | yes, sparingly |
| A counter that only goes up | preferred by users (4.6), safe if never reset | optional |
| Expected points for cooking | warns (4.2) | **no** |
| Badges, an unlock ladder | warns (4.2, 4.6) | **no** |
| A streak that resets | warns (3.3, 3.4) | **no — count up, never to zero** |
| Leaderboard, social feed | warns (4.6, 3.5) | **no** |
| Calorie or weight ledger | warns (3.1, 3.2) | **no** |
| Daily-login obligation | warns (4.10) | **no** |

---

## 5 · Environment, portions and the pantry

**5.1 · The one environment lever with Cochrane-grade evidence is size.** Hollands 2015, 61 studies,
6,711 participants: bigger portions, packages and plates → people eat more, regardless of BMI or
restraint.
**For the game:** "decant into smaller jars, serve from smaller bowls" is sayable, sourced, and
pixel-art-shaped.

**5.2 · Almost every popular kitchen-design tip descends from Brian Wansink, whose work was retracted
(≈ 18 papers) after a Cornell misconduct finding.** "Cluttered kitchens make you overeat",
"kitchenscapes", the visible fruit bowl — all compromised.
**Never cite Wansink.** The pantry's defensible evidence is friction (1.3) and size (5.1). *"Keep
fruit where you can see it"* stays `[TRAINING]` — plausible, unproven, and nobody searched for a
non-Wansink source.

**5.3 · Manual entry is the named cause of death for pantry apps, and the failure is drift, not
effort.** Three competing pantry vendors say the same thing about each other: *"the graveyard of
pantry apps has one common cause of death: manual entry"*; forty items on day one, five on day two,
forgotten by week two, and by week three *"every recipe suggestion is based on food you no longer
have… the app becomes worse than useless: it is actively giving you wrong information"*; *"anything
over 60 seconds to log a weekly shop dies."* `(vendor)`
**For the game — and this is the finding that killed a design this crew liked:** the cost is not the
keystrokes, it is the **drift**. A pantry ledger passes every "is this still worth one tap on day
ten" test and fails anyway, because the data rots while the action stays cheap. **A model that is
80% right is worse than none, because it lies with confidence.** Log **by exception** — what ran
out, what came in, in one line to a character — or do not log.

**5.4 · The intake "fixes" all have complaints and none is available to a static offline page.**
Pantry Check: scanning a weekly shop is *"a lot of beeps"*, iPhone-only in 2026, ~200-item free cap,
cloud-and-account, inaccurate product identification. NoWaste: *"recurring issues with barcode
scanning accuracy, synchronization problems, and occasional app crashes."* Cooklist links grocery
loyalty cards and receipts, and *"it takes so long for receipts to come through that it sometimes
thinks you don't have the groceries until the produce is expired."*
**For the game:** no server means no loyalty sync and no receipt OCR. Browser barcode scanning is
`[TRAINING]`, unresearched, and would need a product database anyway. **Do not compete on intake;
compete on not needing it.**

**5.5 · Paprika's one reusable pantry idea is a set difference.** Pantry items carry quantity,
purchase date, expiry and stock state; *"ingredients placed in your pantry will automatically be
unchecked when you add recipes or meal plans to your grocery list."* Its selling point is *"lack of
a subscription model"*; its complaints are printing cut-offs, data-loss reports and weak support.
**For the game:** **recipe ingredients minus pantry = shopping list** is a pure function over two
small arrays, needs no server, and is the one pantry feature users actually praise. **Expiry sorting
is the trap: a red expired list is a guilt list.**

**5.6 · The rest of the landscape, briefly.** Plan to Eat is a drag-and-drop week, $49/yr, 4.8★ iOS —
the whole product is the calendar. Mealime and KptnCook both sell *fewer choices* and users thank
them: KptnCook's three recipes a day *"helps reduce decision fatigue"*, each day *"like opening a
small surprise package"* — **but its 24-hour vanishing is scarcity wearing delight's clothes; the
abundance version is three more tomorrow and these three stay.** Mealime's complaints are that swap
*"cycles through three or four of the same recipes"*, the paywall, and nutrition totals that skip
unmeasured ingredients — **which is also the proof that computed nutrition on pasted recipes is
wrong.** Samsung Food needs an account, carries third-party diet ads users call *"sleazy"*, and has
bugs *"reported for months without resolution"* — **the ecosystem people are fleeing is exactly what
a no-account, no-ads, no-server game is by construction.** AnyList caps web-recipe import at five
per lifetime on free — **import is the feature every vendor gates, so shipping it ungated matters**
— and its aisle auto-categorisation is a 40-line static map worth copying.

**5.7 · Never invent a food score.** Yuka scores 60% Nutri-Score + 30% additives + 10% organic and
caps any product with a "high-risk" additive at 49/100 regardless of dose; registered dietitians
call parts of it fear-based; its own vendor press claims 78% of French manufacturers now formulate
against it.
**For the game:** **a number the game computes becomes a verdict on somebody's grandmother's dish.**
Show where a fact comes from and let the person read.

---

## 6 · The four cuisines

### Cross-cutting

**6.1 · There is one cuisine-neutral yardstick and it is small.** WHO for adults: ≥ 400 g fruit and
vegetables a day (five portions); free sugars < 10% of energy, ideally < 5%; salt < 5 g; fat < 30%
with saturated < 10% and trans < 1%.
**Population targets a character may quote with the link — never a personal prescription.**

**6.2 · All four countries publish an official native-language guide, and those are the "places to
check".** Japan: the Food Guide Spinning Top (MHLW + MAFF; grain, vegetable, fish/meat, milk, fruit
*dishes*, a running figure on top) and the 2016 Dietary Guidelines for Japanese (ten messages,
including enjoy meals, keep a rhythm, honour washoku, reduce food loss), on top of the 2005 Basic
Act on Shokuiku, which makes food education include culture, season and eating together. Korea: the
Food Balance Wheels (six groups since 2020, a bicycle with a cup of water) and nine general dietary
guidelines. Mexico: **El Plato del Bien Comer** (NOM-043-SSA2-2012) and the **Guías Alimentarias
2023** — the plate redrawn as 50% vegetables and fruit, 22% cereals, 15% legumes, 8% animal foods,
5% oils, with ten recommendations including plain water over sugary drinks, less red and processed
meat and ultra-processed food, and *"respeto a la cultura alimentaria mexicana, fomentando el uso de
ingredientes y recetas tradicionales."* Italy: **CREA's Linee Guida 2018** — 13 directives, the
Mediterranean model, "standard Italian portions", EVOO, whole grains, legumes.
**For the game:** each kitchen links its own government's guide, in its own language. Institutional,
not vendor. **The Mexican guideline explicitly asks for traditional recipes — the health message and
the cultural message are one message, in Spanish, from the state.**

**6.3 · UNESCO lists three of the four as practices, not dishes.** Traditional Mexican cuisine (2010,
the Michoacán paradigm: milpa, chinampas, nixtamalization, comal and molcajete, *"collectives of
female cooks"*); the Mediterranean diet (2010, expanded 2013, *"particularly the sharing and
consumption of food"*); washoku (2013, *"respect for nature"*, New Year); kimjang (2013, making and
sharing kimchi, methods *"transmitted from a mother-in-law to her newly married daughter-in-law"*).
**For the game:** the heritage bodies define each cuisine by a social act between named people. That
is R12 handed to us.

**6.4 · The Mediterranean pyramid is the only major guideline whose *base* is the things this game
does** — conviviality, cooking, seasonality, traditional and local products, activity and rest
(Bach-Faig 2011, Mediterranean Diet Foundation).

**6.5 · Seasonality is a cultural value in the Mediterranean and Japanese frames and a weak nutrient
claim** — modern cultivars vary more by breed and feed than by season. **Seasons belong to the
fiction, not to a health claim.**

### Japanese

**6.6 · *Ichijū-sansai* is a slot template, not a recipe:** rice + soup + one main + two vegetable
sides, six hundred years old (honzen ryōri, Muromachi), today *"a flexible framework for traditional
and modern Japanese cuisine, Asian and Western cuisines, and beyond."*
**A meal planner is five empty slots. Filling them is a fit puzzle with no clock and no inventory.**

**6.7 · *Sa-shi-su-se-so* is an ordering rule with a physical reason:** sugar → salt → vinegar → soy
→ miso. *"Sugar does not penetrate into the ingredients as fast as others"*; soy, *"cooking too long
dulls its flavor and aroma"*; miso goes in off the heat at the end.
**The wrong order produces a real, duller dish rather than a fail state.**

**6.8 · The beginner pantry is four things:** rice, soy sauce, miso, dashi — *"these four alone let
you make miso soup, rice bowls, and simple glazed proteins"* — then sake, mirin, vinegar, sugar,
kombu, katsuobushi. The first five dishes as the biggest English-language Japanese home-cooking site
teaches them: miso soup with dashi from scratch, onigiri, teriyaki, a donburi, then nimono. *"Once
you master dashi, dishes like miso soup, nimono… become truly special."* `(blog)`

**6.9 · The evidence is real and observational.** Meta-analysis of prospective cohorts: pooled RR
0.83 CVD mortality, 0.80 stroke, 0.81 heart disease at high adherence; Ohsaki: highest adherence
associated with reduced all-cause mortality, functional disability and dementia; JPHC (n = 92,969,
18.9 years): top versus bottom Japanese Diet Index HR 0.86 all-cause, 0.89 CVD.

**6.10 · The caveat is salt, and it is large.** Mean intake 10.1 g/day (2019 National Health and
Nutrition Survey), double WHO; *"soy sauce, soybean paste, and salted fish account for 44% of total
salt intake, and seasonings overall contribute 66%"*; national target 7 g by 2032; *"low sodium soy
sauce is generally not available in Japan"*; sodium ↔ stroke, HR 1.55 top versus bottom quintile.
**The soup is where the salt hides. This is where a character teaches honestly instead of flattering
the cuisine.**

### Korean

**6.11 · The bapsang is abundance by design:** rice + soup + kimchi (always) + banchan, counted 3, 5,
7, 9, 12-cheop; *"kimchi isn't counted in the cheop system because it's considered so essential it
exists in its own category"*; odd numbers outside royal cuisine. Banchan are made ahead and eaten
across days — which is the cozy "abundance" third, and 3-cheop → 5-cheop is progression without a
score.

**6.12 · The healthy pattern is namul and jang, not barbecue.** *"Proportionally high consumption of
fresh or cooked vegetables (Namul), moderate to high consumption of legumes and fish and low
consumption of red meat"*, fermentation the representative method, banchan *"mostly seasoned with
various jang… and sesame or perilla oil."*
**The Korean kitchen's verb is "season a vegetable" — cheap, repeatable, un-timed.**

**6.13 · Five jars, then five dishes.** Ganjang, gochujang, doenjang, sesame oil, ssamjang, plus
gochugaru; then doenjang-jjigae (*"Koreans' everyday house food"*), kimchi-jjigae, a namul,
bibimbap, and kimchi itself as the long project. **The ordering of the five is `[TRAINING]`.**

**6.14 · Korean researchers say their own evidence is thinner than the Mediterranean's:** *"A lot of
clinical trial data related to the Mediterranean diet have been accumulated… but K-Food is still
under interventional trial."* Reported benefits are body weight and gastrointestinal; hansik is
associated with lower metabolic-syndrome risk.
**Do not borrow Mediterranean-strength language for Korean food.**

**6.15 · The caveat is sodium, and the honest version is neither superfood nor danger.** Kimchi is
about 20% of Korean sodium; national intake 3,136 mg/day in 2023, down from 3,289 in 2019, still
above WHO's 2,000; top sources noodles, dumplings, kimchi. Salted/pickled intake has a gastric-cancer
signal in case-control studies (+15% per 40 g/day pickled vegetables; a 2.2 M-person cohort at 1.1×
with salt preference) that *"cohort studies… showed no clear association"*; one study found kimchi
itself not associated with hypertension, plausibly via potassium. **The state now frames low-sodium
cooking as heritage**, so a less-salt kimchi is a Korean public-health message the game may repeat
without speaking over the culture.

### Mexican

**6.16 · The milpa is a plate, not a field:** maize + beans + squash, plus chile, tomato, quelites,
nopales, amaranth. Milpa tortillas against 100% maize: protein +14–20%, fibre +21%, calcium +35–48%,
*"lysine and tryptophan, increasing by over 50%"*; nixtamalization improves niacin and calcium
availability.
**The healthy Mexican pattern is the home plate — beans, tortilla, salsa, a green.**

**6.17 · Quelites, nopales and verdolagas are the under-taught vegetable layer.** Nopales: over 10%
DV calcium and magnesium per cup; verdolagas *"five to seven times more alpha-linolenic acid than
spinach"* `(blogs)`. *"What else grows in the milpa"* is a discovery mechanic with real content
behind it.

**6.18 · "Mexican food is unhealthy" is a Tex-Mex artefact.** Heavy cheese, sour cream, fried; *"a
loaded Tex-Mex burrito… reaches 800 to 1,200 calories"*; traditional home plates *"less cheese, more
vegetables, whole beans."*
**The kitchen is a home, never a restaurant.**

**6.19 · First five, as Mexican home-cooking teachers order them: salsa first.** *"Salsas are
suggested as the best place to start… less intimidating"*; then frijoles de la olla, arroz, corn
tortillas from masa harina; mole is the long project. Pantry: dried beans, masa harina, dried chiles
(ancho *"the workhorse"*), chipotles en adobo, lime.

### Italian

**6.20 · The Mediterranean diet has the strongest evidence of the four and one famous crack.**
Umbrella review, 87 studies, 1.4 M people: lower CHD, atrial fibrillation, stroke, hypertension, CVD
mortality. **PREDIMED, the key RCT, was retracted for randomisation problems and re-analysed**, and
Cochrane's verdict is *"low quality evidence of little or no effect… on total mortality, CVD
mortality, or MI, but moderate quality evidence of a reduction in the number of strokes."*
**Cite Cochrane, not a magazine, and say "associated with".**

**6.21 · Cucina povera is the healthy layer and Italy's own guideline agrees:** CREA 2018 emphasises
EVOO, whole grains and legumes; the 2010 pyramid puts legumes at more than two servings a week and
olive oil as the main fat. **Beans, greens, bread, oil — not cream.**

**6.22 · Pantry and first dishes.** EVOO, canned tomato, dried beans and lentils, pasta, Parmigiano,
anchovies, capers. Hazan's tomato-butter-onion sauce — three ingredients, 45 minutes barely stirred,
*"what you keep out is just as important as what you put in"* — then pasta e ceci (mashed chickpeas
as the sauce, no dairy), ribollita. Minestrone and aglio e olio as four and five are `[TRAINING]`.
**A 45-minute sauce you must not hurry is unrushable duration for free.**

**6.23 · Spaghetti bolognese, fettuccine Alfredo, spaghetti and meatballs and garlic bread are not
Italian; portions are smaller and pasta is a primo, not a pile.**
**Plate size is a health lesson and a culture lesson at once.**

### Respectful sourcing

**6.24 · Each cuisine has a native-language recipe site at national scale, all commercial.** Cookpad
(JP, 3.24 M recipes, 60 M monthly users), 만개의레시피 / 10000recipe (KR, *"Korea's No. 1"*),
Kiwilimón (MX, *"#1 food site in Mexico"*, founded 2009, 20k+ recipes), GialloZafferano (IT, 20 M
unique visitors a month, *"1 out of 2 Italians"*, founded 2006).

**6.25 · Cookbooks reviewers treat as canon** `(commercial listicles)`: JP — Tsuji *Japanese Cooking:
A Simple Art*, Andoh *Washoku*, Hachisu *Japan: The Cookbook*, Sakai *Japanese Home Cooking*; KR —
Maangchi *Real Korean Cooking*, Sohui Kim *Korean Home Cooking*, Hooni Kim *My Korea*; MX — Diana
Kennedy, Pati Jinich, Olvera *Tu Casa Mi Casa*; IT — Hazan *Essentials*, Anna Del Conte, Rachel
Roddy, *Il Cucchiaio d'Argento*. **A recipe credited to an author is R12 done cheaply.**

**6.26 · Institutes:** MAFF (washoku, shokuiku), the Korean Food Promotion Institution (2010), CREA
(IT), INSP/SSA (MX), Fundación Dieta Mediterránea.

---

## 7 · Cooking games, companion apps, and importing a recipe

### Games

**7.1 · Soup Pot (Chikon Club, 2021) is the shipped "no fail state, cook without a recipe" game, and
it is Filipino with Japanese and Korean DLC.** It *"doesn't have a fail state — the point is to
simply enjoy cooking"*; recipes *"are more like guidelines"*; a live-stream chat gives *"supportive
or snarky comments"* as you cook; 100 dishes at launch. **The chat is "the mistake becomes dialogue"
done as a chorus.** Its critical reception was not checked.

**7.2 · Kokoro Kitchen (2025) keeps the rhythm and deletes the subtraction:** *"no penalties for
being late or misdelivering an order… they will just leave without affecting the gameplay"*;
reviewers recommend it *"if you… are scared of time management games because of the time pressure"*;
81% positive of 69 Steam reviews at the time of the extract. **A second shipped answer that is not
"remove the clock": keep a gentle rhythm and make lateness cost nothing.** It is still a shop.

**7.3 · The Japanese/Korean cozy-cooking wave is almost entirely shop-framed** — Onigiri Shop
Simulator, Midori no Kaori, Kimbap Heaven Simulator, Cooking Japan. (*Do You Know Kimchi?* is an
action game about *finding* kimchi.) **The references AJ will bring will be shops. Ours is a home
kitchen — say so before the interview so the comparison is fair.**

**7.4 · Nintendo's *Personal Trainer: Cooking* (DS, 2008) is the closest ancestor to "learn a recipe
with wet hands":** ~240 recipes from the Tsuji Cooking Academy, hands-free voice (*continue, repeat,
last step*), technique videos, search by what you have. *"The voice commands and audio help are what
really make traditional cookbooks seem outdated."* **The reachable version is a step-at-a-time card
with big tap targets**; Web Speech is `[TRAINING]` and probably needs network. Note also that the
respectful path for the Japanese half was institutional — a cooking school — not scraped.

**7.5 · "Cozy" on Steam now routinely means a countdown with pastel.** Lemon Cake: *"the constant
pressure of customer orders, the countdown timer of their impatience"*; Cuisineer: *"a shallow but
fun cozy roguelike"*; Good Pizza, Great Pizza: 300 M downloads, *"emphasis on speed and accuracy"*,
and still called cozy. **When the owner says "chill" he means stricter than the tag.** There is no
calm Italian home-cooking game in anything this sweep searched.

**7.6 · Spiritfarer and Stardew are the shipped precedents for "the dish is the reply" and "recipes
come from people."** Spiritfarer: every spirit has likes, dislikes and a favourite, and feeding
moves mood and questlines. Stardew: recipes bought, learned from the Queen of Sauce, or **given by
friends**. **Take "a person gives you the recipe" and "the person reacts to what you made"; leave
the 80-recipe checklist and the buff table.**

**7.7 · The character companion that does not guilt: Finch.** The bird *"never dies if you skip a
day"*, *"no punishment for missing days"*, self-compassion over achievement, *"sends only
encouragement"* after an absence and *"actively deters you from an all-or-nothing mindset."* Ate /
AteMate: a photo food journal, *"no calories, no weighing"*, numbers optional and off by default.
**Take the bird, leave the outfit shop. A photo of the plate plus one reflective line is the calmest
logging shape found anywhere in this sweep.**

**7.8 · Cookpad's "Cooksnap" is the one social mechanic worth stealing:** a photo and *"it was
delicious"* sent **to the recipe's author**, which doubles as your own record of what you cooked.
**The "I made it" report to the character who gave you the recipe is the calm loop-closer — a reply,
not a score — and it is the household's own history, which is what a cookbook actually is.**

### Importing a recipe into a static, offline, server-less game

**7.9 · `schema.org/Recipe` is the shared wire format, and the property names are verified against
the schema source `(read)`:** `recipeIngredient` (*"free text or more structured values"*),
`recipeInstructions`, `recipeYield`, `prepTime`/`cookTime`/`totalTime` (ISO-8601 durations, e.g.
`PT5M`), `nutrition` → `NutritionInformation`, `recipeCuisine`, `suitableForDiet`. A JSON-LD reader
is ~100 lines of client JS.

**7.10 · Every serious importer works the same way, and the reference library has 639 registered
hosts plus a generic fallback `(read)`.** `recipe-scrapers`: JSON-LD first, then Microdata/RDFa/
OpenGraph, then site-specific HTML; *"if the 'supported_only' flag is enabled (the default), then
only websites that are known to be supported… will return scrapers. When disabled, the library will
attempt to retrieve generic schema.org recipe metadata from the HTML."* **Registered:**
giallozafferano, cookpad, justonecookbook, maangchi, directoalpaladar, cucchiaio. **Not registered:
kiwilimon, 10000recipe, mexicoinmykitchen, recetasgratis** — the Spanish-language Mexican sites are
the first thing to test by hand.

**7.11 · The fetch, not the parse, is the wall. `(read)`** MDN: *"browsers restrict cross-origin HTTP
requests initiated from scripts… unless the response from other origins includes the right CORS
headers."* **"Paste a link and we fetch it" is impossible on GitHub Pages without a server, full
stop.** The three honest routes: **(a) paste the text** — works everywhere, today; (b) a
**bookmarklet** that runs on the recipe page and reads its JSON-LD (Paprika ships exactly this); (c)
**`share_target`**, which is Chrome 89 / Chrome Android 76, **no Firefox, no Safari, no iOS**
`(read, browser-compat-data)` — and the shared `url` still cannot be fetched, so it is a paste with
one fewer tap.

**7.12 · Cooklang is a plain-text recipe grammar a textarea can hold `(read)`:** `@ingredient{2%cups}`,
`#pot`, `~{25%minutes}`, YAML front matter, `--` comments; the spec is MIT. Whether to adopt it or a
looser one-ingredient-per-line heuristic is a design call — `[TRAINING]`: the looser one matches how
people actually paste.

**7.13 · An ingredient list is not copyrightable; the prose, the headnote, the photos and the
compilation are.** US Copyright Office Circular 33 and the Compendium: *"a mere listing of
ingredients or contents is not copyrightable"*; the surrounding text is *"fully copyrightable."*
**For the game:** the owner's "copy and paste some recipes" is legal as ingredients + steps in the
player's own words, no blog prose, no photos. **Pasted recipes live in the player's own storage and
never in a public content pack**, the source URL is kept as the attribution, and anything *shipped*
in the pack is the household's own or institutional.

---

## 8 · Where the numbers may come from, and what a static game may embed

| Source | Licence, as found | Verdict for an open repo |
|---|---|---|
| **USDA FoodData Central** | **CC0 / public domain.** Attribution requested, not required. Bulk CSV; API key via data.gov. Types: Foundation, SR Legacy (final 2018), **FNDDS** (recipe-calculated dishes — the right one for *dishes*), Branded. English only | **The safe one.** Ship a JSON subset of a few hundred ingredients inside the pack, "Source: USDA FoodData Central" on the card. No runtime fetch, which is what a Pages PWA needs |
| **Open Food Facts** | **ODbL (database) + DbCL (contents) + CC BY-SA (images)** — attribution **and share-alike**. The docs themselves say there are *"no assurances that the data is accurate."* API 15 product / 10 search requests per minute per IP, custom User-Agent required, bulk files preferred. Coverage: Italy 263,739 products, Japan 35,345, Mexico 15,932, South Korea 2,709. Server code is AGPL `(read)` | Usable for **packaged products only, at build time** — but **the moment it is merged with FDC or MEXT into one table, the merged table is ODbL.** Korea's coverage is too thin to rely on |
| **Japan — MEXT Standard Tables** (2020, 8th rev., 2,478 foods; 2023 supplement) | MEXT site terms follow the **Government Standard Terms of Use v2.0, CC BY 4.0-compatible**; cite the source. Excel files exist | **The best-licensed national table after FDC.** Whether the site-wide terms cover the table files specifically was **not confirmed** |
| **Korea — RDA National Standard Food Composition DB 10.0** (3,272 foods, 130 nutrients, ~250k records) | **KOGL Type 1** (attribution; commercial and derivative use allowed) — **but the printed 10th-edition book is KOGL Type 2 (non-commercial)** and the 9th revision was CC BY-NC | Embed **from the DB**, never transcribe from the book. Whether Type 1 covers the whole download was not confirmed |
| **Italy — CREA tables** (900 foods, 20 categories, 120 nutrients) | Free to consult; CREA asks re-users to *"respect intellectual property and cite the original source."* **No explicit open licence** | **Link out, or ask.** FDC covers most Italian ingredients anyway |
| **Mexico — INCMNSZ tables / SMAE** | **No licence found** for INCMNSZ's *Tablas de composición* (FAO lists 2015; an extended 2019 database is served via CONABIO's SiAgro). **SMAE is a commercial book** (Fomento de Nutrición y Salud) | **Do not embed either.** Use FDC for nixtamal, chiles and frijol — it has them — and cite the Mexican *guideline* for the framing. Ask INCMNSZ/CONABIO if the owner wants the national table |

**If the game ever shows a "how healthy is this" signal, an ordinal is the understood format and the
algorithm is open.** Egnell 2018 (12 countries, ~1,000 people each) found Nutri-Score best at
objective understanding among five front-of-pack labels; updated 2023; Open Food Facts computes it
openly on 3 M+ products. **A letter or a colour, never a number — and see 5.7: better to show the
source and let the person read.**

**"Count kinds, not calories" has a basis, as association only.** American Gut (2018): ≥ 30 plant
types a week ↔ higher microbiome diversity; the popular sources are vendors (ZOE, tinyhealth).
**Variety is the one count that is calm, non-body, bilingual and pixel-drawable. Tag it "associated
with".**

### What the game may legally say

**A healthy-lifestyle app that makes no disease claim is "general wellness" and sits outside FDA
device enforcement** (FDA General Wellness policy, 2019, revised January 2026) — but only if it is
*"intended solely for… maintaining or encouraging a healthy lifestyle"* with no disease-specific
claim. **A health claim in advertising needs "competent and reliable scientific evidence"** — for
health claims, typically RCTs — **and a disclaimer does not cure a deceptive claim** (FTC Health
Products Compliance Guidance, December 2022; the FTC has acted against a weight-loss programme that
could not substantiate *"members lost an average of 53 pounds"*). **In the EU, health claims need
prior authorisation and claims about the rate or amount of weight loss are prohibited outright**
(Regulation (EC) 1924/2006).

> **Safe:** *"helps you plan, cook and keep a pantry"*; *"cooking at home is associated with better
> diet quality in cross-sectional studies (link)"*.
> **Not safe, in any language:** lowers blood pressure · lose 5 kg · prevents, treats, reverses,
> cures · any named disease as an outcome the player is earning.

**Allergens: the EU lists 14, the US nine** (sesame added by the FASTER Act, labelled since
2023-01-01: milk, egg, fish, crustacean shellfish, tree nuts, wheat, peanuts, soybeans, sesame).
Soy, wheat, fish, sesame and shellfish are pervasive in Japanese and Korean pantries; **cross-
contamination is invisible to any database**, `suitableForDiet` is optional and rarely filled, and a
pasted recipe carries no reliable allergen data.
**Never mark a dish "safe for". At most "contains: …" from its own ingredient list, with "read the
label" beside it. The game is never the allergen check.** No evidence either way was found on
liability, and nobody searched it.

---

## 9 · What the repo already has — `[CODE]`, re-grepped 2026-09-14

**The identifiers are the durable part. Every number below moved at least once during this sweep;
one of them by 334 lines.** Grep the identifier, never paste the number.

| Claim | Where |
|---|---|
| **No stakes by default, per chapter** | `const STK=` `engine/engine.js:359` → `{mode:"none",hearts:3}`; `stakesCfg()` `:362` reads the chapter's override; `stakesMode()` `:368`. The comment above it (`:354-358`) is the law: stakes *"may not take progress, the city or the save, and neither may harm a character"* |
| **The grade is always on, and it returns 3 when nothing has ever been answered** | `gradeOf(c)` `:374`; `if(!ans.length)return 3` at `:376`. **So a pack whose quests have no wrong answers grades 3 forever and only its warmest ending is reachable — silently, with no test failing** |
| **A document may be the object itself, never registered** | `docDef(id)` `:3369` — `id&&typeof id==="object"?id:(DC()[id]||null)`. **A recipe the player pasted ten seconds ago is a first-class document.** This is the single most useful fact in the sweep |
| **The reader takes real input** | `form` block `:3485`, with `fd.type==="area"` building a real `<textarea>` at `:3492`. **The paste surface already exists.** Also `blank` `:3455`, `sel` `:3475`, `btn`, `kv`, `t`, `note`, `docs` |
| **The reader can hold a pack-drawn picture** | `s2.art` `:3405`, baked at devicePixelRatio with smoothing off, `wide` for a picture you scroll along, `cap` for a caption. **Omitted from the product lens's inventory — a mock plan built from that list would have had nowhere to put a drawing** |
| **Copy out exists; paste-in does not** | `navigator.clipboard.writeText` at `:3673`, `:3939`, `:4759`, `:4921`; `readText` → **0 hits**. The player pastes into a field, which is fine |
| **A conversation with no right answer** | `RM()` / `INTERVIEW` `:220`, with a per-step answer history (`a.hist`) — "the cook remembers what you said last time" already ships |
| **Seasons** | `SEAS()` `:4255`, `seasonNow()` `:4256` — a plain global a document's `build()` may call |
| **No inventory, no pantry, no nutrition** | `grep -c inventory engine/engine.js` → **0**; "pantry" → 0 across `engine/`, `content/`, `changarrito/`; `nutri\|kcal\|calor` → 0 |
| **"Recipe" exists only as fiction, and it is the right fiction** | Doña Rosa's want-list row 9, *"That the mole recipe doesn't die with me / Que la receta del mole no se muera conmigo"* (`content/meridian/docs.js:294`); Chelo, *"I am the only recipe"* (`content/meridian/quests.en.js:223`, `quests.es.js:222`); *"My grandmother's recipe, my mother's pot, and the corner is mine"* (`content/meridian/strings.js:50`, ES `:271`) |
| **The engine already draws a kitchen** | `TILESIDE["V"]` `:1802` is a stove with burners, knobs and an oven window; `["K"]` `:1683` a counter; `["S"]` `:1672` shelving; `["T"]` `:1651` a table. `sideArt` `:1836` prefers the engine's drawing. **A cooking pack inherits somebody else's stove before it draws anything** |
| **A glyph becomes a box the moment a side drawing exists** | `t3Boxy` `engine/engine3d.js:259` — `(m.box\|\|m.kind==="furniture"\|\|m.kind==="appliance") && TILESIDE[g]`. **`docs/BEAUTIFY.md:25-27` cites `:241` and drops the `TILESIDE` clause — drift, not a wrong rule** |
| **There is still no `kind:"flat"`** | `engine/engine3d.js:212` reads `m.kind==="water"`. A chalked market floor, a herb plot or a kitchen mat must be declared `water` or ship as a cardboard cutout |
| **A pack cannot choose its careers** | `data-c="architect"` hardcoded in all three shells (`index.html:386`, `changarrito/index.html:385`, `content/gauge/index.html:386`); `SHIRTS` `engine/engine.js:431`. **A kitchen would ask you at the front door whether you are The Architect, The Diplomat or The Operator** |
| **An endless world may not have a second district** | `test/engine.smoke.js:794-795` fails any pack declaring `ENDLESS` **and** `CHAPTERS`: *"a world that does not end cannot also have a last day"* — and `CHAPTERS` is both the endings **and** the districts |
| **Pack state does not cross a device** | `save()` `:503` is a closed twenty-key struct; `sanitizeSave()` `:516` **rebuilds** a whitelisted object and drops unknown keys (`:553-563`); `passURL()` `:4881` carries `loadSave()` and nothing else. Anything a pack persists through `SK()` (`:13`) survives a reload and **dies silently on the Trolley Pass** |
| **The .ics exporter is one dog's care sheet** | `icsData()` `:4705` emits five fixed events stamped `mq-care-<i>@meridian-quest`. **Not a gap** — a pack writes its own VCALENDAR from a `btn.run` and downloads it the way the engine already does at `:3677` |
| **"Search" is a dropdown plus one town's implementation** | The engine supplies `sel`, `form`, `t`. The index — categories, tag search, sort, persistence — is ~500 lines of *pack* code in `changarrito/content/record.js` (`indexDoc()` `:248`). `tlFindNext` `engine/engine.js:4592` is find-in-a-textarea in the admin text lab, not a search over content |
| **Re-opening a document scrolls it to the top** | `docOpen` `:3519` sets `scrollTop=0` unconditionally, and the index pattern redraws by calling `docOpen` again. A forty-item pantry with a button halfway down will be bitten on the first press. **Reasoned from the code; not reproduced in a browser** |
| **The reader's Markdown export drops interactive blocks** | `docMarkdown` handles `h p note blank kv t q docs` and **not** `btn sel form red`, and escapes only `|`. **"Copy this recipe" copies the words and silently drops every tick box** — so design the card so the words are the recipe |

**Nothing in `content/meridian/` is edited for this.** Per `CLAUDE.md`, Meridian's content is never
touched for another world's sake; this goes in a new pack.

---

## 10 · Limitations — what must not be promised

1. **No weight claim, ever.** The best habit RCT produced under a kilo and washed out (1.6); cooking
   and planning evidence is cross-sectional (2.1, 2.2); EU law prohibits rate-or-amount-of-weight-loss
   claims outright.
2. **No claim that the game changes what anyone eats.** 36 RCTs, gamified versus non-gamified apps:
   *"no significant effects… on dietary factors"* (4.4). Promise planning, cooking, remembering and
   learning (2.2, 2.4, 4.12).
3. **Calorie counting, tracking and streaks are the three mechanics most likely to harm the people
   most likely to play this** (3.1–3.3). A calm game with a kcal meter has un-calmed itself.
4. **Gamification's base is steps, not food, and is "remarkably" mixed** (4.3, 4.4). The adult
   nutrition RCTs are thin. Do not cite gamification research as proof that gamifying eating works.
5. **There is no trial of a calm or cozy game for eating.** The cozy evidence is correlational
   well-being and one 20-minute physiology study (4.10). **This design rests on transfer, and the
   transfer is an argument, not a measurement.**
6. **Most kitchen-environment folklore is Wansink** (5.2). The defensible levers are portion size and
   friction.
7. **A pantry ledger rots by week three** (5.3), an expiry list is a guilt list (5.5), a vanishing
   daily offer is scarcity (5.6), and a planned-meals calendar that marks missed days is a day
   budget.
8. **"Healthy" is not one thing** (6.10, 6.15, 6.20, 6.2). Japan and Korea's protective patterns come
   with a documented sodium problem; the Mediterranean's key RCT was retracted; Mexico's plate is 15%
   legumes. **A game that says "Japanese = healthy" is wrong in the way R12 warns about.**
9. **Cross-cultural transfer is unproven.** Every guideline is written for its own population; nobody
   has tested a Mexican plate for a Korean eater. **Attribute each plate to its guideline and its
   person.** Four "national" kitchens is a museum; four households is a game.
10. **No medical, allergy or condition advice.** Diabetes, kidney disease, pregnancy, coeliac — all
    out of scope; a character says "ask your clinician" once, kindly, and never again.
11. **Computed nutrition on pasted recipes is unreliable** (5.6 — Mealime's own complaint: totals
    skip unmeasured ingredients) **and a computed score becomes a verdict** (5.7).
12. **Licences bite in four places** (§8): OFF is share-alike and infects a merged table; Mexico's
    national table has no licence found; Korea's printed book is non-commercial; CREA offers no open
    licence. **FDC and MEXT are the two clean ones.**
13. **URL import cannot exist without a server** (7.11), and `share_target` is Chrome/Android only
    (7.11).
14. **The vendor numbers are unverifiable** — Duolingo's 2.4× and 21%, the 3–4% retention, the
    90%/30-day figure, Finch's retention claims, Yuka's 78%. Direction, not figures. And the
    *"78% / UCSF"* streak-collapse number is untraceable: **do not cite it.**
15. **Bilingual and Spanish-language evidence was not checked at all** (§11).
16. **Every `[WEB]` claim here is a search extract** (§0).

## 11 · The good — the three things the evidence most supports

1. **Make it about planning and cooking a meal at home, for someone, and let the pantry be a list and
   a freezer.** That is 2.1–2.5 in one loop, it is what all four guideline systems ask for, and its
   outcome — cooking confidence — is the one with ten-year longitudinal support. It is also the
   2026-09-11 sweep's verdict ("the dish is the reply") with the nutrition evidence attached.
2. **Use habit science's actual shape:** one small **added** action, tied to a cue she already meets,
   offered at a fresh start (a new season, a new shelf), written as an if-then plan out loud, with
   warm and unpredictable acknowledgement from named people — **and no streaks, no counters that can
   fall, no subtractions.** (1.1–1.5, 3.3, 3.4, 4.1, 4.2.) The engine's per-chapter no-stakes default
   is already this rule.
3. **Count kinds, not calories, and cite the plate.** A composed plate — MyPlate's half-and-half,
   Mexico's 50/22/15/8/5, *ichijū-sansai*, banchan plus a cup of water — and a variety count are
   ordinal, drawable, bilingual and never a number about a body. Numbers, if ever, come from FDC
   (CC0) and MEXT (CC BY-compatible) with the source printed on the card. **And each cuisine gets a
   citation card: its own government's guide, in its own language — which is the owner's "places to
   check about this facts" answered as content instead of as a nutrient engine.**

---

## 12 · Sources

`(read)` = the page was actually opened. Everything else is a search-result extract.
`(v)` = vendor, competitor or company blog. Grouped by lens so nothing was lost in the merge.

### Habit science, cooking, planning, tracking

Lally et al. 2010 — https://onlinelibrary.wiley.com/doi/10.1002/ejsp.674 ·
https://www.bps.org.uk/research-digest/how-form-habit ·
https://www.thebehavioralscientist.com/articles/how-long-to-form-a-habit
Gardner, Lally & Wardle 2012 — https://bjgp.org/content/62/605/664
Wood & Neal 2016 — https://journals.sagepub.com/doi/10.1177/237946151600200109 ·
https://dornsife.usc.edu/wendy-wood/wp-content/uploads/sites/183/2023/10/Wood.Neal_.2016.pdf
Verplanken & Roy 2016 — https://www.sciencedirect.com/science/article/pii/S0272494415300487 ·
McMillan 2023 — https://compass.onlinelibrary.wiley.com/doi/10.1111/spc3.12845
Fresh start / temptation bundling — https://www.ncbi.nlm.nih.gov/books/NBK593511/ ·
https://pubsonline.informs.org/doi/10.1287/mnsc.2013.1784
Adriaanse et al. 2011 — https://pubmed.ncbi.nlm.nih.gov/21056605/ ·
https://www.sciencedirect.com/science/article/abs/pii/S0195666318314363
Gollwitzer & Sheeran 2006 — https://www.researchgate.net/publication/37367696 ·
https://cancercontrol.cancer.gov/sites/default/files/2020-06/goal_intent_attain.pdf
Singh et al. 2024 — https://www.mdpi.com/2227-9032/12/23/2488 ·
https://pubmed.ncbi.nlm.nih.gov/39685110/
10 Top Tips RCT — https://www.nature.com/articles/ijo2016206 ·
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5300101/
Wolfson & Bleich 2015 — https://pmc.ncbi.nlm.nih.gov/articles/PMC8728746/ ·
https://hub.jhu.edu/gazette/2015/january-february/currents-home-cooking-is-healthier/ ·
https://www.cambridge.org/core/journals/public-health-nutrition/article/more-frequent-cooking-at-home-is-associated-with-higher-healthy-eating-index2015-score/A6515CE705AA635DE9EB02FC4384F766 ·
Wolfson 2020 — https://pubmed.ncbi.nlm.nih.gov/31918785/
Ducrot et al. 2017 — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5288891/ ·
https://link.springer.com/article/10.1186/s12966-017-0461-7
Food waste — https://www.sciencedirect.com/science/article/pii/S2666784323000438 ·
https://www.sciencedirect.com/science/article/pii/S0301479723014561 ·
https://www.ncbi.nlm.nih.gov/books/NBK564041/
Food literacy and cooking skills — https://pmc.ncbi.nlm.nih.gov/articles/PMC11350956/ ·
https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0355940 ·
https://pmc.ncbi.nlm.nih.gov/articles/PMC6086120/ · https://pmc.ncbi.nlm.nih.gov/articles/PMC6655530/ ·
https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2022.802940/full ·
https://www.ncbi.nlm.nih.gov/books/NBK293481/ ·
https://link.springer.com/article/10.1186/s40795-019-0293-8
Commensality — https://pmc.ncbi.nlm.nih.gov/articles/PMC13402156/ ·
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8036467/
Burke 2011 — https://www.jandonline.org/article/s0002-8223(10)01644-5/abstract ·
Helander 2014 — https://www.jmir.org/2014/4/e109/ · https://pmc.ncbi.nlm.nih.gov/articles/PMC4004142/
Levinson 2017 — https://pmc.ncbi.nlm.nih.gov/articles/PMC5700836/ ·
https://pubmed.ncbi.nlm.nih.gov/28843591/ · Berry 2024 —
https://onlinelibrary.wiley.com/doi/full/10.1002/eat.24192 · rigid vs flexible control —
https://pubmed.ncbi.nlm.nih.gov/28131005/ · Linardon 2021 —
https://onlinelibrary.wiley.com/doi/abs/10.1002/eat.23509 · Flinders review —
https://www.eurekalert.org/news-releases/1074348 ·
https://www.sciencedirect.com/science/article/abs/pii/S1471015317301484 ·
https://www.sciencedirect.com/science/article/abs/pii/S2212267221007346
Self-compassion after a lapse — https://pubmed.ncbi.nlm.nih.gov/37619622/ ·
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8451927/
App abandonment — https://www.jmir.org/2024/1/e56897 · https://pubmed.ncbi.nlm.nih.gov/39693620/ ·
Cordeiro CHI 2015 — https://pubmed.ncbi.nlm.nih.gov/26894233/ ·
https://dl.acm.org/doi/10.1145/2702123.2702155 ·
https://www.washington.edu/news/2015/04/16/research-identifies-barriers-in-tracking-meals-and-what-foodies-want/
Hollands 2015 (Cochrane, portion size) —
https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011045.pub2/full ·
https://pubmed.ncbi.nlm.nih.gov/26368271/
Wansink retractions — https://www.buzzfeednews.com/article/stephaniemlee/brian-wansink-jama-six-retractions-cornell ·
https://www.theglobeandmail.com/life/health-and-fitness/article-despite-retracted-papers-concepts-about-overeating-still-carry-some/ ·
https://www.npr.org/sections/thesalt/2016/02/15/466567647/a-cluttered-kitchen-can-nudge-us-to-overeat-study-finds
(the retracted-era claim, kept as the example)

### Gamification, SDT, play and wellbeing

Ng et al. — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3441783/ · SDT gamification framework 2026 —
https://pubmed.ncbi.nlm.nih.gov/42460595/ ·
https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1634267/full
Deci, Koestner & Ryan 1999 —
https://home.ubalt.edu/tmitch/642/articles%20syllabus/Deci%20Koestner%20Ryan%20meta%20IM%20psy%20bull%2099.pdf ·
2001 — https://journals.sagepub.com/doi/10.3102/00346543071001001
Johnson et al. 2016 — https://www.sciencedirect.com/science/article/pii/S2214782916300380
Koivisto & Hamari 2019 — https://www.sciencedirect.com/science/article/pii/S0268401217305169
Mazeas 2022 — https://www.jmir.org/2022/1/e26779
Nishi/Kavanagh 2024 — https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(24)00377-8/fulltext ·
https://pmc.ncbi.nlm.nih.gov/articles/PMC11701442/
STEP UP — https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2749761 · Patel 2021 —
https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2781732 · Rewley 2021 —
https://journals.sagepub.com/doi/abs/10.1089/g4h.2021.0130
Vegethon — https://ijbnpa.biomedcentral.com/articles/10.1186/s12966-017-0563-2 ·
https://pubmed.ncbi.nlm.nih.gov/28915825/
Leaderboards and comparison —
https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2026.1794299/full ·
Berger & Jung 2024 — https://journals.sagepub.com/doi/full/10.1177/20552076241260482 ·
https://dl.acm.org/doi/10.1145/3706598.3713737 (title only)
Bickmore 2013 — https://pubmed.ncbi.nlm.nih.gov/24001030/
Animal Crossing and needs — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9022176/ · Johannes, Vuorre
& Przybylski 2021 — https://pubmed.ncbi.nlm.nih.gov/33972879/ · *Flower* vs body scan —
https://link.springer.com/article/10.1007/s43076-021-00062-6 · Przybylski, Rigby & Ryan 2010 —
https://journals.sagepub.com/doi/10.1037/a0019440
Novelty effect — https://durham-repository.worktribe.com/output/1203194/ ·
https://onlinelibrary.wiley.com/doi/abs/10.1111/jcal.12385
Message framing — https://www.jmir.org/2019/10/e14074/ · https://doi.org/10.1177/2055207619832767
Nicholson, *A RECIPE for Meaningful Gamification* — https://scottnicholson.com/pubs/recipepreprint.pdf
Serious games and eating — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9493252/ ·
https://pmc.ncbi.nlm.nih.gov/articles/PMC10056209/ · Squire's Quest! II —
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3626159/ · https://pubmed.ncbi.nlm.nih.gov/27169641/ ·
https://www.sciencedirect.com/org/science/article/pii/S229152222000128X · children's nutrition
gamification — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8308535/ · SDT in education —
https://link.springer.com/article/10.1007/s11423-023-10337-7 · apps RCT review —
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10811159/
Streaks `(v)` — https://trophy.so/blog/streaks-feature-gamification-examples ·
https://www.professorgame.com/podcast/423/ · https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth ·
https://apptitude.io/blog/how-duolingos-streak-mechanic-actually-works/ ·
https://www.psychologytoday.com/us/blog/stigma-addiction-and-mental-health/202309/the-abstinence-violation-effect-and-overcoming-it ·
**untraceable, do not cite:** https://www.alibaba.com/product-insights/ai-powered-habit-tracker-that-predicts-relapse-vs-streak-counting-apps-behavior-change-science-check.html
Health-app churn `(v)` — https://sahha.ai/blog/health-app-churn-retention/

### Guidelines, cuisines and heritage

WHO — https://cdn.who.int/media/docs/default-source/healthy-diet/healthy-diet-fact-sheet-394.pdf ·
https://www.who.int/news-room/fact-sheets/detail/healthy-diet
DGA / MyPlate — https://www.dietaryguidelines.gov/sites/default/files/2021-03/Dietary_Guidelines_for_Americans-2020-2025.pdf ·
https://ask.usda.gov/s/article/Am-I-permitted-to-use-content-or-materials-from-ChooseMyPlate-gov ·
https://www.myplate.gov/resources/graphics · https://www.medlineplus.gov/ency/article/002093.htm
Mediterranean — https://pubmed.ncbi.nlm.nih.gov/23258395/ ·
https://ajcn.nutrition.org/article/S0002-9165(25)00259-X/fulltext · https://hal.science/hal-02651767/ ·
https://www.researchgate.net/publication/51875439 · umbrella review —
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11795232/ · Cochrane —
https://www.cochrane.org/about-us/news/featured-review-mediterranean-style-diet-prevention-cardiovascular-disease ·
https://pubmed.ncbi.nlm.nih.gov/42090744/
Italy — https://www.crea.gov.it/en/web/alimenti-e-nutrizione/-/linee-guida-per-una-sana-alimentazione-2018 ·
https://www.epicentro.iss.it/alimentazione/linee-guida-sana-alimentazione-crea-2018 ·
https://www.crea.gov.it/en/-/on-line-le-linee-guida-per-una-sana-alimentazione-2018 ·
https://www.alimentinutrizione.it/sezioni/tabelle-nutrizionali/ ·
https://www.crea.gov.it/en/-/tabella-di-composizione-degli-alimenti · myths —
https://www.thelocal.it/20181106/common-myths-about-italian-food-you-need-to-stop-believing/ ·
https://www.visititaly.eu/food-and-flavours/italian-food-myths · pantry and first dishes —
https://www.insidetherustickitchen.com/italian-pantry-essentials/ ·
https://www.pbs.org/food/recipes/marcella-hazans-tomato-sauce-with-onion-and-butter ·
https://www.carluccios.com/blogs/journal/the-cucina-povera-guide-5-peasant-recipes-for-modern-kitchens `(v)`
Japan — https://www.fao.org/nutrition/education/food-dietary-guidelines/regions/countries/japan/en/ ·
https://www.maff.go.jp/j/syokuiku/attach/pdf/shishinn-10.pdf ·
https://www.maff.go.jp/j/syokuiku/guide/pdf/00_en_guide.pdf ·
https://www.maff.go.jp/e/policies/market/washoku-world-challenge/en/learning_01.html ·
https://www.mhlw.go.jp/bunya/kenkou/pdf/eiyou-syokuji5.pdf ·
https://www.japaneselawtranslation.go.jp/en/laws/view/3419/en · JPHC —
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7987617/ · cohort meta-analysis —
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9147868/ · Ohsaki —
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9146082/ · JACC —
https://pmc.ncbi.nlm.nih.gov/articles/PMC13487901/ · salt —
https://pmc.ncbi.nlm.nih.gov/articles/PMC9899568/ ·
https://www.ahajournals.org/doi/10.1161/01.str.0000130425.50441.b0 ·
https://www.news-medical.net/news/20250218/From-soy-sauce-to-sodium-labels-How-Japan-is-rethinking-salt-reduction.aspx ·
https://www.jstage.jst.go.jp/article/eiyogakuzashi/79/5/79_253/_pdf · home cooking `(blogs)` —
https://www.justonecookbook.com/ichiju-sansai/ · https://www.justonecookbook.com/sa-shi-su-se-so-seasoning-order/ ·
https://www.justonecookbook.com/categories/pantry/pantry-essentials/ ·
https://www.justonecookbook.com/homemade-miso-soup/ · https://www.justonecookbook.com/everyday/quick-and-easy/ ·
https://www.nippon.com/en/guide-to-japan/gu020011/ ·
https://www.japanculinaryinstitute.com/post/japanese-home-cooking-one-soup-three-side-dishes ·
https://tomatostoreus.com/blogs/tomato-japanese-grocery-pantry-blog/japanese-pantry-essentials-beginners `(v)`
Korea — https://www.fao.org/nutrition/education/food-dietary-guidelines/regions/countries/republic-of-korea/en/ ·
https://www.researchgate.net/figure/The-Korean-Food-Balance-Wheels-Source-Dietary-Reference-Intakes-for-Koreans-First_fig1_235670321 ·
https://onav.fr/wp-content/uploads/2021/01/General-Dietary-Guidelines-for-Koreans.pdf ·
https://www.e-jnh.org/Synapse/Data/PDFData/1124JNH/jnh-55-21.pdf · K-diet —
https://www.sciencedirect.com/science/article/pii/S2352618116300099 ·
https://journalofethnicfoods.biomedcentral.com/articles/10.1186/s42779-023-00184-5 ·
https://journalofethnicfoods.biomedcentral.com/articles/10.1186/s42779-023-00172-9 · sodium —
https://e-nrp.org/DOIx.php?id=10.4162%2Fnrp.2021.15.3.382 ·
https://www.koreaherald.com/article/10521873 ·
https://www.koreatimes.co.kr/southkorea/health/20250701/noodles-dumplings-kimchi-among-top-sources-of-sodium-in-koreans-diets ·
https://www.koreatimes.co.kr/southkorea/health/20260829/less-salt-more-soul-korea-blends-heritage-health-at-national-museum ·
gastric cancer — https://pmc.ncbi.nlm.nih.gov/articles/PMC3204471/ ·
https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7225928/ ·
https://www.sciencedirect.com/science/article/pii/S0002916523018154 · kimchi —
https://www.sciencedirect.com/science/article/pii/S2352618114000055 · home cooking `(blogs, vendors)` —
https://www.maangchi.com/recipe/doenjang-jjigae · https://www.maangchi.com/recipes/easy ·
https://www.maangchi.com/real · https://kimchimari.com/basic-korean-pantry-list-of-essentials/ ·
https://www.myfreshdash.com/post/the-ultimate-korean-sauce-guide `(v)` ·
https://www.tastekoreanfood.com/ktrend/guide-to-banchan-korean-side-dishes `(v)` ·
https://en.wikipedia.org/wiki/Banchan · https://en.wikipedia.org/wiki/Korean_Food_Promotion_Institution
Mexico — https://www.fao.org/nutrition/education/food-dietary-guidelines/regions/countries/Mexico/es ·
https://www.gob.mx/salud/sinsamac/documentos/guias-alimentarias-saludables-y-sostenibles-para-la-poblacion-mexicana-2025 ·
https://ve.scielo.org/scielo.php?script=sci_arttext&pid=S0798-07522023000200102 ·
https://www.ciad.mx/nuevas-guias-alimentarias-para-la-poblacion-mexicana-y-el-plato-del-bien-comer/ ·
https://alianzasalud.org.mx/2023/04/presenta-ssa-nuevas-guias-alimentarias-2023/ ·
https://movendi.ngo/wp-content/uploads/2023/05/Gui_as_Alimentarias_2023_para_la_poblacio_n_mexicana.pdf ·
https://uo.edu.mx/plato-del-bien-comer-la-guia-alimentario-de-mexico/ ·
https://www.nutrikit.mx/blogs/news/las-10-recomendaciones-de-las-guias-alimentarias-2023-para-una-dieta-saludable-y-sostenible `(v)` ·
milpa — https://pmc.ncbi.nlm.nih.gov/articles/PMC13023061/ ·
https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2023.1169675/full ·
https://pubmed.ncbi.nlm.nih.gov/41494323/ · vegetables `(blogs)` —
https://nutritionconsabor.com/mexicanvegetables/ ·
https://www.fridascocinatx.com/blog/quelites-mexicos-wild-greens-and-their-nutritional-powerhouse ·
myths — https://www.tastingtable.com/2116950/biggest-mexican-food-myth-unhealthy/ ·
https://latortilleria.com.au/news-and-articles/myths-and-misconceptions-of-mexican-food-part-2/ `(v)` ·
first five — https://www.npr.org/2022/10/28/1132205161/mexican-cooking-ingredients-expert-tips ·
https://www.mexicoinmykitchen.com/basic-recipes/ · https://www.aol.com/lifestyle/pati-jinich-just-told-us-213444313.html
UNESCO — https://ich.unesco.org/en/RL/traditional-mexican-cuisine-ancestral-ongoing-community-culture-the-michoacan-paradigm-00400 ·
https://ich.unesco.org/en/decisions/5.COM/6.41 ·
https://ich.unesco.org/en/RL/washoku-traditional-dietary-cultures-of-the-japanese-notably-for-the-celebration-of-new-year-00869 ·
https://ich.unesco.org/en/RL/kimjang-making-and-sharing-kimchi-in-the-republic-of-korea-00881 ·
https://www.nippon.com/en/behind/l00052/washoku-designated-unesco-intangible-cultural-heritage.html ·
https://www.unesco.org/archives/multimedia/document-3915
Ultra-processed — https://bmjgroup.com/consistent-evidence-links-ultra-processed-food-to-over-30-damaging-health-outcomes/ ·
https://pubmed.ncbi.nlm.nih.gov/38688162/ ·
https://www.sciencemediacentre.org/expert-reaction-to-umbrella-review-looking-at-ultra-processed-food-exposure-and-adverse-health-outcomes/
Seasonality — https://www.cambridge.org/core/journals/proceedings-of-the-nutrition-society/article/seasonality-and-dietary-requirements-will-eating-seasonal-food-contribute-to-health-and-environmental-sustainability/08545F71A12EF0FE233E8D1DEFEF227A
Cookbook and site lists — https://bookriot.com/best-japanese-cookbooks/ ·
https://www.tastingtable.com/1468937/essential-mexican-food-cookbooks/ ·
https://www.deliciousmagazine.co.uk/italiancookbooks/ · https://en.wikipedia.org/wiki/Cookpad ·
https://m.10000recipe.com/en/home.html · https://www.mexico.mx/es/articles/kiwilimon-la-receta-del-exito-con-mucho-sabor ·
https://www.giallozafferano.it/staff/chisiamo.html

### Products, games, import and format

Pantry and meal apps `(mostly vendor)` — https://www.pantrypersona.com/blog/best-pantry-inventory-apps-2026 ·
https://fango.fi/en/blog/best-pantry-inventory-app/ · https://fango.fi/en/blog/pantry-check-app-alternatives/ ·
https://recipyapp.com/blog/best-pantry-tracking-apps-2026 · https://thesurvivalmom.com/best-food-storage-app/ ·
https://apps.apple.com/us/app/nowaste-food-inventory-list/id926211004?see-all=reviews&platform=iphone ·
https://justuseapp.com/en/app/1352600944/cooklist-pantry-to-recipes/reviews ·
https://play.google.com/store/apps/details?id=com.cooklist.android&hl=en_US ·
https://www.plantoeat.com/blog/2023/07/paprika-app-review-pros-and-cons/ ·
https://paprikaapp.zendesk.com/hc/en-us/articles/115004481294-What-s-New-on-iOS-Paprika-3 ·
https://eathealthy365.com/paprika-3-recipe-manager-is-it-worth-it/ ·
https://www.complaintsboard.com/paprika-recipe-manager-3-b149019 ·
https://www.largefamilyarrows.com/post/plan-to-eat-the-ultimate-meal-planner-app-review ·
https://play.google.com/store/apps/details?id=com.plantoeat.mobile ·
https://www.148apps.com/kptncook-meal-plans-recipes/kptncook-review/ ·
https://old.maroonweekly.com/app-review-kptncook/ ·
https://apps.apple.com/us/app/kptncook-recipes-cooking/id795495986?see-all=reviews ·
https://www.plantoeat.com/blog/2023/04/mealime-app-review-pros-and-cons/ ·
https://thesunrisedigest.com/eat/mealime-review-2026/ ·
https://www.plantoeat.com/blog/2026/01/samsung-food-review-pros-and-cons/ ·
https://home-cooks.co.uk/pages/review-whisk ·
https://eu.community.samsung.com/t5/mobile-apps-services/samsung-food-app/td-p/13362231 ·
https://www.pann-app.com/blog/anylist-review · https://lystbot.com/blog/best-grocery-list-apps/ ·
https://apps.apple.com/us/app/id522167641?see-all=reviews ·
https://help.yuka.io/l/en/article/ijzgfvi1jq-how-are-food-products-scored ·
https://abbylangernutrition.com/yuka-app-review-scan-or-scam/ · https://mamaknowsnutrition.com/yuka-app-reviews/ ·
https://www.businesswire.com/news/home/20251209219183/en/78-of-French-Food-Manufacturers-Now-Factor-Yuka-Scores-Into-Product-Formulation ·
https://mealthinker.com/blog/meal-planning-feels-like-chore `(v, unsourced stat — do not quote)`
Companions — https://www.internetmatters.org/advice/apps-and-platforms/wellbeing/finch/ ·
https://habitbox.app/blog/finch-app-review `(v)` · https://www.aviewfromthecave.com/what-is-finch-app/ ·
https://slate.com/technology/2026/09/finch-app-self-care-wellness-review.html ·
https://www.deconstructoroffun.com/blog/x0hd2ssr80y5n7gv0w967pg7hwd7tl · https://youate.net/ `(v)` ·
https://home-cooks.co.uk/pages/review-ate
Games — https://www.gamespot.com/articles/i-appreciate-soup-pot-an-upcoming-cooking-game-for-xbox-that-wont-judge-me-for-my-mistakes/1100-6489407/ ·
https://www.esquiremag.ph/culture/tech/soup-pot-chikon-club-a00225-20210613-lfrm2 · https://www.chikon.club/faqs `(v)` ·
https://ladiesgamers.com/kokoro-kitchen-review/ · https://www.missitheachievementhuntress.com/kokoro-kitchen-review/ ·
https://store.steampowered.com/app/3079770/Kokoro_Kitchen/ ·
https://www.comfycozygaming.com/2026/02/06/3-cozy-japanese-food-games/ · https://indiegame.com/en/archives/28585 ·
https://store.steampowered.com/app/3915140/Onigiri_Shop_Simulator/ ·
https://store.steampowered.com/app/3118740/Do_You_Know_Kimchi/ ·
https://worthplaying.com/article/2009/1/9/reviews/57871-nds-review-personal-trainer-cooking/ ·
https://blogcritics.org/nintendo-ds-review-personal-trainer-cooking/ ·
https://www.metacritic.com/game/personal-trainer-cooking/ ·
https://fingerguns.net/reviews/2022/10/19/lemon-cake-review-switch-star-baker/ ·
https://ladiesgamers.com/lemon-cake-review/ · https://monstervine.com/2025/01/cuisineer-review-cozy-roguelike/ ·
https://goodpizzagreatpizza.com/press/ `(v)` · https://www.cozyshiro.com/post/cozy-game-review-good-pizza-great-pizza ·
https://spiritfarer.fandom.com/wiki/Cooking · https://www.cbr.com/spiritfarer-spirits-favorite-food/ ·
https://stardewvalleywiki.com/Cooking · https://www.gameshub.com/news/opinions-analysis/best-cooking-video-games-8414/ ·
https://gdcvault.com/play/1029400/-Unpacking-Zen-Designing-a
Import and format — **`(read)`** https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/schema.ttl ·
https://github.com/micahcochran/scrape-schema-recipe ·
https://raw.githubusercontent.com/hhursev/recipe-scrapers/main/recipe_scrapers/__init__.py ·
https://raw.githubusercontent.com/hhursev/recipe-scrapers/main/recipe_scrapers/_factory.py ·
https://github.com/hhursev/recipe-scrapers · https://github.com/cooklang/spec ·
https://github.com/mdn/content/blob/main/files/en-us/web/http/guides/cors/index.md ·
https://github.com/mdn/content/blob/main/files/en-us/web/progressive_web_apps/manifest/reference/share_target/index.md ·
https://raw.githubusercontent.com/mdn/browser-compat-data/main/manifests/webapp/share_target.json —
extracts: https://cooklang.org/docs/spec/ `(v)` · https://www.paprikaapp.com/bookmarklet/ `(v)` ·
https://eathealthy365.com/the-ultimate-2026-guide-to-importing-recipes-into-paprika/ ·
https://developer.okta.com/blog/2021/08/02/fix-common-problems-cors · https://bugs.webkit.org/show_bug.cgi?id=194593 ·
https://cookpad.com/uk/cooksnap_intro `(v)` · https://blog.cookpad.com/uk/all-about-cooksnaps-cook-it-snap-it-share-it/ `(v)` ·
https://apps.apple.com/mx/app/recetas-kiwilim%C3%B3n/id680885433 `(v)`
Copyright — https://www.copyright.gov/circs/circ33.pdf ·
https://copyrightalliance.org/are-recipes-cookbooks-protected-by-copyright/ ·
https://www.nycbar.org/reports/secret-ingredients-how-to-protect-recipes/

### Nutrient databases, labels and law

USDA FDC — https://fdc.nal.usda.gov/api-guide/ · https://catalog.data.gov/dataset/fooddata-central ·
https://fdc.nal.usda.gov/data-documentation · https://fdc.nal.usda.gov/about-us.html ·
https://fdc.nal.usda.gov/download-datasets.html
Open Food Facts — **`(read)`** https://github.com/openfoodfacts/openfoodfacts-server/blob/main/docs/api/index.md ·
https://github.com/openfoodfacts/openfoodfacts-server/blob/main/README.md ·
https://github.com/openfoodfacts/openfoodfacts-server/blob/main/LICENSE — extracts:
https://world.openfoodfacts.org/terms-of-use · https://world.openfoodfacts.org/data ·
https://world.openfoodfacts.org/countries · https://forum.openfoodfacts.org/t/conditions-to-use-the-open-food-facts-api/443 ·
https://opendatacommons.org/licenses/odbl/
MEXT — https://www.mext.go.jp/b_menu/1351168.htm · https://www.mext.go.jp/a_menu/syokuhinseibun/mext_01110.html ·
https://fooddb.mext.go.jp/ · https://www.mext.go.jp/en/policy/science_technology/policy/title01/detail01/1374030.htm
RDA Korea — https://www.rda.go.kr/board/board.do?mode=view&prgId=day_farmprmninfoEntry&dataNo=100000778935 ·
https://www.data.go.kr/data/15123901/fileData.do ·
https://koreanfood.rda.go.kr/kfi/fct/fctIntro/list?menuId=PS03562 · https://koreanfood.rda.go.kr/eng/fctFoodSrchEng/main ·
https://kjcn.or.kr/DOIx.php?id=10.5720/kjcn.2018.23.4.352 ·
https://www.fao.org/food-composition/tables-and-databases/detail/(korea--2024)-korean-food-composition-table-2024/en
INCMNSZ / CONABIO / SMAE — https://www.incmnsz.mx/2017/Tablas/index.html ·
https://www.fao.org/food-composition/tables-and-databases/detail/(mexico--2015)-tabla-de-composici%C3%B3n-de-alimentos-y-productos-alimenticios-mexicanos/en ·
https://siagro.conabio.gob.mx/nutricion/download/Detalles_tecnicos.pdf ·
https://fns.org.mx/publicaciones-y-materiales-en-venta/sistema-mexicano-de-alimentos-equivalentes-smae/ `(v)` ·
https://www.nutrimind.net/page/noticias/sistema_mexicano_alimentos_equivalentes_10_preguntas ·
https://www.amazon.com/SISTEMA-MEXICANO-ALIMENTOS-EQUIVALENTES-ED/dp/6070079280 `(v)`
Nutri-Score — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6213801/ ·
https://www.nature.com/articles/s43016-024-00920-3 ·
https://blog.openfoodfacts.org/en/news/open-food-facts-computes-the-new-nutriscore-on-3-million-products
30 plants `(v)` — https://zoe.com/learn/30-plants-per-week · https://wellnesspulse.com/nutrition/30-plants-a-week-gut-health/
Claims law — https://www.hhs.gov/guidance/document/general-wellness-policy-low-risk-devices-guidance-industry-and-food-and-drug ·
https://www.fda.gov/regulatory-information/search-fda-guidance-documents/general-wellness-policy-low-risk-devices ·
https://www.cov.com/en/news-and-insights/insights/2026/01/fda-issues-revised-guidance-on-general-wellness-products `(law firm)` ·
https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance ·
https://www.insideprivacy.com/advertising-marketing/ftc-targets-weight-loss-membership-program/ `(law firm)` ·
https://eur-lex.europa.eu/EN/legal-content/summary/nutrition-and-health-claims-made-on-foods.html
Allergens — https://www.fda.gov/food/food-allergies/faster-act-sesame-ninth-major-food-allergen ·
https://www.fda.gov/consumers/consumer-updates/have-food-allergies-read-label ·
https://food.ec.europa.eu/food-safety/campaign-2026/allergies_en ·
https://www.sciencedirect.com/science/article/pii/S095671352200754X · https://forkin.io/guides/eu-14-allergens `(v)`

### In this repo

`docs/GENRE-RULES.md` · `docs/ARCH-LOG.md` A11 · `docs/research/2026-09-11-cooking-games.md` ·
`docs/SOURCES.md` · `docs/GAUGE.md` · `docs/TAGS.md` · `engine/engine.js` · `engine/engine3d.js` ·
`changarrito/content/record.js` · `content/meridian/` · `test/engine.smoke.js` · `manifest.webmanifest` ·
`sw.js`

---

## 13 · What was not checked

**Sourcing**
- **No primary page outside GitHub was read by anybody.** Roughly eighty figures here are search
  extracts. Specifically unread: the Lally abstract (66 / 18–254 / 48%), Wolfson & Bleich's kcal
  figures, Ducrot's odds ratios, Levinson's 73%, Helander's 2.58%, the JPHC and Ohsaki hazard ratios,
  Hollands' 61 studies / 6,711 participants, the WHO fact-sheet numbers, Mexico's 50/22/15/8/5, the
  Cochrane Mediterranean abstract, Mazeas' effect sizes, Gollwitzer & Sheeran's d values.
- **The verbatim lists** — Italy's 13 directives, Japan's 10 messages, Korea's 9 guidelines, Mexico's
  10 recommendations, the UNESCO inscription texts. Gist only.
- **Three proxy status endpoints were themselves denied**, so no lens could confirm the allowlist.

**Licences and data**
- Whether MEXT's site-wide terms cover the composition-table files specifically, and what the 2023
  supplement changes.
- Whether Korea's KOGL Type 1 covers the whole DB 10.0 download or only some files, and whether the
  FAO-listed 2024/2025 English table is the same release.
- CREA's actual terms page (one sentence from an extract), and whether it offers a download at all.
- INCMNSZ / CONABIO licence — **nothing found, which is not proof there is none.**
- The Dietary Guidelines for Americans 2025–2030, and the revised January 2026 FDA general-wellness
  guidance beyond a law-firm summary.
- Whether the Japanese Spinning Top and the Plato del Bien Comer **images** are reusable. MyPlate's
  is public domain; the other two were not checked.

**Technical**
- Whether giallozafferano, kiwilimon, cookpad, 10000recipe, maangchi, justonecookbook or
  mexicoinmykitchen actually emit `schema.org/Recipe` JSON-LD. Every `curl` returned `000`. The
  scraper registry is indirect evidence for four of them; **Kiwilimón and 10000recipe have none and
  are the first to test by hand.**
- Whether the Web Speech API works offline; whether browser barcode scanning is feasible
  (`BarcodeDetector`/ZXing). Both `[TRAINING]`, unresearched.
- Whether the reader's scroll-to-top actually bites a player in the town today — reasoned from the
  code, **not reproduced**.
- The size of a `#save=` QR at the proposed 32 KB pack-state ceiling — **the number was picked from
  the shape of an existing log ceiling, not measured.**
- Whether `content/gauge/expected.txt`'s six deliberate failures apply to a kitchen pack's shape.

**Evidence not sought**
- **Bilingual and Spanish-language evidence on gamification, reminders or self-help apps: none.**
  Nothing here says the findings hold in Spanish. Same for Italian, Japanese and Korean literature
  (two licence queries aside).
- Allergen liability and food-safety claims: not searched.
- Non-Wansink evidence on home food availability and visibility: not searched. `[TRAINING]`.
- Children and adolescent nutrition trials were deliberately excluded from the psychology lens
  (the owner is an adult playing solo) and deliberately included in the product lens; read the
  children's findings as children's.
- Soup Pot's and Kokoro Kitchen's critical reception; Metacritic and Steam were blocked. They are
  cited for their **mechanics**, not as successes.
- Cross-cultural guideline transfer beyond noting that it is untested.

**And the standing one**
- **Nothing was cooked.** Four cuisines, a dozen named dishes, and not one of them has been made by
  anybody on this project. The 2026-09-11 rule holds: **nobody signs off a dish the project has not
  cooked.**
