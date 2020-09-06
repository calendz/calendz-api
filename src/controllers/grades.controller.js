const GradesService = require('../services/grades.service')

exports.create = async (req, res) => {
  const user = req.decodedUserId
  const value = req.body.value
  const coefficient = req.body.coefficient
  const subject = req.body.subject
  const date = req.body.date
  const description = req.body.description

  const grade = await GradesService.create(user, value, coefficient, subject, date, description)

  return res.status(201).json({
    grade
  })
}

exports.modify = async (req, res) => {
  const _gradeId = req.params.gradeId
  const _user = req.decodedUserId
  const _value = req.body.value
  const _coefficient = req.body.coefficient
  const _date = req.body.date
  const _description = req.body.description

  const grade = await GradesService.modify(_gradeId, _user, _value, _coefficient, _date, _description)

  return res.status(200).json({
    grade
  })
}

exports.delete = async (req, res) => {
  const _gradeId = req.params.gradeId
  await GradesService.delete(_gradeId)
  return res.status(200).json({
    message: 'La note a bien été supprimée'
  })
}
