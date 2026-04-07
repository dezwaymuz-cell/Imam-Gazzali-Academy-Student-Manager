const express = require('express');
const router = express.Router();

const {saveStudent,getStudents,deleteStudent,updateStudent} = require('../controllers/studentController')

router.post('/add', (req, res) => {
  console.log(req.body);
  saveStudent(req.body)
    .then(() => {
      res.redirect('/students/new');
    });
});

router.get('/',(req,res)=>{
 getStudents()
 .then((st)=>{
 res.render('students',{st})
 })
})

router.get('/new',(req,res)=>{
  res.render('add-student');
})

router.post('/delete/:id',(req,res)=>{
    deleteStudent(req.params.id)
    .then(()=>{
      console.log("Delete Successfully");
      res.redirect('/students')
    })
})

router.post('/update',(req,res)=>{
updateStudent(req.body.id,req.body)
.then(()=>{
      console.log("Update Successfully");
      res.redirect('/students')
    })
})

module.exports = router;