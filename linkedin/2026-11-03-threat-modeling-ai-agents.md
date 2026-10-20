# LinkedIn: Threat modeling an AI agent with tool access

**Post on:** Nov 3, 2026
**Blog post:** https://courtneyroot.dev/writing/threat-modeling-ai-agents/

## Post

A chatbot answers questions. An agent takes actions. That difference changes how I think about security.

For an agent, everything it reads goes into the same place as its instructions. A hidden line in a web page, an email or a log file can steer what it does next.

When I review an agent, I start with four questions:
1. What does it read?
2. Whose authority does it act with?
3. What can it do?
4. How can data leave?

If an agent reads untrusted content and can also take irreversible actions or send data out, there's a prompt injection path. Better instructions to the model won't close it. Limiting what the agent is allowed to do will.

I wrote up the full framework with a worked example and a checklist you can take into your next design review. Link in the comments.

#AIsecurity #threatmodeling #cybersecurity

## First comment

Full post with the checklist: https://courtneyroot.dev/writing/threat-modeling-ai-agents/
