const uuidv4 = require('uuid/v4')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const logger = require('../config/winston')
const UserService = require('../services/user.service')
const TokenService = require('../services/token.service')
const schoolUtil = require('../utils/schoolUtil')

// ============================================
// == check if body contains required infos
// ============================================

// login credentials
exports.hasAuthValidFields = (req, res, next) => {
  const _email = req.body.email
  const _password = req.body.password

  const errors = []
  if (!_email) errors.push('Veuillez indiquer votre adresse mail')
  if (!_password) errors.push('Veuillez indiquer votre mot de passe')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
      errors: errors
    })
  }

  return next()
}

// register informations
exports.hasRegisterFields = (req, res, next) => {
  const _firstname = req.body.firstname
  const _lastname = req.body.lastname
  const _email = req.body.email
  const _grade = req.body.grade
  const _group = req.body.group
  const _city = req.body.city

  const errors = []
  if (!_firstname) errors.push('Veuillez indiquer votre prénom')
  if (!_lastname) errors.push('Veuillez indiquer votre nom')
  if (!_email) errors.push('Veuillez indiquer votre adresse mail')
  if (!_grade) errors.push('Veuillez indiquer votre classe')
  if (!_group) errors.push('Veuillez indiquer votre groupe')
  if (!_city) errors.push('Veuillez indiquer votre ville')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
      errors: errors
    })
  }

  return next()
}

exports.hasValidMigrationFields = (req, res, next) => {
  const _grade = req.body.grade
  const _group = req.body.group
  const _city = req.body.city
  // const _bts = req.body.bts

  let errors = []
  if (!_grade) errors.push('Veuillez indiquer votre classe')
  if (!_group) errors.push('Veuillez indiquer votre groupe')
  if (!_city) errors.push('Veuillez indiquer votre ville')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
      errors: errors
    })
  }

  errors = []
  const grades = ['B1', 'B2', 'B3', 'I1', 'I2', 'WIS1', 'WIS2', 'WIS3', 'WIS4', 'WIS5']
  if (grades.indexOf(_grade) === -1) errors.push('Veuillez indiquer une classe valide')
  const groups = ['G1', 'G2', 'G3', 'G1 (dev)', 'G2 (dev)', 'G3 (dev)', 'G1 (infra-réseau)', 'G2 (infra-réseau)', 'G3 (infra-réseau)', 'G1 (ERP)', 'G2 (ERP)']
  if (groups.indexOf(_group) === -1) errors.push('Veuillez indiquer un groupe valide')
  const cities = ['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Rennes', 'Toulouse', 'Paris', 'Dakar']
  if (cities.indexOf(_city) === -1) errors.push('Veuillez indiquer une ville valide')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont invalides',
      errors: errors
    })
  }

  return next()
}

exports.hasValidRegisterFields = (req, res, next) => {
  const _firstname = req.body.firstname
  const _lastname = req.body.lastname
  const _email = req.body.email
  const _grade = req.body.grade
  const _group = req.body.group
  const _city = req.body.city

  const errors = []
  if (_firstname.length < 3) errors.push('Le prénom indiqué est trop court')
  if (_lastname.length < 3) errors.push('Le nom indiqué est trop court')
  if (_email.length < 12) errors.push('L\'adresse mail indiquée est trop courte')

  if (_firstname.length > 32) errors.push('Le prénom indiqué est trop long')
  if (_lastname.length > 32) errors.push('Le nom indiqué est trop long')
  if (_email.length > 64) errors.push('L\'adresse mail indiquée est trop longue')

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(_email.toLowerCase())) errors.push('Veuillez indiquer une adresse mail valide')
  if (!_email.includes('@epsi.fr') && !_email.includes('@wis.fr') && !_email.includes('@ecoles-wis.net')) errors.push('Seules les adresses EPSI/WIS sont acceptées')
  const grades = ['B1', 'B2', 'B3', 'I1', 'I2', 'WIS1', 'WIS2', 'WIS3', 'WIS4', 'WIS5']
  if (grades.indexOf(_grade) === -1) errors.push('Veuillez indiquer une classe valide')
  const groups = ['G1', 'G2', 'G3', 'G1 (dev)', 'G2 (dev)', 'G3 (dev)', 'G1 (infra-réseau)', 'G2 (infra-réseau)', 'G3 (infra-réseau)', 'G1 (ERP)', 'G2 (ERP)']
  if (groups.indexOf(_group) === -1) errors.push('Veuillez indiquer un groupe valide')
  const cities = ['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Rennes', 'Toulouse', 'Paris', 'Dakar']
  if (cities.indexOf(_city) === -1) errors.push('Veuillez indiquer une ville valide')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont invalides',
      errors: errors
    })
  }

  return next()
}

