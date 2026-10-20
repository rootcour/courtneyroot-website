# Projects roadmap: Dec 2026 – Dec 2027

Tentative. Last updated October 19, 2026.

GitHub projects that prove hands-on skill in AI and security, each one feeding at least one blog post (see [content-roadmap.md](content-roadmap.md)). One game for fun, with an optional security twist.

## Before starting any project

- [ ] **Check your employer's rules on side projects** (invention or IP assignment agreement, outside-activity policy). Build on personal time and equipment, keep it unrelated to internal work, and get approval if the policy requires it.
- [ ] **Keep security tools defensive.** Labs ship with their fixes, scanners and checkers flag problems. No ready-to-use attack tooling.
- [ ] **No real secrets or data.** Fake inboxes, fake files, test accounts only. Add a `SECURITY.md` and a clear README disclaimer to each repo.
- [ ] **License:** MIT or Apache-2.0 for code. Add a short CONTRIBUTING note if you want outside help.

## At a glance

| # | Project | Quarter | Size | Blog post month | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Vulnerable AI agent lab | Dec 2026 – Jan 2027 (v1) · Oct – Nov 2027 (v2) | 2–3 weekends (v1), 2 weekends (v2) | Feb 2027, Jun 2027, Nov 2027 | Idea |
| 3 | Hidden-instruction scanner | Q1 2027 (Feb–Mar) | 1 weekend | Mar 2027 | Idea |
| 2 | Agent permission checker | Q2 2027 (Apr–May) | 1–2 weekends | May 2027 | Idea |
| 5 | Board briefing generator | Q3 2027 (Jun–Jul) | 1 weekend | Jul 2027 | Idea |
| G | AI genre-mashup game | Q3 2027 (Jun–Sep) · launch Oct | 4–6 weekends | Aug 2027, Oct 2027 | Idea |
| 4 | AI vendor access inventory | Q3 2027 (Aug–Sep) | 2 weekends | Sep 2027 | Idea |

Numbers match the order the projects were proposed; the table is in build order. Jan–May 2027 is the final MBA semester plus the nonprofit board placement, so spring projects are kept small. The bigger builds (the game) start after graduation.

---

## Project 1: Vulnerable AI agent lab

**Working name:** `agent-injection-lab`
**When:** start Dec 2026 (holiday break) → v1.0 by end of Jan 2027 → v2.0 Oct–Nov 2027
**Why it matters:** turns the prompt injection post into something people can run. Shows hands-on Python and AI security depth. Becomes the demo for the threat-modeling talk.

**What it is:** a small Python AI agent with fake tools (email inbox, file system, web browsing, code repo, package install). Each attack scenario plants a hidden instruction; each defense can be toggled on or off so people can watch the attack succeed, turn on the control, and watch it fail.

**v1.0 scope (the five patterns from the Nov 24 post):**

| Scenario | Where the instruction hides | Defense to toggle |
| --- | --- | --- |
| Hidden web text | Invisible CSS, HTML attributes on a fake page | Strip hidden content; require approval after browsing |
| Poisoned logs | Log entries the agent summarizes | Allowlist for image/link domains in output |
| Calendar invite | A fake inbound invite | Treat inbound as untrusted; no send in the same step |
| PR title | A fake pull request title | No secrets in the agent's environment; approval for comments |
| Supply chain | Setup instructions naming a fake package | Package allowlist; no publish credentials |

**v2.0 (Oct–Nov 2027):** containment scenarios from the Hugging Face incident (shared-cache side channel, egress controls); a scoreboard comparing models; a short workshop guide.

**Tech:** Python 3.12, a small agent loop, pluggable model backend (a hosted API key the user brings, or a local open-weight model), `pytest` for scenario checks, Docker for one-command setup.

**Milestones:**
- [ ] Dec: agent loop + fake tools + scenario 1 working end to end
- [ ] Early Jan: scenarios 2–5 + defense toggles
- [ ] Late Jan: README with screenshots, one-command setup, results table
- [ ] Feb: launch post + LinkedIn
- [ ] Jun: follow-up post with results across models
- [ ] Oct: v2.0 containment scenarios (shared-cache side channel, egress controls)
- [ ] Nov: v2.0 post

**Blog posts:** "I built a vulnerable AI agent and broke it five ways" (Feb 2027) · "Which defenses actually held" (Jun 2027) · "Containing agents: what I added to the lab after Hugging Face" (Nov 2027)

**Done when:** someone can clone it, run one command, and see an attack succeed and then fail with the defense on.

**Risks:** model behavior changes between versions (pin versions, record results by date); API costs (support a local model).

---

## Project 2: Agent permission checker

**Working name:** `agent-scope`
**When:** Q2 2027 (Apr–May), launch post May 2027
**Why it matters:** the "four questions" threat model turned into code. The clearest proof of the thesis: governing what software is allowed to do.

**What it is:** a command-line tool that reads an agent's tool configuration (for example an MCP server config or a tool manifest) and flags risky combinations:
- reads untrusted input **and** can take irreversible actions
- reads untrusted input **and** has a way to send data out
- holds broad or long-lived credentials

Outputs a short report (terminal and Markdown) with each finding mapped to one of the four questions and a suggested fix.

**v1.0 scope:** one config format, a rules file people can edit, ~10 rules, JSON and Markdown output.
**Stretch:** GitHub Action that comments on pull requests that change agent configs; more config formats; severity scoring.

**Tech:** Python, YAML rules, `pytest` with sample configs (safe and unsafe).

**Milestones:**
- [ ] Apr: rule format + 5 rules + sample configs
- [ ] May: 10 rules, report output, README, launch post

