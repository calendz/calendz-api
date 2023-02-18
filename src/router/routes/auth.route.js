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
  UserVerificationMiddleware.isMigrated,
  AuthController.login
])

router.post('/logout', [
  AuthController.logout
])


module.exports = router
