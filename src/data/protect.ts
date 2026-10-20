// Content for the "Protect Yourself Online" guide.
// One entry per audience. Text fields may contain simple HTML links written here,
// never anything from users. Links were checked October 2026; recheck them now and then,
// because services and settings change names.

export type Link = { label: string; href: string };
export type Step = { id: string; title: string; body: string; short: string; links?: Link[] };
export type Tool = { name: string; href?: string; body: string };

export type Audience = {
  slug: string; // '' for the default (adults) version
  label: string;
  heading: string;
  lede: string;
  breach: { intro: string; tools: Tool[]; foundTitle: string; found: string[] };
  checkup: { intro: string; steps: Step[] };
  scams: { intro: string; signs: string[]; examples: { title: string; body: string }[]; rule: string; report: string[] };
  hacked: { intro: string; steps: string[]; callout?: { title: string; body: string; steps: string[] } };
  ai: { intro: string; items: { title: string; body: string }[] };
  resources: Link[];
  print: { scamRules: string[]; hackedSteps: string[]; links: Link[] };
};

const FTC_FREEZE = 'https://consumer.ftc.gov/articles/credit-freezes-and-fraud-alerts';
const HIBP = 'https://haveibeenpwned.com/';
const GOOGLE_PW = 'https://passwords.google.com/';
const IRS_IPPIN = 'https://www.irs.gov/ippin';
const IDTHEFT = 'https://www.identitytheft.gov/';
const IC3 = 'https://www.ic3.gov/';
const REPORTFRAUD = 'https://reportfraud.ftc.gov/';
const FTC_TEXTS = 'https://consumer.ftc.gov/articles/how-recognize-and-report-spam-text-messages';
const FTC_PHISHING = 'https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams';
const FBI_AI_PSA = 'https://www.ic3.gov/psa/2024/psa241203';
const AARP = 'https://www.aarp.org/money/scams-fraud/helpline/';
const OPENAI_DATA = 'https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt';
const GEMINI_DATA = 'https://support.google.com/gemini/answer/13594961?hl=en';
const CLAUDE_DATA = 'https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training';
const TAKE_IT_DOWN = 'https://takeitdown.ncmec.org/';
const FBI_SEXTORTION = 'https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/sextortion/financially-motivated-sextortion';
const FBI_TIPS = 'https://tips.fbi.gov/';
const FBI_KIDS = 'https://www.fbi.gov/how-we-can-help-you/online-safety/stay-safe-online-kids-and-teens';
const FTC_SMB = 'https://www.ftc.gov/business-guidance/small-businesses/cybersecurity';
const CISA_SMB = 'https://www.cisa.gov/cyber-guidance-small-businesses';
const NIST_SMB = 'https://www.nist.gov/itl/smallbusinesscyber';
const IC3_BEC = 'https://www.ic3.gov/CrimeInfo/BEC';
const CISA_SOW = 'https://www.cisa.gov/secure-our-world';

const a = (href: string, text: string) => `<a href="${href}">${text}</a>`;

const passwordCheckers: Tool = {
  name: 'The password checkup in your phone or browser',
  href: GOOGLE_PW,
  body: `Google Password Manager (Password Checkup), Apple's Passwords app (Security Recommendations) and Microsoft Edge (Password Monitor) each flag saved passwords that were leaked, reused or easy to guess. Use whichever one already holds your passwords.`,
};

const aiTraining = {
  title: 'Turn off training on your chats if you prefer',
  body: `Most chatbots can use your conversations to improve their models unless you turn that off. In ChatGPT, go to Settings, then Data controls, and turn off "Improve the model for everyone." For a one-off private conversation, use Temporary Chat (${a(OPENAI_DATA, 'OpenAI help')}). In Gemini, turn off "Keep activity" on your Gemini Apps Activity page. Google notes that people may review some chats (${a(GEMINI_DATA, 'Google help')}). In Claude, turn off Model Improvement in your Privacy Settings (${a(CLAUDE_DATA, 'Claude help')}). For other apps, look under Privacy in the settings.`,
};

