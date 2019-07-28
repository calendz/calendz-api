const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

// ================================================
//  == Methods
// ================================================

exports.create = async (firstname, lastname, email, password, grade) => {
  const user = new User({
    firstname,
    lastname,
    email,
    password,
    grade
  })

  await user.save()
  return user
}

// ================================================
//  == Getters
// ================================================

exports.getById = async (userId) => {
  const user = await User.findById(userId)
    .select('firstname lastname email permissionLevel grade bts')
    .lean()
  return user
}

exports.getByEmail = async (email) => {
  const user = await User.findOne({ email })
    .select('firstname lastname email permissionLevel grade bts')
    .lean()
  return user
}

// ================================================
//  == Setters
// ================================================

exports.setActive = async (userId, value) => {
  const user = await User.findById(userId)
  user.isActive = true
  await user.save()
}

exports.setPassword = async (userId, value) => {
  const user = await User.findById(userId)
  user.password = bcrypt.hashSync(value, 10)
  await user.save()
}
