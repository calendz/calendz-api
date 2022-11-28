const UserService = require('../services/user.service')
const SysconfService = require('../services/sysconf.service')

exports.isRegisterEnabled = async (req, res, next) => {
  const settings = await SysconfService.getSettings()

  if (!settings.registerEnabled) {
    return res.status(403).json({
      message: `L'inscription au site est actuellement désactivée... Ré-essayez plus tard !`
    })
  }

  return next()
}

exports.isLoginEnabled = async (req, res, next) => {
  const _email = req.body.email
  const settings = await SysconfService.getSettings()

  if (!settings.loginEnabled) {
    // if user is admin: he can bypass
    const user = req.user || await UserService.findOne({ email: _email }, true)
    if (user.permissionLevel === 'ADMIN') return next()

    // otherwise, login is cancelled
    return res.status(403).json({
      message: `La connexion au site est actuellement désactivée pour cause de maintenance. Ré-essayez plus tard !`
    })
  }

  return next()
}

exports.isEditGroupEnabled = async (req, res, next) => {
  const settings = await SysconfService.getSettings()

  if (!settings.editGroupEnabled) {
    return res.status(403).json({
      message: `Vous ne pouvez pas modifier votre groupe ! Contactez un administrateur.`
    })
  }

  return next()
}