**Blog post:** "Turning my threat model into a linter" (May 2027)

**Done when:** it flags the inbox-assistant example from the threat-modeling post correctly.

---

## Project 3: Hidden-instruction scanner

**Working name:** `hidden-prompt-scan`
**When:** Q1 2027 (Feb–Mar), post Mar 2027
**Why it matters:** small, genuinely useful, easy for others to adopt. Based on published research on how attackers hide instructions in web content.

**What it is:** scans HTML, Markdown or documents for text a person can't see but an AI would read: CSS-hidden text, off-screen elements, HTML comments, zero-width and Unicode tag characters, suspicious `data-*` attributes, Base64 blobs. Flags phrases like "ignore previous instructions."

**v1.0 scope:** HTML and Markdown input, a CLI, a GitHub Action, clear output with line numbers.
**Stretch:** PDF and DOCX input; a browser extension; a "strip" mode that outputs cleaned content.

**Tech:** Python, an HTML parser, regex rules, GitHub Action wrapper.

**Milestones:**
- [ ] Feb: detectors for the top three hiding techniques + tests
- [ ] Mar: GitHub Action + README + post

**Blog post:** "A scanner for instructions hidden from humans but not from AI" (Mar 2027)

**Done when:** it catches hidden-instruction examples from the published research and produces no alerts on a set of normal pages.

---

## Project 4: AI vendor access inventory

**Working name:** `ai-access-inventory`
**When:** Q3 2027 (Aug–Sep), post Sep 2027
**Why it matters:** the "AI vendor is the new HVAC contractor" post as a tool. Speaks to third-party risk, which leaders care about.

**What it is:** lists third-party apps that have OAuth access to a Google Workspace or GitHub account, what scopes each one has, when it was last used, and which ones are AI tools with broad access. Outputs a table to review and revoke from.

**v1.0 scope:** GitHub first (simplest API), then Google Workspace. Read-only. A starter list of known AI tool names to tag.
**Stretch:** Microsoft 365; a "suggested scope" column; scheduled reports.

**Tech:** Python, official provider APIs, read-only tokens.

**Important:** test only on your own accounts. The tool should never request write permissions.

**Blog post:** "What AI tools can reach your accounts? I built a tool to find out" (Sep 2027)

---

## Project 5: Board briefing generator

**Working name:** `ai-risk-briefing`
**When:** Q3 2027 (Jun–Jul), post Jul 2027
**Why it matters:** connects security and business. Gives the board template post a second life.

**What it is:** fill in a simple YAML file (AI inventory, top risks, actions, decisions, trend numbers) and it produces the one-page board briefing as Word and PDF, matching the template on the site.

**v1.0 scope:** YAML in, DOCX and PDF out, an example file.
**Stretch:** a simple web form; quarter-over-quarter trend chart.

**Tech:** Python, `python-docx` or a document library, a PDF converter.

**Blog post:** pairs with the Jul 2027 anchor on the Cost of a Data Breach report, or its own post: "Generating a board-ready AI risk briefing from a text file."

---

## Project G: AI genre-mashup game

**Working name:** TBD
**When:** design Jun 2027 → playable 2 levels by Aug → launch Oct 2027
**Why it matters:** fun, shareable, shows range and skill building with AI. With the security twist it doubles as an approachable way to teach social engineering and prompt injection, and a strong live demo for talks.

**Concept:** each level is a different game genre, and the obstacle in each is an AI character you have to talk your way past.

| Level idea | Genre | AI character | What the player learns |
| --- | --- | --- | --- |
| The vault | Heist | A guard protecting a code | Pretexting, urgency tricks |
| The manor | Mystery | A witness hiding a secret | Asking indirect questions |
| The gate | Fantasy | A gatekeeper with strict rules | Rule-bending, role-play injection |
| The help desk | Office sim | An IT bot resetting passwords | Why verification matters |

**v1.0 scope:** browser-based, two levels, a simple score (fewer messages = better), each level ends with a one-paragraph "what just happened" explaining the technique.
**Stretch:** more genres; a level editor; a defender mode where the player writes the AI's rules and others try to break them.

**Tech:** a web game framework (Phaser or similar) or plain HTML/JS, a small backend for model calls with rate limits and a spending cap.

**Risks:** scope creep (keep it to two levels until launch); API costs if it goes viral (spending cap, rate limiting, optional local model); keep it fun first.

**Optional:** a pure-fun version with no security angle is fine too. The devlog posts still work.

**Blog posts:** "Building a game where you talk your way past an AI" (Aug 2027 devlog) · launch post (Oct 2027)

---

## Q4 2027: wrap-up and planning for 2028

- **Oct:** game launch; start lab v2.
- **Nov:** lab v2 post. Pick the 2028 projects from the backlog below.
- **Dec:** update every repo's README with what's next; write the "one year of courtneyroot.dev" post; archive or hand off projects you won't maintain (add a note at the top of the README).

## Backlog (ideas without a date yet)

- Post-quantum crypto inventory: scan a codebase or certificate set for algorithms that need migrating (ties to the Jan 2027 post and the OR class idea)
- Agent activity logger: a small library that records every tool call with credential and context (the "flight data recorder" from the Dec 8 post)
- Secret-in-the-wrong-place finder for ticket and CRM exports (Salesloft Drift lesson)
- A WiCyS or BSides workshop built from Project 1

## Review checklist (monthly)

- [ ] Move shipped projects to "Shipped" with the repo link
- [ ] Update dates that slipped
- [ ] Make sure each launched project has its blog post scheduled in content-roadmap.md
- [ ] Add the repo link to the site's About page and the post
