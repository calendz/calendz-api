const NotificationsService = require('../services/notifications.service')

// return READ and NOTREAD notifications from user
exports.getAll = async (req, res) => {
  const _userId = req.params.userId
  const notifications = await NotificationsService.getAllFrom(_userId)
  return res.status(200).json({
    notifications
  })
}

// mark a notification as "read"
exports.read = async (req, res) => {
  const _notificationId = req.params.notificationId
  await NotificationsService.findOneAndUpdate({ _id: _notificationId }, { isRead: true })
  return res.status(200).json({})
}

// mark a notification as "read"
exports.readAll = async (req, res) => {
  const _userId = req.params.userId
  await NotificationsService.findAllAndUpdate({ user: _userId }, { isRead: true })
  return res.status(200).json({})
}

// mark a notification as "not read"
exports.unread = async (req, res) => {
  const _notificationId = req.params.notificationId
  await NotificationsService.findOneAndUpdate({ _id: _notificationId }, { isRead: false })
  return res.status(200).json({})
}

// create a notification
exports.create = async (req, res) => {
  const title = req.body.title
  const target = req.body.target
  const message = req.body.message
  const icon = req.body.icon
  const type = req.body.type
  await NotificationsService.createForAll(title, target, message, icon, type)
  return res.status(201).json({})
}
