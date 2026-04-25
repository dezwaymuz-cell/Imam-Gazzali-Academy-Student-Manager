

const loginCredintials = {
  userName : "W3Tstru",
  password : "WE4Tsur" 
}

// const loginCredintials = {
//   userName : "Gazzali",
//   password : 313
// }


exports.getLoginPage = (req, res) => {
  if(req.session.user){
  return res.redirect('/dashboard')
  }
  res.render('login-page');
}

exports.loginUser = (req, res) => {
  if (
    loginCredintials.userName == req.body.username &&
    loginCredintials.password == req.body.password
  ) {
    req.session.user = req.body.username;  // ✅ store session
    res.redirect('/dashboard');
  } else {
    return res.render('login-page', { error: "Invalid username or password" });
  }
}

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};  