const mongoose = require('mongoose')
const GradesService = require('../services/grades.service')

// ============================================
// == check if body contains required infos
// ============================================

exports.hasCreateFields = async (req, res, next) => {
  const _value = req.body.value
  const _coefficient = req.body.coefficient
  const _subject = req.body.subject
  const _date = req.body.date
  const _description = req.body.description

  let errors = []
  if (!_subject) errors.push('Veuillez indiquer la matière')
  if (!_date) errors.push('Veuillez indiquer la date')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
      errors: errors
    })
  }

  errors = []
  if (_value && (_value < 0 || _value > 20)) errors.push('La note indiquée n\'est pas valide')
  if (_coefficient && (_coefficient <= 0 || _coefficient > 10)) errors.push('Le coefficient indiqué n\'est pas valide')
  if (_subject && _subject.length > 50) errors.push('La matière indiquée est trop longue')
  /* istanbul ignore if */
  if (_description && _description.length > 250) errors.push('La description indiquée est trop longue')

  const dateParts = _date.split('-')
  const testDate = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`)
  if (!(testDate instanceof Date) || isNaN(testDate)) errors.push('La date indiquée est invalide')
  req.body.date = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont invalides',
      errors: errors
    })
  }

  return next()
}

exports.hasUpdateFields = async (req, res, next) => {
  const _value = req.body.value
  const _coefficient = req.body.coefficient
  const _date = req.body.date
  const _description = req.body.description

  let errors = []
  if (!_date) errors.push('Veuillez indiquer la date')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
      errors: errors
    })
  }

  errors = []
  if (_value && (_value < 0 || _value > 20)) errors.push('La note indiquée n\'est pas valide')
  if (_coefficient && (_coefficient <= 0 || _coefficient > 10)) errors.push('Le coefficient indiqué n\'est pas valide')
  /* istanbul ignore if */
  if (_description && _description.length > 250) errors.push('La description indiquée est trop longue')

  const dateParts = _date.split('-')
  const testDate = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`)
  if (!(testDate instanceof Date) || isNaN(testDate)) errors.push('La date indiquée est invalide')
  req.body.date = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont invalides',
      errors: errors
    })
  }

  return next()
}

exports.hasValue = async (req, res, next) => {
  const _value = req.body.value

  let errors = []
  if (!_value && _value !== 0) errors.push('Veuillez indiquer la note')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
      errors: errors
    })
  }

  errors = []
  if (_value && (_value < 0 || _value > 20)) errors.push('La note indiquée n\'est pas valide')

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
  const _gradeId = req.params.gradeId

  if (!mongoose.Types.ObjectId.isValid(_gradeId)) {
    return res.status(422).json({
      message: 'ID is not a valid ObjectID'
    })
  }

  const grade = await GradesService.findOne({ _id: _gradeId })
  if (!grade) {
    return res.status(404).json({
      message: 'Aucune note correspondante'
    })
  }

  return next()
}
