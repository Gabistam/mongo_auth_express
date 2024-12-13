// middlewares/auth.js

/**
 * Middleware pour vérifier si l'utilisateur est connecté.
 * Si l'utilisateur est connecté, il continue vers la prochaine route/middleware.
 * Sinon, il est redirigé vers la page de connexion.
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    
    // Ajouter un message flash pour informer l'utilisateur
    req.session.flash = [{ type: 'warning', message: 'Veuillez vous connecter pour accéder à cette page.' }];
    res.redirect('/login');
}

/**
 * Middleware pour rediriger l'utilisateur s'il est déjà connecté.
 * Si l'utilisateur est connecté, il est redirigé vers la page de profil.
 * Sinon, il continue vers la prochaine route/middleware.
 */
function redirectIfLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return res.redirect('/profile');
    next();
}

/**
 * Middleware pour vérifier si l'utilisateur est admin.
 * Si l'utilisateur est admin, il continue vers la prochaine route/middleware.
 * Sinon, il est redirigé vers la page d'accueil avec un message d'erreur.
 */
function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') return next();
    
    // Ajouter un message flash pour informer l'utilisateur
    req.session.flash = [{ type: 'danger', message: 'Accès non autorisé. Privilèges administrateur requis.' }];
    res.redirect('/');
}

/**
 * Middleware pour vérifier si l'utilisateur est le propriétaire de la ressource
 * ou un administrateur.
 */
function isOwnerOrAdmin(req, res, next) {
    if (
        req.user && (
            req.user._id.toString() === req.params.id ||
            req.user.role === 'admin'
        )
    ) {
        return next();
    }
    
    req.session.flash = [{ type: 'danger', message: 'Vous n\'avez pas les permissions nécessaires.' }];
    res.redirect('/');
}

// Exporter tous les middlewares
module.exports = {
    isLoggedIn,
    redirectIfLoggedIn,
    isAdmin,
    isOwnerOrAdmin
};