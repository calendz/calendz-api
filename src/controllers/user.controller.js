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
  await mailer.sendVerificationEmail(user.email, user.firstname, user.lastname, `${config.front_url}emailVerification/${token.value}`)

  return res.status(201).json({
    message: 'Votre compte a bien été créé',
    id: user._id
  })
}

// modification du mot de passe
exports.changePassword = async (req, res) => {
  const _tokenValue = req.body.token
  const _password = req.body.password

  // supprime le token et retourne l'objet
  const token = await Token.findOneAndDelete({ value: _tokenValue })

  // met à jour le mot de passe
  const user = await User.findById(token.user)
  user.password = bcrypt.hashSync(_password, 10)
  await user.save()

  return res.status(200).json({
    message: 'Votre mot de passe a bien été modifié'
  })
}

// envoie un mail pour réinitialiser le mot de passe
exports.sendResetPasswordEmail = async (req, res) => {
  const _email = req.body.email

  const user = await User.findOne({ email: _email })

  const tokenData = {
    user: user._id,
    value: uuidv4(),
    type: 'PASSWORD_RESET'
  }

  // création token permettant d'accéder à la page de réinitialisation du mot de passe
  const token = new Token(tokenData)
  await token.save()

  // envoie du mail
  await mailer.sendPasswordResetEmail(user.email, user.firstname, user.lastname, `${config.front_url}password-reset/${token.value}`)

  return res.status(200).json({
    message: 'L\'email a bien été envoyé'
  })
}
