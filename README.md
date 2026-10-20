# SLE---M2ALMA
Repo contenant les TP et Projets réaliser dans le cadre de la matière SLE(Software Language Engineering)

# Synthèse TP1 

## Objectif
Prendre en main Langium : installer l'environnement, générer un DSL d'exemple (Persons DSL), le compiler, le tester et le packager. Le but n'était pas encore d'écrire son propre DSL.

## Ce que j'ai fait

1. **Environnement (Windows)** : installation de Node/npm, puis de Yeoman et du générateur Langium (`npm install -g yo generator-langium`), plus l'extension VSCode Langium.
2. **Génération du projet** : `yo langium` avec l'exemple activé (Persons DSL, extension `.persons`, CLI et extension VSCode inclus).
3. **Build** : `npm run langium:generate` (grammaire vers TypeScript), puis `npm run build`.
4. **Test de l'extension** : « Run Extension » dans VSCode, puis création de `alice_and_bob.persons` (coloration, Ctrl+clic sur les références croisées, erreurs de syntaxe).
5. **Test de la CLI** : `node .\packages\cli\bin\cli.js generate alice_and_bob.persons`, qui génère un fichier JavaScript exécuté avec `node`.
6. **Packaging de l'extension** : `npx vsce package` donne un `.vsix`, installé dans VSCode puis désinstallé.
7. **Packaging de la CLI** : `npm pack -w packages/language -w packages/cli` donne deux `.tgz`, installés globalement. La commande `persons-dsl-cli` a été testée, puis désinstallée.

## Ce que j'ai appris

- **Langium** génère à partir d'une seule grammaire : types de l'AST, parser, services d'édition (LSP) et extension VSCode. Restent à écrire à la main : la sémantique (générateur de code), le validateur et la CLI.
- **Structure d'un projet** : trois packages npm (`language`, `cli`, `extension`). `cli` et `extension` dépendent de `language`, qui contient toute la logique du DSL.
- **Cycle de travail** : toute modification d'un `.langium` impose `langium:generate`, puis `build`.
- **Extension vs CLI** : l'extension sert à éditer (`.vsix`), la CLI à compiler (`.tgz`).
- **Packaging** : il sert à distribuer le DSL à l'expert du domaine, sans qu'il ait le projet ni les outils de dev.
- **Grammaire de l'exemple** : une salutation doit se terminer par `!` (`Hello Alice!`). Sans ce `!`, le parser signale une erreur de validation.
