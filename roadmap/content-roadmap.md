# Content roadmap: Oct 2026 – Dec 2027

Tentative. Last updated October 19, 2026.

## How it works

- **Cadence:** weekly through early December 2026 (launch push), then **two posts a month** from January 2027.
- **Two slots a month from January:**
  - **Anchor:** a planned post tied to a known date (regulation, conference, annual report). Anchors don't move for news.
  - **Flex:** a project write-up from [projects-roadmap.md](projects-roadmap.md), **or** a breaking-news take if something big happens. News wins the flex slot.
- **Every post gets:** a LinkedIn version in `/linkedin` (posted the same day, blog link in the first comment), a link from at least one older post, and a check for needed updates six months later.
- **Lanes,** rotated so no month is all one kind:
  - **Securing AI** (~40%): threat models, agent permissions, AI vendor risk, AI supply chain
  - **Breach breakdowns** (~35%): fast takes on major incidents, read through the thesis
  - **Security for leaders** (~25%): board templates, regulation explainers, metrics, the business case

## Status key

`Published` · `Drafted` (in the repo, `draft: true`) · `Planned` (idea and angle set) · `Idea` (rough)

## Q4 2026: launch push (all drafted)

| Date | Post | Lane | Status | Notes |
| --- | --- | --- | --- | --- |
| Oct 20 | The $50 break-in: what the AI agent hacking spree tells defenders | Breach breakdowns | Drafted | Reuters, Oct 19: AI agents breached 100+ companies' sites for ~$5,000. Publish fast. |
| Oct 27 | When AI guardrails block the defenders | Breach breakdowns | Drafted | Hugging Face (July) and OpenCode (Oct) responders refused by AI models mid-incident |
| Nov 3 | Threat modeling an AI agent with tool access | Securing AI | Drafted | Signature framework: four questions + checklist. Source for a first talk. |
| Nov 10 | Your AI vendor is the new HVAC contractor | Securing AI | Drafted | Revisits the 2013 Target archive post via Salesloft Drift (2025) and OpenCode (2026). Voice pass suggested. |
| Nov 17 | A one-page AI risk briefing for your board | Security for leaders | Drafted | Free Word/PDF template in `public/downloads` |
| Nov 24 | Five prompt injection patterns from 2026, and the control that stops each one | Securing AI | Drafted | Becomes the scenario list for Project 1 |
| Dec 1 | What the Hugging Face incident teaches about containing AI agents | Breach breakdowns | Drafted | Based on OpenAI's technical report |
| Dec 8 | When AI leaves the screen: securing agents that act in the physical world | Securing AI | Drafted | Aviation product security lessons; FAA Part 108 still pending |
| ~Dec 15 | The five AI security incidents that mattered in 2026 | Breach breakdowns | Idea | Year in review. Candidates: Hugging Face, AI agent hacking spree, OpenCode, Comment and Control (PR title injection), South Korean bank attacks with AI agents. Last post of the year. |

Watch in Q4: CIRCIA final rule (at White House review, expected by year-end). EU AI Act watermarking grace period ends Dec 2. If either lands, it can take a flex slot or fold into the year-in-review.

## 2027 calendar

| Month | Anchor post | Hook | Flex slot (if no breaking news) | Status |
| --- | --- | --- | --- | --- |
| Jan | Post-quantum is a procurement problem now | CNSA 2.0: new national security system purchases must be compliant from Jan 1, 2027 | Breaking news, or a "what I'm building this year" post introducing the projects | Idea |
| Feb | Who's accountable when an AI agent does something wrong? | Annual threat reports start landing; agent identity and ownership | **Project 1 launch:** "I built a vulnerable AI agent and broke it five ways" | Idea |
| Mar | Securing AI coding assistants: secrets, configs and the worm problem | 2026 supply-chain worms targeted coding-assistant configs | **Project 3:** "A scanner for instructions hidden from humans but not from AI" | Idea |
| Apr | What I took away from WiCyS 2027 | WiCyS Mar 17-19, Aurora/Denver CO (attending). Publish in the first week of April while it's fresh. Take notes during sessions on AI security talks, what attendees are worried about, and one idea to try. | Breaking news. RSAC (Apr 5-8) is news-only since you're not attending. | Idea |
| May | Third parties and AI in the 2027 Verizon DBIR | DBIR usually publishes in spring; confirm the date | **Project 2 launch:** "Turning my threat model into a linter" | Idea |
| Jun | What a security engineer learned serving on a nonprofit board | Berkeley board placement runs through May. **Sanitized:** no people, finances, survey results or board discussions (see notes below). General lessons only. See the board post notes below. | **Project 1 follow-up:** "Which defenses actually held" (results from the lab) | Idea |
| Jul | Pricing AI risk: reading the 2027 Cost of a Data Breach report | IBM's report usually publishes in summer; confirm the date | **Project 5:** board briefing generator | Idea |
| Aug | The agent attacks defenders should test this year | Black Hat USA Jul 31-Aug 5 (AI Summit Aug 3); DEF CON follows | **Game devlog 1:** "Building a game where you talk your way past an AI" | Idea |
| Sep | Equifax, ten years later: incident response with AI on both sides | Equifax disclosed its breach in Sept 2017; revisits the archive post | **Project 4:** "What AI tools can reach your accounts?" (vendor access inventory) | Idea |
| Oct | Getting ready for the EU AI Act's high-risk deadline | High-risk (Annex III) obligations apply Dec 2, 2027; Cybersecurity Awareness Month | **Game launch post** | Idea |
| Nov | Four AI security metrics worth reporting to a board | Year-end budget and planning season; builds on the board template's trend section | **Project 1 v2:** "Containing agents: what I added to the lab after Hugging Face" | Idea |
| Dec | The AI security incidents that mattered in 2027 | Year in review. EU AI Act high-risk obligations take effect Dec 2. | **One year of courtneyroot.dev:** what I wrote, what I built, what's next for 2028 | Idea |

