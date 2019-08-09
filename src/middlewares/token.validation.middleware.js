const TokenService = require('../services/token.service')

exports.hasValidToken = (type) => {
  return async (req, res, next) => {
    const _token = req.body.token

    if (!_token) {
      return res.status(412).json({
        message: 'Aucun token transmit'
      })
    }

    const token = await TokenService.findOne({ value: _token })

    if (!token) {
      return res.status(404).json({
        message: 'Le lien actuel est invalide'
      })
    }

    if (token.type !== type) {
      return res.status(412).json({
        message: 'Le type du token est invalide'
      })
    }

    return next()
  }
}
