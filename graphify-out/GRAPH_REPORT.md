# Graph Report - docs  (2026-09-30)

## Corpus Check
- Corpus is ~5,610 words - fits in a single context window. You may not need a graph.

## Summary
- 132 nodes · 202 edges · 14 communities (10 shown, 4 thin omitted)
- Extraction: 74% EXTRACTED · 20% INFERRED · 5% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Interdits & conventions visuelles
- Accessibilite & competences
- Composants, typo & mise en page
- Brief, structure du site & SEO
- Projet phare TiaInfoBuild
- Palette du theme clair
- Experiences & employeurs
- Stack technique & icones
- Formulaire & donnees manquantes
- Identite publique & confidentialite
- Livrables & checklist
- Competences API & echanges
- Competences outils & methodes
- Formation secondaire

## God Nodes (most connected - your core abstractions)
1. `ThÃ¨me clair (par dÃ©faut)` - 15 edges
2. `TiaInfoBuild â€” ERP pour le BTP (projet phare)` - 13 edges
3. `Liste des Interdits` - 11 edges
4. `Direction artistique (palette douce, Sora + Nunito Sans, un seul Ã©lÃ©ment marquant)` - 11 edges
5. `Structure gÃ©nÃ©rale de la page` - 10 edges
6. `Correspondance contenu â†’ icÃ´ne Lucide` - 9 edges
7. `SystÃ¨me de design du portfolio (design.md)` - 8 edges
8. `Interdit : les emoji sous toutes leurs formes` - 7 edges
9. `Composant bouton (principal, secondaire, discret)` - 7 edges
10. `Ordre des pages pensÃ© pour les recruteurs` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Centres d'intÃ©rÃªt (football, pÃªche)` --conceptually_related_to--> `Interdit : les emoji sous toutes leurs formes`  [AMBIGUOUS]
  portfolio_zaraniaina.md → design.md
- `Canaux de contact (tÃ©lÃ©phone, email, GitHub, LinkedIn, WhatsApp)` --conceptually_related_to--> `Interdit : les emoji sous toutes leurs formes`  [AMBIGUOUS]
  portfolio_zaraniaina.md → design.md
- `Contenu du portfolio dÃ©rivÃ© du CV (portfolio_zaraniaina.md)` --conceptually_related_to--> `Interdit : les emoji sous toutes leurs formes`  [AMBIGUOUS]
  portfolio_zaraniaina.md → design.md
- `Lavande â€” accent secondaire (barres de progression)` --conceptually_related_to--> `CompÃ©tences groupÃ©es sans pourcentages inventÃ©s`  [AMBIGUOUS]
  design.md → prompt_portfolio.md
- `ModÃ¨le pour ajouter un projet` --semantically_similar_to--> `Projets Ã  documenter (4 pistes d'aprÃ¨s le parcours)`  [INFERRED] [semantically similar]
  projets.md → portfolio_zaraniaina.md

## Hyperedges (group relationships)
- **Conventions visuelles interdites (liste des Interdits)** — design_interdits_liste, design_interdit_orange, design_interdit_emoji, design_interdit_blanc_noir_pur, design_interdit_majuscules_forcees, design_interdit_fleches_boutons, design_interdit_melange_icones, design_interdit_animations_defilement, design_numerotation_limitee_frise, design_hierarchie_par_bordure [EXTRACTED 1.00]
- **Sections du portfolio (structure partagÃ©e par les trois spÃ©cifications)** — design_structure_generale, prompt_portfolio_structure_pages, portfolio_zaraniaina_structure_site_recommandee, design_navigation, design_carte_projet, design_badge_technologie, design_frise_parcours, design_formulaire_contact [INFERRED 0.95]
- **Domaines de compÃ©tences techniques rendus en badges groupÃ©s par icÃ´ne** — portfolio_zaraniaina_competences_langages, portfolio_zaraniaina_competences_frameworks_web, portfolio_zaraniaina_competences_bases_donnees, portfolio_zaraniaina_competences_outils_methodes, portfolio_zaraniaina_competences_ia, portfolio_zaraniaina_competences_api, design_badge_technologie, design_badge_technologie_lavande, design_correspondance_icones [INFERRED 0.85]

## Communities (14 total, 4 thin omitted)

