const bcrypt = require('bcryptjs')
const uuidv4 = require('uuid/v4')
const config = require('../config/config')
const mailer = require('../config/mailgun')
const User = require('../models/user.model')
const Token = require('../models/token.model')

// creates a new user (register)
exports.create = async (req, res) => {
  const _firstname = req.body.firstname
  const _lastname = req.body.lastname
  const _email = req.body.email
  const _password = bcrypt.hashSync(req.body.password, 10)
  const _grade = req.body.grade

  // création utilisateur
  const userData = {
    firstname: _firstname,
    lastname: _lastname,
    email: _email,
    password: _password,
    grade: _grade
  }

  const user = new User(userData)
  await user.save()

  // création token confirmation email
  const tokenData = {
    user: user._id,
    value: uuidv4(),
    type: 'EMAIL_VERIFICATION'
  }

  const token = new Token(tokenData)
  await token.save()

  // envoie du mail de confirmation
  await mailer.sendVerificationEmail(user.email, `${config.front_url}emailVerification/${token.value}`)

  return res.status(201).json({
    message: 'Votre compte a bien été créé',
    id: user._id
  })
}
