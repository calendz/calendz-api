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

exports.updateSettings = async (update) => {
  await Sysconf.findOneAndUpdate({ env: 'production' }, update)
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
