const express = require('express')
const VerifyUserMiddleware = require('../middlewares/verify.user.middleware')
const VerifyAuthenticationMiddleware = require('../middlewares/auth.validation.middleware')
const AuthPermissionMiddleware = require('../middlewares/auth.permission.middleware')
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

module.exports = router
