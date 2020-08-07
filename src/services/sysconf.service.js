const Sysconf = require('../models/sysconf.model')
const Refresh = require('../models/refresh.model')
const User = require('../models/user.model')

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

exports.deleteAllRefreshTokens = async () => {
  await Refresh.deleteMany({})
}

exports.migrateAllAccounts = async () => {
  await User.updateMany({}, { isMigrated: false })
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
