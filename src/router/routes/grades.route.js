const express = require('express')

const JwtVerificationMiddleware = require('../../middlewares/jwt.verification.middleware')
const GradesVerificationMiddleware = require('../../middlewares/grades.verification.middleware')
const GradesController = require('../../controllers/grades.controller')

const router = express.Router()

// Création d'une note
router.post('/', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  GradesVerificationMiddleware.hasCreateFields,
  GradesController.create
])

// Mise à jour d'une note
router.patch('/:gradeId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  GradesVerificationMiddleware.hasValidId,
  GradesVerificationMiddleware.hasUpdateFields,
  GradesController.modify
])

module.exports = router
