const Grade = require('../models/grade.model')

// ================================================
// == Getters
// ================================================

exports.findOne = async (search) => {
  const grade = await Grade.findOne(search)
    // .populate('user', '_id email firstname lastname')
    .lean()

  return grade
}

exports.getAllFrom = async (userId) => {
  const grades = await Grade.find({ user: userId })
    .lean()

  return grades
}

// ================================================
// == Methods
// ================================================

exports.create = async (user, value, coefficient, subject, date, description) => {
  const grade = new Grade({
    user,
    value,
    coefficient,
    subject,
    date: new Date(date).getTime(),
    description
  })

  await grade.save()
  return grade
}

exports.modify = async (gradeId, user, value, coefficient, date, description) => {
  let grade = await Grade.findOne({ _id: gradeId, user })
  grade.value = value
  grade.coefficient = coefficient
  grade.date = new Date(date).getTime()
  grade.description = description

  grade = await grade.save()
  return grade
}

exports.delete = async (gradeId) => {
  await Grade.deleteOne({ _id: gradeId })
}

exports.fill = async (gradeId, value) => {
  let grade = await Grade.findOne({ _id: gradeId })
  grade.value = value
  grade = await grade.save()
  return grade
}
