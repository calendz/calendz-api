const UserService = require('../services/user.service')

// checks if user account is active
exports.isUserActive = async (req, res, next) => {
  const _email = req.body.email

  const user = await UserService.findOne({ email: _email })

  if (!user.isActive) {
    return res.status(403).json({
      message: 'Veuillez confirmer votre email afin de pouvoir vous connecter'
    })
  }

  return next()
}
