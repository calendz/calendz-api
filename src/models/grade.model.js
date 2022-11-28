const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gradeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  value: { type: Number, required: false },
  coefficient: { type: Number, required: false, default: 1 },
  subject: { type: String, required: true, minlength: 1, maxlength: 50 },
  date: { type: String, required: true },
  description: { type: String, required: false, minlength: 1, maxlength: 250 }
})

module.exports = mongoose.model('Grade', gradeSchema)
