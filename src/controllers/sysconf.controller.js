const SysconfService = require('../services/sysconf.service')

// get all system settings
exports.getSettings = async (req, res) => {
  const settings = await SysconfService.getSettings()

  return res.status(200).json({
    loginEnabled: settings.loginEnabled,
    registerEnabled: settings.registerEnabled
  })
}

// toggle login state
exports.toggleLogin = async (req, res) => {
  const _value = req.params.value
  await SysconfService.updateLoginEnabled(_value)
  return res.status(200).json({})
}

// toggle register state
exports.toggleRegister = async (req, res) => {
  const _value = req.params.value
  await SysconfService.updateRegisterEnabled(_value)
  return res.status(200).json({})
}
