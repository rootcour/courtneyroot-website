---
title: "When AI leaves the screen: securing agents that act in the physical world"
description: "Drones, lab robots and other autonomous systems raise the stakes for AI security. Four habits from aviation product security that I think apply directly."
date: 2026-12-08
pillar: securing-ai
draft: true
---

Most of what I write about AI security is about data: an agent leaks an inbox, an assistant exposes a secret, a stolen token pulls records out of a CRM. Those are serious, but the damage is usually something you can clean up.

That changes when the AI controls something physical. Delivery drones, robotic arms in a lab, warehouse robots and building systems are all starting to get AI agents in the loop. When one of those does the wrong thing, you can't roll it back the way you roll back a database.

Earlier in my career I worked on product security for aviation products. I think a few habits from that world apply directly to AI agents that can move things, and I don't see them discussed enough in AI security conversations.

## 1. Design for the failure, not just the attack

In aviation you assume things will fail, and you decide ahead of time what the system does when they do. If a drone loses its command link, it doesn't just keep going. It has a defined fallback, like returning home or landing.

AI agents need the same thing. Before an agent can act on a physical system, I'd want to know what happens if the model gives a bad instruction, if it gets stuck, or if someone revokes its access mid-task. "The agent will figure it out" isn't a fallback plan.

## 2. Keep the safety layer separate from the smart layer

Aviation systems separate the parts that make decisions from the parts that enforce safety limits. The safety limits don't depend on the decision-making being right.

For AI agents, that means hard limits that live outside the model. A lab robot shouldn't be able to exceed a temperature or mix certain materials no matter what the agent asks for. A [July 2026 community roadmap on trustworthy autonomous science](https://arxiv.org/pdf/2607.12113), led by Oak Ridge National Laboratory, makes a similar point. It recommends checking high-consequence actions against independent measurements the agent doesn't control, and putting screening and human override at the point where digital plans turn into physical actions.

## 3. Earn autonomy with evidence

Nothing in aviation gets more autonomy because someone assumes it's ready. It gets there through testing and a track record.

The same roadmap recommends scaling an agent's autonomy to the cost, risk and reversibility of what it's doing, and only raising it as auditable evidence builds up. I agree with that. I'd start an agent on low-risk, reversible tasks with a person approving each step. Then I'd loosen approvals only where the logs show it's been reliable.

## 4. Record everything, and know who did it

Aircraft have flight data recorders because after something goes wrong, you need to know exactly what happened. Agents acting in the physical world need the same: every command, the credential it used, and what the agent was looking at when it decided.

Identity matters here too. The roadmap recommends giving agents accountable identities and using signed, single-use credentials for delegated actions instead of long-lived broad ones. I think that's the right model. If an agent's credential can only do one thing once, a stolen or misused credential can't do much.

## Containment is harder than it looks

This year showed why these habits matter. In [the Hugging Face incident](/writing/hugging-face-incident-containing-ai-agents/), AI evaluation agents in a test environment [got around their network restrictions](https://www.scworld.com/analysis/ai-agents-breach-production-systems-spread-malware-in-major-exploits) and reached another company's production systems using exposed credentials. That was a software environment. If the same thing happened with agents connected to physical equipment, the outcome could be very different.

My takeaway is that prompt-level rules ("don't do X") aren't enough on their own. Physical systems need network isolation, narrow credentials and limits that hold even when the agent misbehaves.

## Regulators are moving too

Drone rules show where this is going. The FAA's proposed Part 108 rule would create a standard path for drones flying beyond the operator's line of sight. As of this fall, the final rule [was still under White House review](https://pickdrones.com/faa-part-108-bvlos-rule-delayed-oira-2026/), months past its deadline. In September, the TSA [started asking industry for input](https://dronelife.com/2026/09/08/part-108-bvlos-requirements-tsa-security/) on the security side, including proposed security programs and vetting of certain personnel for some operators. I'd expect AI autonomy to become part of these conversations soon.

## The bottom line

When AI acts in the physical world, I think security has to look more like safety engineering. That only works if the people building the product, the engineers who run it and the security team agree on the limits early. Done that way, autonomous systems can still move fast, and the people around them stay safe.

## Sources

- [Toward Trustworthy Autonomous Science: A Two-Year Community Roadmap](https://arxiv.org/pdf/2607.12113), Ferreira da Silva et al., Oak Ridge National Laboratory, July 2026
- [AI agents breach production systems, spread malware in major exploits](https://www.scworld.com/analysis/ai-agents-breach-production-systems-spread-malware-in-major-exploits), SC Media, October 14, 2026
- [FAA Part 108 Delay: BVLOS Rule Stuck at OIRA](https://pickdrones.com/faa-part-108-bvlos-rule-delayed-oira-2026/), PickDrones, September 2026
- [Part 108 BVLOS requirements and TSA security](https://dronelife.com/2026/09/08/part-108-bvlos-requirements-tsa-security/), DroneLife, September 8, 2026
- [Threat modeling an AI agent with tool access](/writing/threat-modeling-ai-agents/), from this site
