---
title: "The $50 break-in: what the AI agent hacking spree tells defenders"
description: "An attacker reportedly pointed AI agents at 1,200 websites and got into more than 100 companies for about $5,000 in compute. The scary part isn't the AI. It's the economics."
date: 2026-10-20
pillar: ai-for-defenders
draft: true
---

This week Reuters reported on a campaign that should change how every security team thinks about its attack surface. According to [the reporting](https://winbuzzer.com/2026/10/20/hacker-used-ai-agents-to-breach-100-plus-companies-websites-xcxwbn/), a Chinese-speaking operator gave a set of AI agents a short list of preferred intrusion tactics, pointed them at e-commerce sites in the US, Canada, Australia and Japan starting September 25, and let them work largely on their own.

The numbers, based on what researcher Snorre Fagerland observed through the attacker's own exposed infrastructure:

- **More than 1,200 sites attempted** and **more than 100 companies' websites compromised**. Deere and SharkNinja both acknowledged affected sites and said they'd taken action, with no indication so far that sensitive data was reached.
- **About 23 hours** of autonomous effort per successful intrusion.
- **Roughly $5,000 in AI usage** for the whole campaign, or about **$50 per break-in**.

Those figures are one researcher's estimates, and we don't yet know how much data was taken. But even with generous error bars, the shape of the story is clear.

## The interesting part isn't the AI. It's the patience.

Look at how one of the intrusions reportedly worked. The agents found nothing wrong with the target's public application. A human attacker on a deadline might have moved on. The agents didn't. They went looking through records for related infrastructure, found an internet-facing control panel nobody was watching, and spent hours trying approaches until one gave them code execution on the server.

None of that is novel tradecraft. Recon on adjacent infrastructure, a forgotten admin panel, a data-handling bug: this is the same playbook that has worked for twenty years. What changed is the cost of running it. A skilled human doing 23 hours of focused work on one mid-sized e-commerce site is expensive enough that most sites never got that attention. At $50 a site, everyone gets that attention.

**AI didn't invent a new attack. It made persistence cheap.**

## What that means for defenders

For years, a quiet assumption has protected a lot of organizations: *we're not interesting enough to be worth that much effort.* That assumption is now wrong. If an attacker's marginal cost for a full day of reconnaissance and exploitation is the price of a nice dinner, your obscure subdomain is no longer obscure.

Here's where I'd put attention this week.

**1. Find the things you forgot.** The way in wasn't the main site. It was related infrastructure. Pull your certificate transparency logs, DNS records and cloud inventories, and list every internet-facing service, especially admin panels, staging sites and anything a vendor runs on your behalf. I wrote back in grad school about [NASA's JPL losing track of devices on its own network](/writing/jpl-cybersecurity-oversight/). Asset inventory was the most important unglamorous control then. It's more important now, because the attacker's inventory of your stuff is now automated.

**2. Take admin interfaces off the open internet.** Control panels belong behind a VPN, an identity-aware proxy or, at minimum, an IP allowlist. There is almost no good reason for one to be reachable by anyone who finds it.

**3. Shrink the patch window for internet-facing systems.** When an attacker can keep trying approaches for a full day at negligible cost, "we'll get to it next sprint" is a risk decision, and leadership should make it knowingly.

**4. Watch your vendors' sites too.** At least one affected company was investigating a site run by a third-party vendor. Your customers don't distinguish between your website and the one your agency built for you.

**5. Watch for the pattern, not just the payload.** Agent-driven attacks are patient and repetitive: long sessions, many small variations, steady probing of the same endpoints. That's detectable if someone is looking at the right logs.

## Defenders need agents too, and that's harder than it sounds

There's a second story this week that belongs next to this one. When attackers hit the AI coding tool OpenCode, its team [ran AI agents around the clock](https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/) to help investigate. The models helped at first, then refused to keep going once the malicious code they were analyzing tripped safety filters. The team only got unstuck after joining a vetted program that gives defenders access to less restrictive models.

That's the asymmetry to watch. Attackers are using whatever tools work. Defenders, reasonably, operate inside guardrails. If your incident response plan assumes you'll use AI to triage under pressure, test that assumption now, with realistic malicious samples, before you need it at 2 a.m. And if vetted-access programs exist for your tools, get your team enrolled ahead of time.

## The bottom line

The question boards and executives should ask after this story isn't "are we using AI for security?" It's: **if someone could afford to spend a full day attacking every system we have, which ones would fall?** That's no longer a hypothetical. It's a $50 line item.

Answering it isn't a security-only exercise. The business knows which sites matter to customers, developers know what's running and who owns it, and security knows where attackers look. Put those three in a room for an afternoon and you'll find the forgotten panel before an agent does, without slowing anyone down.

## Sources

- [Hacker Leverages AI Agents to Breach More Than 100 Company Websites](https://winbuzzer.com/2026/10/20/hacker-used-ai-agents-to-breach-100-plus-companies-websites-xcxwbn/), WinBuzzer, reporting on Reuters, October 2026
- [Hackers hit AI coding tool OpenCode, running up charges on users' AI accounts](https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/), TechCrunch, October 19, 2026
- [Lessons from NASA's audit of JPL cybersecurity](/writing/jpl-cybersecurity-oversight/), from my archive
