const NotificationsService = require('../services/notifications.service')

exports.hasValidId = async (req, res, next) => {
  const _notificationId = req.params.notificationId
  const notification = await NotificationsService.findOne({ _id: _notificationId })
  if (!notification) {
    return res.status(404).json({
      message: `Cette notification n'existe pas`
    })
  }
  return next()
}
