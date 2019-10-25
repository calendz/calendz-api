const jwt = require('jsonwebtoken')
const cookie = require('../config/cookie')
const config = require('../config/config')
const Refresh = require('../models/refresh.model')
const JwtService = require('../services/jwt.service')
const UserService = require('../services/user.service')

// checks if there's a valid access token
exports.hasValidAccessOrRefreshToken = async (req, res, next) => {
  const _accessToken = req.cookies.accessToken
  const _refreshToken = req.cookies.refreshToken

  // if cookies doesn't exist
  if (!_accessToken && !_refreshToken) {
    return res.status(401).json({
      logout: true,
      message: 'Votre session a expirée, veuillez vous reconnecter'
    })
  }

  if (_accessToken) {
    jwt.verify(_accessToken, config.jwt.secret, async (err, decoded) => {
      if (err) {
        switch (err.name) {
          case 'TokenExpiredError':
            return res.status(401).json({
              message: 'Votre session a expirée, veuillez vous reconnecter'
            })
          default:
            return res.status(401).json({
              message: 'Votre jeton est invalide, veuillez vous reconnecter'
            })
        }
      }
      req.decodedUserId = decoded._id
    })
    return next()
  }

  if (_refreshToken) {
    jwt.verify(_refreshToken, config.jwt.secret, async (err, decoded) => {
      if (err) {
        switch (err.name) {
          case 'TokenExpiredError':
            return res.status(401).json({
              logout: true,
              message: 'Votre session a expirée, veuillez vous reconnecter'
            })
          default:
            return res.status(401).json({
              logout: true,
              message: 'Votre jeton est invalide, veuillez vous reconnecter'
            })
        }
      }

      // si le token n'est pas présent en base
      const refresh = await Refresh.findOne({ user: decoded._id })
      if (!refresh) {
        return res.status(401).json({
          logout: true,
          message: 'Votre session a expirée, veuillez vous reconnecter'
        })
      }

      const user = await UserService.findOne({ _id: decoded._id })
      /* istanbul ignore if */
      if (!user) {
        return res.status(400).json({
          logout: true,
          message: 'Une erreur est survenue, essayez de vous reconnecter'
        })
      }

      const accessToken = await JwtService.createAccess(user)
      res.cookie('accessToken', accessToken, cookie.accessTokenConfig)

      req.decodedUserId = decoded._id
      return next()
    })
  }
}
