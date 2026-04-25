const mongoose = require('mongoose');

const usthadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: /^[0-9]{10}$/
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Usthad = mongoose.model('Usthad', usthadSchema);
module.exports = Usthad;