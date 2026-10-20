---
title: "A one-page AI risk briefing for your board"
description: "Boards are asking about AI risk, and most security updates answer the wrong question. A free one-page template, and how to fill it in so leaders can actually make a decision."
date: 2026-11-10
pillar: security-leadership
draft: true
---

**Download the template:** [Word (editable)](/downloads/ai-risk-board-briefing.docx) · [PDF](/downloads/ai-risk-board-briefing.pdf)

Every board I hear about is asking some version of "what's our AI risk?" And most of the answers they get are one of two things: a reassuring slide that says AI is "governed," or a wall of technical findings nobody in the room can act on.

Neither helps. A board's job isn't to understand prompt injection. It's to decide how much risk the company accepts, and to fund the work to stay inside that line. A good briefing makes those decisions easy to see and easy to make.

So I built a one-page template. It's free to use and adapt.

## Why one page

One page forces you to choose. If you can't fit your AI risk on a page, you don't yet know which parts matter. Leaders will also actually read it, and that's the whole point.

## How to fill it in

### 1. Bottom line

Two sentences: where risk stands, which direction it's moving, and the one decision you need today. If you only get thirty seconds of attention, this is what you want remembered.

*Example: "Our AI risk is moderate and rising as teams connect more AI tools to customer systems. We need you to approve a rule that no AI system may move money, delete records or contact customers without a person approving."*

### 2. Where we use AI

Four rows, three numbers each: how many, how many touch sensitive data, and how many can act without a human approving.

That last column is the one that matters. An AI tool that drafts text for a person to review is a very different risk from one that can send, delete or pay on its own. This is where you make the shift from "do we use AI?" to **"what are we letting software do?"**

If you can't fill in these numbers, that *is* your briefing. "We don't know how many AI tools are connected to our systems" is a finding a board can act on, and it's more honest than a confident guess.

### 3. Top three risks, in business terms

Describe each risk as something that happens to the business, not a vulnerability class. Not "indirect prompt injection," but "an email assistant forwards customer contracts to an outsider." Not "OAuth token compromise," but "attackers pull our CRM data through a connected AI tool," which is [exactly what happened](/writing/target-breach-revisited-ai-vendors/) to companies using the Drift chat agent in 2025.

Three, not ten. If everything is a top risk, nothing is.

### 4. What we're doing about it

Each action gets an owner and a date. Boards are reasonably skeptical of plans without either.

### 5. Decisions we need from you

This is the section most security updates leave out, and it's the most important. Ask for something specific:

- **Risk appetite:** a clear rule about what AI systems may do without a person approving. This turns a vague worry into an enforceable policy.
- **Investment or acceptance:** fund a specific control, or explicitly accept a named risk until a date.

Both answers are fine. What isn't fine is leaving the room without either, because then the risk was accepted by default and nobody chose it.

### 6. Trend

Four numbers, quarter over quarter. I picked measures that are hard to game and that track the things that actually go wrong:

- **Inventory coverage.** You can't govern AI tools you don't know about.
- **Scope reviews.** Are integrations still limited to what they need?
- **Incidents and near misses.** Including the ones that didn't cause damage.
- **Time to revoke a vendor's access.** When an AI vendor is breached, this number is your blast radius.

## Why now

A few things make this timely. AI agents are showing up in real incidents, from [hidden instructions that trick assistants into leaking data](https://labs.cloudsecurityalliance.org/research/csa-research-note-indirect-prompt-injection-in-the-wild-2026/) to [attackers running AI agents against a thousand websites](/writing/ai-agent-hacking-spree-50-dollar-break-in/) for the price of a laptop. In Europe, the AI Act's obligations for high-risk systems [now take effect in December 2027](https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/), so companies there have a fixed date to work toward. And every new AI integration your teams add between now and your next board meeting is another decision about what software can do on the company's behalf.

That's the real message for leaders: **deciding what AI is allowed to do is a decision for business, engineering and security together.** Done well, it keeps customers protected without slowing the teams building for them. This page is a way to make that decision on purpose.

If you use the template, I'd love to hear what you changed and what your board asked.

## Sources

- [Indirect Prompt Injection Goes Operational](https://labs.cloudsecurityalliance.org/research/csa-research-note-indirect-prompt-injection-in-the-wild-2026/), Cloud Security Alliance, April 2026
- [AI Act: obligations in force and delays under omnibus 2026/1744](https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/), ActuIA
- [Google: Salesloft Drift breach hits all integrations](https://securityaffairs.com/181686/cyber-crime/google-salesloft-drift-breach-hits-all-integrations.html), Security Affairs, August 2025
- [The $50 break-in: what the AI agent hacking spree tells defenders](/writing/ai-agent-hacking-spree-50-dollar-break-in/), from this site
