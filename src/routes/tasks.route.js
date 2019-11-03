const express = require('express')

const JwtVerificationMiddleware = require('../middlewares/jwt.verification.middleware')
const UserVerificationMiddleware = require('../middlewares/user.verification.middleware')
const PermissionVerificationMiddleware = require('../middlewares/permission.verification.middleware')
const TaskVerificationMiddleware = require('../middlewares/task.verification.middleware')
const TasksController = require('../controllers/tasks.controller')

const router = express.Router()

// Récupération de toutes les tâches d'un utilisateur
router.get('/:userId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.sameUserOrAdmin,
  UserVerificationMiddleware.hasValidId,
  TasksController.getAll
])

// Création d'une tâche
router.post('/', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  TaskVerificationMiddleware.hasCreateFields,
  TasksController.create
])

// Marquer la tâche comme faite
router.patch('/:userId/done/:taskId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.sameUserOrAdmin,
  UserVerificationMiddleware.hasValidId,
  TaskVerificationMiddleware.hasValidId,
  TasksController.setDone
])

// Marquer la tâche comme non-faite
router.patch('/:userId/notdone/:taskId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.sameUserOrAdmin,
  UserVerificationMiddleware.hasValidId,
  TaskVerificationMiddleware.hasValidId,
  TasksController.setNotDone
])

module.exports = router
