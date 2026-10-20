---
title: "Attackers used to steal your data. Now they want your tokens."
description: "Stolen AI API keys get resold as free compute. Stolen OAuth tokens let attackers act as you. Why tokens have become an asset of their own in 2026, and what I'd do about it."
date: 2026-12-15
pillar: securing-ai
draft: true
---

For most of my career, the question after a breach was "what data did they take?" Customer records, card numbers, source code. Attackers stole data because data was what they could sell.

In 2026 I've noticed a different pattern. Attackers are going after **tokens**: the API keys and OAuth tokens that let software log in and act on someone's behalf. A stolen token isn't a copy of something. It's a working key. And attackers have figured out two ways to make money from one.

## Way 1: Stolen AI keys as free compute

An API key for an AI provider is basically a credit card for compute. Whoever holds the key can run models, and the key's owner gets the bill.

Security researchers at Sysdig named this **LLMjacking** in 2024. In their first analysis, they estimated a single stolen account could run up more than $46,000 a day in model charges. Sysdig later reported a 376% increase in credential theft aimed at AI services between late 2025 and early 2026.

The attacks have also become organized. In an operation researchers called Bizarre Bazaar, which ran from December 2025 to January 2026, attackers made more than 35,000 attempts against exposed AI servers. They checked each stolen credential against more than 30 AI providers and sold working access through an online marketplace. Other people's compute had become a product.

The newest twist is that attackers don't just resell the compute. They use it. In June 2026, Sysdig found attackers using someone else's misconfigured AI server as the "brain" of an automated hacking tool. The victim's hardware was doing the thinking for the attack.

You've probably seen the smaller version of this, too. In October, attackers broke into OpenCode's console, where developers stored their AI provider keys, and users found unauthorized charges on their accounts. I wrote about that breach in [Your AI vendor is the new HVAC contractor](/writing/target-breach-revisited-ai-vendors/).

## Way 2: Stolen OAuth tokens as standing access

The second kind of token is worth even more. When you connect an AI tool to your Gmail, GitHub or Slack, you give that tool an OAuth token. The token lets the tool read and act in your account without your password. AI tools collect a lot of these tokens, because connecting to everything is what makes them useful. Push Security found the average company has 17 different AI apps connected to its Microsoft or Google accounts.

Attackers noticed. Two breaches this spring show how a single stolen token can open many doors.

**Context.ai and Vercel.** In March 2026, attackers broke into Context.ai, a company that let people connect AI agents to their work apps. Context.ai stored its users' OAuth tokens. One belonged to a Vercel employee who had signed up with a work Google account and clicked "Allow All." The attackers used that token to log in to Vercel's Google Workspace as the employee, moved into Vercel's internal systems, and copied some customer configuration data. Someone later advertised the data for $2 million on a criminal forum.

**Composio.** Composio connects AI agents to other apps, so it stores tokens for thousands of customers. In May 2026, it disclosed that attackers had started with one employee's stolen Gmail token, used the inbox to intercept login links, and eventually reached a store of customer credentials. Composio had to revoke about 5,000 GitHub tokens and about 5,200 API keys. A GitHub token can give access to private code and deployment pipelines, depending on what it's allowed to do.

In both cases, the AI company wasn't the final target. The attackers wanted the tokens the AI company was holding for everyone else.

## Why tokens beat data

From an attacker's point of view, a token has three advantages over a stolen file:

- **It keeps working.** A stolen database is a snapshot. A stolen token gives access to whatever lands in the account tomorrow, until someone revokes it.
- **It skips the login defenses.** Many OAuth refresh tokens survive a password reset, and the person already passed the multi-factor check when the token was issued. A phishing kit called EvilTokens, first seen in February 2026, tricks people into approving a sign-in on their own device and then keeps the resulting tokens. It compromised more than 340 Microsoft 365 organizations within weeks.
- **It lets the attacker act, not just read.** A token can send email, push code or run a model. That's the same shift I keep writing about with AI agents: the risk isn't only what software can see, but what it's allowed to do.

## What I'd do about it

**Treat AI keys like money.** Set spending limits and usage alerts with every AI provider, so a stolen key shows up as a spike in a dashboard instead of a surprise on next month's bill. Never put AI keys in code or shared files. Rotate them on a schedule.

**Don't expose AI servers to the internet.** Many LLMjacking victims ran a self-hosted model server with no login. If you run one, put it behind authentication and keep it off the public internet.

**Audit OAuth grants, and set limits on new ones.** Pull the list of third-party apps connected to your Google or Microsoft accounts. Revoke anything unused for 90 days or anything nobody can explain. Then require admin approval before employees can give a new app broad access with their work account. The Vercel breach started with one employee's "Allow All."

**Ask your AI vendors how they store your tokens.** Any tool that holds tokens for many customers is a target, as Context.ai and Composio showed. Ask how tokens are encrypted, who inside the company can reach them, and how fast the vendor will tell you if they leak.

**Practice revoking.** For each important integration, know how to cut off its access in minutes. Composio's customers had to contact some providers themselves to revoke keys, which is a slow way to find out you don't have a plan.

## The bottom line

Data is still valuable, but a token is often worth more, because it lets an attacker keep coming back and act as you. Every token is a decision about what software is allowed to do on someone's behalf. Business teams decide which tools are worth connecting, engineering decides how much access each one gets, and security makes sure that access can be watched and taken back. When those three decide together, teams can keep adding AI tools without handing attackers a new asset.

## Sources

- [LLMjacking Evolved: Stolen AI Compute as Offensive Infrastructure](https://labs.cloudsecurityalliance.org/research/csa-research-note-llmjacking-evolved-offensive-agentic-20260/), Cloud Security Alliance, June 2026 (Sysdig findings, Bizarre Bazaar)
- [Vercel, Context.ai and the OAuth hoarding problem](https://www.arcade.dev/blog/vercel-contextai-and-the-oauth-hoarding-problem), Arcade, April 2026
- [The Composio breach: one token, 10,242 doors](https://material.security/resources/the-composio-breach-one-token-10242-doors), Material Security, June 2026
- [OAuth consent phishing: EvilTokens bypasses MFA](https://labs.cloudsecurityalliance.org/research/csa-research-note-oauth-consent-phishing-ai-identity-2026052/), Cloud Security Alliance, May 2026 (Push Security findings)
- [Hackers hit AI coding tool OpenCode](https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/), TechCrunch, October 19, 2026
- [Your AI vendor is the new HVAC contractor](/writing/target-breach-revisited-ai-vendors/), from this site
