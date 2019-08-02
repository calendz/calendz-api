const config = require('./config')

exports.accessTokenConfig = {
  httpOnly: true,
  secure: false,
  signed: true,
  maxAge: config.jwt.expiration * 1000
}

exports.refreshTokenConfig = {
  httpOnly: true,
  secure: false,
  signed: true,
  maxAge: config.jwt.expiration_refresh * 1000 * 3600 * 24
}
