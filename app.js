const express = require('express');
require('dotenv').config();
const connectDB = require('./models/db');
const path = require('path');
const app = express();

const studentRouter = require('./routes/studentRoutes');
const {getStudentsCount} = require('./controllers/studentController')

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const totalStudents = await getStudentsCount();

    res.render('dashboard', { totalStudents });

  } catch (err) {
    console.log(err);
    res.send("Error loading dashboard");
  }
});

app.use('/students', studentRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});

connectDB();