const express = require('express');
require('dotenv').config();
const session = require('express-session');
const connectDB = require('./models/db');
const path = require('path');
const app = express();

const studentRouter = require('./routes/studentRoutes');
const authRouter = require('./routes/authRoutes');
const hifzRouter = require('./routes/hifzRoutes')
const {getStudentsCount} = require('./controllers/studentController')
const { isLoggedIn } = require('./middlewares/authMiddleware');



app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true
}));

app.get('/',(req,res)=>{
  if(isLoggedIn){
    res.redirect('/dashboard')
  }
})

app.get('/dashboard', isLoggedIn, async (req, res) => {
  try {
    const totalStudents = await getStudentsCount();

    res.render('dashboard', { totalStudents });

  } catch (err) {
    console.log(err);
    res.send("Error loading dashboard");
  }
});





app.use('/', authRouter); 
app.use('/students', studentRouter);
app.use('/hifz', hifzRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});

connectDB();