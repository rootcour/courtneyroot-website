---
title: "Your AI vendor is the new HVAC contractor"
description: "In 2013, attackers reached Target through a refrigeration vendor's login. In 2026, they reach you through an AI tool's API keys and OAuth tokens. Revisiting a breach I studied in grad school."
date: 2026-11-03
pillar: security-leadership
draft: true
---

A few years ago, as a Georgia Tech grad student, I wrote an analysis of the [2013 Target breach](/writing/diamond-model-target-breach/). The short version: attackers stole credentials from Fazio Mechanical, the refrigeration contractor that had access to Target's network for billing and project work. From there they moved through a flat network to the point-of-sale registers and skimmed card data from tens of millions of customers through the holiday season.

My recommendations at the time were reasonable for 2013: stronger password and phishing controls for vendors, real network segmentation, and allowlisting on payment terminals.

I recently reread that essay with 2026 eyes. The core lesson holds up: **your security includes everyone you've given a key to.** But almost everything about *what* those keys look like, and where they open doors, has changed. Today's HVAC contractor is an AI tool.

## The keys are tokens now

In 2013, vendor access meant a VPN login onto your network. In 2026, it usually means an **OAuth grant or API key** that lets a vendor's software act directly inside your SaaS systems. No network required.

That's exactly how the [Salesloft Drift breach](https://securityaffairs.com/181686/cyber-crime/google-salesloft-drift-breach-hits-all-integrations.html) worked in August 2025. Drift was an AI chat agent many companies connected to Salesforce. Attackers stole the OAuth and refresh tokens tied to it, then used them to pull data from customers' Salesforce instances over about ten days. Google's threat intelligence team found they went hunting for secrets inside that data, like AWS access keys, passwords and Snowflake tokens that people had pasted into support cases. They also tried to cover their tracks by deleting query jobs. Some tokens reached Google Workspace email as well.

Notice the parallel. Target's attackers used a vendor's foothold to reach a more valuable system. Drift's attackers used a vendor's tokens to reach secrets that unlocked *other* systems. Same pattern, different plumbing.

And it keeps happening. Just this month, attackers broke into [OpenCode's hosted console](https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/), where some developers stored API keys for their AI providers. Affected users woke up to unauthorized charges, some over $1,000, while the providers raced to revoke exposed keys. The company said 1.4% of console users were affected.

## Why my 2013 advice doesn't stretch far enough

**Network segmentation doesn't help when there's no network hop.** Fazio's credentials had to traverse Target's network to reach the registers, so segmentation could have stopped them. A stolen OAuth token talks straight to Salesforce's API from anywhere on the internet. Your firewall never sees it.

**Password policy doesn't apply to tokens.** Refresh tokens often live for months and survive password resets. Nobody gets phished for them; they're stolen from the vendor.

**AI tools want broad access by design.** A chat agent or coding assistant is more useful the more it can see. Teams grant wide scopes during a pilot and never revisit them. Every AI integration is a decision about what software is allowed to do, and most companies make that decision once, in a hurry, by clicking "Allow."

## What I'd recommend now

**1. Inventory your machine-to-machine trust.** List every OAuth grant, API key and service account that connects a third-party tool to your systems, especially AI tools added in the last two years. Most SaaS admin consoles can export connected apps. You will find things nobody remembers approving.

**2. Right-size the scopes.** For each integration, ask what it actually needs to read and do. A chat widget that books meetings doesn't need read access to every support case.

**3. Get secrets out of places tokens can reach.** The Drift attackers went looking for keys inside CRM records because people put them there. Scan your ticketing, CRM and chat systems for credentials and rotate whatever you find.

**4. Monitor vendor API activity, not just logins.** Watch for bulk exports, unusual query volume and access outside normal patterns from integration identities. This is where a stolen token shows up.

**5. Write the breach into the contract.** In another grad school piece I argued that [vendor agreements should spell out incident reporting](/writing/third-party-incident-response/). For AI vendors, add: how quickly they'll notify you of token or key exposure, whether they can revoke all grants at once, what logs you can access, and where your credentials are stored.

**6. Practice revoking.** Know how to kill every token for a given vendor in minutes. In both Drift and OpenCode, the cleanup was mostly revoking and rotating credentials. The faster you can do that, the smaller the incident.

## The question for leadership

In 2013, nobody at Target's board level was asking what the HVAC vendor could reach. In hindsight, everyone wished they had.

The 2026 version of that question is simple: **which AI tools can act inside our systems, and what's the worst thing each one could do with the access we gave it?** If nobody in the room can answer, that's the finding.

The answer has to come from three groups at once. The business owns the vendor relationship, developers own the integrations, and security owns the risk. When they review AI tools together, teams can adopt new tools quickly and customers' data stays where it belongs.

## Sources

- [Applying the Diamond Model to the 2013 Target breach](/writing/diamond-model-target-breach/), from my archive
- [Google: Salesloft Drift breach hits all integrations](https://securityaffairs.com/181686/cyber-crime/google-salesloft-drift-breach-hits-all-integrations.html), Security Affairs, August 2025
- [Hackers hit AI coding tool OpenCode, running up charges on users' AI accounts](https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/), TechCrunch, October 19, 2026
- [Incident response across company lines](/writing/third-party-incident-response/), from my archive
