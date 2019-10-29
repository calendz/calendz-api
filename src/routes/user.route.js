const express = require('express')

const UserController = require('../controllers/user.controller')
const UserVerificationMiddleware = require('../middlewares/user.verification.middleware')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const JwtVerificationMiddleware = require('../middlewares/jwt.verification.middleware')
const ValueVerificationMiddleware = require('../middlewares/value.verification.middleware')
const PermissionVerificationMiddleware = require('../middlewares/permission.verification.middleware')
const SysconfVerificationMiddleware = require('../middlewares/sysconf.verification.middleware')

const router = express.Router()

// Inscription d'un utilisateur
router.post('/', [
  SysconfVerificationMiddleware.isRegisterEnabled,
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

// Changement champ bts utilisateur
router.patch('/bts/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  ValueVerificationMiddleware.isBoolean,
  UserController.changeBts
])

// Changement du mot de passe utilisateur
router.patch('/password', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  UserVerificationMiddleware.hasValidPasswordAndPasswordConfirmation,
  UserController.changePasswordUser
])

// Changement avatar utilisateur
router.patch('/avatar', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  UserVerificationMiddleware.hasValidAvatarUrl,
  UserController.changeAvatar
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

// ===========================================
// == Paramètres =============================
// ===========================================

// Toggle l'adhésion aux mails d'informations
router.patch('/information-mails/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  ValueVerificationMiddleware.isBoolean,
  UserController.setInformationMails
])

// Changement de la couleur de l'emploi du temps de l'utilisateur
router.patch('/calendar-color/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  ValueVerificationMiddleware.isValidHexColor,
  UserController.setCalendarColor
])

module.exports = router
