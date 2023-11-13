    /**
    * Middleware pour vérifier si l'utilisateur est connecté.
    * Si l'utilisateur est connecté, il continue vers la prochaine route/middleware.
    * Sinon, il est redirigé vers la page de connexion.
    */
    function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) return next();
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
   * Sinon, il est redirigé vers la page de connexion.
   */

  function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') return next();
    res.redirect('/profile');
}

  module.exports = {
      isLoggedIn,
      redirectIfLoggedIn,
      isAdmin
  };