const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');
const { isLoggedIn } = require('../middlewares/authMiddleware');

router.use(isLoggedIn);

// Create student
router.post('/add', studentController.saveStudent);

// Get all students
router.get('/', studentController.getStudents);

// Render add page
router.get('/new', (req, res) => {
  res.render('add-student');
});

// Delete student
router.post('/delete/:id', studentController.deleteStudent);

// Update student
router.post('/update', studentController.updateStudent);

module.exports = router;