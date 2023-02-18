const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  icon: { type: String, required: true, default: 'fas fa-bell' },
  type: { type: String, required: true, default: 'grey' },
  timestamp: { type: String, required: true, default: () => Date.now() },
  isRead: { type: Boolean, required: true, default: false }
})

module.exports = mongoose.model('Notification', notificationSchema)
