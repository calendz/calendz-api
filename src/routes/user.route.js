const express = require('express')

const UserController = require('../controllers/user.controller')
const UserVerificationMiddleware = require('../middlewares/user.verification.middleware')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const JwtVerificationMiddleware = require('../middlewares/jwt.verification.middleware')
const PermissionVerificationMiddleware = require('../middlewares/permission.verification.middleware')

const router = express.Router()

// Inscription d'un utilisateur
router.post('/', [
  UserVerificationMiddleware.hasRegisterFields,
  UserVerificationMiddleware.hasValidRegisterFields,
  UserVerificationMiddleware.hasValidPasswordAndPasswordConfirmation,
  UserVerificationMiddleware.isEmailNotUsed,
  UserController.create
])

// Get all users
router.get('/all', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  UserController.getAll
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

// Actualisation des information d'un utilisateur
router.patch('/:userId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  UserVerificationMiddleware.hasValidId,
  UserVerificationMiddleware.hasValidModifyFields,
  UserController.updateUserInformations
])

// Suppression d'un compte utilisateur
router.delete('/:userId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  UserVerificationMiddleware.hasValidId,
  UserVerificationMiddleware.isNotSelf,
  UserController.deleteAccount
])

module.exports = router
