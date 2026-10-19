---
title: "Securing Natanz: air gaps and defense in depth"
description: "How I'd have designed security for the facility Stuxnet hit, when air gaps still make sense, and how to detect compromise in an offline network."
date: 2021-10-06
pillar: general
archived: true
archiveNote: "From the archive: written for a Georgia Tech cybersecurity policy course."
---

## Defense in depth

If I were designing security for Natanz, I'd layer several controls:

- **Network firewalls with intrusion prevention and detection**, to allow or block specific IP addresses and ports.
- **Endpoint detection and response (EDR)** on every device connecting to the internal network, to monitor for unauthorized or malicious files.
- **A SIEM** collecting network and EDR logs, so a team can spot and respond quickly to anything unusual.

## Do air gaps still make sense?

Air-gapped systems are still useful in some situations: when data must be completely isolated. That should be rare. One example is writing or testing malware, where a team would want an air-gapped lab to avoid infecting other devices.

If a system isn't air-gapped, at least one device can reach out to the internet, which means someone can reach in. A connected network is more likely to be breached than an air-gapped one, though Stuxnet showed an air gap alone isn't enough.

## Detecting compromise in an air-gapped network

The best approach would be EDR-like software on each device. But without a connection to a central console, someone has to physically check each network's tooling for unusual activity. That rules out real-time response unless someone is watching constantly.

## Could the vendor have prepared?

There's usually little a vendor can do to prepare for zero-days. But at least one vulnerability Stuxnet exploited had been described publicly before the attack, so Microsoft arguably had a chance to catch it. I believe companies should have a threat-hunting function, in-house or outsourced, whose job includes monitoring publications for issues affecting their systems.

## References

- [Air gap (networking)](https://en.wikipedia.org/wiki/Air_gap_(networking)). Wikipedia.
- Zetter, K. [How digital detectives deciphered Stuxnet](https://www.wired.com/2011/07/how-digital-detectives-deciphered-stuxnet/). *Wired*, 2011.
- Kushner, D. [The real story of Stuxnet](https://spectrum.ieee.org/the-real-story-of-stuxnet). *IEEE Spectrum*, 2013.
