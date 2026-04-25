const studentShm = require('../models/Student Schema');

exports.getHifzManagement = async (req, res) => {
  try {
    res.render('hifz-management');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading Hifz Management");
  }
};

exports.getHifzStudents = async (req, res) => {
  try {
    const st = await studentShm
      .find({ category: "Hifz" })
      .select('name class');

    res.render('hifz', { st });

  } catch (err) {
    console.log(err);
    res.send("Error loading Hifz students");
  }
};

exports.getHifzOneStudent = async (req, res) => {
  try {
    const student = await studentShm.findById(req.params.id).select('_id name class parentName phone currentJuz progress');

    res.render('hifz-student', { student });

  } catch (err) {
    console.log(err);
    res.send("Error loading student");
  }
};


exports.updateCurrentJuz = async (req, res) => {
  
  try {
    const studentId = req.params.id;
    const { currentJuz } = req.body;

    // ✅ Validation
    if (!currentJuz) {
      return res.send("Current Juz is required");
    }

    if (isNaN(currentJuz) || currentJuz < 0 || currentJuz > 30) {
      return res.send("Invalid Juz value");
    }

    // ✅ Update
    const student = await studentShm.findByIdAndUpdate(
      studentId,
      { currentJuz: Number(currentJuz) }
    );

    if (!student) {
      return res.send("Student not found");
    }

    // ✅ Redirect back
    res.redirect(`/hifz/progress/student/${studentId}`);

  } catch (err) {
    console.log(err);
    res.send("Error updating current juz");
  }
};


exports.addProgress = async (req, res) => {
  try {
    const studentId = req.params.id;

    const { year, month, padam, sabkJuz, murajah } = req.body;

    // ✅ Basic validation
    if (!year || !month || !padam || !sabkJuz || !murajah) {
      return res.send("All fields are required");
    }

    // ✅ Find student
    const student = await studentShm.findById(studentId);

    if (!student) {
      return res.send("Student not found");
    }

    // ✅ Create progress object
    const newProgress = {
      year: Number(year),
      month,
      padam,
      sabkJuz,
      murajah
    };

    // ✅ Ensure progress array exists (extra safety)
    if (!student.progress) {
      student.progress = [];
    }

    // ✅ Push new progress
    student.progress.push(newProgress);


    // ✅ Save
    await student.save();

    // ✅ Redirect back to same page
    res.redirect(`/hifz/progress/student/${studentId}`);

  } catch (err) {
    console.log(err);
    res.send("Error adding progress");
  }
};