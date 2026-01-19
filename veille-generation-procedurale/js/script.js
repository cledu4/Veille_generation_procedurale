// ========================================
// SCRIPT.JS - Veille Technologique
// Génération Procédurale Gaming
// ========================================

// ========================================
// 1. FILTRAGE DES ARTICLES (Page Actualités)
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // Sélectionner tous les boutons de filtrage
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card');

    // Si on est sur la page actualités (présence des boutons de filtrage)
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');

                // Récupérer le filtre sélectionné
                const filter = this.getAttribute('data-filter');

                // Filtrer les articles
                articles.forEach(article => {
                    const tags = article.getAttribute('data-tags');

                    if (filter === 'tous') {
                        // Afficher tous les articles
                        article.classList.remove('hidden');
                        article.style.display = 'block';
                    } else {
                        // Vérifier si l'article contient le tag recherché
                        if (tags && tags.includes(filter)) {
                            article.classList.remove('hidden');
                            article.style.display = 'block';
                        } else {
                            article.classList.add('hidden');
                            article.style.display = 'none';
                        }
                    }
                });

                // Animation smooth lors du filtrage
                window.scrollTo({
                    top: document.querySelector('.filter-section').offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
    }

    // ========================================
    // 2. AFFICHAGE AUTOMATIQUE DES 4 DERNIERS ARTICLES (Page d'accueil)
    // ========================================

    const latestArticlesGrid = document.getElementById('latest-articles-grid');

    // Si on est sur la page d'accueil (présence de la grille)
    if (latestArticlesGrid) {
        // Charger les articles depuis actualites.html via fetch
        fetch('actualites.html')
            .then(response => response.text())
            .then(html => {
                // Créer un élément temporaire pour parser le HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Récupérer tous les articles de la page actualités
                const allArticles = doc.querySelectorAll('.article-card');

                // Convertir NodeList en Array et trier par date (plus récent en premier)
                const sortedArticles = Array.from(allArticles).sort((a, b) => {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateB - dateA; // Ordre décroissant
                });

                // Prendre les 4 premiers (les plus récents)
                const latestArticles = sortedArticles.slice(0, 3);

                // Créer les cartes pour la page d'accueil
                latestArticles.forEach(article => {
                    // Extraire les informations de l'article
                    const title = article.querySelector('.article-header h3').textContent;
                    const date = article.querySelector('.article-date').textContent;
                    const summary = article.querySelector('.article-summary').textContent;
                    const dataDate = article.getAttribute('data-date');

                    // Créer la carte d'article pour la page d'accueil
                    const articleCard = document.createElement('div');
                    articleCard.className = 'article-card-home';
                    articleCard.innerHTML = `
                        <h4>${title}</h4>
                        <p class="date">${date}</p>
                        <p>${summary.substring(0, 150)}${summary.length > 150 ? '...' : ''}</p>
                        <a href="actualites.html" class="read-more">Lire la suite →</a>
                    `;

                    // Ajouter la carte à la grille
                    latestArticlesGrid.appendChild(articleCard);
                });

                // Animation d'apparition des cartes
                const cards = latestArticlesGrid.querySelectorAll('.article-card-home');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        card.style.transition = 'all 0.5s ease';

                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            })
            .catch(error => {
                console.error('Erreur lors du chargement des articles:', error);
                // En cas d'erreur, afficher un message
                latestArticlesGrid.innerHTML = `
                    <p style="color: var(--text-muted); grid-column: 1 / -1; text-align: center;">
                        Impossible de charger les derniers articles. 
                        <a href="actualites.html" style="color: var(--primary-color);">Voir tous les articles</a>
                    </p>
                `;
            });
    }

    // ========================================
    // 3. SMOOTH SCROLL POUR LES LIENS GLOSSAIRE
    // ========================================

    const glossaryLinks = document.querySelectorAll('a[href^="ressources.html#"]');

    glossaryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Si on est déjà sur la page ressources, scroll smooth
            if (window.location.pathname.includes('ressources.html')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Highlight temporaire du terme
                    targetElement.style.transition = 'background 0.5s ease';
                    targetElement.style.background = 'rgba(0, 255, 136, 0.2)';

                    setTimeout(() => {
                        targetElement.style.background = '';
                    }, 2000);
                }
            }
        });
    });

    // ========================================
    // 4. NAVIGATION MOBILE (Menu burger si besoin)
    // ========================================

    // À implémenter si tu veux un menu hamburger pour mobile
    // Pour l'instant, le menu est responsive avec flexbox

    // ========================================
    // 5. SCROLL TO TOP BUTTON (optionnel)
    // ========================================

    // Créer un bouton "retour en haut" qui apparaît au scroll
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.className = 'scroll-top-btn';
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: var(--dark-bg);
        border: none;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
    `;

    document.body.appendChild(scrollTopButton);

    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.visibility = 'visible';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.visibility = 'hidden';
        }
    });

    // Action du bouton
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Effet hover sur le bouton
    scrollTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
    });

    scrollTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });

    // ========================================
    // 6. COMPTEUR D'ARTICLES (Page actualités)
    // ========================================

    const articlesContainer = document.getElementById('articles-container');

    if (articlesContainer) {
        const totalArticles = articlesContainer.querySelectorAll('.article-card').length;

        // Créer un compteur sous les boutons de filtrage
        const filterSection = document.querySelector('.filter-section');
        if (filterSection && totalArticles > 0) {
            const counter = document.createElement('p');
            counter.className = 'articles-counter';
            counter.style.cssText = `
                color: var(--text-muted);
                margin-top: 1rem;
                font-size: 0.95rem;
            `;
            counter.innerHTML = `<strong>${totalArticles}</strong> article${totalArticles > 1 ? 's' : ''} dans la veille`;
            filterSection.appendChild(counter);

            // Mettre à jour le compteur lors du filtrage
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    setTimeout(() => {
                        const visibleArticles = articlesContainer.querySelectorAll('.article-card:not(.hidden)').length;
                        const filter = this.getAttribute('data-filter');

                        if (filter === 'tous') {
                            counter.innerHTML = `<strong>${totalArticles}</strong> article${totalArticles > 1 ? 's' : ''} dans la veille`;
                        } else {
                            counter.innerHTML = `<strong>${visibleArticles}</strong> article${visibleArticles > 1 ? 's' : ''} trouvé${visibleArticles > 1 ? 's' : ''} pour cette catégorie`;
                        }
                    }, 100);
                });
            });
        }
    }

    // ========================================
    // 7. ANIMATION D'ENTRÉE DES ÉLÉMENTS
    // ========================================

    // Ajouter une animation fade-in aux sections au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes et sections
    const elementsToAnimate = document.querySelectorAll('.intro-card, .glossary-item, .about-section, .resource-category');

    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

});

// ========================================
// MESSAGE DE DEBUG (à retirer en production)
// ========================================
console.log('🚀 Script de veille technologique chargé avec succès!');
console.log('📊 Fonctionnalités actives:');
console.log('   ✓ Filtrage des articles par catégorie');
console.log('   ✓ Affichage automatique des 4 derniers articles');
console.log('   ✓ Smooth scroll vers glossaire');
console.log('   ✓ Bouton retour en haut');
console.log('   ✓ Compteur d\'articles dynamique');
console.log('   ✓ Animations d\'entrée');