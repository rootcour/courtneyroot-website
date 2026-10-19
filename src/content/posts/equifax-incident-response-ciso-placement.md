---
title: "Equifax's incident response, and where the CISO should sit"
description: "What Equifax got right and wrong in responding to its 2017 breach, and why reporting lines matter less than a CISO's direct line to the CEO."
date: 2021-09-22
pillar: security-leadership
archived: true
archiveNote: "From the archive: written for a Georgia Tech cybersecurity policy course."
---

## Did Equifax respond effectively?

Overall, I think Equifax executed a reasonably effective incident response, despite serious failures along the way.

**Preparation.** Equifax had procedures to run vulnerability scans once it learned of a potential vulnerability, to find internal machines that needed patching. The scans were flawed and missed the vulnerable systems, but the process existed and should have found them.

**Detection and analysis.** Its intrusion detection was misconfigured, but the team eventually detected the breach.

**Containment and eradication.** Once the breach was found, containment and eradication were efficient.

**Post-incident.** Building a dedicated breach website and call center were good ideas, even though both were poorly executed. Bringing in an outside firm, Mandiant, to investigate was smart: it gave everyone an independent account of what happened.

## The biggest flaw

Security budgets are always tight, but the biggest failure was that the SSL certificate used to inspect traffic on the ACIS network had expired 19 months before the suspicious activity was found. Without it, encrypted traffic went uninspected.

Security tooling only helps if it actually works. When tools aren't maintained, analysts don't get the data they need, and malicious activity gets missed.

## Where should the CISO report?

CISO placement is a contested topic. I've worked at one company where the CISO reported to the CIO, and another where the CISO was also the CIO and reported to legal. Each has pros and cons, and I think the right answer depends on the company.

In an information-driven company, aligning security closely with IT makes sense: it supports collaboration on understanding the network and patching systems. At the time, I worked on a product security team for aviation products. We weren't a typical network-detection team, so it made sense to sit under legal, where we worked closely on regulatory alignment.

The biggest takeaway: wherever the CISO sits, they must be able to inform the CEO directly about any major event. The culture should make it normal for the CISO to report up the chain *and* go straight to the CEO when it matters.

## References

- U.S. House Committee on Oversight and Government Reform. *The Equifax Data Breach.* 2018.
