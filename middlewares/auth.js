exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  }
  res.status(401).send('Vous devez être connecté pour accéder à cette ressource.');
};

exports.redirectIfLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      return res.redirect('/profile');
  }
  next();
};
