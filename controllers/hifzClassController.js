const Class = require('../models/Class');
const Usthad = require('../models/Usthad Schema');
const Student = require('../models/Student Schema');

exports.getClassManagement = async (req, res) => {
  try {
    // ✅ Get all classes
    const classes = await Class.find()
      .populate('usthads', 'name')
      .populate('students', 'name');

    // ✅ Get all usthads
    const usthads = await Usthad.find().select('name');

    // ✅ Get only Hifz students
    const students = await Student.find({ category: "Hifz" }).select('name');

    res.render('class-management', {
      classes,
      usthads,
      students
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading class management");
  }
};


exports.addClass = async (req, res) => {
  try {
    const { name, description, usthads, students } = req.body;

    const newClass = new Class({
      name,
      description,
      usthads: [usthads], // 🔥 important
      students
    });
console.log(newClass)
    await newClass.save();

    res.redirect('/hifz/classes');

  } catch (err) {
    console.log(err);
    res.send("Error adding class");
  }
};



exports.updateClass = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, usthads, students } = req.body;

    const cls = await Class.findById(id);

    if (!cls) return res.send("Class not found");

    cls.name = name;
    cls.description = description;

    // ✅ fix: usthad must be array
    cls.usthads = [usthads];

    // ✅ fix: students always array
    cls.students = Array.isArray(students) ? students : [students];

    await cls.save();

    res.redirect('/hifz/classes');

  } catch (err) {
    console.log(err);
    res.send("Error updating class");
  }
};

exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);

    res.redirect('/hifz/classes');

  } catch (err) {
    console.log(err);
    res.send("Error deleting class");
  }
};