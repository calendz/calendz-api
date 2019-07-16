const jwt = require('jsonwebtoken')
const config = require('../config/config')
const logger = require('../config/winston')

// ============================================
// == validate the token
// ============================================

exports.validJWTNeeded = (req, res, next) => {
  // DEVELOPMENT ONLY : raw token
  if (config.node_env === 'development' && config.jwt.raw_token && req.query.raw_token) {
    if (req.query.raw_token === config.jwt.raw_token) {
      logger.warn('authenticated using raw_token')
      req.jwt = { permissionLevel: 'ADMIN' }
      return next()
    } else {
      return res.status(400).json({
        message: 'Invalid token'
      })
    }
  }

  // classic authentication
  try {
    if (!req.headers['authorization']) {
      return res.status(401).json({
        message: 'Authentication required'
      })
    }

    const authorization = req.headers['authorization'].split(' ')
    if (authorization[0] !== 'Bearer') {
      return res.status(401).json({
        message: 'Authentication required'
      })
    }

    req.jwt = jwt.verify(authorization[1], config.jwt.secret)
    return next()
  } catch (err) {
    return res.status(400).json({
      message: 'Invalid token'
    })
  }
}

// ============================================
// == refresh
// ============================================

exports.hasAccessToken = (req, res, next) => {
  if (!req.headers['authorization'] || req.headers['authorization'].split(' ')[0] !== 'Bearer') {
    return res.status(412).json({
      message: 'Aucun accessToken transmit'
    })
  }
  return next()
}
