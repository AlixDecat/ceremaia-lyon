# Analyse de l'évolution du site CEREMAIA Lyon : version initiale et version actuelle

**Période :** du 9 au 25 septembre 2026 (11 commits)
**Version initiale :** `c054755`, « Site CEREMAIA Lyon : refonte + espace L'ado-XPR » (9 sept.)
**Version actuelle :** `5857097`, « En-tête non collant sur ordinateur » (25 sept.)
**Volume :** 62 fichiers modifiés, +2 980 lignes, −1 223 lignes.

---

## 0. Lecture du document et limites de la source

Ce document repose **uniquement sur l'historique Git** : messages de commit et différences de code.
Le dépôt GitHub ne contient **aucune pull request, aucune issue et aucun commentaire de revue**.
Les échanges avec le relecteur (réunions, mails, messages) n'ont donc laissé aucune trace écrite ici.

Chaque affirmation porte une étiquette :

| Étiquette | Signification |
|---|---|
| **[FAIT]** | Constaté dans le code ou écrit en toutes lettres dans un message de commit |
| **[RELECTEUR]** | Choix que l'historique attribue explicitement à une relecture humaine |
| **[H]** | Hypothèse : c'est mon interprétation de la raison d'un choix, et elle reste à confirmer |

> ⚠️ Seuls **deux éléments** de l'historique viennent explicitement d'un relecteur (voir §3).
> Tous les autres « pourquoi » s'appuient soit sur les justifications écrites dans les commits, soit sur des hypothèses signalées [H].
> Si des recommandations ont été données oralement ou par mail, il faut les reporter dans le §3 pour compléter le document.

---

## 1. Chronologie annotée

| # | Date | Commit | Auteur | Ce qui change | Pourquoi |
|---|---|---|---|---|---|
| 1 | 09/09 | `c054755` | AlixDecat | Refonte complète « Glow Stories nuit », fiches maladies, ressources, mini-site L'ado-XPR | Point de départ |
| 2 | 11/09 | `96565cf` + `b957733` | AlixDecat | **Design system v2** : tokens nommés, en-tête 64 px, blocs de confiance, micro-copy | [H] Industrialiser la v1 pour qu'elle reste cohérente sur 28 pages (détail au §2.1) |
| 3 | 18/09 | `c7952e7` | Claude | Déploiement OVH (FTPS), `.htaccess`, page 404, `DEPLOIEMENT.md` | [FAIT] Préparer la mise en ligne sur un hébergement mutualisé |
| 4 | 18/09 | `4c058f7` | Claude | **Audit complet des 28 pages** et corrections | [FAIT] Structure, tokens, accessibilité, cohérence |
| 5 | 19/09 | `a165ea4` | Claude | Préproduction automatique sur GitHub Pages | [FAIT] « Sert de lien de relecture en attendant les secrets FTP OVH » |
| 6 | 21/09 | `9cad6fa` | AlixDecat | Pictos SVG des maladies, images allégées, 3 pages témoignages | [H] Cohérence visuelle et performance (détail au §2.5) |
| 7 | 21/09 | `37a4b37` | AlixDecat | Rétablit `page-xpr` sur les pages ado | **[RELECTEUR]** « Correction de Lydie après l'audit » |
| 8 | 21/09 | `6b57fed` | AlixDecat | OVH en déclenchement **manuel uniquement** | **[RELECTEUR / porteur]** Un push ne doit pas toucher la production |
| 9 | 25/09 | `b9d1bd8` | Claude | Bannière élargie, menu aligné dessus | [FAIT] Le menu débordait de la bannière |
| 10 | 25/09 | `5857097` | Claude | Sur ordinateur, seul le menu reste collant | [FAIT] Libérer de la hauteur de lecture |

---

## 2. Comparaison thème par thème

### 2.1 Design system : de la v1 à la v2

