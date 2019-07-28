const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const Token = require('../models/token.model')

// ================================================
//  == Methods
// ================================================

exports.create = async (body, rememberMe) => {
  if (rememberMe) {
    return jwt.sign(body, config.jwt.secret, { expiresIn: config.jwt.expiration * 3600 * 24 })
  }

  return jwt.sign(body, config.jwt.secret, { expiresIn: 15 })
}

exports.createRefresh = async (userId) => {
  const refreshId = userId + config.jwt.secret
  const salt = crypto.randomBytes(16).toString('base64')
  const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64')
  const b = Buffer.from(hash)
  return b.toString('base64')
}

exports.deleteByValue = async (value) => {
  const token = await Token.findOneAndDelete({ value })
  return token
}
