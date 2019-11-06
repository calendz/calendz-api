const mongoose = require('mongoose')
const TasksService = require('../services/tasks.service')

// ============================================
// == check if body contains required infos
// ============================================

exports.hasCreateFields = async (req, res, next) => {
  const _title = req.body.title
  const _type = req.body.type
  const _subject = req.body.subject
  const _date = req.body.date
  const _description = req.body.description

  let errors = []
  if (!_title) errors.push('Veuillez indiquer un titre')
  if (!_type) errors.push('Veuillez indiquer un type')
  if (!_date) errors.push('Veuillez indiquer une date')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
      errors: errors
    })
  }

  errors = []
  if (_title.length < 2) errors.push('Le titre indiqué est trop court')
  if (_title.length > 50) errors.push('Le titre indiqué est trop long')
  if (_subject && _subject.length < 2) errors.push('La matière indiquée est trop courte')
  if (_subject && _subject.length > 50) errors.push('La matière indiquée est trop longue')
  if (_description && _description.length < 2) errors.push('La description indiquée est trop courte')
  /* istanbul ignore if */
  if (_description && _description.length > 1000) errors.push('La description indiquée est trop longue')

  const dateParts = _date.split('-')
  const testDate = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`)
  if (!(testDate instanceof Date) || isNaN(testDate)) errors.push('La date indiquée est invalide')
  req.body.date = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`

  const types = ['homework', 'DS', 'task']
  if (types.indexOf(_type) === -1) errors.push('Le type indiqué est invalide')

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
  const _taskId = req.params.taskId

  if (!mongoose.Types.ObjectId.isValid(_taskId)) {
    return res.status(422).json({
      message: 'ID is not a valid ObjectID'
    })
  }

  const task = await TasksService.findOne({ _id: _taskId })
  if (!task) {
    return res.status(404).json({
      message: 'Aucune tâche correspondante'
    })
  }

  return next()
}
