# LinkedIn: I built a prompt injection game

**Post on:** the same day the blog post goes live (rename this file to match that date)
**Blog post:** https://courtneyroot-website.pages.dev/writing/building-a-prompt-injection-game/

## Post

I built a game where you try to talk an AI into revealing a password.

Each of the five levels adds one defense: an instruction not to share the password, a filter that blocks the word, a second AI that reviews every reply, and a screen that checks your message before the AI sees it. When you win a level, the game explains the defense you just got past.

One thing surprised me while building it. My first version of the strictest defenses blocked almost everything, including one-word yes or no answers, and I couldn't beat my own game. A guardrail that blocks everyone isn't security. People just route around it.

Each defense stopped some attacks, and none of them stopped everything. The fix that holds up in real systems is limiting what the AI can reach and do.

Try the game and see how far you get. Link in the comments.

#cybersecurity #AIsecurity #promptinjection

## First comment

Play the game: https://courtneyroot-website.pages.dev/projects/prompt-injection-game/
How I built it and what each level teaches: https://courtneyroot-website.pages.dev/writing/building-a-prompt-injection-game/
