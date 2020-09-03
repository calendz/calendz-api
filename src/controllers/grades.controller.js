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