| | Version initiale | Version actuelle |
|---|---|---|
| Noms des variables | Courts et ambigus : `--indigo`, `--s5`, `--r-card` | Sémantiques : `--color-brand-primary`, `--space-6`, `--radius-xl` |
| Source de vérité | Aucune, les valeurs sont dans le CSS | `design-tokens.json` (format ado-xpr-design-system 1.0.0) synchronisé avec `styles.css` |
| Échelles | Espacement sur 6 paliers ; tailles de titres fluides (`clamp()`) | Espacement sur 11 paliers ; tailles fixes h1 32 / h2 24 / h3 18 / corps 16 / small 14 / meta 12 |
| Composants | Valeurs codées en dur page par page | Tokens de composants : bouton 44 px, chip 36 px, champ 44 px, carte rayon 16 |
| Animations | `.2s ease`, `.3s ease` dispersés | 3 durées (120, 180, 240 ms) et une seule courbe d'accélération |
| Ombres | 3 ombres, dont un « glow » coloré | 2 ombres (`sm`, `md`) avec la règle « jamais empilées » |
| Compatibilité | n/a | Alias v1 conservés (`--indigo` pointe vers `--color-brand-primary`), puis remplacés dans les pages lors de l'audit |

**Annotations**
- [FAIT] Le passage de `clamp()` à des tailles fixes rend la typographie **prévisible**. En contrepartie, elle n'est plus fluide entre mobile et ordinateur.
- [H] Les tokens nommés ont été choisis pour qu'une même décision (par exemple « couleur d'action ») vive à un seul endroit. Ils permettent aussi une passation à d'autres outils (Figma, autre développeur) via le JSON.
- [FAIT] L'alias `--s5` vaut `--space-6` (24 px) et ne vaut donc **pas** `--space-5`. L'audit a laissé un commentaire sur ce décalage, qui est un piège connu.
- [H] Les alias v1 ont été conservés pour ne rien casser pendant la migration. Ils sont aujourd'hui pratiquement inutilisés dans les pages et pourraient être supprimés.

### 2.2 Accessibilité

| | Version initiale | Version actuelle |
|---|---|---|
| Focus clavier | Halo `box-shadow` turquoise semi-transparent | Contour `outline` 2 px cyan `#22D3EE` avec décalage, identique partout |
| Zones de clic | Menu : 15 px de texte avec padding de 8 px | Minimum 44 px (`--size-tap-min`) ; les chips de 36 px gardent une zone de clic invisible de 44 px |
| Largeur de lecture | Illimitée | 72 caractères maximum pour le texte courant |
| Menu ado | `<div role="navigation">` | Vrai `<nav>`, `aria-current="page"` sur la page active |
| Titres | Plusieurs h1 par page, niveaux sautés | Un seul h1, puis h2 et h3 sans saut de niveau (audit) |
| Images, liens | Plusieurs `alt` génériques, liens « ici » | `alt` descriptifs, libellés explicites, liens externes en `rel="noopener"` |

