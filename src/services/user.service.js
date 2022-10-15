const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const Notification = require('../models/notification.model')
const Refresh = require('../models/refresh.model')
const Token = require('../models/token.model')
const { forEach } = require('mongoose/lib/statemachine')

// ================================================
//  == Methods
// ================================================

exports.create = async (firstname, lastname, email, password, grade, group, city) => {
  // guess user's school from its email
  let school
  if (email.includes('@epsi.fr')) school = 'EPSI'
  else if (email.includes('@wis.fr') || email.includes('@ecoles-wis.net')) school = 'WIS'

  const user = new User({
    firstname,
    lastname,
    email,
    password: bcrypt.hashSync(password, 10),
    school,
    grade,
    group,
    city
  })

  await user.save()
  return user
}

exports.migrate = async (userId, _grade, _group, _city, _bts) => {
  const user = await User.findById(userId)
  user.grade = _grade
  user.group = _group
  user.bts = _bts
  user.city = _city
  user.isMigrated = true
  await user.save()
}

exports.updateUserInformations = async (userId, _firstname, _lastname, _email, _permissionLevel, _grade, _group, _city, _bts, _hasInformationMails, _isActive) => {
  const user = await User.findById(userId)
  user.firstname = _firstname
  user.lastname = _lastname
  user.email = _email
  user.permissionLevel = _permissionLevel
  user.grade = _grade
  user.group = _group
  user.bts = _bts
  user.city = _city
  user.hasInformationMails = _hasInformationMails
  user.isActive = _isActive
  await user.save()
}

exports.updateLastActiveDate = async (userId) => {
  const user = await User.findById(userId)
  user.lastActiveDate = Date.now()
  await user.save()
}

exports.updateProfile = async (userId, { bts = null, group = null }) => {
  const user = await User.findOne({ _id: userId })
  if (bts !== null) user.bts = bts
  if (group !== null) user.group = group
  await user.save()
}

exports.deleteAccount = async (userId) => {
  await User.findByIdAndDelete(userId)
  await Notification.deleteMany({
    user: userId
  })
  await Token.deleteMany({
    user: userId
  })
  await Refresh.deleteMany({
    user: userId
  })
}

// ================================================
//  == Getters
// ================================================

exports.findOne = async (search, includePassword) => {
  if (includePassword) {
    const user = await User.findOne(search).lean()
    return user
  } else {
    const user = await User.findOne(search)
      .select('-password')
      .lean()
    return user
  }
}

exports.findAll = async (search = {}) => {
  const users = await User.find(search).select('-password').lean()
  return users
}

// ================================================
//  == Setters
// ================================================

exports.setActive = async (userId, value) => {
  const user = await User.findById(userId)
  user.isActive = value
  await user.save()
}

exports.setPassword = async (userId, value) => {
  const user = await User.findById(userId)
  user.password = bcrypt.hashSync(value, 10)
  await user.save()
}

exports.setInformationMails = async (userId, value) => {
  const user = await User.findById(userId)
  user.hasInformationMails = value
  await user.save()
}

exports.setMailTaskCreate = async (userId, value) => {
  const user = await User.findById(userId)
  user.settings.mail.taskCreate = value
  await user.save()
}

exports.setCalendarColor = async (userId, value) => {
  const user = await User.findById(userId)
  user.settings.calendarColor = value
  await user.save()
}

exports.setAvatar = async (userId, value) => {
  const user = await User.findById(userId)
  user.avatarUrl = value
  await user.save()
}

exports.deleteRefreshToken = async (userId) => {
  await Refresh.deleteOne({ user: userId })
}

exports.setTaskDone = async (userId, taskId) => {
  const user = await User.findById(userId)
  user.tasks.done.push(taskId)
  await user.save()
}

exports.setTaskNotDone = async (userId, taskId) => {
  const user = await User.findById(userId)
  const index = user.tasks.done.indexOf(taskId)
  user.tasks.done.splice(index, 1)
  await user.save()
}
