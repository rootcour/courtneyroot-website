---
title: "I built a prompt injection game. Here's what each level teaches."
description: "Five levels, five defenses, one password. Building a game where players trick an AI showed me why no single prompt injection defense is enough, and why the strict ones break things."
date: 2026-10-22
pillar: securing-ai
draft: true
---

I wanted a way to show people prompt injection instead of describing it. So I built a [prompt injection game](/projects/prompt-injection-game/). Each level has an AI guarding a password, and your job is to talk it into giving the password up. Every level adds one more defense. When you win, the game explains the defense you just got past.

Prompt injection is when text an AI reads changes what the AI does. Describing the problem is easy. Feeling how slippery it is takes a few minutes of trying, and a game is a good way to spend those minutes.

## How the game works

You type a message. The message goes to a small server I run on Cloudflare, which holds the passwords and talks to the AI. The website itself never sees a password, so you can't find one by viewing the page source. The AI is Llama 3.1 8B, a small open model running on Cloudflare Workers AI.

The levels are cumulative. Level 5 runs every defense from levels 1 through 4, plus its own. When a defense blocks a reply, the game tells you which one fired. Hiding the reason would make the game harder, but the point is to learn how each defense behaves.

## What each level teaches

**Level 1: no protection.** The AI is told the password and nothing else. Asking is enough. The lesson is simple and still gets missed in real products: anything you put in a model's prompt can come back out. API keys, internal links and customer data in a system prompt are one clever question away from the user. The safest secret is one the model never sees.

**Level 2: an instruction to keep the secret.** The AI is now told never to reveal the password. Most people get past level 2 within a few tries. An instruction in a prompt is a request, not a rule. The model weighs your message against its instructions, and a reframed request or a claim of authority can tip the balance. I still see "the system prompt tells it not to" offered as a security control. On its own, the system prompt isn't one.

**Level 3: an output filter.** Plain code checks every reply and blocks any reply that contains the password, even with spaces or dashes between the letters. Level 3 is where most players get stuck for a while, and then the answer clicks: the filter only knows one way the password can look. A description of the word carries the same information, and the filter has no idea. Keyword filters are cheap and worth having, but they catch the obvious leak, not the determined one.

**Level 4: an AI reviewer.** A second AI reads each reply before you see it and blocks anything that contains the password in disguise: reversed, spelled out, translated or encoded. The reviewer is much better than a keyword filter at spotting a disguised answer. But the reviewer judges each reply on its own. A player who collects small, harmless-looking clues across several messages can rebuild the password from pieces the reviewer never saw together. The reviewer also reads text the player helped write, so the player can try to talk to the reviewer too.

**Level 5: an input screen.** Before the main AI sees anything, another AI checks your message and blocks it if it mentions a password or secret, tells the AI to ignore its instructions, claims to be an administrator, or asks for the system prompt. Real input filters look for the same patterns. Players get through by asking indirectly, in words the screen isn't watching for.

## What surprised me while building it

**My first version of levels 4 and 5 was unbeatable, and that was a bug.** I wrote the reviewer and the input screen to block anything that might help a player. With a small model, "anything that might help" turned into almost everything. The reviewer blocked one-word yes or no answers. The input screen blocked ordinary questions. I couldn't beat my own game.

I think real teams hit the same wall. A strict AI guardrail feels safe in a design review, but a guardrail that blocks every request isn't security. People route around the guardrail or turn it off. I loosened both checks so they block the specific things they're meant to block and let the rest through. The levels got beatable, and the lessons got more honest.

**Each message stands alone.** The AI sees only your current message, not the conversation so far. One message per turn keeps each request cheap and stops players from slowly wearing the AI down over a long chat. One message per turn also creates the gap level 4 teaches: checks that look at one reply at a time miss leaks spread across many replies.

## Keeping the game safe and free

The game runs on Cloudflare's free plans. Workers AI includes 10,000 Neurons a day at no charge, and on the free plan, usage past that point fails instead of being billed. The worst case is the game pausing until the next day, not a surprise bill.

A few more controls sit in front of the AI:

- **A human check.** Cloudflare Turnstile checks that a visitor is probably a person before the server will answer, so bots can't burn through the day's allowance.
- **Daily limits.** 800 messages a day across everyone, 40 per visitor, and 10 password guesses per level per visitor.
- **No stored IP addresses or messages.** The server counts visitors with an anonymous ID that changes every day, and it doesn't save what people type.
- **Daily passwords.** Passwords change every day, so answers posted online stop working by the next day.

## What the game says about real AI systems

I tuned the defenses so people can win. Real products can use stronger versions of each defense and bigger models. But the weaknesses in the game are the same ones attackers use against real systems. Each defense stopped some attacks, and none of them stopped everything.

The fix that holds up isn't a better filter. The fix is changing what the model can reach and do. If the password were never in the model's context, no prompt could get the password out. In a real system, that means keeping secrets out of prompts, giving AI agents only the access a task needs, and requiring a human to approve anything that can't be undone. I go deeper on those controls in an upcoming post on threat modeling AI agents.

## Try it

[Play the prompt injection game](/projects/prompt-injection-game/). If you get stuck on level 3, think about what the filter is actually checking for.

The code is on GitHub at [rootcour/prompt-injection-game](https://github.com/rootcour/prompt-injection-game), with comments explaining each part. And if you like the game, try [Gandalf by Lakera](https://gandalf.lakera.ai/). Gandalf inspired my version and has more levels.
