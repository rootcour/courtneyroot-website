// Central place for names, links and pillar labels. Edit here, not in every page.
export const SITE = {
  name: 'Courtney Root',
  title: 'Courtney Root — AI & Cloud Security',
  description:
    'Security engineer writing about securing AI systems, using AI for defense, and translating security risk for leaders.',
  email: 'courtneyroot1@gmail.com',
  links: {
   linkedin: 'https://www.linkedin.com/in/courtney-root',
    github: 'https://github.com/rootcour',
  },
};

// Prompt injection game (/projects/prompt-injection-game/).
// The game page stays in a "coming soon" state until both values below are
// filled in, so it's safe to upload the website files before the Worker is live.
export const GAME = {
  // Your Worker's URL from `npm run deploy` in the prompt-injection-game repo.
  // No trailing slash. If you change this, also update connect-src in public/_headers.
  apiUrl: 'https://prompt-injection-game.courtneyroot.dev',
  // Turnstile SITE key (the public one, safe to commit). The SECRET key goes
  // only in the Worker, never here.
  turnstileSiteKey: '0x4AAAAAAFeUQ0z6U7qRyuuc',
  repoUrl: 'https://github.com/rootcour/prompt-injection-game',
};

export const PILLARS: Record<string, { label: string; blurb: string }> = {
  'securing-ai': {
    label: 'Securing AI systems',
    blurb: 'Threat models for agents and LLM apps: prompt injection, tool permissions, model supply chain.',
  },
  'ai-for-defenders': {
    label: 'AI for defenders',
    blurb: 'What actually works when security teams put AI into detection, triage and code review.',
  },
  'security-leadership': {
    label: 'Security as a business decision',
    blurb: 'Translating risk into language boards and executives can act on.',
  },
  'post-quantum': {
    label: 'Post-quantum migration',
    blurb: 'Practical crypto-agility before "harvest now, decrypt later" becomes a breach.',
  },
  general: { label: 'Notes', blurb: '' },
};
