const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    usthads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usthad'
        }
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);