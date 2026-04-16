const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Hifz', 'Junior Shareeath', 'Dars']
    },
    class: {
        type: String,
        required: true,
        enum: ['5','6','7','8','9','10','Plus One','Plus Two','Degree']
    },
    course: {
        type: String,
        enum: ['Humanities', 'Commerce', 'Science'],
        default: null
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: /^[0-9]{10}$/
    },
    guardianPhone: {
        type: String,
        required: true,
        trim: true,
        match: /^[0-9]{10}$/
    }, 
    place: {
        type: String,
        required: true,
        trim: true
    },
    parentName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    admissionDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Std = mongoose.model('Student', studentSchema);
module.exports = Std;