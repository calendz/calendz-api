const Sysconf = require('../models/sysconf.model')
const Refresh = require('../models/refresh.model')
const User = require('../models/user.model')
const Task = require('../models/task.model')
const Grade = require('../models/grade.model')

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
        registerEnabled: true,
        updateEditGroupEnabled: false
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

exports.updateEditGroupEnabled = async (value) => {
  await Sysconf.findOneAndUpdate({ env: 'production' }, { 'settings.editGroupEnabled': value })
}

exports.deleteAllRefreshTokens = async () => {
  await Refresh.deleteMany({})
}

exports.migrateAllAccounts = async () => {
  await User.updateMany({}, { isMigrated: false })
}

exports.deleteAllTasks = async () => {
  await Task.deleteMany({})
}

exports.deleteAllGrades = async () => {
  await Grade.deleteMany({})
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

exports.getMailRecipients = async () => {
  const users = await User.find({
    isActive: true,
    hasInformationMails: true
  }).select('-_id grade isMigrated email').lean()

  const emails = []
  const result = users.filter(user => user.isMigrated || (user.grade !== 'WIS5' && user.grade !== 'I2'))
  result.forEach(user => { emails.push(user.email) })
  return emails
}