// has password w/ password confirmation
exports.hasValidPasswordAndPasswordConfirmation = (req, res, next) => {
  const _password = req.body.password
  const _password2 = req.body.password2

  let errors = []
  if (!_password) errors.push('Veuillez indiquer un mot de passe')
  if (!_password2) errors.push('Veuillez confirmer votre mot de passe')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
      errors: errors
    })
  }

  errors = []
  if (_password.length < 6) errors.push('Le mot de passe indiqué est trop court')
  if (_password.length > 64) errors.push('Le mot de passe indiqué est trop long')
  if (!/[a-zA-Z]/.test(_password)) errors.push('Votre mot de passe doit contenir au moins une lettre')
  if (!/\d/.test(_password)) errors.push('Votre mot de passe doit contenir au moins un chiffre')
  if (_password !== _password2) errors.push('Les deux mots de passe ne correspondent pas')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont invalides',
      errors: errors
    })
  }

  return next()
}

// has valid avatar url
exports.hasValidAvatarUrl = (req, res, next) => {
  const _avatar = req.body.avatar

  if (!_avatar) {
    return res.status(412).json({
      message: `Veuillez indiquer une url d'avatar`
    })
  }

  const regexp = /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
  if (!regexp.test(_avatar)) {
    return res.status(412).json({
      message: `Veuillez indiquer une url valide`
    })
  }

  return next()
}

// ============================================
// == database operations
// ============================================

exports.hasValidId = async (req, res, next) => {
  const _userId = req.params.userId

  if (!mongoose.Types.ObjectId.isValid(_userId)) {
    return res.status(422).json({
      message: 'ID is not a valid ObjectID'
    })
  }

  const user = await UserService.findOne({ _id: _userId })
  if (!user) {
    return res.status(404).json({
      message: 'Aucun utilisateur correspondant'
    })
  }

  req.user = user
  return next()
}

// checks if the user is active
exports.isActive = async (req, res, next) => {
  const _email = req.body.email
  const user = req.user || await UserService.findOne({ email: _email })

  if (!user.isActive) {
    return res.status(403).json({
      message: 'Veuillez confirmer votre email afin de pouvoir vous connecter',
      userId: user._id
    })
  }

  req.user = user
  return next()
}

// checks if the user is already migrated
exports.isMigrated = async (req, res, next) => {
  const _email = req.body.email
  const user = req.user || await UserService.findOne({ email: _email })

  // cancel login for old students
  if ((user.grade === 'I2' || user.grade === 'WIS5') && !user.isMigrated) {
    return res.status(403).json({
      message: 'Il semblerait que vous ne soyez plus étudiant',
      code: 'OLD_STUDENT'
    })
  }

  // cancel login and indicate that user needs to update its profile
  if (!user.isMigrated) {
    // if user already has an ACCOUNT_MIGRATION token
    const exists = await TokenService.findOne({ user: user._id, type: 'ACCOUNT_MIGRATION' })
    if (exists) await TokenService.deleteOne(exists.value)

    // generate a security token
    const token = await TokenService.create(user._id, uuidv4(), 'ACCOUNT_MIGRATION')

    // return error w/ security token
    return res.status(403).json({
      message: 'Vous devez mettre votre profil à jour',
      code: 'REQUIRE_MIGRATION',
      info: {
        token: token.value,
        email: user.email,
        city: user.city,
        grade: schoolUtil.nextGrade(user.grade)
      }
    })
  }

  req.user = user
  return next()
}

// checks if the user is not active
exports.isNotActive = async (req, res, next) => {
  const user = req.user

  // get (if it exists) the 'EMAIL_VERIFICATION' token
  const token = await TokenService.findOne({ user: user._id, type: 'EMAIL_VERIFICATION' })

  if (user.isActive) {
    /* istanbul ignore if */
    // if activation token exists, delete it
    if (token) await TokenService.deleteByValue(token.value)

    return res.status(400).json({
      message: `Cet utilisateur est (déjà) actif`
    })
  }

  // this case shouldn't happen, but we better catch it anyway
  if (!token) {
    logger.error(`user ${user._id} doesn't have any email verification token (he should)`)
    return res.status(500).json({
      message: 'Cet utilisateur ne possède pas de token de vérification d\'email'
    })
  }

  req.token = token
  return next()
}

