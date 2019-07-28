const jwt = require('jsonwebtoken')
const config = require('../config/config')

const JwtService = require('../services/jwt.service')
const UserService = require('../services/user.service')
const TokenService = require('../services/token.service')

exports.login = async (req, res) => {
  const _userId = req.body.userId
  const _rememberMe = req.body.rememberMe

  const user = await UserService.getById(_userId)
  const accessToken = JwtService.create(req.body, _rememberMe)
  const refreshToken = JwtService.createRefresh(_userId)

  return res.status(201).json({
    user,
    accessToken,
    refreshToken,
    message: 'Connexion réussie'
  })
}

exports.refreshToken = async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]
  jwt.verify(token, config.jwt.secret, async (err, decoded) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return res.status(412).json({
            message: 'Votre session a expirée, veuillez vous reconnecter'
          })
        default:
          return res.status(412).json({
            message: 'Votre jeton est invalide, veuillez vous reconnecter'
          })
      }
    }

    const user = await UserService.getById(decoded.userId)
    return res.status(200).json({
      user,
      message: 'Connexion réussie'
    })
  })
}

exports.confirmEmail = async (req, res) => {
  const _token = req.body.token

  const token = await TokenService.deleteByValue(_token)
  await UserService.setActive(token.user, true)

  return res.status(200).json({
    message: 'Votre adresse mail a bien été validée'
  })
}
