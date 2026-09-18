# Déploiement du site sur OVH

Le site est **statique** (HTML/CSS/JS, aucune base de données) : un hébergement
mutualisé OVH suffit. Le déploiement est automatisé par GitHub Actions
(`.github/workflows/deploy.yml`) : à chaque mise à jour de la branche `main`,
les fichiers modifiés sont envoyés en FTPS vers OVH.

## Mise en route (une seule fois)

### 1. Récupérer les identifiants FTP chez OVH

Dans le [manager OVH](https://www.ovh.com/manager/) :

1. **Web Cloud → Hébergements** → sélectionner l'hébergement.
2. Onglet **FTP-SSH** : noter le **serveur FTP** (ex. `ftp.cluster0XX.hosting.ovh.net`)
   et l'**identifiant** (login principal ou utilisateur FTP dédié — préférer un
   utilisateur dédié au déploiement).
3. Si besoin, (ré)initialiser le **mot de passe** depuis ce même onglet.

### 2. Déclarer les secrets dans GitHub

Dans le dépôt GitHub : **Settings → Secrets and variables → Actions →
New repository secret**, créer :

| Nom | Valeur |
|---|---|
| `OVH_FTP_SERVER` | le serveur FTP (ex. `ftp.cluster0XX.hosting.ovh.net`) |
| `OVH_FTP_USERNAME` | l'identifiant FTP |
| `OVH_FTP_PASSWORD` | le mot de passe FTP |

### 3. Vérifier le dossier cible

Le workflow envoie les fichiers dans `www/` (racine web par défaut du login
FTP principal OVH). Si l'utilisateur FTP utilisé est déjà restreint au dossier
du site, remplacer `server-dir: www/` par `server-dir: ./` dans
`.github/workflows/deploy.yml`.

### 4. Domaine et HTTPS

Dans le manager OVH, onglet **Multisite** de l'hébergement : rattacher le
domaine au dossier `www` et activer le **certificat SSL Let's Encrypt**
(gratuit, renouvelé automatiquement). Le fichier `.htaccess` du site force
ensuite la redirection vers HTTPS.

## Fonctionnement au quotidien

- **Publier une mise à jour** : fusionner (ou pousser) sur `main`. Le
  déploiement part tout seul ; suivi dans l'onglet **Actions** du dépôt.
- **Relancer manuellement** : onglet **Actions → Déploiement OVH →
  Run workflow**.
- **Premier déploiement** : tout le site est transféré (~10 Mo). Ensuite,
  seuls les fichiers modifiés sont renvoyés (un fichier d'état
  `.ftp-deploy-sync-state.json` est conservé sur le serveur — ne pas le
  supprimer).
- Les fichiers de travail (`.github/`, `design-tokens.json`, ce document,
  `.nojekyll`) ne sont **pas** envoyés sur l'hébergement.

## En cas de problème

- Le journal complet du transfert est visible dans l'onglet **Actions**.
- Échec d'authentification : re-vérifier les 3 secrets (le serveur se met
  **sans** `ftp://` ni `https://`, juste le nom d'hôte).
- Dépannage manuel toujours possible : les mêmes identifiants fonctionnent
  avec FileZilla (protocole FTPS, chiffrement explicite).
