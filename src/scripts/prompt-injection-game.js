// =============================================================================
// prompt-injection-game.js: the game's browser code
// =============================================================================
//
// Runs in the visitor's browser on /projects/prompt-injection-game/.
//
// What this file does:
//   1. Shows the five levels and remembers which ones the player has beaten.
//   2. When the player sends a message, gets a session from the game server
//      (after a Cloudflare Turnstile "are you human?" check) and sends the
//      message to /api/chat.
//   3. Shows the AI's reply, including which defense blocked it, if any.
//   4. Sends password guesses to /api/guess and unlocks the next level on a win.
//
// What this file does NOT have: passwords or AI access. Everything in this file
// is public, so all the secret parts live on the server.
//
// Security notes for review:
//   - All text from the server or the player is added with textContent, never
//     innerHTML. That means a reply like "<img onerror=...>" shows up as text
//     instead of running as code (no cross-site scripting).
//   - The session token is kept in memory only, not in localStorage, so it
//     disappears when the tab closes.
//   - Only level progress (a number) is saved in localStorage.

const root = document.getElementById('game');

// The page only renders #game once the Worker URL and Turnstile key are set
// in src/site.ts. Without it, there's nothing to do.
if (root) startGame(root);

function startGame(root) {
  // ---------------------------------------------------------------------------
  // Settings and page elements
  // ---------------------------------------------------------------------------
  const API = root.dataset.api; // game server URL, from src/site.ts
  const SITE_KEY = root.dataset.sitekey; // Turnstile site key, from src/site.ts
  const LEVEL_COUNT = 5;
  const PROGRESS_KEY = 'prompt-injection-game:unlocked';

  // Friendly names for the defenses the server reports in `blockedBy`.
  const DEFENSE_NAMES = {
    'input-screen': 'Input screen',
    'output-filter': 'Output filter',
    'ai-reviewer': 'AI reviewer',
  };

  const tabs = [...root.querySelectorAll('.level-tab')];
  const panels = [...root.querySelectorAll('[data-level-panel]')];
  const chatLog = root.querySelector('.chat-log');
  const chatForm = root.querySelector('.chat-form');
  const chatInput = root.querySelector('#chat-input');
  const charCount = root.querySelector('.char-count');
  const guessForm = root.querySelector('.guess-form');
  const guessInput = root.querySelector('#guess-input');
  const status = root.querySelector('.game-status');
  const turnstileSlot = root.querySelector('.turnstile-slot');

  // ---------------------------------------------------------------------------
  // Game state
  // ---------------------------------------------------------------------------
  const state = {
    level: 1, // level currently on screen
    unlocked: loadProgress(), // highest level the player can open (6 = all beaten)
    session: null, // session token from /api/session (memory only)
    sessionExpiresAt: 0, // Unix seconds
    busy: false, // true while waiting for the server, to block double-sends
    logs: {}, // chat history per level, so switching levels keeps each conversation
  };

  // ---------------------------------------------------------------------------
  // Saved progress (localStorage)
  // ---------------------------------------------------------------------------
  // localStorage can be missing or throw (private browsing, blocked storage),
  // so every access is wrapped in try/catch and the game still works without it.
  function loadProgress() {
    try {
      const saved = Number(localStorage.getItem(PROGRESS_KEY));
      // Only accept whole numbers from 1 to 6. Anything else means "start over".
      return Number.isInteger(saved) && saved >= 1 && saved <= LEVEL_COUNT + 1 ? saved : 1;
    } catch {
      return 1;
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEY, String(state.unlocked));
    } catch {
      // Not saving is fine: progress lasts until the tab closes.
    }
  }

  // ---------------------------------------------------------------------------
  // Drawing the level picker and the current level
  // ---------------------------------------------------------------------------
  function render() {
    for (const tab of tabs) {
      const number = Number(tab.dataset.level);
      const beaten = number < state.unlocked;
      const locked = number > state.unlocked;
      tab.disabled = locked;
      tab.setAttribute('aria-pressed', String(number === state.level));
      tab.querySelector('.level-tab-state').textContent = beaten ? 'Beaten' : locked ? 'Locked' : '';
      tab.classList.toggle('is-beaten', beaten);
    }

    for (const panel of panels) {
      const number = Number(panel.dataset.levelPanel);
      panel.hidden = number !== state.level;
      // Show the lesson for any level already beaten, so it's there to reread.
      panel.querySelector('[data-lesson]').hidden = number >= state.unlocked;
    }

    // Hide the chat and guess forms once the level is beaten; the lesson and
    // "Go to next level" button take over.
    const beaten = state.level < state.unlocked;
    chatForm.hidden = beaten;
    guessForm.hidden = beaten;

    renderLog();
  }

  function selectLevel(number) {
    if (number < 1 || number > LEVEL_COUNT || number > state.unlocked) return;
    state.level = number;
    setStatus('');
    render();
  }

  // ---------------------------------------------------------------------------
  // Chat log
  // ---------------------------------------------------------------------------
  // Each entry is { who: 'player' | 'ai', text, blockedBy }.
  function currentLog() {
    state.logs[state.level] ??= [];
    return state.logs[state.level];
  }

  function addMessage(entry) {
    currentLog().push(entry);
    chatLog.append(messageElement(entry));
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function renderLog() {
    chatLog.replaceChildren(...currentLog().map(messageElement));
    chatLog.hidden = currentLog().length === 0;
  }

  // Builds one chat bubble. textContent only, never innerHTML (see top of file).
  function messageElement({ who, text, blockedBy }) {
    const wrapper = document.createElement('div');
    wrapper.className = `msg msg-${who}${blockedBy ? ' msg-blocked' : ''}`;

    const label = document.createElement('p');
    label.className = 'msg-who';
    label.textContent = who === 'player' ? 'You' : blockedBy ? `Blocked by: ${DEFENSE_NAMES[blockedBy] ?? blockedBy}` : 'AI';

    const body = document.createElement('p');
    body.className = 'msg-text';
    body.textContent = text;

    wrapper.append(label, body);
    chatLog.hidden = false;
    return wrapper;
  }

  function setStatus(text, isError = false) {
    status.textContent = text;
    status.classList.toggle('is-error', isError);
  }

  function setBusy(busy) {
    state.busy = busy;
    for (const button of root.querySelectorAll('form button')) button.disabled = busy;
  }

  // ---------------------------------------------------------------------------
  // Turnstile and sessions
  // ---------------------------------------------------------------------------
  // The Turnstile script loads separately (async), so it might not be ready the
  // moment someone sends their first message. Wait up to 10 seconds for it.
  async function waitForTurnstile() {
    for (let i = 0; i < 100; i++) {
      if (window.turnstile) return window.turnstile;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error('The human check did not load. Check your connection or ad blocker, then refresh.');
  }

  // Runs one Turnstile check and returns its token. With appearance
  // "interaction-only", most visitors see nothing; the widget only appears if
  // Cloudflare wants the visitor to click a checkbox.
  async function runTurnstile() {
    const turnstile = await waitForTurnstile();
    return new Promise((resolve, reject) => {
      turnstileSlot.replaceChildren();
      const widgetId = turnstile.render(turnstileSlot, {
        sitekey: SITE_KEY,
        appearance: 'interaction-only',
        callback: (token) => {
          turnstile.remove(widgetId);
          resolve(token);
        },
        'error-callback': () => {
          turnstile.remove(widgetId);
          reject(new Error('The human check failed. Refresh the page and try again.'));
        },
      });
    });
  }

  // Returns a working session token, getting a new one if needed. Sessions last
  // an hour; we renew a minute early so a message never arrives just after
  // expiry.
  async function getSession() {
    const now = Date.now() / 1000;
    if (state.session && state.sessionExpiresAt - 60 > now) return state.session;

    setStatus('Checking that you are human...');
    const turnstileToken = await runTurnstile();
    const data = await post('/api/session', { turnstileToken }, null);
    state.session = data.session;
    state.sessionExpiresAt = data.expiresAt;
    setStatus('');
    return state.session;
  }

  // ---------------------------------------------------------------------------
  // Talking to the game server
  // ---------------------------------------------------------------------------
  // Sends a JSON POST. Throws an Error with a friendly message if anything goes
  // wrong. The server always answers errors as { error, message }.
  async function post(path, body, session) {
    let response;
    try {
      response = await fetch(API + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session ? { Authorization: `Bearer ${session}` } : {}),
        },
        body: JSON.stringify(body),
      });
    } catch {
      throw new Error("Couldn't reach the game server. Check your connection and try again.");
    }

    let data = {};
    try {
      data = await response.json();
    } catch {
      // Non-JSON response; handled below.
    }
    if (!response.ok) {
      const error = new Error(data.message || 'Something went wrong. Try again in a minute.');
      error.code = data.error;
      throw error;
    }
    return data;
  }

  // Sends an authenticated request. If the server says the session expired,
  // get a new session and try once more.
  async function postWithSession(path, body) {
    try {
      return await post(path, body, await getSession());
    } catch (error) {
      if (error.code !== 'no-session') throw error;
      state.session = null;
      return post(path, body, await getSession());
    }
  }

  // ---------------------------------------------------------------------------
  // Sending a chat message
  // ---------------------------------------------------------------------------
  chatInput.addEventListener('input', () => {
    charCount.textContent = `${chatInput.value.length} / ${chatInput.maxLength}`;
  });

  // Enter sends, Shift+Enter adds a new line (like most chat apps).
  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      chatForm.requestSubmit();
    }
  });

  chatForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // stop the browser from reloading the page
    const message = chatInput.value.trim();
    if (!message || state.busy) return;

    // Remember which level this message was for, in case the player switches
    // levels while waiting.
    const level = state.level;
    addMessage({ who: 'player', text: message });
    chatInput.value = '';
    charCount.textContent = `0 / ${chatInput.maxLength}`;
    setBusy(true);
    setStatus('The AI is thinking...');

    try {
      const data = await postWithSession('/api/chat', { level, message });
      if (state.level === level) {
        addMessage({ who: 'ai', text: data.reply, blockedBy: data.blockedBy });
      } else {
        state.logs[level] ??= [];
        state.logs[level].push({ who: 'ai', text: data.reply, blockedBy: data.blockedBy });
      }
      setStatus('');
    } catch (error) {
      setStatus(error.message, true);
    } finally {
      setBusy(false);
      chatInput.focus();
    }
  });

  // ---------------------------------------------------------------------------
  // Guessing the password
  // ---------------------------------------------------------------------------
  guessForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const guess = guessInput.value.trim();
    if (!guess || state.busy) return;

    const level = state.level;
    setBusy(true);
    setStatus('Checking your guess...');

    try {
      const data = await postWithSession('/api/guess', { level, guess });
      if (data.correct) {
        guessInput.value = '';
        // Unlock the next level (never move progress backwards).
        state.unlocked = Math.max(state.unlocked, level + 1);
        saveProgress();
        setStatus(`Correct! Level ${level} beaten.`);
        render();
        // Move keyboard focus to the lesson so screen reader users hear it.
        const lesson = root.querySelector(`[data-lesson="${level}"]`);
        lesson.setAttribute('tabindex', '-1');
        lesson.focus();
      } else {
        setStatus('Not quite. Keep talking to the AI and try again.', true);
      }
    } catch (error) {
      setStatus(error.message, true);
    } finally {
      setBusy(false);
    }
  });

  // ---------------------------------------------------------------------------
  // Buttons: level tabs, "Go to level N", reset
  // ---------------------------------------------------------------------------
  for (const tab of tabs) {
    tab.addEventListener('click', () => selectLevel(Number(tab.dataset.level)));
  }

  for (const button of root.querySelectorAll('.next-level')) {
    button.addEventListener('click', () => {
      selectLevel(Number(button.dataset.next));
      chatInput.focus();
    });
  }

  root.querySelector('[data-reset]').addEventListener('click', () => {
    if (!window.confirm('Start over from level 1?')) return;
    state.unlocked = 1;
    state.logs = {};
    saveProgress();
    selectLevel(1);
  });

  // ---------------------------------------------------------------------------
  // Start: open the furthest level the player has reached.
  // ---------------------------------------------------------------------------
  state.level = Math.min(state.unlocked, LEVEL_COUNT);
  render();
}
