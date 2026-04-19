const express = require('express');
const router = express.Router();

const { getHifzStudents, getHifzOneStudent, updateCurrentJuz, addProgress } = require('../controllers/hifzStudentController')
const { isLoggedIn } = require('../middlewares/authMiddleware');

router.use(isLoggedIn);

router.get('/',getHifzStudents);

router.get('/student/:id', getHifzOneStudent);

router.post('/student/:id/update-juz',updateCurrentJuz)

router.post('/student/:id/add-progress',addProgress)
module.exports = router; 