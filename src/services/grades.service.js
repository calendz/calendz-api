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
