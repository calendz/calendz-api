const NotificationsService = require('../services/notifications.service')

// return READ and NOTREAD notifications from user
exports.getAll = async (req, res) => {
  const _userId = req.params.userId
  const notifications = await NotificationsService.getAllFrom(_userId)
  return res.status(200).json({
    notifications
  })
}
