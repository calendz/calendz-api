const UserService = require('./user.service')
const Task = require('../models/task.model')

// ================================================
// == Getters
// ================================================

exports.getAllFrom = async (userId) => {
  const user = await UserService.findOne({ _id: userId })

  const tasks = await Task.find({
    $or: [
      { 'city': user.city, 'grade': user.grade, 'group': user.group },
      { 'targets': { '$in': [user._id] } }
    ]
  })

  return tasks || []
}
