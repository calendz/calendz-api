const express = require('express')

const UserController = require('../controllers/user.controller')
const UserVerificationMiddleware = require('../middlewares/user.verification.middleware')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const JwtVerificationMiddleware = require('../middlewares/jwt.verification.middleware')
const ValueVerificationMiddleware = require('../middlewares/value.verification.middleware')

const router = express.Router()

// Inscription d'un utilisateur
router.post('/', [
  UserVerificationMiddleware.hasRegisterFields,
  UserVerificationMiddleware.hasValidRegisterFields,
  UserVerificationMiddleware.hasValidPasswordAndPasswordConfirmation,
  UserVerificationMiddleware.isEmailNotUsed,
  UserController.create
])

// Réinitialisation du mot de passe de l'utilisateur
router.post('/password-reset', [
  TokenValidationMiddleware.hasValidToken('PASSWORD_RESET'),
  UserVerificationMiddleware.hasValidPasswordAndPasswordConfirmation,
  UserController.changePassword
])

// Changement du mot de passe utilisateur
router.patch('/password', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  UserVerificationMiddleware.hasValidPasswordAndPasswordConfirmation,
  UserController.changePasswordUser
])

// ===========================================
// == Paramètres =============================
// ===========================================

// Toggle l'adhésion aux mails d'informations
router.patch('/information-mails/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  ValueVerificationMiddleware.hasBoolean,
  UserController.setInformationMails
])

module.exports = router
