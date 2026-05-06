const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  date: {
    type: String, // ✅ important (YYYY-MM-DD)
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late'],
    required: true,
    default: 'Absent'
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usthad'
  },
  note: {
    type: String,
    trim: true
  }
}, { timestamps: true });

/** 
 * 🔥 VERY IMPORTANT (PREVENT DUPLICATES)
 * One student can have only ONE attendance
 * per class per day
 */
attendanceSchema.index(
  { studentId: 1, classId: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model('Attendance', attendanceSchema);