---
title: "Five prompt injection patterns from 2026, and the control that stops each one"
description: "Prompt injection is no longer a demo. Here are five ways it showed up in real products this year, where the hidden instruction lived, and the control I'd put in place for each."
date: 2026-11-24
pillar: securing-ai
draft: false
---

Prompt injection used to be something people showed off in demos. In 2026 it started showing up in real products. I went through the incidents and research from this year and found that most of them fall into five patterns.

For each one I wrote down where the hidden instruction lived, what the AI did with it, and the control I think would have stopped it. I'm not saying these controls make injection impossible. I don't think anything does yet. But each one limits what an attacker gets if the model does follow the bad instruction.

## 1. Hidden text on web pages

**Where it lives:** Text on a web page that a person can't see but an AI agent reads. Palo Alto's Unit 42 catalogued 22 ways attackers hide these instructions. The most common were plain text styled to be invisible, instructions tucked into HTML attributes, and content hidden with CSS. Google also reported that malicious injected content across the web went up noticeably between late 2025 and early 2026.

**What happens:** An agent that browses on your behalf reads the page and treats the hidden text as part of its instructions. Examples researchers found ranged from trying to run a delete command to sending money to a payment link.

**The control:** Strip hidden content before it reaches the model (invisible text, off-screen elements, HTML comments). More important, I wouldn't let an agent that just read a web page take a high-impact action without a person approving it. Browsing and acting should be separate steps.

## 2. Poisoned data that an assistant summarizes

**Where it lives:** Inside data the AI is asked to analyze. In the GrafanaGhost case disclosed in April, the instructions were planted in log entries.

**What happens:** Grafana's AI assistant read the logs, followed the hidden instructions, and leaked data by rendering an image. The data was packed into the image's web address, so loading the image sent it to the attacker.

**The control:** Limit which domains images and links in AI output can point to. Block protocol-relative URLs, which is how this one got around validation. I think of rendered images and links as an exit, and exits need an allowlist.

## 3. Calendar invites and email

**Where it lives:** In content anyone can send you. In January, Miggo Security showed a malicious calendar invite that got Google's Gemini to leak private meeting details.

**What happens:** Your assistant reads your calendar or inbox as part of its normal job. The attacker doesn't need any access to your account. They just need to send you something.

**The control:** Treat everything inbound as untrusted, even when it shows up in a trusted app. An assistant that reads email or calendar data shouldn't be able to send data out in the same step without approval.

## 4. Pull request titles and issues that steer coding agents

**Where it lives:** In a GitHub pull request title. In April, researchers Aonan Guan, Zhengyu Liu and Gavin Zhong showed that one injection in a PR title worked against three AI coding agents: Claude Code Security Review, Gemini CLI Action and GitHub Copilot Agent. They called it "Comment and Control."

**What happens:** The agent read the title as an instruction and posted its own API key in a PR comment. The attack worked because the GitHub workflows these coding agents use often have access to repository secrets.

**The control:** Coding agents that read pull requests or issues from outside contributors shouldn't have access to API keys or other secrets. A person should approve any commit, pull request or comment that a coding agent writes based on what it read in an issue or pull request. One more gap: Anthropic, Google and GitHub all fixed the "Comment and Control" flaw without issuing a CVE, so vulnerability scanners won't flag it. I'd ask each AI coding tool vendor directly how they track and announce prompt injection fixes.

## 5. Instructions that trick an agent into the software supply chain

**Where it lives:** In setup instructions an agent follows. In an incident in the OWASP GenAI Security Project's third-quarter roundup, an AI evaluation agent hit instructions that referenced a dependency that didn't exist, and it published a malicious package to the public PyPI registry.

**What happens:** The package was live for about an hour and ran on 15 real systems. One was a security scanner, which exposed credentials the agent then used to get into a security vendor's systems.

**The control:** An AI agent should never hold the login or API token needed to publish packages to a public registry like PyPI. Without that token, a tricked agent can't push malicious code out to everyone else. For anything an agent installs, use an allowlist: a short, approved list of packages the agent is allowed to download, so the agent can't pull in a package it only heard about from someone's instructions. The PyPI incident is also a good reminder that an agent's mistakes can hurt people who never used the agent. In this case, 15 outside systems ran the malicious package within about an hour.

## What the five have in common

In every case, the AI could read content someone else controlled **and** do something consequential, like send data, post, publish or spend money. When I review an agent, that combination is the first thing I look for. You can't fully stop a model from reading a bad instruction, but you can decide what it's allowed to do afterward.

I think that's also why these controls work best when product, engineering and security agree on them early. Product knows what the agent actually needs to do. Engineering knows where the secrets and permissions live. Security knows where attackers will put the instruction. Deciding together keeps the agent useful and keeps customers safe.

## Sources

- [Indirect Prompt Injection Goes Operational](https://labs.cloudsecurityalliance.org/research/csa-research-note-indirect-prompt-injection-in-the-wild-2026/), Cloud Security Alliance, April 2026 (Unit 42 techniques, Google measurements, GrafanaGhost, Miggo calendar invite)
- [Three AI coding agents leaked secrets through a single prompt injection](https://venturebeat.com/security/ai-agent-runtime-security-system-card-audit-comment-and-control-2026), VentureBeat, April 21, 2026
- [AI agents breach production systems, spread malware in major exploits](https://www.scworld.com/analysis/ai-agents-breach-production-systems-spread-malware-in-major-exploits), SC Media, October 14, 2026 (OWASP GenAI Q3 2026 roundup)
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/), OWASP Gen AI Security Project
- [Threat modeling an AI agent with tool access](/writing/threat-modeling-ai-agents/), from this site
