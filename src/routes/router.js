const express = require('express')
const authRoutes = require('./auth.route')
const userRoutes = require('./user.route')
const notificationsRoutes = require('./notifications.route')
const sysconfRoutes = require('./sysconf.route')
const miscRoutes = require('./misc.route')
const tasksRoutes = require('./tasks.route')

const router = express.Router()

// Core routes
router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/notifications', notificationsRoutes)
router.use('/sysconf', sysconfRoutes)
router.use('/tasks', tasksRoutes)

// Other routes
router.use('/', miscRoutes)

module.exports = router
