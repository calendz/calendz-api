const express = require('express')
const authRoutes = require('./auth.route')
const userRoutes = require('./user.route')
const notificationsRoutes = require('./notifications.route')
const version = require('../../package.json').version

const router = express.Router()

// Route utilisée pour vérifier si l'API est up
router.get('/health-check', (req, res) => { res.send('OK') })
// Route utilisée pour récupérer la version de l'api
router.get('/version', (req, res) => { res.json({ version }) })

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/notifications', notificationsRoutes)

module.exports = router
