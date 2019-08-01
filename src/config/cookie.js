const config = require('./config')

// const cookieConfig = {
//   httpOnly: true,
//   secure: config.node_env !== 'development',
//   maxAge: config.jwt.expiration_refresh * 1000 * 3600 * 24,
//   signed: true
// }

const cookieConfig = {
  httpOnly: true,
  secure: false,
  signed: false,
  maxAge: config.jwt.expiration_refresh * 1000 * 3600 * 24
}

module.exports = cookieConfig
