const express = require('express')

const JwtVerificationMiddleware = require('../middlewares/jwt.verification.middleware')
const UserVerificationMiddleware = require('../middlewares/user.verification.middleware')
const PermissionVerificationMiddleware = require('../middlewares/permission.verification.middleware')
const TasksController = require('../controllers/tasks.controller')

const router = express.Router()

// Récupération de toutes les tâches d'un utilisateur
router.get('/:userId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.sameUserOrAdmin,
  UserVerificationMiddleware.hasValidId,
  TasksController.getAll
])

module.exports = router
