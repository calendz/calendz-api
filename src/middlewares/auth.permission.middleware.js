const User = require('../models/user.model')

exports.isUserActive = async (req, res, next) => {
  // vérifier si il est actif
  const _email = req.body.email

  const user = await User.findOne({ email: _email })
    .select('isActive')
    .lean()

  if (!user.isActive) {
    return res.status(403).json({
      message: 'Veuillez confirmer votre email afin de pouvoir vous connecter'
    })
  }

  return next()
}
