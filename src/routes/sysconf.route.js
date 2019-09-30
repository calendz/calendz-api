const express = require('express')

const JwtVerificationMiddleware = require('../middlewares/jwt.verification.middleware')
const PermissionVerificationMiddleware = require('../middlewares/permission.verification.middleware')
const ValueVerificationMiddleware = require('../middlewares/value.verification.middleware')
const SysconfController = require('../controllers/sysconf.controller')

const router = express.Router()

// Get all system settings
router.get('/settings', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  SysconfController.getSettings
])

// Toggle login state
router.patch('/settings/login-enabled/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  ValueVerificationMiddleware.isBoolean,
  SysconfController.toggleLogin
])

// Toggle register state
router.patch('/settings/register-enabled/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  ValueVerificationMiddleware.isBoolean,
  SysconfController.toggleRegister
])

module.exports = router
