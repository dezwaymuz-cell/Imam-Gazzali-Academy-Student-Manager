const usthadShm = require('../models/Usthad Schema');

exports.getAllUsthads = async (req, res) => {
   try {
    const usthads = await usthadShm.find();

    res.render('usthad-management', { usthads });

  } catch (err) {
    console.log(err);
    res.send("Error loading usthads");
  }
};

exports.addUsthad = async (req, res) => {
  console.log("yes coming here no problem");
  
  try {
    const { name, username, phone, password } = req.body;

    // ✅ Validation
    if (!name || !username || !phone || !password) {
      return res.send("All fields are required");
    }

    // ✅ Check username exists
    const existing = await usthadShm.findOne({ username });
    if (existing) {
      return res.send("Username already exists");
    }

    // ✅ Save
    const newUsthad = new usthadShm({
      name,
      username,
      phone,
      password
    });

    await newUsthad.save();

    res.redirect('/hifz/usthads');

  } catch (err) {
    console.log(err);
    res.send("Error adding usthad");
  }
};

exports.updateUsthad = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, username, phone, password } = req.body;

    if (!name || !username || !phone) {
      return res.send("Required fields missing");
    }

    const usthad = await usthadShm.findById(id);

    if (!usthad) {
      return res.send("Usthad not found");
    }

    // Update fields
    usthad.name = name;
    usthad.username = username;
    usthad.phone = phone;

    // Only update password if provided
    if (password && password.trim() !== "") {
      usthad.password = password;
    }

    await usthad.save();

    res.redirect('/hifz/usthads');

  } catch (err) {
    console.log(err);
    res.send("Error updating usthad");
  }
};


exports.deleteUsthad = async (req, res) => {
  try {
    const id = req.params.id;

    const usthad = await usthadShm.findByIdAndDelete(id);

    if (!usthad) {
      return res.send("Usthad not found");
    }

    res.redirect('/hifz/usthads');

  } catch (err) {
    console.log(err);
    res.send("Error deleting usthad");
  }
};




