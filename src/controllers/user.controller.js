const bcrypt = require('bcryptjs')
// const User = require('../models/user.model')
const mongoose = require('mongoose')
const User = mongoose.model('User')

// creates a new user (register)
exports.create = async (req, res) => {
  const _firstname = req.body.firstname
  const _lastname = req.body.lastname
  const _email = req.body.email
  const _password = bcrypt.hashSync(req.body.password, 10)
  const _grade = req.body.grade

  const userData = {
    firstname: _firstname,
    lastname: _lastname,
    email: _email,
    password: _password,
    grade: _grade
  }

  const user = new User(userData)
  await user.save()

  return res.status(201).json({
    message: 'Votre compte a bien été créé',
    id: user._id
  })
}
