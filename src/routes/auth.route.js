const express = require('express')
const UserVerificationMiddleware = require('../middlewares/user.verification.middleware')
const JwtVerificationMiddleware = require('../middlewares/jwt.verification.middleware')
const AuthPermissionMiddleware = require('../middlewares/auth.permission.middleware')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const AuthController = require('../controllers/auth.controller')
const UserController = require('../controllers/user.controller')

const router = express.Router()

// Connexion d'un utilisateur
router.post('/', [
  UserVerificationMiddleware.hasAuthValidFields,
  UserVerificationMiddleware.isPasswordAndUserMatch,
  AuthPermissionMiddleware.isUserActive,
  AuthController.login
])

// Vérification connexion de l'utilisateur
router.post('/refresh', [
  JwtVerificationMiddleware.hasValidRefreshToken,
  AuthController.refreshToken
])

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
