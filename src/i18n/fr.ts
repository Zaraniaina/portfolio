/**
 * Dictionnaire français — langue par défaut du site.
 * Toute chaîne affichée à l'utilisateur vit ici (voir docs/prompt_portfolio.md :
 * « jamais écrites en dur dans les composants »).
 */
export default {
  meta: {
    title: 'Zaraniaina Emilson — Développeur logiciel & web | Toamasina, Madagascar',
    description:
      'Portfolio de Zaraniaina Emilson, développeur logiciel et web à Toamasina. Java, Python, React, Spring Boot, FastAPI, bases de données et intelligence artificielle.',
  },

  nav: {
    mainNav: 'Navigation principale',
    about: 'À propos',
    projects: 'Projets',
    skills: 'Compétences',
    journey: 'Parcours',
    contact: 'Contact',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    language: 'Langue',
    switchToFrench: 'Passer en français',
    switchToEnglish: 'Switch to English',
    theme: 'Thème',
    toggleTheme: 'Changer de thème',
  },

  hero: {
    name: 'Zaraniaina Emilson',
    title: 'Développeur logiciel & web · Concepteur de bases de données',
    tagline:
      'Je transforme des besoins métiers en outils qui tiennent la route : ventes, stocks, facturation, gestion de chantier.',
    status: 'Étudiant en Master 2 de Génie Informatique · Dernier poste : assistant projet informatique chez Tia Info Madagascar',
    proof: 'ERP BTP en ligne et hors ligne, application de bureau Tauri',
    location: 'Toamasina, Madagascar',
    ctaContact: 'Me contacter',
    ctaCv: 'Télécharger mon CV',
    ctaProjects: 'Voir mes projets',
  },

  about: {
    title: 'À propos',
    lead: 'Je conçois des applications web, des logiciels de gestion et des bases de données, puis j’assure leur maintenance.',
    body: [
      'Diplômé en Mathématiques, Informatique et Applications, je suis actuellement en Master 2 en Génie Informatique à l’Université de Toamasina.',
      'J’ai réalisé plusieurs outils de gestion de vente, de stock et de facturation pour des structures locales, et j’ai récemment travaillé sur TiaInfoBuild, un ERP de gestion pour le bâtiment, utilisable en ligne comme hors ligne.',
      'Je travaille aussi avec l’intelligence artificielle : LLM, prompt engineering, agents de codage et intégration via MCP.',
    ],
    statsTitle: 'En quelques chiffres',
    stats: {
      experience: 'Expériences professionnelles',
      experienceValue: '4',
      years: "Années d'activité",
      yearsValue: '2',
      tech: 'Technologies maîtrisées',
      techValue: '20+',
    },
    qualitiesTitle: 'Qualités',
    qualities: [
      'Travail d’équipe',
      'Autonomie',
      'Rigueur',
      'Capacité d’adaptation',
      'Gestion des priorités',
      'Apprentissage rapide',
    ],
    languagesTitle: 'Langues',
    languages: [
      { name: 'Malagasy', level: 'Langue maternelle' },
      { name: 'Français', level: 'Lu, écrit et parlé' },
      { name: 'Anglais', level: 'Lu, écrit et compréhension' },
    ],
    interestsTitle: ' Centres d’intérêt',
    interests: 'Football, pêche',
  },

  skills: {
    title: 'Compétences',
    lead: 'Les technologies que j’utilise au quotidien, regroupées par domaine.',
    domains: {
      languages: 'Langages',
      web: 'Frameworks et web',
      database: 'Bases de données',
      tools: 'Outils et méthodes',
      ai: 'Intelligence artificielle',
      api: 'API et échanges',
      other: 'Support et maintenance',
    },
    other: ['Maintenance logicielle', 'Informatique bureautique', 'Support utilisateur'],
  },

  /** Technology group headings shown above each badge row on a project card. */
  stack: {
    frontend: 'Frontend',
    backend: 'Backend',
    desktop: 'Bureau',
    data: 'Données',
    tests: 'Tests',
  },

  projects: {
    title: 'Projets',
    lead: 'Du contexte à la contribution personnelle : ce que chaque projet résout et ce que j’y ai fait.',
    flagship: 'Projet phare',
    problemLabel: 'Problème résolu',
    contributionLabel: 'Ma contribution',
    resultLabel: 'Résultat',
    code: 'Code',
    viewSite: 'Voir le site',
    repository: 'Voir le dépôt',
    items: {
      tiainfobuild: {
        title: 'TiaInfoBuild',
        tag: 'ERP pour le bâtiment, en ligne et hors ligne',
        summary:
          'ERP de gestion pour entreprises du bâtiment et travaux publics, utilisable en ligne comme en local, avec une application de bureau qui fonctionne sans connexion.',
        problem:
          'Les entreprises du bâtiment travaillent souvent sur des chantiers où la connexion internet est instable. L’outil doit rester utilisable hors ligne, puis se synchroniser dès que le réseau revient.',
        contribution: [
          'Application de bureau en Tauri 2 et Rust, basée sur l’application web, en mode hors ligne d’abord',
          'Base locale SQLite chiffrée avec SQLCipher, activation et connexion hors ligne',
          'Moteur de synchronisation entre le poste local et le serveur web, sur 16 entités, avec reprise automatique au retour du réseau',
          'Modules disponibles hors ligne : stocks et achats, commercial, RH, chantiers, finance, matériels, alertes et paramètres',
          'Site vitrine public avec référencement, l’application privée restant non indexée',
          'Gestion des comptes, des rôles, et des photos et documents des employés',
        ],
        result:
          'Version bureau fusionnée dans la branche principale le 29 septembre 2026, soit 28 commits sur environ deux semaines. 133 tests backend et 8 tests Rust passent sur cette livraison.',
        stackLabel: 'Technologies',
      },
      epicerie: {
        title: 'Gestion de vente, stock et facturation — Épicerie Tsararivotra',
        summary:
          'Outil de gestion pour une épicerie de Toamasina : ventes, stocks et facturation.',
        problem: 'Le suivi des ventes et du stock se faisait manuellement.',
        contribution: [
          'Conception de la base de données',
          'Développement de l’application',
        ],
      },
      nyTiaSary: {
        title: 'NY TIA SARY — plateforme pour studio photo & vidéo',
        summary:
          'Plateforme web complète pour un studio de photographie et de production vidéo de Toamasina : site vitrine, espace administrateur et espace client.',
        contribution: [
          'Site vitrine public : accueil, services, portfolio filtrable avec lightbox, blog et demande de devis',
          'Espace administrateur : tableau de bord, réservations avec contrats et factures, calendrier, livraison des médias',
          'Espace client : réservation en ligne et suivi des dossiers',
          'Authentification sécurisée : bcrypt, question de sécurité, réinitialisation en 4 étapes',
          'Réponses aux devis et notifications par email (PHPMailer), contrats et factures en PDF (Dompdf)',
        ],
      },
      eventsite: {
        title: 'Site événementiel — page unique',
        summary:
          'Site complet pour un événement : accueil en vidéo, compte à rebours, programme, lieu, galerie et réponse des invités.',
        contribution: [
          'Préchargeur, navigation avec menu mobile et accueil vidéo',
          'Compte à rebours jusqu’au jour J, programme, galerie en arbre de vie et formulaire de réponse',
          'Musique de fond avec contrôle manuel et ambiance réactive (particules, halos, égaliseur)',
          'Publication automatisée sur GitHub Pages',
        ],
      },
      portfolio: {
        title: 'Portfolio — ce site',
        summary:
          'Le code source du site que vous parcourez : portfolio bilingue (français et anglais), thème clair et sombre, React 19, TypeScript, Vite et Tailwind CSS.',
      },
      cyberlanga: {
        title: 'Outil de vente, stock et facturation — Cyber Langa',
        summary:
          'Outil de vente, de stock et de facturation pour une entreprise de services numériques et multiservices.',
        problem: 'La gestion des ventes et des services multiservices n’était pas centralisée.',
        contribution: ['Modélisation de la base de données', 'Développement du logiciel'],
      },
    },
  },

  journey: {
    title: 'Parcours',
    experienceTitle: 'Expériences',
    educationTitle: 'Formation',
    inProgress: 'En cours',
    present: 'Aujourd’hui',
    roles: {
      tiaInfo: {
        title: 'Assistant projet informatique — Tia Info Madagascar',
        bullets: [
          'Développement d’applications web et logicielles',
          'Maintenance et amélioration des applications',
          'Analyse, conception et tests',
          'Encadrement technique et suivi des stagiaires',
        ],
      },
      cyberLangaSupport: {
        title: 'Support informatique et multiservice — Cyber Langa',
        bullets: [
          'Support technique et dépannage informatique',
          'Gestion des services numériques et multiservices',
        ],
      },
      tsararivotra: {
        title: 'Développeur logiciel et bases de données — Épicerie Tsararivotra',
        bullets: [
          'Conception de logiciels et de structures de bases de données',
          'Développement d’outils de gestion de vente, de stock et de facturation',
        ],
      },
      cyberLangaDev: {
        title: 'Développeur logiciel — Cyber Langa',
        bullets: [
          'Conception logicielle et modélisation de bases de données',
          'Création d’outils de vente, de gestion de stock et de facturation',
        ],
      },
    },
    degrees: {
      master2: 'Master 2 en Génie Informatique',
      licence: 'Licence en Mathématiques, Informatique et Applications',
      bacc: 'Baccalauréat, série D',
      bepc: 'BEPC',
      cepe: 'CEPE',
    },
    school: 'Faculté des Sciences et Technologies, Université de Toamasina',
  },

  contact: {
    title: 'Contact',
    lead: 'Pour un poste, une mission ou une question sur un projet, écrivez-moi directement.',
    formTitle: 'Envoyer un message',
    name: 'Nom',
    namePlaceholder: 'Votre nom',
    email: 'Email',
    emailPlaceholder: 'vous@exemple.com',
    subject: 'Sujet',
    subjectPlaceholder: 'Ce que vous souhaitez aborder',
    message: 'Message',
    messagePlaceholder: 'Votre message',
    submit: 'Envoyer le message',
    sending: 'Envoi en cours',
    sent: 'Message envoyé',
    sentDetail: 'Merci, je vous réponds dès que possible.',
    sentMailtoDetail:
      'Votre application mail s’est ouverte avec le message prérempli : cliquez « Envoyer » dans celle-ci pour finaliser. Vos saisies ci-dessus sont conservées.',
    errorGeneric:
      'Le message n’a pas pu être envoyé. Écrivez-moi directement par email, le lien de secours est juste à côté.',
    openMailApp: 'Ouvrir mon application mail avec le message prérempli',
    closeToast: 'Fermer la notification',
    required: 'Champ obligatoire',
    invalidEmail: 'Saisis une adresse email valide',
    tooShort: 'Le message doit contenir au moins 10 caractères',
    directTitle: 'Coordonnées',
    emailLabel: 'Email',
    phoneLabel: 'Téléphone',
    whatsappLabel: 'WhatsApp',
    githubLabel: 'GitHub',
    facebookLabel: 'Facebook',
    locationLabel: 'Localisation',
  },

  footer: {
    builtWith: 'Conçu et développé par Zaraniaina Emilson.',
    backToTop: 'Retour en haut',
  },

  common: {
    at: 'à',
  },
} as const
