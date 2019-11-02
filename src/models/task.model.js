const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  // required
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  type: { type: String, enum: ['DS', 'homework', 'task'], required: true },
  title: { type: String, minLength: 2, maxlength: 50, required: true },
  // not required
  description: { type: String, minlength: 2, maxlength: 1000, required: false },
  subject: { type: String, minLength: 2, maxlength: 50, required: false },
  city: { type: String, enum: [null, 'Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Paris', 'Dakar'], required: false },
  grade: { type: String, enum: [null, 'B1', 'B2', 'B3', 'I1', 'I2'], required: false },
  group: { type: String, enum: [null, 'G1', 'G2', 'G3', 'G1 (dev)', 'G2 (dev)', 'G3 (dev)', 'G1 (infra-réseau)', 'G2 (infra-réseau)', 'G3 (infra-réseau)'], required: false },
  targets: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }]
})

module.exports = mongoose.model('Task', taskSchema)
