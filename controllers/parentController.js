const studentShm = require('../models/Student Schema');

// GET - show login page
exports.getParentLoginPage = (req, res) => {
  res.render('hifz-parent', { error: null });
};

// POST - handle form
exports.postParentLogin = async (req, res) => {
  try {
    const { name, dob } = req.body;
    console.log(name, dob);

    // basic validation
    if (!name || !dob) {
      return res.render('hifz-parent', {
        error: "Please fill all fields"
      });
    }

    const inputDate = new Date(dob);

    const nextDay = new Date(inputDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const student = await studentShm.findOne({
      category: "Hifz",
      dateOfBirth: {
        $gte: inputDate,
        $lt: nextDay
      }
    }).select('_id name parentName phone currentJuz progress');



    if (!student) {
      return res.render('hifz-parent', {
        error: "Invalid Name or Date of Birth"
      });
    }

    // SUCCESS → go to view page
    res.render('hifz-parent-view', { student });

  } catch (err) {
    console.log(err);
    res.send("Error occurred");
  }
};