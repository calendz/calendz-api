const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const User = require('../models/user.model')
const Token = require('../models/token.model')

exports.login = async (req, res) => {
  const _userId = req.body.userId
  const _rememberMe = req.body.rememberMe

  // creating an access token from user's id and jwt's secret
  const refreshId = _userId + config.jwt.secret
  const salt = crypto.randomBytes(16).toString('base64')
  const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64')

  let token
  if (_rememberMe) token = jwt.sign(req.body, config.jwt.secret, { expiresIn: config.jwt.expiration * 3600 * 24 })
  else token = jwt.sign(req.body, config.jwt.secret, { expiresIn: 20 })

  const b = Buffer.from(hash)
  const refreshToken = b.toString('base64')

  const user = await User.findById(_userId)
    .select('firstname lastname email permissionLevel grade bts')
    .lean()

  return res.status(201).json({
    user,
    accessToken: token,
    refreshToken,
    message: 'Connexion réussie'
  })
}

exports.refreshToken = async (req, res) => {
  jwt.verify(req.body.accessToken, config.jwt.secret, async (err, decoded) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return res.status(412).json({
            message: 'Votre jeton a expiré, veuillez vous reconnecter'
          })
        default:
          return res.status(412).json({
            message: 'Votre jeton est invalide, veuillez vous reconnecter'
          })
      }
    } else {
      const user = await User.findById(decoded.userId)
        .select('firstname lastname email permissionLevel grade bts')
        .lean()

      return res.status(200).json({
        user,
        message: 'Connexion réussie'
      })
    }
  })
}

exports.confirmEmail = async (req, res) => {
  const _token = req.body.token

  const token = await Token.findOne({ value: _token })
  const user = await User.findById(token.user)

  user.isActive = true

  await user.save()
  await token.remove()

  return res.status(200).json({
    message: 'Votre adresse mail a bien été validée'
  })
}
