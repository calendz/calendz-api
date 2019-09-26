const uuidv4 = require('uuid/v4')
const config = require('../config/config')
const mailer = require('../config/mailgun')

const UserService = require('../services/user.service')
const TokenService = require('../services/token.service')
const NotificationModel = require('../models/notification.model')

// get all users
exports.getAll = async (req, res) => {
  const users = await UserService.findAll()
  return res.status(200).json({
    users
  })
}

// creates a new user (register)
exports.create = async (req, res) => {
  const _firstname = req.body.firstname
  const _lastname = req.body.lastname
  const _email = req.body.email
  const _password = req.body.password
  const _grade = req.body.grade
  const _city = req.body.city

  // création utilisateur et création token confirmation mail
  const user = await UserService.create(_firstname, _lastname, _email, _password, _grade, _city)
  const token = await TokenService.create(user._id, uuidv4(), 'EMAIL_VERIFICATION')

  // envoie mail de confirmation
  await mailer.sendVerificationEmail(user.email, user.firstname, user.lastname, `${config.front_url}/email-confirmation/${token.value}`)

  const notificationRegister = new NotificationModel({
    user: user._id,
    title: 'Bienvenue sur Calendz !',
    message: 'L\'équipe de Calendz vous souhaite la bienvenue sur notre plateforme. N\'hésitez pas à nous contacter en cas de besoin.',
    icon: 'fas fa-trophy',
    type: 'gradient-purple'
  })
  await notificationRegister.save()

  return res.status(201).json({
    id: user._id,
    message: 'Votre compte a bien été créé'
  })
}

// modification du mot de passe
exports.changePassword = async (req, res) => {
  const _tokenValue = req.body.token
  const _password = req.body.password

  // supprime le token puis update le mdp
  const token = await TokenService.deleteOne(_tokenValue)
  await UserService.setPassword(token.user, _password)

  return res.status(200).json({
    message: 'Votre mot de passe a bien été modifié'
  })
}

// envoie un mail pour réinitialiser le mot de passe
exports.sendResetPasswordEmail = async (req, res) => {
  const _user = req.user

  // création token page de réinitialisation du mot de passe
  const token = await TokenService.create(_user._id, uuidv4(), 'PASSWORD_RESET')

  // envoie mail reset
  await mailer.sendPasswordResetEmail(_user.email, _user.firstname, _user.lastname, `${config.front_url}/password-reset/${token.value}`)

  return res.status(200).json({
    message: 'L\'email a bien été envoyé'
  })
}

// change le mot de passe de l'utilisateur
exports.changePasswordUser = async (req, res) => {
  const _password = req.body.password
  const _userId = req.decodedUserId

  // update le mdp
  await UserService.setPassword(_userId, _password)

  // envoie mail d'informations
  const _user = await UserService.findOne({ _id: _userId })
  await mailer.sendPasswordChangedEmail(_user.email, _user.firstname, _user.lastname)

  return res.status(200).json({
    message: 'Votre mot de passe a bien été modifié'
  })
}

// change l'incription à la liste de mail de l'utilisateur
exports.setInformationMails = async (req, res) => {
  const _userId = req.decodedUserId
  const _value = req.params.value

  await UserService.setInformationMails(_userId, _value)

  return res.status(200).json({
    message: 'Le statut à bien été modifié'
  })
}

// actualise les informations d'un utilisateur
exports.updateUserInformations = async (req, res) => {
  const _userId = req.params.userId
  const _firstname = req.body.firstname
  const _lastname = req.body.lastname
  const _email = req.body.email
  const _permissionLevel = req.body.permissionLevel
  const _grade = req.body.grade
  const _city = req.body.city
  const _bts = req.body.bts
  const _isActive = req.body.isActive

  await UserService.updateUserInformations(_userId, _firstname, _lastname, _email, _permissionLevel, _grade, _city, _bts, _isActive)

  return res.status(200).json({
    message: 'Les informations ont bien été modifiées'
  })
}

// suppression compte utilisateur
exports.deleteAccount = async (req, res) => {
  const _userId = req.params.userId

  await UserService.deleteAccount(_userId)

  return res.status(200).json({
    message: 'Le compte à bien été supprimé'
  })
}
