const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  value: { type: String, required: true, unique: true },
  type: { type: String, enum: ['EMAIL_VERIFICATION', 'PASSWORD_VERIFICATION'], required: true }
})

module.exports = mongoose.model('Token', tokenSchema)
