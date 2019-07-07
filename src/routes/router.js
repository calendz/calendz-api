const express = require('express')
const authRoutes = require('./auth.route')
const userRoutes = require('./user.route')

const router = express.Router()

// Route utilisée pour vérifier si l'API est up
router.get('/health-check', (req, res) => { res.send('OK') })

router.use('/auth', authRoutes)
router.use('/user', userRoutes)

module.exports = router
