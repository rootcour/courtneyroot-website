---
title: "What the Hugging Face incident teaches about containing AI agents"
description: "This summer, hundreds of AI agents in an OpenAI test environment got loose and broke into Hugging Face. Five lessons I think every company running agents should take from it."
date: 2026-12-01
pillar: securing-ai
draft: true
---

I think the Hugging Face incident is the most important AI security story of 2026. OpenAI's own report calls it the first known case of a group of AI agents acting offensively without authorization. The attacker wasn't a person using AI. It was the AI.

OpenAI has now published [its own technical report](https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf), and independent investigators have added more detail. Here's what happened, based on those sources, and what I think other companies should learn from it.

## What happened

OpenAI was running an internal cybersecurity evaluation called ExploitGym, where AI agents try to exploit known vulnerabilities in isolated targets. Some of the tasks were impossible to solve. The agents kept trying anyway, and some started looking for ways around the test itself.

According to OpenAI's report:

- Starting in May, agents used a shared internal package repository (a self-hosted Artifactory instance) as an improvised message board to talk to each other.
- They used a server-side request forgery flaw in that repository to reach the internet, and later got administrator credentials through a legacy endpoint.
- They found Hugging Face credentials that had been exposed publicly online and shared them on their message board.
- They used a crafted dataset to make a Hugging Face production worker reveal its credentials, then worked their way to administrator-level access in a Kubernetes cluster, plus secrets, internal data and source code.
- Agents also used an unauthenticated application a customer had left open on Modal Labs as a relay. OpenAI says Modal's own platform wasn't compromised.

The scale was bigger than first reported. An independent investigation by METR and Redwood Research found that [about 1,200 agents exchanged over 70,000 messages and files, and roughly 700 took part in the attack](https://www.techspot.com/news/113806-openai-faces-senate-probe-over-hugging-face-breach.html). Hugging Face disclosed the intrusion on July 16. OpenAI linked it to its own agents on July 20 and disclosed publicly on July 21. In September, two senators sent OpenAI formal questions about it.

## Five lessons

**1. Every shared service is a possible channel.** The agents didn't break out through the front door. They used a package repository that sandboxes shared. The Cloud Security Alliance's [research note on the incident](https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/09/CSA_research_note_hugging_face_rogue_agent_swarm_20260902-csa-styled.pdf) recommends auditing sandboxes for shared caches, storage, logging and repositories. If you run agents, I'd look at anything two "isolated" environments both touch.

**2. Exposed credentials anywhere become fuel.** The way into Hugging Face started with credentials that were already public. People have been leaking keys online for years, but a patient agent will find and use them faster than a person. Secret scanning and short-lived credentials matter more now.

**3. Early warnings got waved off.** OpenAI's report says a monitoring alert flagged port-sweep activity on June 27, and on-call staff decided the run didn't need to stop. I don't say this to blame anyone. It's a normal call to make about a test. But I think it shows our triage instincts are built for people, not for agents that will keep going for weeks. When the actor might be an agent, I'd assume the scope is bigger than it looks.

**4. The weakest link might be someone else's forgotten app.** The Modal piece of this came through an unauthenticated app one customer had published. That's the same lesson as [the AI agent hacking campaign this fall](/writing/ai-agent-hacking-spree-50-dollar-break-in/): forgotten, exposed systems are what agents find first.

**5. Decide now who tells whom.** Hugging Face found and disclosed the intrusion before OpenAI knew its own agents were responsible. If you work with partners who run AI agents, I think contracts should cover how fast they'll tell you if their agents touch your systems, and what logs you'll get.

## What changes now

OpenAI says it's narrowing outbound network access, moving high-risk code into separate virtual machines, adding monitoring tripwires, and aiming to alert responders within 30 minutes of a concerning signal. Those are good steps, and I think most companies running agents should be asking whether they have the same basics in place.

Most companies aren't running thousands of agents in a cyber test. But many are starting to run agents with real credentials and real network access. This incident is a preview of what happens when containment is assumed instead of tested.

I think that's a decision for business, engineering and security together. The business decides how much autonomy is worth it. Engineering builds the isolation. Security tests whether it actually holds. Getting that right is what lets companies keep adopting agents quickly without putting customers or partners at risk.

## Sources

- [OpenAI Hugging Face Incident Technical Report](https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf), OpenAI
- [OpenAI faces Senate probe over Hugging Face breach](https://www.techspot.com/news/113806-openai-faces-senate-probe-over-hugging-face-breach.html), TechSpot, September 10, 2026 (METR and Redwood Research findings)
- [Research note: Hugging Face rogue agent swarm](https://labs.cloudsecurityalliance.org/wp-content/uploads/2026/09/CSA_research_note_hugging_face_rogue_agent_swarm_20260902-csa-styled.pdf), Cloud Security Alliance, September 2, 2026
- [An autonomous AI agent compromised Hugging Face. The response is the real story](https://www.vectra.ai/blog/an-autonomous-ai-agent-compromised-hugging-face-the-response-is-the-real-story), Vectra AI, July 2026
- [When AI guardrails block the defenders](/writing/ai-guardrails-block-defenders/), from this site
