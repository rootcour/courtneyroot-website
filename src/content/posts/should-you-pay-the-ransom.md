---
title: "Should you pay the ransom?"
description: "Why security professionals usually advise against paying ransomware demands, the narrow case where paying might make sense, and how to prepare instead."
date: 2021-10-20
pillar: security-leadership
archived: true
archiveNote: "From the archive: written for a Georgia Tech cybersecurity policy course."
---

Deciding whether to pay a ransom is hard. Attackers want the most money they can get while keeping the demand low enough that paying looks easier than recovering.

## Why professionals usually say no

Most security professionals advise against paying, for several reasons:

- **No guarantee.** The attacker may not restore the data at all.
- **No guarantee it works.** A decryptor may be broken or partial, or come with a second demand.
- **The hole is still open.** The entry point still has to be found and fixed, or the same attacker can come back.
- **An opportunity.** Security is often treated as optional. An incident can create the incentive to rebuild more securely: keeping patches current and investing in defense.

Companies should also ask how replaceable their data is. Is there a clean backup or hot site to restore from?

## What about stolen data?

When attackers steal data and threaten to publish it, I'd argue it's already compromised and will likely be sold whether or not the ransom is paid. The company should focus on notification, privacy obligations, and account-recovery procedures instead.

## When paying might make sense

The only case where I'd consider paying is when the price is reasonable (which depends heavily on the situation) and the business is in a truly dire state, with barely anything running.

## How to prepare

1. **Secure, tested backups**, so you can restore with minimal downtime.
2. **Continuous vulnerability scanning** of the network and entry points, to fix weaknesses before attackers use them.
3. **Detection and response procedures**, so you're alerted quickly and can contain the spread.

## References

- Sophos. [SamSam: the (almost) six million dollar ransomware](https://www.sophos.com/en-us/medialibrary/PDFs/technical-papers/SamSam-ransomware-chooses-Its-targets-carefully-wpna.pdf).
- Greenberg, A. [The untold story of NotPetya](https://www.wired.com/story/notpetya-cyberattack-ukraine-russia-code-crashed-the-world/). *Wired*, 2018.
- Newman, L. H. [Atlanta spent $2.6M to recover from a $52,000 ransomware scare](https://www.wired.com/story/atlanta-spent-26m-recover-from-ransomware-scare/). *Wired*, 2018.
