exports.isLoggedIn = (req, res, next) => {
  
  if (req.session.user || req.session.userId) {
    next(); // allow access
  } else {
    res.redirect('/login'); // block access
  }
};