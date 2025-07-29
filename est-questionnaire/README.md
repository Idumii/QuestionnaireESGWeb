
# Questionnaire ESG Web

Outil interactif d'évaluation de la performance ESG (Environnement, Social, Gouvernance) pour PME, basé sur le référentiel VSME. Ce projet permet aux entreprises de répondre à un questionnaire, d'obtenir une notation ESG indicative, et d'exporter leurs résultats (PDF/CSV). L'application est développée en React, TypeScript, Tailwind CSS et Vite.

## 🚀 Démo en ligne

[questionnaire-esg.fr](https://questionnaire-esg.fr/)

## Fonctionnalités
- Questionnaire dynamique avec conditions
- Sauvegarde locale des réponses
- Calcul et affichage d'une notation ESG
- Export PDF et CSV des résultats
- Envoi des réponses vers une base de données (optionnel)
- Mode clair forcé sur tous les appareils

## Installation locale

**Prérequis :** Node.js

1. Installez les dépendances :
   ```bash
   npm install
   ```
2. (Optionnel) Ajoutez votre clé Gemini dans `.env.local` si vous utilisez l'API Gemini
3. Lancez l'application :
   ```bash
   npm run dev
   ```

## Déploiement

1. Générez les fichiers de production :
   ```bash
   npm run build
   ```
2. Uploadez le contenu du dossier `dist/` sur votre hébergement web (ex : o2switch)
3. Configurez votre nom de domaine pour pointer vers le dossier du site
4. (Optionnel) Installez un certificat SSL pour activer HTTPS

## Licence

Projet open-source, libre d'utilisation et de modification.
