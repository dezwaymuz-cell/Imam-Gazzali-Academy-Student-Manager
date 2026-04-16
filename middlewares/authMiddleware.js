exports.isLoggedIn = (req, res, next) => {
  
  if (req.session.user) {
    next(); // allow access
  } else {
    res.redirect('/login'); // block access
  }
};