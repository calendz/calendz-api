const express = require('express')
const UserVerificationMiddleware = require('../middlewares/user.verification.middleware')
const JwtVerificationMiddleware = require('../middlewares/jwt.verification.middleware')
const AuthPermissionMiddleware = require('../middlewares/auth.permission.middleware')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const AuthController = require('../controllers/auth.controller')
const UserController = require('../controllers/user.controller')

const router = express.Router()

// =======================================================
// == Pure authentication routes
// =======================================================

// User login
router.post('/', [
  UserVerificationMiddleware.hasAuthValidFields,
  UserVerificationMiddleware.isPasswordAndUserMatch,
  AuthPermissionMiddleware.isUserActive,
  AuthController.login
])

// Refresh user's accessToken
router.post('/refresh', [
  JwtVerificationMiddleware.hasValidRefreshToken,
  AuthController.refreshTokenAndUser
])

// Checks if user auth state is valid
router.post('/verify', [
  JwtVerificationMiddleware.hasValidAccessToken,
  AuthController.refreshUser
])

// =======================================================
// == Other things related to authentication
// =======================================================

// Validation adresse mail de l'utilisatuer
router.post('/verify/email', [
  TokenValidationMiddleware.hasValidToken('EMAIL_VERIFICATION'),
  AuthController.confirmEmail
])

// Envoie d'un mail pour réinitialiser le mot de passe
router.post('/password-reset/send-mail', [
  UserVerificationMiddleware.hasExistingEmail,
  UserController.sendResetPasswordEmail
])

module.exports = router