**Annotations**
- [FAIT] La valeur de 44 px correspond au seuil WCAG 2.5.5 et aux recommandations Apple et Google.
- [H] Le contour (`outline`) a remplacé le halo (`box-shadow`) parce qu'un halo disparaît en mode contraste élevé de Windows, contrairement à un `outline`.
- [H] Le public visé (adolescents, souvent sur mobile, et parents parfois peu à l'aise avec le numérique) justifie de privilégier les grandes zones tactiles.

### 2.3 Confiance et contenu médical

**Nouveauté de la v2 [FAIT] :** des **blocs de confiance** ont été ajoutés sur 17 pages (fiches maladies et pages ado).
Ils affichent **Sources** (PNDS HAS, Orphanet, FAI2R), **Relu par** et **Mis à jour le**, juste après le résumé.
Les témoignages ont en bas de page un lien *Consentement · Demander le retrait* (`.page-legal`).

- [H] Ce choix répond aux attentes de crédibilité d'un site de santé : afficher les sources, l'équipe relectrice et la date, dans l'esprit de la charte HONcode et des recommandations HAS sur l'information des patients.
- [H] Le lien de retrait des témoignages répond au RGPD, puisque ces textes contiennent des données de santé de mineurs.
- [FAIT] Au départ, le bloc indiquait « Version 1, relecture par l'équipe du CEREMAIA Lyon **en cours** ». 15 pages affichent maintenant « Équipe du CEREMAIA Lyon », mais `comprendre.html` et `repondre.html` indiquent toujours « relecture en cours ». **Il faut vérifier que cette relecture médicale a vraiment eu lieu pour chaque fiche** avant la mise en production.

**Points que l'audit a laissés volontairement à valider par le CEREMAIA [FAIT] :**
1. Les codes Orphanet de la page « Autres » (ils n'étaient pas vérifiables hors ligne).
2. Les reformulations médicales : sex-ratio dans la maladie de Behçet, symptômes du déficit en mévalonate kinase (MKD).
3. Les données de l'annuaire des psychologues (`soutien-psy.html`).
4. L'agenda des événements (la rubrique a été renommée « Événements passés »).

> [H] Ces points ont été laissés de côté parce qu'**un outil ne doit pas trancher une information médicale**. C'est le principe de prudence attendu d'un site hospitalier.

### 2.4 Micro-copy

| Avant | Après | Raison |
|---|---|---|
| « Besoin d'aide » (menu ado) | « Aide » | [H] Le menu de 64 px doit tenir sur une ligne sur mobile |
| « Copier le prompt » | « Copier » + `aria-label="Copier le prompt"` | [H] Bouton plus court, sans perte d'information pour les lecteurs d'écran |
| Titres d'onglet copiés-collés | « Nom · CEREMAIA Lyon » | [FAIT] 3 titres étaient faux (actualités, contacts, recherche) |
| Environ 25 coquilles | Corrigées | [FAIT] Par exemple : Événements, aiguë, réapparaissent |

### 2.5 Visuels

- [FAIT] Les **photos JPG des maladies** ont été remplacées par des **pictogrammes SVG** (12 fichiers).
  [H] Raisons probables : un style homogène, un poids quasi nul, une image nette sur tous les écrans, et la fin de la dépendance à des photos (droits d'auteur, risque de stigmatisation).
- [FAIT] Les grandes illustrations de la page Recherche ont été **allégées d'environ 75 %** (de 530 Ko à 130 Ko par image).
- [FAIT] 3 nouvelles pages témoignages ont été créées : *devenir malade*, *MDPH / ALD*, *pairs*.

### 2.6 En-tête et navigation : l'historique d'un aller-retour

C'est la partie qui a le plus changé. Elle montre aussi l'intervention du relecteur.

1. **v1 :** l'en-tête complet (bannière et menu) est collant. Sur ordinateur, il occupe environ 376 px en permanence.
2. **v2 (11/09) :** les pages ado reçoivent leur propre barre `.xpr-nav` collante de 64 px. La classe `page-xpr` rend l'en-tête global **statique** sur ces pages, pour éviter **deux barres collantes empilées**.
3. **Audit (18/09) :** `page-xpr` est jugée « inerte » et retirée. **Effet de bord :** le double sticky revient sur les pages ado.
4. **Correction du relecteur (21/09)** : `page-xpr` est rétablie (voir §3).
5. **25/09 :** la bannière passe de 1 088 à 1 360 px et le menu est borné à sa largeur. Le message de commit donne la raison : le menu de 1 408 px dépassait de chaque côté de l'image.
6. **25/09 :** sur ordinateur, seul le menu reste collant (61 px au lieu d'environ 376 px) et la bannière défile avec la page. Sur mobile, rien ne change (en-tête statique et menu hamburger).

### 2.7 Mise en ligne

| | Version initiale | Version actuelle |
|---|---|---|
| Hébergement | Aucun (fichiers seuls) | OVH mutualisé via FTPS, `.htaccess` (HTTPS forcé, cache, en-têtes de sécurité), page 404 |
| Préproduction | Aucune | GitHub Pages, mise à jour à chaque push sur `main` |
| Production | n/a | Lancement **manuel** depuis l'onglet Actions |

---

## 3. Recommandations du relecteur et raisons des choix

### R1 : Rétablir `page-xpr` sur les pages ado (`37a4b37`, 21/09)

- **Constat :** l'audit avait supprimé la classe en la croyant inutile. Sur les pages ado, l'en-tête global et la barre `.xpr-nav` redevenaient collants **en même temps**.
- **Recommandation :** remettre la classe sur les 8 pages ado.
- **Raison [FAIT, message de commit] :** « bannière statique, fin du double sticky ».
- **Raison de fond [H] :** sur mobile, deux barres collantes mangent une grande partie de l'écran. Sur un espace pensé pour des adolescents, cela nuit directement à la lecture.
- **Leçon :** une classe peut paraître « inerte » à la lecture du HTML alors que le CSS l'utilise. Un audit automatique doit vérifier l'usage dans **le CSS et le HTML**, pas dans un seul des deux.

### R2 : Production déclenchée à la main (`6b57fed`, 21/09)

- **Avant :** chaque push sur `main` partait en production sur OVH.
- **Recommandation :** OVH uniquement par lancement manuel ; un push ne met à jour que la préproduction.
- **Raison [FAIT, message de commit] :** « un push ne met à jour que la préprod Pages ».
- **Raison de fond [H] :** pour un site médical de CHU, une erreur publiée automatiquement (contenu non relu, page cassée) a un coût réputationnel. Le circuit devient *modifier → relire sur la préproduction → valider → publier*.
- ⚠️ **Incohérence à corriger :** `DEPLOIEMENT.md` indique encore « à chaque mise à jour de la branche `main` […] le déploiement part tout seul ». Ce n'est plus vrai.

### R3 et R4 (hypothèse) : bannière élargie et menu seul collant (25/09)

Ces deux commits viennent d'une session de travail séparée. Leur message décrit un **constat visuel précis** (« le menu débordait visuellement de part et d'autre de l'image », « libère la hauteur de lecture »).
[H] Ce sont très probablement des retours de relecture du rendu sur la préproduction. L'historique ne permet pas d'en être certain.

### À compléter

> Ajoutez ici les autres recommandations reçues hors Git (réunions, mails), avec la date, la personne et la raison.

---

## 4. Hypothèses explicites (récapitulatif à valider)

| # | Hypothèse | Si elle est fausse |
|---|---|---|
| H1 | Le public principal (adolescents) lit surtout sur mobile | Le compromis sur les zones de 44 px et la barre ado reste valable mais perd de son importance |
| H2 | La relecture médicale des fiches est faite (« Relu par : Équipe du CEREMAIA ») | **Bloquant** : le bloc de confiance afficherait une information fausse |
| H3 | Les témoignages publiés ont un consentement écrit (et parental pour les mineurs) | **Bloquant** sur le plan juridique (RGPD, données de santé) |
| H4 | Les pictogrammes SVG ont été choisis pour la cohérence et la non-stigmatisation | Sans impact technique |
| H5 | Les alias v1 du CSS ne sont plus utilisés | Les supprimer casserait un affichage, d'où une vérification nécessaire avant nettoyage |
| H6 | Les retours du 25/09 viennent d'une relecture de la préproduction | Sans impact technique, mais la traçabilité est à documenter |

---

## 5. Recommandations issues de cette analyse

1. **Mettre à jour `DEPLOIEMENT.md`** : la production est désormais lancée à la main.
2. **Faire valider par le CEREMAIA** les 4 points laissés ouverts par l'audit (§2.3) et la mention « Relu par » de chaque fiche.
3. **Tracer les relectures** dans GitHub : une issue ou une pull request par série de retours, pour garder le « pourquoi » des décisions et faciliter les prochaines analyses.
4. **Supprimer les alias v1** du CSS une fois H5 vérifiée, ce qui fait disparaître le piège `--s5 ≠ --space-5`.
5. **Synchroniser `design-tokens.json`** à chaque changement de token, comme cela a été fait pour `--size-banner-max`.
