const UserService = require('../services/user.service')

// return 403 if user that called the route isn't ADMIN or the requested user
exports.sameUserOrAdmin = async (req, res, next) => {
  const _userId = req.params.userId
  const _decodedUserId = req.decodedUserId

  // if not same user
  if (_userId !== _decodedUserId) {
    // if not admin
    const user = await UserService.findOne({ _id: _decodedUserId })
    if (user.permissionLevel !== 'ADMIN') {
      return res.status(403).json({
        message: `Vous n'avez pas la permission d'effectuer cela`
      })
    }
  }

  return next()
}

// check if the user is admin
exports.isAdmin = async (req, res, next) => {
  const _decodedUserId = req.decodedUserId
  const user = await UserService.findOne({ _id: _decodedUserId })
  if (user.permissionLevel !== 'ADMIN') {
    return res.status(403).json({
      message: `Vous n'avez pas la permission d'effectuer cela`
    })
  }

  return next()
}