export const AUDIENCES: Audience[] = [
  {
    slug: '',
    label: 'Adults and families',
    heading: 'Protect Yourself Online',
    lede: 'Simple steps to protect your accounts, your money and your family online. You don\'t need a security background, and most steps take a few minutes.',
    breach: {
      intro: 'When a company you use gets breached, your email address and sometimes your password end up in lists that criminals share. Free tools can tell you where your information has shown up.',
      tools: [
        {
          name: 'Have I Been Pwned',
          href: HIBP,
          body: 'Type in your email address to see which known data breaches it appeared in. You can also sign up to get an email if your address shows up in a new breach.',
        },
        passwordCheckers,
      ],
      foundTitle: 'Found your email in a breach? Here\'s what to do.',
      found: [
        'Don\'t panic. Most people\'s email addresses show up in several breaches.',
        'Change the password for that site, and for any other site where you used the same password.',
        'Turn on two-step login for that account (see the checkup below).',
        'If the breach included your Social Security number, freeze your credit.',
        'Watch for scam emails that mention the breach or the company. Criminals use breach news as bait.',
      ],
    },
    checkup: {
      intro: 'Work through these steps in order, because the first few protect everything else. Check off each one as you finish. Your progress is saved on this device.',
      steps: [
        {
          id: 'email',
          title: 'Secure your email account first',
          body: 'Your email can reset the password on almost every other account, so protect it most. Give it a long password you don\'t use anywhere else, and turn on two-step login.',
          short: 'Give your email a unique password and turn on two-step login.',
        },
        {
          id: 'password-manager',
          title: 'Use a password manager',
          body: 'A password manager creates and remembers a different password for every site, so one leak doesn\'t unlock everything. The one built into your phone or browser is a fine place to start.',
          short: 'Let a password manager create a different password for every site.',
        },
        {
          id: 'two-step',
          title: 'Turn on passkeys or two-step login',
          body: 'Start with email, banking and social media. A passkey or an authenticator app is stronger than a code sent by text message, but any second step is much better than none.',
          short: 'Add passkeys or two-step login to email, banking and social media.',
        },
        {
          id: 'updates',
          title: 'Turn on automatic updates',
          body: 'Updates fix security holes that criminals already know about. Turn on automatic updates for your phone, computer and web browser, and restart when they ask.',
          short: 'Turn on automatic updates for your phone, computer and browser.',
        },
        {
          id: 'credit-freeze',
          title: 'Freeze your credit',
          body: `A credit freeze stops anyone from opening new credit in your name. Freezing is free, doesn't affect your credit score, and lasts until you lift it. You can lift it for a few days when you apply for a loan. Freeze at all three credit bureaus. Parents can also freeze credit for children under 16 (${a(FTC_FREEZE, 'FTC guide')}).`,
          short: 'Freeze your credit at Equifax, Experian and TransUnion. It\'s free.',
          links: [
            { label: 'Equifax', href: 'https://www.equifax.com/personal/credit-report-services/credit-freeze/' },
            { label: 'Experian', href: 'https://www.experian.com/freeze/center.html' },
            { label: 'TransUnion', href: 'https://www.transunion.com/credit-freeze' },
          ],
        },
        {
          id: 'phone-lock',
          title: 'Lock your phone number',
          body: 'Criminals sometimes talk a phone company into moving your number to their phone, then use it to receive your login codes. Ask your carrier to turn on its number lock or port-out protection, and set an account PIN.',
          short: 'Ask your phone carrier for a number lock and an account PIN.',
        },
        {
          id: 'ip-pin',
          title: 'Get an IRS identity protection PIN',
          body: `An IP PIN stops someone else from filing a tax return in your name. Anyone with a Social Security number or ITIN can get one, and you get a new PIN each year (${a(IRS_IPPIN, 'IRS')}).`,
          short: 'Get an IRS identity protection PIN to block fake tax returns.',
        },
        {
          id: 'code-word',
          title: 'Pick a family code word',
          body: `Scammers can now clone a voice from a short video clip. Agree on a word or phrase your family would ask for if someone calls in an "emergency" asking for money. The FBI recommends this step (${a(FBI_AI_PSA, 'FBI alert')}).`,
          short: 'Agree on a family code word for emergency calls.',
        },
      ],
    },
    scams: {
      intro: 'Scams change every year, but they share the same warning signs. If you notice one of these, slow down.',
      signs: [
        'It\'s urgent: your account will close, a loved one is in trouble, or a deal ends today.',
        'They want an unusual payment: gift cards, cryptocurrency, wire transfers or payment apps.',
        'They ask you to keep it secret, or to stay on the phone.',
        'The message came out of nowhere and includes a link or a phone number to call.',
      ],
      examples: [
        { title: 'Fake delivery and toll texts', body: 'A text says a package is held or you owe a small toll, with a link to pay. The link steals your card details.' },
        { title: 'Your account is locked', body: 'An email or text that looks like your bank, Amazon or Apple asks you to log in through its link. The page is fake.' },
        { title: 'Tech support pop-ups', body: 'A loud warning on your screen says your computer is infected and gives a number to call. Real companies don\'t do this. Close the browser.' },
        { title: 'A family member in trouble', body: 'A caller sounds like your child or grandchild and needs money right away. AI can copy a voice. Ask for your family code word, or hang up and call them directly.' },
        { title: 'Government impersonators', body: 'Someone claims to be from the IRS, Social Security or the police and says you must pay now. Government agencies don\'t demand gift cards or crypto.' },
        { title: 'Online romance and investing', body: 'A new online friend becomes close quickly, then introduces an investment that seems to grow fast. You won\'t be able to take the money out.' },
      ],
      rule: 'The one rule that stops most scams: don\'t use the link or phone number in the message. Look up the company\'s number yourself, or open the app you already have, and check there.',
      report: [
        `Forward scam texts to 7726 (SPAM), then delete them (${a(FTC_TEXTS, 'FTC')}).`,
        `Report scams at ${a(REPORTFRAUD, 'ReportFraud.ftc.gov')}.`,
        `Want to talk it through? AARP's free Fraud Watch Network Helpline is at 877-908-3360 (${a(AARP, 'AARP')}).`,
      ],
    },
    hacked: {
      intro: 'If you think someone got into an account or took money, take a breath. Most of this can be fixed, and acting quickly helps.',
      steps: [
        'Secure your email first. From a device you trust, change the password, sign out of all other sessions, and check that the recovery phone number, recovery email and forwarding settings are still yours.',
        'Change the password on the hacked account and on any account that used the same password. Turn on two-step login.',
        'If money is involved, call your bank or card company using the number on the back of your card. Ask them to stop or reverse the payment and watch your account.',
        `If someone used your identity, go to ${a(IDTHEFT, 'IdentityTheft.gov')} for a step-by-step recovery plan, and freeze your credit.`,
        `Report internet fraud to the FBI at ${a(IC3, 'IC3.gov')}, and scams to the FTC at ${a(REPORTFRAUD, 'ReportFraud.ftc.gov')}.`,
        'If your account sent strange messages to friends, let them know so they don\'t click anything.',
      ],
    },
    ai: {
      intro: 'AI chatbots like ChatGPT, Gemini and Claude are useful for everyday questions. A few habits keep you safe while you use them.',
      items: [
        { title: 'Don\'t paste private information', body: 'Leave out passwords, Social Security numbers, account numbers, medical records and other people\'s private details. If you use AI at work, use only the tools your employer approves.' },
        aiTraining,
        { title: 'Double-check important answers', body: 'AI can sound confident and still be wrong. Check answers about money, health and legal questions with a trusted source or a professional.' },
        { title: 'Expect scams to look more real', body: 'AI helps scammers write perfect emails, copy voices and make fake videos. A polished message isn\'t proof it\'s real, so verify through another channel.' },
      ],
    },
    resources: [
      { label: 'IdentityTheft.gov: recovery plans for identity theft', href: IDTHEFT },
      { label: 'FTC: how to recognize and avoid phishing', href: FTC_PHISHING },
      { label: 'FTC: credit freezes and fraud alerts', href: FTC_FREEZE },
      { label: 'CISA Secure Our World: four easy steps', href: CISA_SOW },
      { label: 'FBI IC3: report internet crime', href: IC3 },
    ],
    print: {
      scamRules: [
        'Slow down if it\'s urgent, secret or asks for gift cards, crypto or a wire.',
        'Don\'t use the link or number in the message. Look it up yourself.',
        'Ask for the family code word on any emergency money call.',
      ],
      hackedSteps: [
        'Secure your email first: new password, sign out everywhere.',
        'Call your bank using the number on your card.',
        'Identity theft: go to IdentityTheft.gov and freeze your credit.',
        'Report fraud at IC3.gov and ReportFraud.ftc.gov.',
      ],
      links: [
        { label: 'Check breaches', href: 'haveibeenpwned.com' },
        { label: 'Identity theft help', href: 'IdentityTheft.gov' },
        { label: 'Report scams', href: 'ReportFraud.ftc.gov' },
        { label: 'Forward scam texts', href: '7726' },
        { label: 'AARP fraud helpline', href: '877-908-3360' },
      ],
    },
  },

  {
    slug: 'students',
    label: 'Students and teens',
    heading: 'Protect Yourself Online',
    lede: 'Protect your accounts, your photos and your money, at school, in games and on social media.',
    breach: {
      intro: 'Big websites and apps get breached all the time, and your email and password can end up on lists criminals share. Two free tools show you where.',
      tools: [
        {
          name: 'Have I Been Pwned',
          href: HIBP,
          body: 'Type in your personal and school email addresses to see which breaches they showed up in. You can sign up to get an alert if they show up in a new one.',
        },
        passwordCheckers,
      ],
      foundTitle: 'Found your email in a breach?',
      found: [
        'Change the password for that site, and anywhere else you used the same one.',
        'Turn on two-step login for that account.',
        'Watch for messages that mention the breach and ask you to "verify" your account. Those are usually scams.',
      ],
    },
    checkup: {
      intro: 'These steps protect the accounts you care about most. Check them off as you go. Your progress is saved on this device.',
      steps: [
        {
          id: 'email',
          title: 'Lock down your main email',
          body: 'Your email can reset your passwords for social media, games and school apps. Give it a strong password nobody else knows and turn on two-step login.',
          short: 'Protect your main email with a strong password and two-step login.',
        },
        {
          id: 'passwords',
          title: 'Use a different password for every account',
          body: 'If one game or app gets breached, the same password can unlock your other accounts. Let your phone\'s password manager create and save a different one for each.',
          short: 'Use a different password for every account.',
        },
        {
          id: 'two-step',
          title: 'Turn on two-step login for social and gaming accounts',
          body: 'Most social media and gaming platforms let you add an authenticator app, passkey or text code. Do it for the accounts you\'d be most upset to lose.',
          short: 'Add two-step login to your social media and gaming accounts.',
        },
        {
          id: 'codes',
          title: 'Never share a login code',
          body: 'No real company, game moderator or friend needs the code that was texted or emailed to you. Anyone who asks for it is trying to take your account.',
          short: 'Never share a login code with anyone.',
        },
        {
          id: 'privacy',
          title: 'Check your privacy settings',
          body: 'Make your accounts private, limit who can message you, and turn off location sharing in apps that don\'t need it. Review who can see your posts.',
          short: 'Go private, limit who can message you, and turn off location sharing.',
        },
        {
          id: 'updates',
          title: 'Turn on automatic updates',
          body: 'Updates for your phone, laptop and apps fix security holes. Turn on automatic updates and restart when asked.',
          short: 'Turn on automatic updates.',
        },
        {
          id: 'posting',
          title: 'Think before you share details',
          body: 'Your school, schedule, address and travel plans help strangers find you or guess your security questions. Share them only with people you know in real life.',
          short: 'Keep your school, schedule and address off public posts.',
        },
        {
          id: 'credit',
          title: 'Ask a parent about freezing your credit',
          body: `Criminals use young people's identities because nobody checks their credit for years. Parents can freeze a child's credit for free if the child is under 16. If you're 16 or older, you can freeze your own (${a(FTC_FREEZE, 'FTC guide')}).`,
          short: 'Freeze your credit, or ask a parent to. It\'s free.',
        },
      ],
    },
    scams: {
      intro: 'Scammers know what students and teens care about. Watch for these warning signs.',
      signs: [
        'It sounds too good: free game currency, expensive skins, or a giveaway you didn\'t enter.',
        'It\'s urgent or scary: your account will be banned, or someone has a video of you.',
        'Someone you just met online moves fast, asks for photos, or wants to switch to a different app.',
        'They ask for a login code, a password, or a gift card.',
      ],
      examples: [
        { title: 'Free game currency and skins', body: 'Sites and messages that promise free Robux, V-Bucks or skins usually just want your login. Get items only through the official game or store.' },
        { title: '"Is this you in this video?"', body: 'A friend\'s hacked account sends you a link. If you log in through it, your account gets hacked next. Ask the friend another way.' },
        { title: 'Fake jobs and scholarships', body: 'Easy remote jobs, or scholarships with a fee to apply, are often scams. Real scholarships don\'t charge you to apply.' },
        { title: 'Someone who wants photos', body: 'A new online friend who flatters you, moves fast and asks for photos may be a scammer who plans to threaten you. If anyone ever threatens you, see the steps below.' },
        { title: 'AI fakes', body: 'AI can copy voices and create fake photos of real people. If someone makes or shares a fake image of you, it\'s not your fault, and you can get help.' },
      ],
      rule: 'The rule that stops most scams: don\'t click links or log in from a message. Open the app or website yourself and check there.',
      report: [
        'Report and block scam accounts using the app\'s report button.',
        `Forward scam texts to 7726 (SPAM) (${a(FTC_TEXTS, 'FTC')}).`,
        'Tell a parent, teacher or another adult you trust if something feels off.',
      ],
    },
    hacked: {
      intro: 'If someone got into one of your accounts, act quickly. You\'re not in trouble.',
      steps: [
        'Secure your email first. Change the password and sign out of all other sessions.',
        'Use the app\'s "forgot password" or account recovery page to get back in, then change the password and turn on two-step login.',
        'If the account has saved payment info or was used to buy things, tell a parent so they can contact the bank or the platform.',
        'Let friends know your account was hacked so they don\'t click anything it sent.',
      ],
      callout: {
        title: 'If someone is threatening to share images of you',
        body: 'This crime is called sextortion. You are not alone, and it is not your fault. Paying almost never makes it stop.',
        steps: [
          'Don\'t send money or more images.',
          'Stop replying, but don\'t delete anything. Save usernames, messages and screenshots.',
          'Block and report the account on the app.',
          'Tell a trusted adult right away.',
          `Report it to the FBI at ${a(FBI_TIPS, 'tips.fbi.gov')} or 1-800-CALL-FBI (${a(FBI_SEXTORTION, 'FBI guidance')}).`,
          `If the images were taken when you were under 18, ${a(TAKE_IT_DOWN, 'Take It Down')} can help get them removed without you uploading them.`,
          'If you\'re feeling overwhelmed or unsafe, call or text 988 any time to talk to someone.',
        ],
      },
    },
    ai: {
      intro: 'AI chatbots can help you study, but they come with a few rules of their own.',
      items: [
        { title: 'Check your school\'s rules first', body: 'Schools and teachers have different rules about AI. Ask before using it for graded work.' },
        { title: 'Keep personal details out', body: 'Don\'t paste passwords, your address, private photos, or other people\'s personal information into a chatbot.' },
        { title: 'Check what it tells you', body: 'AI makes mistakes and sometimes makes up sources. Verify facts before you use them in schoolwork.' },
        { title: 'Never use AI to fake real people', body: 'Making fake images or voices of classmates or anyone real can hurt them badly, and in many places it\'s against the law.' },
        aiTraining,
      ],
    },
    resources: [
      { label: 'FBI: staying safe online for kids and teens', href: FBI_KIDS },
      { label: 'NCMEC Take It Down: remove images taken when you were under 18', href: TAKE_IT_DOWN },
      { label: 'FTC: how to recognize and avoid phishing', href: FTC_PHISHING },
      { label: 'CISA Secure Our World: four easy steps', href: CISA_SOW },
    ],
    print: {
      scamRules: [
        'Free game currency, surprise giveaways and urgent warnings are usually scams.',
        'Never share a login code. Open the app yourself instead of clicking links.',
        'If anyone threatens you, don\'t pay. Save everything and tell a trusted adult.',
      ],
      hackedSteps: [
        'Secure your email first: new password, sign out everywhere.',
        'Recover the account through the app, then turn on two-step login.',
        'Tell a parent if money or payment info was involved.',
        'Threatened with images? Report at tips.fbi.gov and use Take It Down.',
      ],
      links: [
        { label: 'Check breaches', href: 'haveibeenpwned.com' },
        { label: 'Report threats', href: 'tips.fbi.gov' },
        { label: 'Remove images', href: 'takeitdown.ncmec.org' },
        { label: 'Talk to someone', href: 'Call or text 988' },
      ],
    },
  },

  {
    slug: 'small-business',
    label: 'Small business owners',
    heading: 'Protect Yourself Online',
    lede: 'The steps that stop most attacks on small businesses, in plain language. You don\'t need an IT department to do most of them.',
    breach: {
      intro: 'Your business email addresses and passwords can show up in breaches of other companies. Checking regularly helps you catch problems early.',
      tools: [
        {
          name: 'Have I Been Pwned',
          href: HIBP,
          body: 'Check each business email address for known breaches and sign up for alerts. The site also offers monitoring for a whole email domain after you prove you own it. Check its pricing for your size.',
        },
        {
          name: 'A business password manager',
          body: 'Business password managers let your team share logins safely, warn you about leaked or reused passwords, and let you remove someone\'s access in one step when they leave.',
        },
      ],
      foundTitle: 'Found a business account in a breach?',
      found: [
        'Change that password, and any other account that shared it.',
        'Make sure two-step login is on for that account.',
        'Warn staff that scammers may send emails that mention the breach.',
      ],
    },
    checkup: {
      intro: 'These steps stop most of the attacks small businesses face. Check them off as you finish. Your progress is saved on this device.',
      steps: [
        {
          id: 'mfa',
          title: 'Turn on two-step login everywhere money or data lives',
          body: 'Start with email, banking, payroll and accounting, and make it required for everyone. Accounts with administrator access come first.',
          short: 'Require two-step login for email, banking, payroll and admin accounts.',
        },
        {
          id: 'payments',
          title: 'Verify every payment change by phone',
          body: 'If a vendor, employee or boss emails to change bank details or asks for an urgent payment, call them at a number you already have. Never use the number in the email.',
          short: 'Confirm any change to bank details with a phone call to a known number.',
        },
        {
          id: 'backups',
          title: 'Back up your data and test it',
          body: 'Keep at least one backup that ransomware can\'t reach, such as an offline copy or a cloud backup with version history. Try restoring a file every few months to make sure it works.',
          short: 'Keep an offline or versioned backup, and test restoring it.',
        },
        {
          id: 'updates',
          title: 'Turn on automatic updates',
          body: 'Update computers, phones, routers and business software automatically. Replace devices the maker no longer supports.',
          short: 'Turn on automatic updates and replace unsupported devices.',
        },
        {
          id: 'admin',
          title: 'Keep admin accounts separate',
          body: 'Nobody should use an administrator account for everyday email and browsing. Give admin access only to people who need it.',
          short: 'Use separate admin accounts, only for people who need them.',
        },
        {
          id: 'offboarding',
          title: 'Remove access the day someone leaves',
          body: 'When an employee or contractor leaves, turn off their accounts that day and change any passwords they knew.',
          short: 'Turn off access the same day someone leaves.',
        },
        {
          id: 'domain',
          title: 'Protect your email domain',
          body: `Ask your email provider or IT helper to set up SPF, DKIM and DMARC. These settings make it much harder for scammers to send email that looks like it came from your business (${a(FTC_SMB, 'FTC guide')}).`,
          short: 'Set up SPF, DKIM and DMARC so no one can spoof your email.',
        },
        {
          id: 'apps',
          title: 'Know which apps can reach your data',
          body: 'List the apps and AI tools connected to your email, files and customer systems. Remove the ones you don\'t use. Each connection is a way in if that company gets breached.',
          short: 'Review and remove apps connected to your email and files.',
        },
        {
          id: 'plan',
          title: 'Write a one-page incident plan',
          body: 'Write down who to call if something goes wrong: your bank, IT help, insurance company and lawyer. Keep a printed copy somewhere you can find it if your computers are down.',
          short: 'Write down who to call: bank, IT, insurance, lawyer.',
        },
      ],
    },
    scams: {
      intro: 'Criminals target small businesses because one payment can be worth a lot and there are fewer checks. These scams are the most common.',
      signs: [
        'A request to change bank details or pay a new account, especially near a deadline.',
        'Pressure to act now and skip the normal approval.',
        'A request to keep it quiet, like a boss asking for gift cards for a "surprise."',
        'An email address or website that is almost, but not quite, right.',
      ],
      examples: [
        { title: 'Fake invoice or changed bank details', body: 'An email that looks like it\'s from a real vendor says their bank account changed. The money goes to the scammer. This scam, called business email compromise, causes some of the biggest losses the FBI sees.' },
        { title: 'The boss needs gift cards', body: 'A message that appears to be from the owner asks an employee to buy gift cards and send the codes. Owners can head this off by telling staff they\'ll never ask.' },
        { title: 'AI voice of the owner', body: 'A call or voicemail sounds like the owner asking for an urgent transfer. Agree on a verification step, like a callback or code word, before you need it.' },
        { title: 'Fake tech support and help desk calls', body: 'A caller claims to be from Microsoft or your IT company and asks for remote access or a password reset. Hang up and call your IT contact directly.' },
        { title: 'Fake renewals and listings', body: 'Invoices for domain renewals, directory listings or "required" registrations that you never signed up for. Check before paying any unfamiliar bill.' },
      ],
      rule: 'The rule that stops most business scams: verify money requests through a second channel you already trust, every time, even if the request seems to come from the owner.',
      report: [
        `Report business email scams to the FBI at ${a(IC3, 'IC3.gov')}.`,
        `Report other scams at ${a(REPORTFRAUD, 'ReportFraud.ftc.gov')}.`,
      ],
    },
    hacked: {
      intro: 'Speed matters most in the first hours. Use your incident plan if you have one.',
      steps: [
        `If you sent money to a scammer, call your bank right away and ask them to recall or reverse the transfer. Then file a detailed complaint at ${a(IC3, 'IC3.gov')} (${a(IC3_BEC, 'IC3 guidance')}).`,
        'If ransomware hits, disconnect affected computers from the network and Wi-Fi, but don\'t turn them off. Call your IT help or an incident response company.',
        'Call your cyber insurance company early. Many policies require you to use their approved responders.',
        'Change passwords on email and admin accounts from a clean device, and sign out all sessions.',
        'If customer or employee data was taken, talk to a lawyer. Most states require you to notify the people affected.',
        `Report the attack to the FBI at ${a(IC3, 'IC3.gov')}.`,
      ],
    },
    ai: {
      intro: 'Your employees are probably already using AI tools. A short, clear policy keeps your data and customers safe.',
      items: [
        { title: 'Pick approved tools', body: 'Choose which AI tools staff can use for work, and prefer business plans with training on your data turned off.' },
        { title: 'Say what stays out', body: 'Customer data, employee records, passwords and financial details shouldn\'t go into AI tools that aren\'t approved for them.' },
        { title: 'Review before it reaches customers', body: 'A business is responsible for what its AI tells customers. A person should check AI-written messages, quotes and policies before they go out.' },
        { title: 'Be careful connecting AI to email and files', body: 'AI tools that connect to your email or drive hold keys to your data. Give them only the access they need, and remove ones you stop using.' },
      ],
    },
    resources: [
      { label: 'FTC: Cybersecurity for Small Business', href: FTC_SMB },
      { label: 'CISA: Cyber Guidance for Small Businesses', href: CISA_SMB },
      { label: 'NIST: Small Business Cybersecurity Corner', href: NIST_SMB },
      { label: 'FBI IC3: business email compromise', href: IC3_BEC },
    ],
    print: {
      scamRules: [
        'Verify every bank detail change by calling a number you already have.',
        'Urgent, secret payment requests are a warning sign, even from the boss.',
        'Hang up on unexpected tech support calls and call your IT contact directly.',
      ],
      hackedSteps: [
        'Money sent? Call your bank now, then file at IC3.gov.',
        'Ransomware? Disconnect affected devices, don\'t turn them off.',
        'Call your IT help and your cyber insurance company.',
        'Data taken? Talk to a lawyer about notification.',
      ],
      links: [
        { label: 'Report fraud to the FBI', href: 'IC3.gov' },
        { label: 'Small business guide', href: 'ftc.gov/business-guidance' },
        { label: 'CISA guidance', href: 'cisa.gov/cyber-guidance-small-businesses' },
      ],
    },
  },
];

export const audiencePath = (slug: string) => `/resources/protect-yourself-online/${slug ? `${slug}/` : ''}`;
export const printPath = (slug: string) => `/resources/protect-yourself-online/print/${slug ? `${slug}/` : ''}`;
export const pdfPath = (slug: string) => `/downloads/protect-yourself-online${slug ? `-${slug}` : ''}.pdf`;
