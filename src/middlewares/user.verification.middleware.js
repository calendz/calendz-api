const bcrypt = require('bcryptjs')
const UserService = require('../services/user.service')

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

  const errors = []
  if (!_firstname) errors.push('Veuillez indiquer votre prénom')
  if (!_lastname) errors.push('Veuillez indiquer votre nom')
  if (!_email) errors.push('Veuillez indiquer votre adresse mail')
  if (!_grade) errors.push('Veuillez indiquer votre classe')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
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

  const errors = []
  if (_firstname.length < 3) errors.push('Le prénom indiqué est trop court')
  if (_lastname.length < 3) errors.push('Le nom indiqué est trop court')
  if (_email.length < 12) errors.push('L\'adresse mail indiquée est trop courte')

  if (_firstname.length > 32) errors.push('Le prénom indiqué est trop long')
  if (_lastname.length > 32) errors.push('Le nom indiqué est trop long')
  if (_email.length > 64) errors.push('L\'adresse mail indiquée est trop longue')

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(_email.toLowerCase())) errors.push('Veuillez indiquer une adresse mail valide')
  if (!_email.includes('@epsi.fr') && !_email.includes('@wis.fr')) errors.push('Seules les adresses EPSI et WIS sont acceptées')
  const grades = ['B1 G1', 'B1 G2', 'B2 G1', 'B2 G2', 'B3 G1', 'B3 G2', 'B3 G3', 'I4 G1', 'I4 G2', 'I5 G1', 'I5 G2']
  if (grades.indexOf(_grade) === -1) errors.push('Veuillez indiquer une classe valide')

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

// ============================================
// == database operations
// ============================================

exports.hasValidId = async (req, res, next) => {
  const _userId = req.params.userId
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
  const user = await UserService.findOne({ email: _email })

  if (!user.isActive) {
    return res.status(403).json({
      message: 'Veuillez confirmer votre email afin de pouvoir vous connecter'
    })
  }

  req.user = user
  return next()
}

// check if email && username aren't already used
exports.isEmailNotUsed = async (req, res, next) => {
  const _email = req.body.email
  const user = await UserService.findOne({ email: _email })

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

  const user = await UserService.findOne({ email: _email }, true)
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
  const _bts = req.body.bts
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
  if (!_email.includes('@epsi.fr') && !_email.includes('@wis.fr')) errors.push('Seules les adresses EPSI et WIS sont acceptées')
  const grades = ['B1 G1', 'B1 G2', 'B2 G1', 'B2 G2', 'B3 G1', 'B3 G2', 'B3 G3', 'I4 G1', 'I4 G2', 'I5 G1', 'I5 G2']
  if (grades.indexOf(_grade) === -1) errors.push('Veuillez indiquer une classe valide')

  const permissionsLevel = ['ADMIN', 'MEMBER']
  if (permissionsLevel.indexOf(_permissionLevel) === -1) errors.push('Veuillez indiquer un role valide')

  if (_bts !== true && _bts !== false) errors.push('Veuillez indiquer une option BTS valide')

  if (_isActive !== true && _isActive !== false) errors.push('Veuillez indiquer une activité valide')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont invalides',
      errors: errors
    })
  }

  return next()
}
