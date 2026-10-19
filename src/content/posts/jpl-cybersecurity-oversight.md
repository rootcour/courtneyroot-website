---
title: "Lessons from NASA's audit of JPL cybersecurity"
description: "Reading the NASA Inspector General's report on the Jet Propulsion Laboratory: how objective it is, and how to fix asset inventory, segmentation, patching and policy gaps."
date: 2021-11-17
pillar: security-leadership
archived: true
archiveNote: "From the archive: written for a Georgia Tech cybersecurity policy course."
---

In 2019, NASA's Office of Inspector General published [*Cybersecurity Management and Oversight at the Jet Propulsion Laboratory*](https://oig.nasa.gov/docs/IG-19-022.pdf) (IG-19-022). JPL is a federally funded research center operated for NASA by Caltech, and the report found significant weaknesses in how it secured its network.

## How objective is the report?

If NASA had been responsible for maintaining the system itself, I believe the OIG would have written a similar report. Looking at other reports from NASA's Inspector General, they come across as objective, almost like a third party.

Still, I have some skepticism. There's likely internal pressure not to portray NASA itself as incompetent. A report where NASA was at fault would probably emphasize what it was doing well and lay out plans to resolve the findings. The JPL report, by contrast, paints JPL as negligent and places the fault entirely on its operations.

## Fixing the findings

There are many ways JPL could remediate, but most take time and require culture change.

**Incomplete asset inventory.** Many companies struggle with this, and it's probably the most important step: you can't defend devices you don't know you have. An asset-discovery tool that collects identifying details about every device and aggregates them into a single view is a practical fix.

**Lack of segmentation.** Many companies run flat networks where any connected device can potentially see everything else. Partner environments should be on separate networks, so devices only see what they should. Devices should go through an approval process and authenticate to join a given network.

**Slow patching.** This is usually a culture issue. The fix is to talk to leadership in terms that show why patching matters: the cost of planned downtime to patch versus the time and money lost if an unpatched vulnerability is exploited.

**Policy that doesn't match practice.** Policies make a company accountable and auditable. Without them as an enforcer, issues get overlooked or forgotten. Commitments to customers may also depend on following those policies, so any gap can become a liability, including grounds for a lawsuit.

## Reference

- NASA Office of Inspector General. [*Cybersecurity Management and Oversight at the Jet Propulsion Laboratory*](https://oig.nasa.gov/docs/IG-19-022.pdf), Report No. IG-19-022. 2019.
