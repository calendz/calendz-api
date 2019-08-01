// const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const config = require('../config/config')
const Refresh = require('../models/refresh.model')

// ================================================
//  == Methods
// ================================================

// create a jwt accessToken
exports.createAccess = (body) => {
  return jwt.sign(body, config.jwt.secret, { expiresIn: config.jwt.expiration * 60 })
}

// create a refresh token and store it in mongo
exports.createRefresh = async (body) => {
  // create the token
  const refreshToken = jwt.sign(body, config.jwt.secret, { expiresIn: config.jwt.expiration_refresh * 1000 * 3600 * 24 })

  // store it in the database
  const refresh = new Refresh({
    user: body.userId,
    value: refreshToken
  })
  await refresh.save()

  return refreshToken
}

// delete all user's refresh tokens
exports.deleteAllRefresh = async (userId) => {
  await Refresh.deleteMany({ user: userId })
}
