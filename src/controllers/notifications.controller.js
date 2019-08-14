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
