const Notification = require('../models/notification.model')

// ================================================
// == Methods
// ================================================

exports.create = async (user, title, message, icon, timestamp, isRead) => {
  const notification = new Notification({
    user,
    title,
    message,
    icon,
    timestamp,
    isRead
  })

  await notification.save()
  return notification
}

// ================================================
// == Getters
// ================================================

exports.findOne = async (search) => {
  const notification = await Notification.findOne(search)
    .lean()
  return notification
}

exports.findOneAndUpdate = async (search, update) => {
  await Notification.findOneAndUpdate(search, update)
}

exports.getAllFrom = async (userId) => {
  const notifications = await Notification.find({ user: userId })
  return notifications || []
}
