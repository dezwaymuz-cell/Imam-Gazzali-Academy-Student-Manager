const studentShm = require('../models/Student Schema')


async function saveStudent(getAddStudentPage) {
  const std = new studentShm(getAddStudentPage);
  try{
    postAddStudent = await std.save();
console.log("Succeesss"+postAddStudent);

  }
  catch(err){
console.log(err);

  }
}


async function getStudents() {
  try{
    const students = await studentShm.find();
    console.log('All users:', students);
    return students;
  }
  catch(err){
    console.log(err);
    
  }
}

async function deleteStudent(stdId){
  try{
    await studentShm.deleteOne({_id:stdId});
    return true;
  }
  catch(err){
    console.log(err);
    return false;
  }
}

async function updateStudent(stdId,updtData){
  try{
    await studentShm.updateOne({_id:stdId},updtData);
    return true;
  }
  catch(err){
    console.log(err);
    return false;
  }
}

async function getStudentsCount() {
  try{
    const studentsCount = await studentShm.countDocuments();
    console.log('All users:', studentsCount);
    return studentsCount;
  }
  catch(err){
    console.log(err);
    
  }
}

module.exports = {saveStudent,getStudents,deleteStudent,updateStudent,getStudentsCount};