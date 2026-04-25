const express = require('express');
const router = express.Router();

const { getHifzStudents, getHifzOneStudent, updateCurrentJuz, addProgress, getHifzManagement } = require('../controllers/hifzStudentController')
const { isLoggedIn } = require('../middlewares/authMiddleware');

const { getParentLoginPage, postParentLogin } = require('../controllers/parentController');

router.get('/parent', getParentLoginPage);
router.post('/parent', postParentLogin);

router.use(isLoggedIn);
 router.get('/',getHifzManagement)

router.get('/progress',getHifzStudents);

router.get('/progress/student/:id', getHifzOneStudent);

router.post('/student/:id/update-juz',updateCurrentJuz)

router.post('/student/:id/add-progress',addProgress)


module.exports = router; 