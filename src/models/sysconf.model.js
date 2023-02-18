const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sysconfSchema = new Schema({
  env: { type: String, required: true, unique: true, default: 'production' },
  settings: {
    loginEnabled: { type: Boolean, required: true, default: true },
    registerEnabled: { type: Boolean, required: true, default: true },
    editGroupEnabled: { type: Boolean, required: true, default: false }
  }
})

module.exports = mongoose.model('Sysconf', sysconfSchema)
