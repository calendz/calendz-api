const UserService = require('./user.service')
const Task = require('../models/task.model')

// ================================================
// == Getters
// ================================================

exports.findOne = async (search) => {
  const task = await Task.findOne(search)
    .populate('author', '_id firstname lastname avatarUrl')
    .populate('targets', '_id firstname lastname avatarUrl')
    .lean()

  return task
}

exports.getAllFrom = async (userId) => {
  const user = await UserService.findOne({ _id: userId })

  const tasks = await Task.find({
    $or: [
      { 'city': user.city, 'grade': user.grade, 'group': user.group },
      { 'targets': { '$in': [user._id] } }
    ]
  })
    .populate('author', '_id firstname lastname avatarUrl')
    .populate('targets', '_id firstname lastname avatarUrl')
    .lean()

  return tasks || []
}

// ================================================
// == Methods
// ================================================

exports.create = async (author, date, type, title, description, subject, city, grade, group, targets) => {
  let task = new Task({
    author,
    date,
    type,
    title,
    description,
    subject,
    city,
    grade,
    group,
    targets
  })

  task = await task.save()
  task = await this.findOne({ _id: task._id })
  return task
}

exports.delete = async (taskId) => {
  await Task.deleteOne({ _id: taskId })
}