### Community 0 - "Interdits & conventions visuelles"
Cohesion: 0.16
Nodes (21): Brume â€” fond de page, Ã‰chelle typographique (ratio 1,25), Un seul Ã©lÃ©ment marquant (photo et titre d'accueil), Interdit : animations au dÃ©filement et parallaxe, Interdit : blanc pur en fond et noir pur en texte, Interdit : les emoji sous toutes leurs formes, Interdit : flÃ¨ches ajoutÃ©es automatiquement aux boutons, Interdit : majuscules forcÃ©es sur titres et libellÃ©s (+13 more)

### Community 1 - "Accessibilite & competences"
Cohesion: 0.14
Nodes (17): AccessibilitÃ© (WCAG AA, clavier, focus, 44px, un seul H1), Variante lavande du badge (compÃ©tences IA), Eau claire â€” accent dÃ©coratif (jamais pour du texte), Composant frise du parcours (verticale), Interdit : information transmise par la couleur seule, Lavande â€” accent secondaire (barres de progression), NumÃ©rotation 01/02/03 limitÃ©e Ã  la frise chronologique, RÃ¨gle de contraste et plancher de lisibilitÃ© (+9 more)

### Community 2 - "Composants, typo & mise en page"
Cohesion: 0.13
Nodes (17): Composant badge de technologie, Galet â€” bordure, HiÃ©rarchie par bordure et fond plutÃ´t que par ombres ou dÃ©gradÃ©s, IcÃ´ne languages (sÃ©lecteur de langue), JetBrains Mono â€” code et badges techniques, Largeur de contenu 1100px, Mesure de ligne 65ch et alignement Ã  gauche, Composant navigation (en-tÃªte collant, panneau mobile) (+9 more)

### Community 3 - "Brief, structure du site & SEO"
Cohesion: 0.14
Nodes (14): Contenu du portfolio dÃ©rivÃ© du CV (portfolio_zaraniaina.md), Projets Ã  documenter (4 pistes d'aprÃ¨s le parcours), SEO et mÃ©tadonnÃ©es du site, Structure de site recommandÃ©e (7 sections), Titre et accroche (DÃ©veloppeur Logiciel & Web Â· Concepteur de BD Â· IA), RAFAZARANZANTSOA / RAFANOMEZANTSOA Zaraniaina Emilson, ModÃ¨le pour ajouter un projet, Section Projets (projets.md) (+6 more)

### Community 4 - "Projet phare TiaInfoBuild"
Cohesion: 0.19
Nodes (13): SpÃ©cifications captures de projet (16:10, WebP, lazy, donnÃ©es floutÃ©es), Composant carte de projet, IcÃ´ne code-xml (code source), IcÃ´ne monitor-play (dÃ©mo en ligne), Avertissement de confidentialitÃ© (accord entreprise, floutage), ERP BTP utilisable en ligne et hors ligne, IcÃ´nes Lucide suggÃ©rÃ©es pour les cartes projet, Moteur de synchronisation local/serveur (16 entitÃ©s) (+5 more)

### Community 5 - "Palette du theme clair"
Cohesion: 0.21
Nodes (12): Ardoise â€” texte principal, Composant bouton (principal, secondaire, discret), Bruine â€” texte secondaire, Ã‰cume â€” surface, Lagon â€” accent principal, Lagon profond â€” accent survol et focus, Sable froid â€” surface alternative, ThÃ¨me clair (par dÃ©faut) (+4 more)

### Community 6 - "Experiences & employeurs"
Cohesion: 0.20
Nodes (10): Assistant projet informatique, Cash Point PrivÃ© (employeur), Cyber Langa (employeur), Ã‰picerie Tsararivotra (employeur), ExpÃ©riences professionnelles (5 postes depuis 2023), Support Informatique et Multiservice, Tia Info Madagascar (employeur actuel), Logiciel de gestion vente/stock/facturation â€” Ã‰picerie Tsararivotra (+2 more)

### Community 7 - "Stack technique & icones"
Cohesion: 0.31
Nodes (9): Correspondance contenu â†’ icÃ´ne Lucide, Interdit : mÃ©lange de bibliothÃ¨ques d'icÃ´nes (Lucide uniquement), Lucide â€” bibliothÃ¨que d'icÃ´nes (trait 1.75), CompÃ©tences â€” Bases de donnÃ©es (MySQL, PostgreSQL, SQLite, H2, SQL), CompÃ©tences â€” Frameworks & Web (Spring Boot, FastAPI, React, Vue.js...), CompÃ©tences â€” Langages (Java, Python, PHP, JavaScript), IdÃ©es de stack pour construire le portfolio, Stack technique de TiaInfoBuild (React/Vite, Python/REST/JWT, Tauri, SQLite, 133+8 tests) (+1 more)

### Community 8 - "Formulaire & donnees manquantes"
Cohesion: 0.36
Nodes (8): Couleurs d'Ã©tat (succÃ¨s, information, attention, erreur), Composant formulaire de contact, Chiffres clÃ©s (5 expÃ©riences, 3 ans, 20+ technologies), Canaux de contact (tÃ©lÃ©phone, email, GitHub, LinkedIn, WhatsApp), Convention de placeholders entre crochets, Placeholders de liens de dÃ©mo et de chiffres, Formulaire de contact sans serveur (Formspree + repli mailto), RÃ¨gle : n'invente aucune donnÃ©e, masquer proprement l'Ã©lÃ©ment manquant

### Community 9 - "Identite publique & confidentialite"
Cohesion: 0.33
Nodes (6): Adresse postale â€” rÃ©serve de confidentialitÃ©, Centres d'intÃ©rÃªt (football, pÃªche), Langues parlÃ©es (malagasy, franÃ§ais, anglais), Toamasina, Madagascar, Statut actuel (Tia Info Madagascar + Master 2 en cours), Ordre des pages pensÃ© pour les recruteurs

## Ambiguous Edges - Review These
- `Interdit : les emoji sous toutes leurs formes` → `Centres d'intÃ©rÃªt (football, pÃªche)`  [AMBIGUOUS]
  portfolio_zaraniaina.md · relation: conceptually_related_to
- `Interdit : les emoji sous toutes leurs formes` → `Canaux de contact (tÃ©lÃ©phone, email, GitHub, LinkedIn, WhatsApp)`  [AMBIGUOUS]
  portfolio_zaraniaina.md · relation: conceptually_related_to
- `Interdit : les emoji sous toutes leurs formes` → `Contenu du portfolio dÃ©rivÃ© du CV (portfolio_zaraniaina.md)`  [AMBIGUOUS]
  portfolio_zaraniaina.md · relation: conceptually_related_to
- `Lavande â€” accent secondaire (barres de progression)` → `CompÃ©tences groupÃ©es sans pourcentages inventÃ©s`  [AMBIGUOUS]
  design.md · relation: conceptually_related_to
- `Interdit : animations au dÃ©filement et parallaxe` → `Site web de mariage (page unique)`  [AMBIGUOUS]
  projets.md · relation: conceptually_related_to
- `SpÃ©cifications photo de profil (carrÃ© 800x800, rayon 20px, pas de cercle)` → `Photo de profil — specification de contenu (carre, min. 600x600)`  [AMBIGUOUS]
  portfolio_zaraniaina.md · relation: conceptually_related_to
- `Chiffres clÃ©s (5 expÃ©riences, 3 ans, 20+ technologies)` → `RÃ¨gle : n'invente aucune donnÃ©e, masquer proprement l'Ã©lÃ©ment manquant`  [AMBIGUOUS]
  prompt_portfolio.md · relation: conceptually_related_to
- `Convention de placeholders entre crochets` → `RÃ¨gle : n'invente aucune donnÃ©e, masquer proprement l'Ã©lÃ©ment manquant`  [AMBIGUOUS]
  portfolio_zaraniaina.md · relation: conceptually_related_to
- `Proposition de barres de progression par compÃ©tence` → `CompÃ©tences groupÃ©es sans pourcentages inventÃ©s`  [AMBIGUOUS]
  portfolio_zaraniaina.md · relation: conceptually_related_to
- `IdÃ©es de stack pour construire le portfolio` → `Stack technique imposÃ©e (React, TypeScript, Vite, Tailwind, lucide-react)`  [AMBIGUOUS]
  portfolio_zaraniaina.md · relation: conceptually_related_to
- `Placeholders de liens de dÃ©mo et de chiffres` → `RÃ¨gle : n'invente aucune donnÃ©e, masquer proprement l'Ã©lÃ©ment manquant`  [AMBIGUOUS]
  projets.md · relation: conceptually_related_to

## Knowledge Gaps
- **30 isolated node(s):** `Ã‰cume â€” surface`, `Sable froid â€” surface alternative`, `Ardoise â€” texte principal`, `Bruine â€” texte secondaire`, `Points de rupture (mobile â‰¤640, tablette 641-1024, bureau >1024)` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 34 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Interdit : les emoji sous toutes leurs formes` and `Centres d'intÃ©rÃªt (football, pÃªche)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Interdit : les emoji sous toutes leurs formes` and `Canaux de contact (tÃ©lÃ©phone, email, GitHub, LinkedIn, WhatsApp)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Interdit : les emoji sous toutes leurs formes` and `Contenu du portfolio dÃ©rivÃ© du CV (portfolio_zaraniaina.md)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Lavande â€” accent secondaire (barres de progression)` and `CompÃ©tences groupÃ©es sans pourcentages inventÃ©s`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Interdit : animations au dÃ©filement et parallaxe` and `Site web de mariage (page unique)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `SpÃ©cifications photo de profil (carrÃ© 800x800, rayon 20px, pas de cercle)` and `Photo de profil — specification de contenu (carre, min. 600x600)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Chiffres clÃ©s (5 expÃ©riences, 3 ans, 20+ technologies)` and `RÃ¨gle : n'invente aucune donnÃ©e, masquer proprement l'Ã©lÃ©ment manquant`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._