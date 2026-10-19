---
title: "Threat modeling an AI agent with tool access"
description: "What changes when software can read your inbox, call APIs and act on its own, and the controls I'd require before shipping one."
date: 2026-10-19
pillar: securing-ai
draft: true
---

<!-- Draft outline. Set draft: false when it's ready to publish. -->

## The shift

A chatbot answers questions. An agent takes actions. Once a model can call tools, every piece of text it reads becomes a possible instruction.

## The threat model

- **Untrusted input:** web pages, emails, documents and tool results the agent reads.
- **Assets:** credentials, data the agent can reach, actions it can take on the user's behalf.
- **Main risks:** prompt injection, over-broad tool permissions, data exfiltration through tool calls, confused-deputy actions.

## Controls I'd require

1. Least-privilege tool scopes, per task.
2. Human confirmation for irreversible or outbound actions.
3. Treat all tool output as data, never as instructions.
4. Logging every tool call with enough context to reconstruct a decision.

## What I'm still unsure about

TODO
