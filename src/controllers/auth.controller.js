const cookieConfig = require('../config/cookie')
const JwtService = require('../services/jwt.service')
const UserService = require('../services/user.service')
const TokenService = require('../services/token.service')

exports.login = async (req, res) => {
  const _userId = req.body.userId
  const _rememberMe = req.body.rememberMe

  const user = await UserService.getById(_userId)

  // delete all previous refresh tokens
  await JwtService.deleteAllRefresh(_userId)

  // access token
  const accessToken = JwtService.createAccess(req.body)
  res.cookie('accessToken', accessToken, cookieConfig)

  // if rememberMe, refreshToken
  if (_rememberMe) {
    const refreshToken = await JwtService.createRefresh(req.body)
    res.cookie('refreshToken', refreshToken, cookieConfig)
  }

  return res.status(201).json({
    user,
    message: 'Connexion réussie'
  })
}

exports.refreshToken = async (req, res) => {
  // creates a new access token
  const accessToken = JwtService.createAccess(req.body)
  res.cookie('accessToken', accessToken, cookieConfig)
  return res.status(201).json({})
}

exports.confirmEmail = async (req, res) => {
  const _token = req.body.token

  const token = await TokenService.deleteByValue(_token)
  await UserService.setActive(token.user, true)

  return res.status(200).json({
    message: 'Votre adresse mail a bien été validée'
  })
}
