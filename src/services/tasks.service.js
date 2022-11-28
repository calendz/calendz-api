const UserService = require('./user.service')
const Task = require('../models/task.model')

// ================================================
// == Getters
// ================================================

exports.findOne = async (search) => {
  const task = await Task.findOne(search)
    .populate('author', '_id email firstname lastname avatarUrl')
    .populate('targets', '_id email firstname lastname avatarUrl')
    .lean()

  return task
}

exports.getAllFrom = async (userId) => {
  const user = await UserService.findOne({ _id: userId })

  const tasks = await Task.find({
    $or: [
      { school: user.school, city: user.city, grade: user.grade, group: user.group },
      { targets: { $in: [user._id] } }
    ]
  })
    .populate('author', '_id email firstname lastname avatarUrl')
    .populate('targets', '_id email firstname lastname avatarUrl')
    .lean()

  return tasks
}

exports.findAll = async (search = {}) => {
  const tasks = await Task.find(search)
    .populate('author', '_id grade city')
    .lean()
  // console.log(tasks.filter(t => t.author.grade == null))
  return tasks
}

// ================================================
// == Methods
// ================================================

exports.create = async (author, date, type, title, description, subject, school, city, grade, group, targets) => {
  let task = new Task({
    author,
    date,
    type,
    title,
    description,
    subject,
    school,
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

exports.modify = async (_taskId, _title, _type, _subject, _date, _description, _targets) => {
  let task = await Task.findOne({ _id: _taskId })
  task.title = _title
  task.type = _type
  task.subject = _subject
  task.date = _date
  task.description = _description
  task.targets = _targets

  task = await task.save()
  task = await this.findOne({ _id: _taskId })
  return task
}
