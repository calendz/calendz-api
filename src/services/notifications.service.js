const Notification = require('../models/notification.model')

// ================================================
//  == Getters
// ================================================

exports.findOne = async (search) => {
  const notification = await Notification.findOne(search)
    .lean()
  return notification
}

exports.getAllFrom = async (userId) => {
  const notifications = await Notification.find({ user: userId })
  return notifications || []
}