// check if email && username aren't already used
exports.isEmailNotUsed = async (req, res, next) => {
  const _email = req.body.email
  const user = req.user || await UserService.findOne({ email: _email })

  if (user) {
    return res.status(412).json({
      message: 'Cette adresse mail est déjà utilisée'
    })
  }

  req.user = user
  return next()
}

// check if user has valid authentication data
exports.isPasswordAndUserMatch = async (req, res, next) => {
  const _email = req.body.email
  const _password = req.body.password

  const user = req.user || await UserService.findOne({ email: _email }, true)

  if (!user) {
    return res.status(404).json({
      message: 'L\'adresse mail indiquée ne correspond à aucun utilisateur'
    })
  }

  if (!bcrypt.compareSync(_password, user.password)) {
    return res.status(401).json({
      message: 'Mot de passe invalide'
    })
  }

  // rebuild user data
  req.user = user
  return next()
}

// check if the provided email address is valid user
exports.hasExistingEmail = async (req, res, next) => {
  const _email = req.body.email
  if (!_email) {
    return res.status(412).json({
      message: 'Veuillez indiquer votre adresse mail'
    })
  }

  const user = await UserService.findOne({ email: _email })
  if (!user) {
    return res.status(404).json({
      message: 'L\'adresse mail indiquée ne correspond à aucun utilisateur'
    })
  }

  req.user = user
  return next()
}

exports.hasValidModifyFields = (req, res, next) => {
  const _firstname = req.body.firstname
  const _lastname = req.body.lastname
  const _email = req.body.email
  const _permissionLevel = req.body.permissionLevel
  const _grade = req.body.grade
  const _group = req.body.group
  const _city = req.body.city
  const _bts = req.body.bts
  const _hasInformationMails = req.body.hasInformationMails
  const _isActive = req.body.isActive

  const errors = []
  if (_firstname.length < 3) errors.push('Le prénom indiqué est trop court')
  if (_lastname.length < 3) errors.push('Le nom indiqué est trop court')
  if (_email.length < 12) errors.push('L\'adresse mail indiquée est trop courte')

  if (_firstname.length > 32) errors.push('Le prénom indiqué est trop long')
  if (_lastname.length > 32) errors.push('Le nom indiqué est trop long')
  if (_email.length > 64) errors.push('L\'adresse mail indiquée est trop longue')

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(_email.toLowerCase())) errors.push('Veuillez indiquer une adresse mail valide')
  if (!_email.includes('@epsi.fr') && !_email.includes('@wis.fr') && !_email.includes('@ecoles-wis.net')) errors.push('Seules les adresses EPSI/WIS sont acceptées')
  const grades = ['B1', 'B2', 'B3', 'I1', 'I2', 'WIS1', 'WIS2', 'WIS3', 'WIS4', 'WIS5']
  if (grades.indexOf(_grade) === -1) errors.push('Veuillez indiquer une classe valide')
  const groups = ['G1', 'G2', 'G3', 'G1 (dev)', 'G2 (dev)', 'G3 (dev)', 'G1 (infra-réseau)', 'G2 (infra-réseau)', 'G3 (infra-réseau)', 'G1 (ERP)', 'G2 (ERP)']
  if (groups.indexOf(_group) === -1) errors.push('Veuillez indiquer un groupe valide')
  const cities = ['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Rennes', 'Toulouse', 'Paris', 'Dakar']
  if (cities.indexOf(_city) === -1) errors.push('Veuillez indiquer une ville valide')

  const permissionsLevel = ['ADMIN', 'MEMBER']
  if (permissionsLevel.indexOf(_permissionLevel) === -1) errors.push('Veuillez indiquer un role valide')

  if (_bts !== true && _bts !== false) errors.push('Veuillez indiquer une option BTS valide')
  if (_hasInformationMails !== true && _hasInformationMails !== false) errors.push('Veuillez indiquer une valeur "hasInformationMails" valide')
  if (_isActive !== true && _isActive !== false) errors.push('Veuillez indiquer une valeur "isActive" valide')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont invalides',
      errors: errors
    })
  }

  return next()
}

exports.isNotSelf = (req, res, next) => {
  const _targetUserId = req.params.userId
  const _userId = req.decodedUserId

  if (_userId === _targetUserId) {
    return res.status(423).json({
      message: 'Vous ne pouvez vous auto-supprimer depuis ce panel, pour cela rendez-vous sur la page "Paramètres"'
    })
  }

  return next()
}
