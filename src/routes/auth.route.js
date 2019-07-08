const express = require('express')
const VerifyUserMiddleware = require('../middlewares/verify.user.middleware')
const VerifyAuthenticationMiddleware = require('../middlewares/auth.validation.middleware')
const AuthPermissionMiddleware = require('../middlewares/auth.permission.middleware')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const AuthController = require('../controllers/auth.controller')

const router = express.Router()

// Connexion d'un utilisateur
router.post('/', [
  VerifyUserMiddleware.hasAuthValidFields,
  VerifyUserMiddleware.isPasswordAndUserMatch,
  AuthPermissionMiddleware.isUserActive,
  AuthController.login
])

// Vérification connexion de l'utilisateur
router.post('/refresh', [
  VerifyAuthenticationMiddleware.hasAccessToken,
  AuthController.refreshToken
])

// Validation adresse mail de l'utilisatuer
router.post('/verify/email', [
  TokenValidationMiddleware.hasValidToken,
  AuthController.confirmEmail
])

module.exports = router
