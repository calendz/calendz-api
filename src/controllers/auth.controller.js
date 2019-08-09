const cookie = require('../config/cookie')
const JwtService = require('../services/jwt.service')
const UserService = require('../services/user.service')
const TokenService = require('../services/token.service')

exports.login = async (req, res) => {
  const _user = req.user
  const _rememberMe = req.body.rememberMe

  // delete all previous refresh tokens
  await JwtService.deleteAllRefresh(_user.id)

  // access token
  const accessToken = JwtService.createAccess(_user)
  res.cookie('accessToken', accessToken, cookie.accessTokenConfig)

  // if rememberMe, refreshToken
  if (_rememberMe) {
    const refreshToken = await JwtService.createRefresh(_user)
    res.cookie('refreshToken', refreshToken, cookie.refreshTokenConfig)
  }

  return res.status(201).json({
    user: _user,
    message: 'Connexion réussie'
  })
}

exports.refreshUser = async (req, res) => {
  const user = await UserService.findOne({ _id: req.userId })
  return res.status(200).json({ user })
}

exports.refreshTokenAndUser = async (req, res) => {
  const user = await UserService.findOne({ _id: req.userId })

  // creates a new access token
  const accessToken = JwtService.createAccess(user)
  res.cookie('accessToken', accessToken, cookie.accessTokenConfig)

  return res.status(201).json({ user })
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
