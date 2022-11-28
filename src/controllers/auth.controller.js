const cookie = require('../config/cookie')
const config = require('../config/config')
const mailer = require('../config/mailgun')
const JwtService = require('../services/jwt.service')
const UserService = require('../services/user.service')
const TokenService = require('../services/token.service')

exports.login = async (req, res) => {
  const _user = req.user
  const _rememberMe = req.body.rememberMe

  // delete all previous refresh tokens
  await JwtService.deleteAllRefresh(_user._id)

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

exports.logout = async (req, res) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  return res.status(200).json({})
}

// confirms user's email address
exports.confirmEmail = async (req, res) => {
  const _tokenValue = req.body.token

  const token = await TokenService.deleteOne(_tokenValue)
  await UserService.setActive(token.user, true)

  return res.status(200).json({
    message: 'Votre adresse mail a bien été validée'
  })
}

exports.resendValidation = async (req, res) => {
  const user = req.user
  const token = req.token

  await mailer.sendVerificationEmail(user.email, user.firstname, user.lastname, `${config.front_url}/email-confirmation/${token.value}`)

  res.status(200).json({})
}
