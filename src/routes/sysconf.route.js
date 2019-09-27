const express = require('express')

const JwtVerificationMiddleware = require('../middlewares/jwt.verification.middleware')
const PermissionVerificationMiddleware = require('../middlewares/permission.verification.middleware')
const SysconfController = require('../controllers/sysconf.controller')

const router = express.Router()

// Get all system settings
router.get('/settings', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  SysconfController.getSettings
])

module.exports = router
