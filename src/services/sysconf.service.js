const Sysconf = require('../models/sysconf.model')

// ================================================
//  == Methods
// ================================================

exports.initSettings = async () => {
  const settings = await this.getSettings()

  if (!settings) {
    Sysconf.create({
      env: 'production',
      settings: {
        loginEnabled: true,
        registerEnabled: true
      }
    })
  }
}

exports.updateLoginEnabled = async (value) => {
  await Sysconf.findOneAndUpdate({ env: 'production' }, { 'settings.loginEnabled': value })
}

exports.updateRegisterEnabled = async (value) => {
  await Sysconf.findOneAndUpdate({ env: 'production' }, { 'settings.registerEnabled': value })
}

// ================================================
//  == Getters
// ================================================

exports.getSettings = async () => {
  const system = await Sysconf.findOne({ env: 'production' })
    .select('settings')
    .lean()
  return system ? system.settings : null
}
