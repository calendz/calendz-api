const Sysconf = require('../models/sysconf.model')

// ================================================
//  == Methods
// ================================================

exports.initSettings = async () => {
  const settings = await this.getSettings({ env: 'production' })

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

// ================================================
//  == Getters
// ================================================

exports.getSettings = async (search) => {
  const system = await Sysconf.findOne(search)
    .select('settings')
    .lean()
  return system.settings
}
