const express = require('express')
const UserVerificationMiddleware = require('../../middlewares/user.verification.middleware')
const TokenValidationMiddleware = require('../../middlewares/token.validation.middleware')
const AuthController = require('../../controllers/auth.controller')
const UserController = require('../../controllers/user.controller')
const SysconfVerificationMiddleware = require('../../middlewares/sysconf.verification.middleware')

const router = express.Router()

// =======================================================
// == Pure authentication routes
// =======================================================

// User login
router.post('/', [
  UserVerificationMiddleware.hasAuthValidFields,
  SysconfVerificationMiddleware.isLoginEnabled,
  UserVerificationMiddleware.isPasswordAndUserMatch,
  UserVerificationMiddleware.isActive,
  AuthController.login
])

router.post('/logout', [
  AuthController.logout
])

// =======================================================
// == Other things related to authentication
// =======================================================

// Validation adresse mail de l'utilisatuer
router.post('/verify/email', [
  TokenValidationMiddleware.hasValidToken('EMAIL_VERIFICATION'),
  AuthController.confirmEmail
])

// Renvoyer email de vérification
router.post('/verify/email/resend/:userId', [
  UserVerificationMiddleware.hasValidId,
  UserVerificationMiddleware.isNotActive,
  AuthController.resendValidation
])

// Envoie d'un mail pour réinitialiser le mot de passe
router.post('/password-reset/send-mail', [
  UserVerificationMiddleware.hasExistingEmail,
  UserController.sendResetPasswordEmail
])

module.exports = router
