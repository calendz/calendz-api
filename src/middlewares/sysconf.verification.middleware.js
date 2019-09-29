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
  const settings = await SysconfService.getSettings()

  if (!settings.loginEnabled) {
    return res.status(403).json({
      message: `La connexion au site est actuellement désactivée pour cause de maintenance. Ré-essayez plus tard !`
    })
  }

  return next()
}
