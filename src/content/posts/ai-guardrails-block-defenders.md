---
title: "When AI guardrails block the defenders"
description: "Twice this year, incident responders turned to AI for help mid-breach and the models refused. Here's why it happens and what security teams should set up before they need it."
date: 2026-10-14
pillar: ai-for-defenders
draft: false
---

Twice this year, a security team was in the middle of an incident, turned to an AI model for help, and got turned away.

In July, Hugging Face was investigating an intrusion by autonomous AI agents. Its team tried to use frontier models through commercial APIs to analyze the forensic logs. According to [Vectra's write-up of the response](https://www.vectra.ai/blog/an-autonomous-ai-agent-compromised-hugging-face-the-response-is-the-real-story), the providers' guardrails couldn't tell an incident responder from an attacker, and they blocked the requests. Hugging Face ended up running the analysis on an open-weight model on its own infrastructure.

This month it happened again. When attackers hit the AI coding tool OpenCode, the team ran AI agents around the clock to help investigate. [TechCrunch reported](https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/) that the models helped at first, then refused to continue once the malicious code they were examining tripped safety filters. The team only got unstuck after joining OpenAI's Daybreak Blue program, which gives vetted defenders access to models with fewer restrictions.

## Why this happens

The guardrails aren't wrong to exist. From the model's side, a request to analyze malware, reconstruct an exploit chain or explain how stolen credentials were used looks the same whether it comes from a defender or an attacker. The model can't see who's asking.

The numbers show how strict the standard models are. In August, OpenAI released a version of its model just for vetted security teams. According to [Axios](https://axios.com/2026/08/10/openai-gpt-astra-restrictions-safety-hacking-defenders), OpenAI tested both versions on advanced security tasks, like chaining exploits together or gaining higher-level access to a system. The standard model helped with only 1.5% of those requests and refused the rest. The version for vetted security teams helped with 95%.

The problem isn't the guardrail. The problem is timing. Most security teams find out the model won’t help in the middle of an incident, when they’re under pressure and don’t have days to apply for vetted access or set up a different tool.

## What I'd set up now

**1. Test your AI-assisted incident response before you need it.** If your playbook assumes you'll use AI to triage logs or analyze malware, try it now with realistic samples. Find out where the model refuses while it's a drill and not a breach.

**2. Get vetted access ahead of time.** If your AI providers offer a vetted program for security teams, enroll before an incident. OpenAI's Daybreak is one example. Approval takes time you won't have during a breach.

**3. Have a backup you control.** Hugging Face's fallback was an open-weight model running on its own infrastructure. I think that's worth having ready, even if it's not your first choice day to day.

**4. Decide what data can leave during an incident.** This is the part I think gets overlooked. Incident data often includes attacker tools, stolen credentials and customer information. Sending that to a third-party API mid-breach is its own decision. Hugging Face's choice to keep the analysis in-house also kept that data inside its environment.

## The bigger point

I usually write about governing what AI is allowed to do so attackers can't misuse it. This is the other side of the same question. Someone also has to decide what AI tools will do *for* your defenders, and that decision has to be made before the incident.

That's a decision for business, legal, engineering and security together. Business and legal own the vendor contracts and data terms. Engineering owns the tooling. Security knows what the team will actually need at 2 a.m. Getting it settled ahead of time is how you keep customers protected and keep your response moving fast.

## Sources

- [An autonomous AI agent compromised Hugging Face. The response is the real story](https://www.vectra.ai/blog/an-autonomous-ai-agent-compromised-hugging-face-the-response-is-the-real-story), Vectra AI, July 2026
- [Hackers hit AI coding tool OpenCode, running up charges on users' AI accounts](https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/), TechCrunch, October 19, 2026
- [OpenAI gives cyber defenders a less-restricted new model](https://axios.com/2026/08/10/openai-gpt-astra-restrictions-safety-hacking-defenders), Axios, August 10, 2026
- [The $50 break-in: what the AI agent hacking spree tells defenders](/writing/ai-agent-hacking-spree-50-dollar-break-in/), from this site
