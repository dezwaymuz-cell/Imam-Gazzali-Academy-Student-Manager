const studentShm = require('../models/Student Schema');

// ✅ CREATE STUDENT
exports.saveStudent = async (req, res) => {
  try {
    console.log(req.body);

    const std = new studentShm(req.body);
    await std.save();

    // For your AJAX frontend (recommended)
    res.json({
      success: true,
      message: "Student registered successfully"
    });

  } catch (err) {
    console.log(err);

    res.status(400).json({
      success: false,
      message: err.message || "Failed to add student"
    });
  }
};


// ✅ GET ALL STUDENTS
exports.getStudents = async (req, res) => {
  try {
    const students = await studentShm.find();

    console.log('All users:', students.length);

    res.render('students', { st: students });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading students");
  }
};


// ✅ DELETE STUDENT
exports.deleteStudent = async (req, res) => {
  try {
    await studentShm.deleteOne({ _id: req.params.id });

    console.log("Delete Successfully");

    res.redirect('/students');

  } catch (err) {
    console.log(err);
    res.status(500).send("Delete failed");
  }
};


// ✅ UPDATE STUDENT
exports.updateStudent = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    await studentShm.updateOne({ _id: id }, updateData);

    console.log("Update Successfully");

    res.redirect('/students');

  } catch (err) {
    console.log(err);
    res.status(500).send("Update failed");
  }
};


// ✅ COUNT (for dashboard)
exports.getStudentsCount = async () => {
  try {
    const count = await studentShm.countDocuments();
    return count;
  } catch (err) {
    console.log(err);
    return 0;
  }
};