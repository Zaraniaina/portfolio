# Portfolio — Zaraniaina Emilson

Portfolio personnel bilingue (français par défaut, anglais complet) : React 19, TypeScript, Vite, Tailwind CSS v4, i18next, lucide-react.

Site statique, sans backend. Déployable sur GitHub Pages, Netlify ou Vercel.

## Démarrer

```bash
npm install
npm run dev       # serveur de développement
npm run build     # tsc -b && vite build  (le typage bloque le build)
npm run preview   # sert dist/
npm run lint      # eslint .
```

Il n'y a pas de tests : aucun framework de test n'est installé.

## Structure

| Chemin | Rôle |
|---|---|
| `src/pages/Portfolio.tsx` | Page unique, rendue en `fr` ou `en` selon la route |
| `src/i18n/fr.ts`, `src/i18n/en.ts` | **Tout** le texte affiché par l'utilisateur |
| `src/i18n/index.ts` | Initialisation i18next, langue par défaut, persistance |
| `src/data/profile.ts` | Contenu structurel : poste, contact, compétences |
| `src/data/projects.ts` | Structure des projets : drapeaux, technos, liens |
| `src/components/` | Sections et primitives d'interface |
| `src/index.css` | Jetons de design (couleurs, typographie, thème) |
| `docs/design.md` | Le système de design, à respecter à la lettre |

## Modifier le contenu

**Le texte va toujours dans les dictionnaires**, jamais dans les composants. `fr.ts` et `en.ts` doivent rester synchronisés.

- Changer un poste, une compétence, une description de projet → éditez les deux dictionnaires.
- Changer une date, un lien, une liste de technos → éditez `src/data/`.
- Ajouter un projet : ajoutez l'entrée dans `src/data/projects.ts` (`demoUrl` et `image` à `null` si indisponible) et les textes `projects.items.<id>` dans les deux dictionnaires.

## Règle de non-invention

Quand une donnée manque (lien de démo, capture, chiffre, LinkedIn), mettez `null` et **l'élément n'est pas affiché**. N'écrivez jamais de texte d'exemple, de lien factice ni de nombre inventé.

Manquants en ce moment : lien de démo et captures de TiaInfoBuild, lien LinkedIn, CV en PDF anglais (le CV français est en place : bouton « Télécharger mon CV » du hero).

## Formulaire de contact et EmailJS

Le formulaire envoie via **EmailJS** quand il est configuré, sinon il ouvre un `mailto:` pré-rempli (et propose ce repli après un échec d'envoi). Configuration dans un fichier `.env.local` (voir `.env.example`) :

```bash
VITE_EMAILJS_TEMPLATE_ID=…   # ID du template dans le tableau de bord EmailJS
VITE_EMAILJS_PUBLIC_KEY=…    # clé publique du compte
```

Le service ID (`service_cganejd`) est déjà codé dans `src/lib/email.ts` (voir `docs/emailJS.md`). Noms de variables du template attendus : `from_name`, `from_email`, `reply_to`, `subject`, `message`.

## Ajouter une langue

1. Dupliquez `src/i18n/en.ts` en `src/i18n/<code>.ts`.
2. Ajoutez le code dans `LANGUAGES` et une route dans `src/App.tsx`.
3. Ajoutez `x` comme 3ᵉ argument de `setLanguage()` dans `src/components/Nav.tsx`.

## Design

`docs/design.md` est la référence : palette (lagon, lavande, brume, ardoise), typographie (Sora, Nunito Sans, JetBrains Mono), espacements, composants, accessibilité.

Contraintes à ne pas enfreindre : aucun orange, aucun emoji (icônes Lucide uniquement), pas de blanc pur ni de noir pur, pas de majuscules forcées, pas de dégradés décoratifs, pas d'animation au défilement, pas de flèche ajoutée aux boutons.

Le thème sombre utilise `[data-theme="dark"]` et suit `prefers-color-scheme` par défaut. Les deux thèmes sont définis dans `src/index.css` via des variables CSS : n'écrivez jamais de valeur hexadécimale dans un composant.

## Déployer

Le site est déployé automatiquement sur **GitHub Pages** à chaque push sur `main`
(via [.github/workflows/deploy.yml](.github/workflows/deploy.yml)) :
URL finale `https://zaraniaina.github.io/portfolio/`.

- `vite.config.ts` définit `base: '/portfolio/'` (sous-chemin du dépôt) et le
  `BrowserRouter` en dérive son `basename` (`src/App.tsx`).
- Le workflow copie `index.html` en `404.html` (routage SPA sur Pages) et ajoute
  `.nojekyll`.
- Pour l'envoi EmailJS en production : ajoutez les secrets
  `VITE_EMAILJS_TEMPLATE_ID` et `VITE_EMAILJS_PUBLIC_KEY` dans
  *Settings → Secrets and variables → Actions* (sinon le formulaire utilise le
  repli `mailto:`).

**Netlify / Vercel** : commande `npm run build`, dossier publié `dist` — changer
alors `base` dans `vite.config.ts` selon le domaine (racine → `base: '/'`).

## Contact

Le formulaire n'a pas de backend : il ouvre le client de messagerie du visiteur avec un `mailto:` pré-rempli. Les liens email, téléphone, WhatsApp et GitHub ci-contre servent de repli.
