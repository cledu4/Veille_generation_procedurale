🎮 Veille Technologique - Génération Procédurale dans le Gaming
Site de veille technologique réalisé dans le cadre du BTS SIO option SLAM.

📋 À propos
Ce site regroupe les actualités, tendances et innovations en matière de génération procédurale dans l'industrie du jeu vidéo. De l'IA aux algorithmes, des jeux AAA aux studios indépendants.

🚀 Thématiques couvertes
IA & Génération : Intelligence artificielle appliquée à la création de contenu

Jeux Emblématiques : Minecraft, Hytale, No Man's Sky, roguelikes

Outils & Techniques : Algorithmes, moteurs de jeu, frameworks

Impact Industrie : Économie, accessibilité, tendances du marché

💻 Technologies utilisées
HTML5 - Structure sémantique

CSS3 - Design responsive avec Flexbox/Grid

JavaScript Vanilla - Fonctionnalités interactives

GitHub Pages - Hébergement gratuit

✨ Fonctionnalités
✅ Affichage automatique des 4 derniers articles sur la page d'accueil

✅ Filtrage des articles par catégories (IA, Jeux, Outils, Industrie)

✅ Glossaire interactif avec liens directs depuis les articles

✅ Design gaming moderne et responsive

✅ Animations et transitions fluides

✅ Compteur d'articles dynamique

✅ Bouton "retour en haut"

📦 Installation locale
Cloner le dépôt :

bash
git clone https://github.com/cledu4/Veille_generation_procedurale.git
cd veille-generation-procedurale
Ouvrir index.html dans votre navigateur

Ou utiliser un serveur local :

bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx http-server
📝 Comment ajouter un article
Ouvrir actualites.html

Copier le template d'article :

xml
<article class="article-card" data-tags="jeux,ia" data-date="2026-02-01">
    <div class="article-header">
        <h3>Titre de ton article</h3>
        <span class="article-date">1 février 2026</span>
    </div>
    <div class="article-tags">
        <span class="tag tag-jeux">Jeux</span>
        <span class="tag tag-ia">IA</span>
    </div>
    <p class="article-source">
        <strong>Source :</strong> <a href="URL" target="_blank">Nom du site</a>
    </p>
    <p class="article-summary">
        Résumé de l'article avec lien vers 
        <a href="ressources.html#terme" class="glossary-link">glossaire</a>.
    </p>
    <p class="article-analysis">
        <strong>💡 Mon analyse :</strong> Ton avis personnel.
    </p>
</article>
Personnaliser :

data-tags : ia, jeux, outils, industrie (plusieurs possibles)

data-date : Format YYYY-MM-DD pour le tri automatique

Tags visuels correspondants

L'article apparaîtra automatiquement sur la page d'accueil s'il fait partie des 4 plus récents !
