/**
 * English dictionary — the site's second, complete language.
 * Translated for meaning, not word-for-word. Job titles are adapted to how
 * they read in English; technology names are never translated.
 */
export default {
  meta: {
    title: 'Zaraniaina Emilson — Software & web developer | Toamasina, Madagascar',
    description:
      'Portfolio of Zaraniaina Emilson, a software and web developer based in Toamasina. Java, Python, React, Spring Boot, FastAPI, databases and applied AI.',
  },

  nav: {
    mainNav: 'Main navigation',
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    journey: 'Background',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    switchToFrench: 'Passer en français',
    switchToEnglish: 'Switch to English',
    theme: 'Theme',
    toggleTheme: 'Change theme',
  },

  hero: {
    name: 'Zaraniaina Emilson',
    title: 'Software & web developer · Database designer',
    tagline:
      'I turn business requirements into tools that hold up in daily use: sales, stock, invoicing, and site management.',
    status: "Master's student in Computer Engineering · Most recently IT Project Assistant at Tia Info Madagascar",
    proof: 'Online and offline construction ERP, plus a Tauri desktop app',
    location: 'Toamasina, Madagascar',
    ctaContact: 'Get in touch',
    ctaCv: 'Download my CV',
    ctaProjects: 'See my projects',
  },

  about: {
    title: 'About',
    lead: 'I build web applications, management software and databases — then keep them running.',
    body: [
      'I hold a degree in Mathematics, Computer Science and Applications, and I am currently completing a Master’s in Computer Engineering at the University of Toamasina.',
      'I have built several sales, stock and invoicing tools for local businesses, and I recently worked on TiaInfoBuild, an ERP for the construction sector that runs both online and offline.',
      'I also work with artificial intelligence: LLMs, prompt engineering, coding agents, and integration through MCP.',
    ],
    statsTitle: 'By the numbers',
    stats: {
      experience: 'Professional roles',
      experienceValue: '4',
      years: 'Years of experience',
      yearsValue: '2',
      tech: 'Technologies',
      techValue: '20+',
    },
    qualitiesTitle: 'Strengths',
    qualities: [
      'Teamwork',
      'Autonomy',
      'Rigor',
      'Adaptability',
      'Prioritisation',
      'Fast learner',
    ],
    languagesTitle: 'Languages',
    languages: [
      { name: 'Malagasy', level: 'Native' },
      { name: 'French', level: 'Fluent — reading, writing, spoken' },
      { name: 'English', level: 'Reading, writing and comprehension' },
    ],
    interestsTitle: 'Interests',
    interests: 'Football, fishing',
  },

  skills: {
    title: 'Skills',
    lead: 'The technologies I work with day to day, grouped by domain.',
    domains: {
      languages: 'Languages',
      web: 'Frameworks and web',
      database: 'Databases',
      tools: 'Tools and methods',
      ai: 'Artificial intelligence',
      api: 'APIs and data exchange',
      other: 'Support and maintenance',
    },
    other: ['Software maintenance', 'Desktop computing', 'End-user support'],
  },

  /** Technology group headings shown above each badge row on a project card. */
  stack: {
    frontend: 'Frontend',
    backend: 'Backend',
    desktop: 'Desktop',
    data: 'Data',
    tests: 'Tests',
  },

  projects: {
    title: 'Projects',
    lead: 'From context to my own contribution: what each project solves and what I built in it.',
    flagship: 'Flagship project',
    problemLabel: 'Problem solved',
    contributionLabel: 'My contribution',
    resultLabel: 'Outcome',
    code: 'Code',
    demo: 'Demo',
    repository: 'View repository',
    items: {
      tiainfobuild: {
        title: 'TiaInfoBuild',
        tag: 'Construction ERP, online and offline',
        summary:
          'An ERP for construction and public-works companies that runs online and locally, with a desktop app that keeps working without a connection.',
        problem:
          'Construction companies work on sites where internet access is unreliable. The tool has to stay usable offline, then sync as soon as the network is back.',
        contribution: [
          'Desktop application in Tauri 2 and Rust, built on top of the web app, offline-first',
          'Encrypted local SQLite database with SQLCipher, including offline activation and sign-in',
          'Synchronisation engine between the local machine and the web server across 16 entities, resuming automatically when the network returns',
          'Modules available offline: stock and purchasing, sales, HR, sites, finance, equipment, alerts and settings',
          'Public marketing site with SEO, while the private application stays unindexed',
          'Account and role management, plus employee photos and documents',
        ],
        result:
          'The desktop release was merged into the main branch on 29 September 2026 — 28 commits over roughly two weeks. 133 backend tests and 8 Rust tests pass on that delivery.',
        stackLabel: 'Technologies',
      },
      epicerie: {
        title: 'Sales, stock and invoicing — Épicerie Tsararivotra',
        summary:
          'A management tool for a grocery store in Toamasina: sales, stock and invoicing.',
        problem: 'Sales and stock were being tracked by hand.',
        contribution: ['Database design', 'Application development'],
      },
      nyTiaSary: {
        title: 'NY TIA SARY — photo & video studio platform',
        summary:
          'A complete web platform for a photography and video production studio in Toamasina: public website, admin area and client area.',
        contribution: [
          'Public website: home, services, filterable portfolio with lightbox, blog and quote requests',
          'Admin area: dashboard, bookings with contracts and invoices, calendar, media delivery',
          'Client area: online booking and case tracking',
          'Secure authentication: bcrypt, security question, 4-step password reset',
          'Quote replies and notifications by email (PHPMailer), contracts and invoices as PDF (Dompdf)',
        ],
      },
      eventsite: {
        title: 'Event website — single page',
        summary:
          'A complete event site: video intro, countdown, programme, venue, gallery and guest RSVP.',
        contribution: [
          'Preloader, navigation with mobile menu and video welcome section',
          'Countdown to the big day, programme, tree-of-life gallery and RSVP form',
          'Background music with manual control and music-reactive ambience (particles, halos, equaliser)',
          'Automated publishing to GitHub Pages',
        ],
      },
      portfolio: {
        title: 'Portfolio — this site',
        summary:
          'The source code of the site you are browsing: a bilingual (French and English) portfolio with light and dark themes, built with React 19, TypeScript, Vite and Tailwind CSS.',
      },
      cyberlanga: {
        title: 'Sales, stock and invoicing — Cyber Langa',
        summary:
          'A sales, stock and invoicing tool for a digital services and multiservice provider.',
        problem: 'Sales and multiservice billing were not centralised.',
        contribution: ['Database modelling', 'Software development'],
      },
    },
  },

  journey: {
    title: 'Background',
    experienceTitle: 'Experience',
    educationTitle: 'Education',
    inProgress: 'In progress',
    present: 'Present',
    roles: {
      tiaInfo: {
        // Job titles adapted for English rather than translated word for word.
        title: 'IT Project Assistant — Tia Info Madagascar',
        bullets: [
          'Developed web and desktop applications',
          'Maintained and improved existing applications',
          'Analysis, design and testing',
          'Technical supervision and mentoring of interns',
        ],
      },
      cyberLangaSupport: {
        title: 'IT Support and Multiservice Desk — Cyber Langa',
        bullets: [
          'Technical support and computer troubleshooting',
          'Managed digital and multiservice offerings',
        ],
      },
      tsararivotra: {
        title: 'Software & Database Developer — Épicerie Tsararivotra',
        bullets: [
          'Designed software and database structures',
          'Built sales, stock and invoicing management tools',
        ],
      },
      cyberLangaDev: {
        title: 'Software Developer — Cyber Langa',
        bullets: [
          'Software design and database modelling',
          'Built sales, stock and invoicing tools',
        ],
      },
    },
    degrees: {
      master2: 'Master’s degree in Computer Engineering',
      licence: 'Bachelor’s degree in Mathematics, Computer Science and Applications',
      bacc: 'High school diploma, Science stream',
      bepc: 'Junior high school certificate (BEPC)',
      cepe: 'Primary school certificate (CEPE)',
    },
    school: 'Faculty of Science and Technology, University of Toamasina',
  },

  contact: {
    title: 'Contact',
    lead: 'For a role, a contract, or a question about a project, write to me directly.',
    formTitle: 'Send a message',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    subject: 'Subject',
    subjectPlaceholder: 'What you would like to discuss',
    message: 'Message',
    messagePlaceholder: 'Your message',
    submit: 'Send message',
    sending: 'Sending',
    sent: 'Message sent',
    sentDetail: 'Thank you — I will reply as soon as I can.',
    sentMailtoDetail:
      'Your mail app opened with the message prefilled: press “Send” there to finish. Your entries above are kept.',
    errorGeneric:
      'The message could not be sent. Please email me directly instead; the fallback link is alongside.',
    openMailApp: 'Open your mail app with the message prefilled',
    closeToast: 'Close notification',
    required: 'This field is required',
    invalidEmail: 'Enter a valid email address',
    tooShort: 'Your message needs at least 10 characters',
    directTitle: 'Direct contact',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    whatsappLabel: 'WhatsApp',
    githubLabel: 'GitHub',
    locationLabel: 'Location',
  },

  footer: {
    builtWith: 'Designed and built by Zaraniaina Emilson.',
    backToTop: 'Back to top',
  },

  common: {
    at: 'in',
  },
} as const
