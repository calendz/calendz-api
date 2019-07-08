const Token = require('../models/token.model')

exports.hasValidToken = async (req, res, next) => {
  const _token = req.body.token

  if (!_token) {
    return res.status(412).json({
      message: 'Aucun token transmit'
    })
  }

  const token = await Token.findOne({ value: _token })

  if (!token) {
    return res.status(404).json({
      message: 'Ce token est invalide'
    })
  }

  return next()
}
