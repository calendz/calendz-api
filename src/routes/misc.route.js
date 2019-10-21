const express = require('express')
const MiscController = require('../controllers/misc.controller')
const MiscVerificationMiddleware = require('../middlewares/misc.verification.middleware')

const version = require('../../package.json').version

const router = express.Router()

// Check if the app is alive
router.get('/health-check', (req, res) => { res.send('OK') })

// Get API's version
router.get('/version', (req, res) => { res.json({ version }) })

// Envoie mail de contact
router.post('/contact', [
  MiscVerificationMiddleware.hasValidContactMailFields,
  MiscController.sendContactMail
])

module.exports = router
