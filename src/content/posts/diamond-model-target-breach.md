---
title: "Applying the Diamond Model to the 2013 Target breach"
description: "Mapping the Target breach onto the Diamond Model of intrusion analysis, and where policy could have stopped it: the organization, the industry, or the nation."
date: 2021-03-01
pillar: security-leadership
archived: true
archiveNote: "From the archive: written as a Georgia Tech graduate student. The third-party access lesson has only grown more relevant as companies connect vendors and AI tools into their networks."
---

The [Diamond Model](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf) is a framework for intrusion analysis. It has four core features: **adversary**, **capability**, **infrastructure** and **victim**. Every intrusion involves at least these four.

## Background on the Target breach

In late 2013, attackers stole payment card data and personal information from Target, with roughly 70 million records of personally identifiable information affected (Rowe). Target is often held up as an example of how security failures hurt a company, yet change across the industry has been slower than that suggests.

Here's an overview of what happened. A third-party refrigeration vendor, Fazio Mechanical Services, had access to Target's network. The vendor's credentials were weak, and an attacker stole them. From there, the attacker moved through Target's network and installed malware on point-of-sale registers that captured card data before it was sent for processing. The malware ran through the busy holiday season around Thanksgiving. The breach was disclosed in December 2013, followed by an investigation into what was vulnerable and how to prevent a repeat.

## Applying the Diamond Model

The model has four vertices (adversary, victim, infrastructure, capability) and two meta-feature edges: the **social-political** connection between adversary and victim, and the **technology** connection between infrastructure and capability.

- **Adversary:** unknown. The investigation focused on root cause rather than attribution.
- **Victim:** Target, and the customers whose card data passed through its registers.
- **Social-political:** financial motive. The stolen data was sold on the black market.
- **Capability:** the attack started with credentials stolen from Fazio Mechanical Services (Plachkinova). Once inside, there was little network segmentation, so the attacker could move from point-of-sale terminals to mission-critical back-end systems (Plachkinova). The malware scraped card data from the terminals as transactions happened.
- **Infrastructure:** the path for getting data off the infected machines. Without effective application allowlisting or malware detection, the attacker could command and control the systems and send card data out of the network (Rowe).

## Policy assessment

At the time, Target had no Chief Information Security Officer or equivalent: no one on staff was accountable for securing its information and network.

Cybersecurity could be regulated at several levels. International agreements could address many issues, but they're hard to achieve when some nations benefit from allowing attacks to continue.

An incident like Target's can be addressed at the **organizational**, **industry** or **national** level.

**Organizational.** This is the fastest route, and it's how Target actually responded: investigate, then change internal practices. A company can set policy quickly, though it may not meet the standard an industry body or government would require. Since stolen vendor credentials were the way in, Target needed password and phishing-prevention requirements for its own network *and* for every third party connecting to it. Employees can be a company's weakest link (Manworren), which organizational policy and training on phishing and insider-threat signs can address.

**Industry.** Industry collaboration can define shared standards. They can't be enforced, but participating companies usually want to follow what's agreed. The second half of this attack, installing malware and exfiltrating data, succeeded because of missing network segmentation and weak allowlisting on point-of-sale devices. Industry standards could specify when to use allowlists and how to segment networks.

**National.** Government can enforce consequences for noncompliance, but legislation takes time, and laws written without security experts can create loopholes and workarounds.

## References

- Caltagirone, S., Pendergast, A., Betz, C. [The Diamond Model of Intrusion Analysis](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf).
- Plachkinova, M., Maurer, C. [Teaching Case: Security Breach at Target](https://jise.org/Volume29/n1/JISEv29n1p11.html). *Journal of Information Systems Education*, 29(1).
- Manworren, N., Letwat, J., Daily, O. [Why you should care about the Target data breach](https://www.researchgate.net/publication/295394659_Why_you_should_care_about_the_Target_data_breach). *Business Horizons*.
- [Cyware: What is the Diamond Model of intrusion analysis?](https://cyware.com/educational-guides/cyber-threat-intelligence/what-is-the-diamond-model-of-intrusion-analysis-5f02/)
- Rowe. [Target security breach overview](https://landing.joinbrix.com/posts/target-security-breach-overview.html).
