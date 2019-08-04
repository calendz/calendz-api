const jwt = require('jsonwebtoken')
const config = require('../config/config')
const cookie = require('../config/cookie')

const JwtService = require('../services/jwt.service')
const UserService = require('../services/user.service')
const TokenService = require('../services/token.service')

exports.login = async (req, res) => {
  const _userId = req.body.userId
  const _rememberMe = req.body.rememberMe

  const user = await UserService.findOne({ _id: _userId })

  // delete all previous refresh tokens
  await JwtService.deleteAllRefresh(_userId)

  // access token
  const accessToken = JwtService.createAccess(req.body)
  res.cookie('accessToken', accessToken, cookie.accessTokenConfig)

  // if rememberMe, refreshToken
  if (_rememberMe) {
    const refreshToken = await JwtService.createRefresh(req.body)
    res.cookie('refreshToken', refreshToken, cookie.refreshTokenConfig)
  }

  return res.status(201).json({
    user,
    message: 'Connexion réussie'
  })
}

exports.refreshToken = async (req, res) => {
  // creates a new access token
  const accessToken = JwtService.createAccess(req.body)
  res.cookie('accessToken', accessToken, cookie.accessTokenConfig)
  return res.status(201).json({})
}

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

    return res.status(200).json()
  })
}

// confirms user's email address
exports.confirmEmail = async (req, res) => {
  const _token = req.body.token

  const token = await TokenService.deleteByValue(_token)
  await UserService.setActive(token.user, true)

  return res.status(200).json({
    message: 'Votre adresse mail a bien été validée'
  })
}
