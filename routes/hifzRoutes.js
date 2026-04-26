const express = require('express');
const router = express.Router();

const { getHifzStudents, getHifzOneStudent, updateCurrentJuz, addProgress, getHifzManagement } = require('../controllers/hifzStudentController')
const { isLoggedIn } = require('../middlewares/authMiddleware');

const { getParentLoginPage, postParentLogin } = require('../controllers/parentController');
const {getAllUsthads, addUsthad, updateUsthad, deleteUsthad} = require('../controllers/usthadController');

const {getClassManagement, addClass, updateClass, deleteClass} = require('../controllers/hifzClassController')

router.get('/parent', getParentLoginPage);
router.post('/parent', postParentLogin);

router.use(isLoggedIn);
 router.get('/',getHifzManagement)

router.get('/progress',getHifzStudents);
router.get('/progress/student/:id', getHifzOneStudent);

router.post('/progress/student/:id/update-juz',updateCurrentJuz)
router.post('/progress/student/:id/add-progress',addProgress)

// Load main page
router.get('/usthads', getAllUsthads);
router.post('/usthad/add', addUsthad)        
router.post('/usthad/edit/:id', updateUsthad);
router.post('/usthad/delete/:id', deleteUsthad);

router.get('/classes', getClassManagement);
router.post('/classes/add', addClass)
router.post('/classes/edit/:id',updateClass)
router.post('/classes/delete/:id',deleteClass)

module.exports = router;  