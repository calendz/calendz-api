const config = require('./config')

const cookieConfig = {
  httpOnly: true,
  secure: config.node_env !== 'development',
  maxAge: config.jwt.expiration_refresh * 1000 * 3600 * 24,
  signed: true
}

module.exports = cookieConfig
