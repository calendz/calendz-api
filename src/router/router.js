const express = require('express')
const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')
const notificationsRoutes = require('./routes/notifications.route')
const sysconfRoutes = require('./routes/sysconf.route')
const miscRoutes = require('./routes/misc.route')
const tasksRoutes = require('./routes/tasks.route')

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
