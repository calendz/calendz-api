const SysconfService = require('../services/sysconf.service')

// get all system settings
exports.getSettings = async (req, res) => {
  const settings = await SysconfService.getSettings({ env: 'production' })

  return res.status(200).json({
    loginEnabled: settings.loginEnabled,
    registerEnabled: settings.registerEnabled
  })
}
