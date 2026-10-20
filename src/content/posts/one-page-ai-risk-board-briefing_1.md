---
title: "A one-page AI risk briefing for your board"
description: "Boards are asking about AI risk, and most security updates answer the wrong question. A free one-page template, and how to fill it in so leaders can actually make a decision."
date: 2026-11-17
pillar: security-leadership
draft: false
---

**Download the template:** [Word (editable)](/downloads/ai-risk-board-briefing.docx) · [PDF](/downloads/ai-risk-board-briefing.pdf)

Every board I hear about is asking some version of "what's our AI risk?" And most of the answers they get are one of two things: a reassuring slide that says AI is "governed," or a wall of technical findings nobody in the room can act on.

Neither helps. A board's job isn't to understand prompt injection. It's to decide how much risk the company accepts, and to fund the work to stay inside that line. A good briefing makes those decisions easy to see and easy to make.

So I built a one-page template. It's free to use and adapt.

## Why one page

One page forces you to choose. If you can't fit your AI risk on a page, you don't yet know which parts matter. Leaders will also actually read it, and that's the whole point.

## How to fill it in

### 1. Summary

Two or three sentences a board member could repeat to someone else after the meeting: what changed since last time, what worries you most and why, and the one decision you need. Lead with a fact, not a rating. "Moderate and rising" tells a board very little. A number they can picture tells them a lot.

*Example: "Since last quarter, the number of AI tools connected to customer systems went from 4 to 11, and three of them can email customers without a person approving. That's our biggest AI risk right now. We're asking you to approve a rule that no AI system may move money, delete records or contact customers unless a person approves first."*

### 2. Where we use AI

A table that shows how much AI the company uses and how much of it can act on its own. Count four kinds of AI:

- **Employee AI tools:** chat assistants, coding assistants and writing tools people use at work.
- **AI features inside vendor products:** the AI built into software you already pay for, like a CRM's email writer or a help desk's auto-replies.
- **AI agents and apps you built:** anything your own teams put into production.
- **AI vendors connected to your systems:** any outside AI tool that holds a login, API key or OAuth token for your accounts.

For each one, fill in three numbers: how many there are, how many can see customer or sensitive data, and how many can **act without a person approving**, like sending email, changing records, moving money or pushing code.

The last column is the one the board should look at first. An AI tool that writes a draft for a person to review is a very different risk from one that can send, delete or pay on its own. Any row with tools that both see sensitive data and act on their own is where your top risks probably are.

**Where to find the numbers:** your Google or Microsoft admin console lists the apps connected to employee accounts. Expense reports and procurement records show AI subscriptions. Engineering can list the agents in production. Your biggest vendors can tell you which AI features are turned on.

If you can't fill in a number, say so. "We don't know how many AI tools are connected to our systems" is a finding a board can act on, and it's more honest than a confident guess.

### 3. Top three risks, in business terms

Describe each risk as something that happens to the business, not a vulnerability class. Not "indirect prompt injection," but "an email assistant forwards customer contracts to an outsider." Not "OAuth token compromise," but "attackers pull our CRM data through a connected AI tool," which is [exactly what happened](/writing/target-breach-revisited-ai-vendors/) to companies using the Drift chat agent in 2025.

Three, not ten. If everything is a top risk, nothing is.

### 4. What we're doing about it

Each action gets an owner and a date. Boards are reasonably skeptical of plans without either.

### 5. Decisions we need from you

This is the section most security updates leave out, and it's the most important. Ask for something specific:

- **Risk appetite:** a clear rule about what AI systems may do without a person approving. A rule like that turns a vague worry into an enforceable policy.
- **Investment or acceptance:** fund a specific control, or explicitly accept a named risk until a date.

Both answers are fine. What isn't fine is leaving the room without either, because then the risk was accepted by default and nobody chose it.

### 6. Trend

Four numbers, quarter over quarter. I picked measures that are hard to game and that track the things that actually go wrong:

- **AI tools inventoried.** The share of AI tools and integrations you've actually listed. You can't manage AI tools you don't know about.
- **Vendor access reviewed.** The share of AI integrations whose access someone checked in the last 90 days. Access tends to grow during a pilot and never shrink afterward.
- **Incidents and near misses.** AI-related security problems this quarter, including the ones that didn't cause damage.
- **Time to cut off an AI vendor.** If one of your AI vendors is breached, how long it takes to shut off all of its access to your systems. Attackers can keep using that access until you do.

## Why now

A few things make this timely. AI agents are showing up in real incidents, from [hidden instructions that trick assistants into leaking data](https://labs.cloudsecurityalliance.org/research/csa-research-note-indirect-prompt-injection-in-the-wild-2026/) to [attackers running AI agents against a thousand websites](/writing/ai-agent-hacking-spree-50-dollar-break-in/) for the price of a laptop. In Europe, the AI Act's obligations for high-risk systems [now take effect in December 2027](https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/), so companies there have a fixed date to work toward. And every new AI integration your teams add between now and your next board meeting is another decision about what software can do on the company's behalf.

The real message for leaders: **deciding what AI is allowed to do is a decision for business, engineering and security together.** Done well, it keeps customers protected without slowing the teams building for them. The one-page briefing is a way to make that decision on purpose.

If you use the template, I'd love to hear what you changed and what your board asked.

## Sources

- [Indirect Prompt Injection Goes Operational](https://labs.cloudsecurityalliance.org/research/csa-research-note-indirect-prompt-injection-in-the-wild-2026/), Cloud Security Alliance, April 2026
- [AI Act: obligations in force and delays under omnibus 2026/1744](https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/), ActuIA
- [Google: Salesloft Drift breach hits all integrations](https://securityaffairs.com/181686/cyber-crime/google-salesloft-drift-breach-hits-all-integrations.html), Security Affairs, August 2025
- [The $50 break-in: what the AI agent hacking spree tells defenders](/writing/ai-agent-hacking-spree-50-dollar-break-in/), from this site
