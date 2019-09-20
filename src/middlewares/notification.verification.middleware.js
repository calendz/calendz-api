const mongoose = require('mongoose')
const NotificationsService = require('../services/notifications.service')

exports.hasValidId = async (req, res, next) => {
  const _notificationId = req.params.notificationId

  if (!mongoose.Types.ObjectId.isValid(_notificationId)) {
    return res.status(422).json({
      message: 'ID is not a valid ObjectID'
    })
  }

  const notification = await NotificationsService.findOne({ _id: _notificationId })
  if (!notification) {
    return res.status(404).json({
      message: `Cette notification n'existe pas`
    })
  }

  return next()
}

exports.hasCreateFields = async (req, res, next) => {
  const _title = req.body.title
  const _target = req.body.target
  const _message = req.body.message
  const _icon = req.body.icon
  const _type = req.body.type

  const errors = []
  if (!_title) errors.push('Veuillez indiquer un titre')
  if (!_target) errors.push('Veuillez indiquer une cible')
  if (!_message) errors.push('Veuillez indiquer un message')
  if (!_icon) errors.push('Veuillez indiquer un icône')
  if (!_type) errors.push('Veuillez indiquer un type')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
      errors: errors
    })
  }

  return next()
}
