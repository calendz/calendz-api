const mongoose = require('mongoose')
const Schema = mongoose.Schema

const refreshSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  value: { type: String, required: true, unique: true }
})

module.exports = mongoose.model('Refresh', refreshSchema)
