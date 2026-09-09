/* ============================================================
   L'ado-XPR · Menu mobile (hamburger)
   Injecte un bouton ☰ dans l'en-tête et déplie/replie la nav.
   Aucun besoin de modifier le balisage des pages : le script
   s'adapte à toutes les structures d'en-tête du site.
   ============================================================ */
(function () {
    function init() {
        var header = document.querySelector('header');
        if (!header) return;
        var nav = header.querySelector('nav');
        if (!nav || header.querySelector('.nav-toggle')) return;

        // Bouton hamburger (3 barres qui se transforment en croix)
        var btn = document.createElement('button');
        btn.className = 'nav-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Ouvrir le menu');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span></span><span></span><span></span>';

        header.insertBefore(btn, nav);

        function close() {
            header.classList.remove('nav-open');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Ouvrir le menu');
        }
        function toggle() {
            var open = header.classList.toggle('nav-open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        }

        btn.addEventListener('click', toggle);

        // Refermer au clic sur un lien de navigation
        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) close();
        });

        // Refermer avec la touche Échap
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' || e.key === 'Esc') close();
        });

        // Repartir propre si l'écran repasse en desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) close();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
