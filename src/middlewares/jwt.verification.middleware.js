const jwt = require('jsonwebtoken')
const config = require('../config/config')
const Refresh = require('../models/refresh.model')

// checks if there's a valid access token
exports.hasValidAccessToken = async (req, res, next) => {
  const _accessToken = req.cookies.accessToken

  // if cookie doesn't exist
  if (!_accessToken) {
    return res.status(401).json({
      message: 'Votre session a expirée, veuillez vous reconnecter'
    })
  }

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
    return next()
  })
}

// checks if there's a valid refresh token
exports.hasValidRefreshToken = async (req, res, next) => {
  const _refreshToken = req.cookies.refreshToken

  // si le cookie n'existe pas
  if (!_refreshToken) {
    return res.status(401).json({
      message: 'Votre session a expirée, veuillez vous reconnecter'
    })
  }

  // vérifie la validité du token
  jwt.verify(_refreshToken, config.jwt.secret, async (err, decoded) => {
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

    // si le token n'est pas présent en base
    const refresh = await Refresh.findOne({ user: decoded._id })
    if (!refresh) {
      return res.status(401).json({
        message: 'Votre session a expirée, veuillez vous reconnecter'
      })
    }

    req.decodedUserId = decoded._id
    return next()
  })
}

exports.hasValidAccessOrRefreshToken = async (req, res, next) => {
  const _accessToken = req.cookies.accessToken
  const _refreshToken = req.cookies.refreshToken

  // if cookies doesn't exist
  if (!_accessToken && !_refreshToken) {
    return res.status(401).json({
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
              message: 'Votre session a expirée, veuillez vous reconnecter'
            })
          default:
            return res.status(401).json({
              message: 'Votre jeton est invalide, veuillez vous reconnecter'
            })
        }
      }

      // si le token n'est pas présent en base
      const refresh = await Refresh.findOne({ user: decoded._id })
      if (!refresh) {
        return res.status(401).json({
          message: 'Votre session a expirée, veuillez vous reconnecter'
        })
      }

      req.decodedUserId = decoded._id
      return next()
    })
  }
}
