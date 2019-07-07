const express = require('express')
const UserController = require('../controllers/user.controller')
const UserVerificationMiddleware = require('../middlewares/verify.user.middleware')

const router = express.Router()

// Inscription d'un utilisateur
router.post('/', [
  UserVerificationMiddleware.hasRegisterFields,
  UserVerificationMiddleware.hasValidRegisterFields,
  UserVerificationMiddleware.isEmailNotUsed,
  UserController.create
])

module.exports = router
