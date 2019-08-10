const express = require('express')

const JwtVerificationMiddleware = require('../middlewares/jwt.verification.middleware')
const UserVerificationMiddleware = require('../middlewares/user.verification.middleware')
const PermissionVerificationMiddleware = require('../middlewares/permission.verification.middleware')
const NotificationsController = require('../controllers/notifications.controller')

const router = express.Router()

// Récupération des notifications d'un utilisateur
router.get('/:userId', [
  JwtVerificationMiddleware.hasValidAccessToken,
  PermissionVerificationMiddleware.sameUserOrAdmin,
  UserVerificationMiddleware.hasValidId,
  NotificationsController.getAll
])

module.exports = router
