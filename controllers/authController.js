const Usthad = require('../models/Usthad Schema');


// const loginCredintials = {
//   userName : "W3Tstru",
//   password : "WE4Tsur" 
// }

const loginCredintials = {
  userName : "Gazzali", 
  password : 313
}


exports.getLoginPage = (req, res) => {
  if(req.session.user){
  return res.redirect('/dashboard')
  }
  if(req.session.userId){
    return res.send("hai coming here")
  }
  res.render('login-page');
}

exports.loginUser = async(req, res) => {
  // Admin Login
  if (
    loginCredintials.userName == req.body.username &&
    loginCredintials.password == req.body.password
  ) {
    req.session.user = req.body.username;  // ✅ store session
    res.redirect('/dashboard');
    return 0;
  }
 
  // Usthads Login Page
   try {
    const { username, password } = req.body;

    // ✅ Find usthad
    const usthad = await Usthad.findOne({ username });

    if (!usthad) {
      return res.render('login-page', { error: "User not found" });
    }

    // ✅ Check password
    if (usthad.password !== password) {
      return res.render('login-page', { error: "Invalid password" });
    }

    // ✅ Store session
    req.session.userId = usthad._id;
    req.session.userName = usthad.name;
    req.session.role = "usthad"; // 🔥 important for future

    res.redirect('/dashboard');

  } catch (err) {
    console.log(err);
    res.send("Login error");
  }
}

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};  