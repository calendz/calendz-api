const UserService = require('./user.service')
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

exports.createForAll = async (title, target, message, icon, type) => {
  const notifications = []
  const users = await UserService.findAll()
  users.forEach(user => {
    notifications.push(new Notification({
      user: user._id,
      title,
      message,
      icon,
      type
    }))
  })
  await Notification.insertMany(notifications)
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

exports.findAllAndUpdate = async (search, update) => {
  await Notification.updateMany(search, update)
}

exports.getAllFrom = async (userId) => {
  const notifications = await Notification.find({ user: userId })
  return notifications || []
}
