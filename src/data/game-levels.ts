// Text for the prompt injection game page (/projects/prompt-injection-game/).
//
// This file is only the words players see. What each level actually does lives
// in the game server repo (rootcour/prompt-injection-game, src/levels.js). If
// you change a defense there, update its description here too.
//
// postSlug: the blog post that explains this defense. The link only appears once
// that post is live (draft: false and its date has arrived), so you can point at
// a scheduled post now and the link turns on by itself after the daily rebuild.
// Use null when no post covers the defense yet. Levels 3 and 4 point to the
// post about building the game, which explains every defense.

export interface GameLevel {
  number: number;
  name: string;
  summary: string; // one line shown above the chat
  defenses: string[]; // every defense active on this level (levels are cumulative)
  lesson: string; // shown after the player beats the level
  postSlug: string | null;
}

export const LEVELS: GameLevel[] = [
  {
    number: 1,
    name: 'No protection',
    summary: 'The AI knows the password and has no instruction to keep it secret.',
    defenses: [],
    lesson:
      'On level 1 the AI was told the password and nothing else, so asking was enough. Anything you put in a ' +
      "model's prompt, including keys, internal links and customer data, can come back out if someone asks the " +
      'right way. The safest secret is one the model never sees.',
    postSlug: 'threat-modeling-ai-agents',
  },
  {
    number: 2,
    name: 'Told to keep it secret',
    summary: 'The AI is told never to reveal the password.',
    defenses: ['Instruction in the system prompt'],
    lesson:
      'Level 2 added an instruction telling the AI not to share the password. An instruction is a request, not a ' +
      'rule. The model weighs your message against its instructions, and role-play, fake authority or a clever ' +
      "reframe can tip the balance. Real apps need controls that don't depend on the model agreeing to follow them.",
    postSlug: 'five-prompt-injection-patterns',
  },
  {
    number: 3,
    name: 'Output filter',
    summary: 'Code blocks any reply that contains the password.',
    defenses: ['Instruction in the system prompt', 'Output filter'],
    lesson:
      'Level 3 added an output filter: plain code that blocks any reply containing the password, even with spaces ' +
      'or dashes between the letters. The filter only knows one way the password can look. A reversed word, a ' +
      'translation, a riddle or one letter per line all carry the same information past the filter. Keyword ' +
      'filters are cheap and worth having, but they catch the obvious leak, not the determined one.',
    postSlug: 'building-a-prompt-injection-game',
  },
  {
    number: 4,
    name: 'AI reviewer',
    summary: 'A second AI reviews each reply before you see it.',
    defenses: ['Instruction in the system prompt', 'Output filter', 'AI reviewer'],
    lesson:
      'Level 4 added a second AI that reads each reply and blocks anything that looks like a leak. The reviewer is ' +
      'better than a keyword filter at spotting disguised answers. But the reviewer reads text you helped write, so ' +
      'the reviewer can be steered the same way the first AI was. A second model adds friction. A second model ' +
      "can't promise that untrusted text won't change its behavior.",
    postSlug: 'building-a-prompt-injection-game',
  },
  {
    number: 5,
    name: 'Input screen',
    summary: 'Your message is checked for attacks before the AI sees it.',
    defenses: ['Input screen', 'Instruction in the system prompt', 'Output filter', 'AI reviewer'],
    lesson:
      'Level 5 added an input screen that judges your message before the main AI ever sees it. The screen has to ' +
      'guess intent from one message, so indirect or creative requests slip through, and the same strictness ' +
      'blocks plenty of innocent questions. In real systems, the fix that lasts is limiting what the AI can reach ' +
      'and do, so a successful injection has little to steal.',
    postSlug: 'threat-modeling-ai-agents',
  },
];

export const FINALE =
  'You beat all five levels. Each defense stopped some attacks, and none of them stopped everything. In real AI ' +
  "systems, the strongest protection is keeping secrets out of the model's reach and limiting what an AI agent " +
  'is allowed to do.';