**Busy-season note:** Jan–May 2027 is the final MBA semester plus the nonprofit board placement. If a month gets heavy, keep the anchor and skip the flex slot.

### Notes for the June board post (keep it sanitized)

- **Check first:** read any confidentiality terms from the board and the Berkeley program, and ask the board chair or program lead if a general-lessons post is OK.
- **Leave out:** people, finances, strategy, security weaknesses, survey responses, and anything said in board meetings. Playworks is named on the About page, so naming the organization is fine if the board is comfortable with it; otherwise keep it general.
- **Keep:** what it's like to bring a security and tech background to a nonprofit board, the questions you learned to ask, what boards need from technical people, and how it changed how you think about board briefings.
- **Possible angles:** "What nonprofit boards should ask about AI and security" · "What I learned about board briefings from sitting on the other side of the table" · link to the board briefing template post.
- **Collect along the way (Jan–May):** a private notes file of general lessons, written without names so it's already sanitized.

## Key dates (verified October 2026)

| Date | Event | Use for |
| --- | --- | --- |
| Dec 2, 2026 | EU AI Act watermarking grace period ends for systems already on the market | Dec flex or year-in-review |
| Jan 1, 2027 | CNSA 2.0 applies to new national security system acquisitions | Jan anchor |
| Mar 17-19, 2027 | WiCyS 2027, Aurora/Denver CO (attending) | Apr anchor (recap); networking; promote the threat-modeling talk |
| Apr 5-8, 2027 | RSAC 2027, San Francisco (not attending) | News only, if something notable comes out of it |
| Jul 31-Aug 5, 2027 | Black Hat USA 2027, Las Vegas (AI Summit Aug 3) | Aug anchor |
| Dec 2, 2027 | EU AI Act high-risk (Annex III) obligations apply | Oct anchor (prep) and Dec year-in-review |
| TBD | CIRCIA final rule (72-hour incident, 24-hour ransom reporting) | Breaking-news slot when published |
| TBD | FAA Part 108 drone rule and TSA security requirements | Breaking-news slot; follow-up to the Dec 8 post |

Sources: [EU AI Act omnibus dates](https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/) · [CNSA 2.0](https://www.safelogic.com/blog/cnsa-2.0-and-the-2027-inflection-point) · [WiCyS 2027](https://www.wicys.org/events/wicys-2027/) · [RSAC 2027](https://moscone.com/events/rsac-2027-conference) · [Black Hat USA 2027](https://www.beri.net/events/black-hat-usa-2027) · [CIRCIA status](https://www.hipaajournal.com/cisa-circia-final-rule-white-house-review/) · [Part 108 status](https://pickdrones.com/faa-part-108-bvlos-rule-delayed-oira-2026/)

## Breaking-news playbook (48 hours)

Write a news take only if you can connect it to the thesis in one sentence.

1. **Hours 0-4:** facts from primary sources only (the company's statement, the researcher's report, a filing, major press). Note what's confirmed vs. estimated.
2. **Hours 4-12:** find the angle. What agent, token, vendor or forgotten system made it possible? What did the attacker get to *do*?
3. **Hours 12-24:** draft in a fixed shape: what happened (3-5 bullets with numbers), the one new thing, what defenders should do this week, the question leaders should ask.
4. **Hours 24-36:** link every fact to a source. Say plainly what's unknown. No speculation about attribution or blame.
5. **Hours 36-48:** publish (set today's date and `draft: false`), then the LinkedIn version.
6. **Two weeks later:** add an "Updated" note if facts changed.

**Where to watch:** company and researcher disclosures, OWASP GenAI Security Project quarterly incident roundups, Cloud Security Alliance research notes, CISA advisories, SEC 8-K Item 1.05 filings, major tech and security press.

**Skip a story if** it involves your employer, a customer of your employer, or anything you know through work.

## Backlog (ideas without a date yet)

- Securing MCP servers: what a tool manifest tells you about risk
- Agent identity: why every agent needs its own credential, not yours
- The CISO's first 90 days with AI agents in the company
- Red teaming an AI feature before launch: a lightweight checklist
- Post-quantum follow-up: inventorying your cryptography
- Refresh of the 2021 ransomware archive post for the AI era
- AI in the SOC, honestly: what helped and what didn't

## Guardrails

- Check your employer's outside-writing policy before the first post.
- Public sources only. Nothing about internal systems, customers, incidents or roadmaps.
- No commentary on your employer's products. With breaches at direct competitors, stick to published facts.
- Keep "Views are my own" in the site footer and LinkedIn bio.
