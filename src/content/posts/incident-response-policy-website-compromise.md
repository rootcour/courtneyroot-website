---
title: "An incident response policy for a website compromise"
description: "A template incident response policy built on the SANS six-step process: team structure, decision authority, procedures and a communications plan."
date: 2021-06-01
pillar: security-leadership
archived: true
archiveNote: "From the archive: a policy template I wrote as a Georgia Tech graduate student. Replace <company name> and adapt the roles to your organization."
---

## Assumptions

This policy makes the following assumptions about `<company name>`:

- An incident response team already exists for monitoring and response.
- The Cyber Incident Response Team (CIRT) has a SIEM that ingests network traffic and successful/failed logins, with alerting rules in place.
- An IDS/IPS and an EDR tool are deployed to detect and prevent malicious activity.
- Web servers run on-site and are managed internally.

## Policy

Multiple parties are involved in finding and addressing incidents on the `<company name>` network. This policy aligns with the SANS Institute *Incident Handler's Handbook*.

The CIRT monitors internal network activity and the company's perimeter. The network team fixes internal networking issues and is consulted when an incident involves the network. Outside contractors and vendors may also be consulted.

The CIRT manager, the CISO and the CEO are notified at different points in an investigation.

- **CIRT manager:** can declare an incident and approve minor remediation, such as isolating a user device. Cannot take a production server off the network.
- **CISO:** can approve any remediation step.

## Team structure and relationships

The **CIRT** is made up of security operations analysts and engineers with varying incident-handling experience, providing 24/7 coverage.

The **executive incident response team** includes the CIRT manager, the CISO, the network team manager and, in some cases, the CEO.

The CIRT manager may bring in an **outside vendor** for investigative insight or for recovery and reporting. Afterward, the CISO may need to involve **legal** and **law enforcement**. The CISO and CIRT manager should review legal obligations with the internal legal team to decide.

## Procedures

These procedures follow SANS steps 2 through 7 for a website compromise.

### 2. Preparation

Prepare the team to identify and respond to incidents.

- Periodically scan the network and devices for signs of compromise.
- Maintain SIEM ingestion of network traffic and login events, with alerting rules.
- Run IDS/IPS and EDR across the environment.
- Provide ongoing training for CIRT members on detection and response.
- Run periodic vulnerability scans on servers.

### 3. Identification

Identification means knowing what normal looks like so you can spot the abnormal. Indicators include many failed logins followed by a success, traffic to a suspicious external IP, or signs of a malware download, surfacing through the SIEM, IDS or antivirus.

CIRT members document indicators and evidence, research them (file hashes, IP origins), and escalate to the CIRT manager once they believe an incident is occurring.

### 4. Containment

Containment prevents further damage or exposure. A compromised website may have given the attacker a foothold to plant malware or command-and-control software.

- **Compromised laptop or device:** the CIRT manager immediately authorizes isolation.
- **Compromised production server:** the CIRT manager escalates to the CISO, who decides whether it can be taken offline for remediation.
- **Compromised account:** disable the account or force a password reset.
- Take forensic images of affected systems, including logs, as evidence.

### 5. Eradication

Remove the cause of the incident.

- Force password resets for compromised accounts.
- Delete all files associated with malware.
- Reset or remove modified environment variables and registry keys.
- If that isn't possible, reimage the system.

### 6. Recovery

Return affected systems to normal operation.

- Test remediated systems before reconnecting them to confirm the fix worked and no other compromise remains.
- Document that testing occurred and passed.

### 7. Lessons learned

Review what went well and what didn't, and improve the process. This step is blameless: the goal is to check whether processes were followed and whether they need to change. The CIRT manager gathers input from everyone involved and consolidates it into a concise report.

## Communications plan

| Phase | Who talks | About what |
| --- | --- | --- |
| Identification | CIRT → CIRT manager → CISO | Whether the alert is an incident; the manager escalates to the CISO based on severity. |
| Containment | CIRT ↔ manager | Scope of the attack, what's affected, and how to contain it. |
| Eradication | CIRT ↔ manager; CISO → legal, law enforcement; vendor | Removal steps and evidence collection. Notify any affected vendor so it can investigate. The CISO decides on legal and law-enforcement involvement. |
| Recovery | CIRT ↔ manager; leadership | Safely returning systems to the network. Within a reasonable time, decide on notifying media and affected customers, and prepare support staff for incoming calls. |
| Lessons learned | CIRT → manager → CISO, CEO | Documentation of events, lessons and process improvements. |

## References

- Cichonski, P., et al. [Computer Security Incident Handling Guide (SP 800-61r2)](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf). NIST, 2012.
- Kral, P. [Incident Handler's Handbook](https://www.sans.org/white-papers/33901/). SANS Institute, 2011.
- *Sample Information Security Incident Response Plan.* ISBA Mutual / ePlace Solutions, 2015.
