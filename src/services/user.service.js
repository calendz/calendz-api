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
    password: bcrypt.hashSync(password, 10),
    grade
  })

  await user.save()
  return user
}

// ================================================
//  == Getters
// ================================================

exports.findOne = async (search) => {
  const user = await User.findOne(search)
    .select('firstname lastname email permissionLevel grade bts isActive')
    .lean()
  return user
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
