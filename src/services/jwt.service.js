const jwt = require('jsonwebtoken')

const config = require('../config/config')
const Refresh = require('../models/refresh.model')

// ================================================
//  == Methods
// ================================================

// create a jwt accessToken
exports.createAccess = (user) => {
  return jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.expiration * 1000 })
}

// create a refresh token and store it in mongo
exports.createRefresh = async (user) => {
  // create the token
  const refreshToken = jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.expiration_refresh * 1000 * 3600 * 24 })

  // store it in the database
  const refresh = new Refresh({
    user: user._id,
    value: refreshToken
  })
  await refresh.save()

  return refreshToken
}

// delete all user's refresh tokens
exports.deleteAllRefresh = async (userId) => {
  await Refresh.deleteMany({ user: userId })
}
