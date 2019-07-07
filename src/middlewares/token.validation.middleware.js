const Token = require('../models/token.model')

exports.hasValidToken = async (req, res, next) => {
  const _token = req.body.token

  const token = await Token.findOne({ value: _token })

  if (!token) {
    return res.status(404).json({
      message: 'Ce token est invalide'
    })
  }

  return next()
}
