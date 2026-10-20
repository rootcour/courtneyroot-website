# LinkedIn: Five prompt injection patterns from 2026

**Post on:** Nov 24, 2026
**Blog post:** https://courtneyroot.dev/writing/five-prompt-injection-patterns/

## Post

Prompt injection stopped being a demo this year. I went through the 2026 incidents and research, and most of them fall into five patterns:

1. Hidden text on web pages that AI agents read
2. Instructions planted in logs that an assistant summarizes
3. Calendar invites and emails anyone can send you
4. A pull request title that made three AI coding agents leak their own API keys
5. Setup instructions that led an agent to publish a malicious package

In every case, the AI could read content someone else controlled and also do something that mattered, like send data, post or publish.

You can't fully stop a model from reading a bad instruction. You can decide what it's allowed to do afterward. I wrote up the control I'd put in place for each pattern. Link in the comments.

#AIsecurity #promptinjection #cybersecurity

## First comment

Full post with the control for each pattern: https://courtneyroot.dev/writing/five-prompt-injection-patterns/
