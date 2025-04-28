# Interprétation des Rêves

Un site web simple construit avec Remix pour explorer la signification potentielle des rêves.

## Développement

Lancez le serveur de développement :

```shellscript
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) (ou le port indiqué) dans votre navigateur.

## Fonctionnalités

-   Entrez une description de votre rêve dans la zone de texte.
-   Cliquez sur "Interpréter mon rêve".
-   Une interprétation symbolique basique s'affichera (ceci est une démo, pas une véritable analyse psychologique).

## Déploiement

Compilez l'application pour la production :

```sh
npm run build
```

Lancez l'application en mode production :

```sh
npm start
```

Choisissez ensuite un hébergeur pour déployer l'application Node.js. Assurez-vous de déployer les répertoires `build/server` et `build/client`.
