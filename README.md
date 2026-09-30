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

Manquants en ce moment : lien de démo et captures de TiaInfoBuild, lien LinkedIn, CV en PDF (français et anglais).

## Ajouter une langue

1. Dupliquez `src/i18n/en.ts` en `src/i18n/<code>.ts`.
2. Ajoutez le code dans `LANGUAGES` et une route dans `src/App.tsx`.
3. Ajoutez `x` comme 3ᵉ argument de `setLanguage()` dans `src/components/Nav.tsx`.

## Design

`docs/design.md` est la référence : palette (lagon, lavande, brume, ardoise), typographie (Sora, Nunito Sans, JetBrains Mono), espacements, composants, accessibilité.

Contraintes à ne pas enfreindre : aucun orange, aucun emoji (icônes Lucide uniquement), pas de blanc pur ni de noir pur, pas de majuscules forcées, pas de dégradés décoratifs, pas d'animation au défilement, pas de flèche ajoutée aux boutons.

Le thème sombre utilise `[data-theme="dark"]` et suit `prefers-color-scheme` par défaut. Les deux thèmes sont définis dans `src/index.css` via des variables CSS : n'écrivez jamais de valeur hexadécimale dans un composant.

## Déployer

`npm run build` produit `dist/`. `vite.config.ts` définit `base: './'`, donc le build fonctionne depuis n'importe quel sous-chemin.

- **Netlify / Vercel** : commande `npm run build`, dossier publié `dist`.
- **GitHub Pages** : poussez `dist/` sur la branche `gh-pages`, ou configurez l'action pour utiliser la racine du dépôt comme site.

## Contact

Le formulaire n'a pas de backend : il ouvre le client de messagerie du visiteur avec un `mailto:` pré-rempli. Les liens email, téléphone, WhatsApp et GitHub ci-contre servent de repli.
