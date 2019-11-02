const TasksService = require('../services/tasks.service')
const UserService = require('../services/user.service')

// return all user's tasks
exports.getAll = async (req, res) => {
  const _userId = req.params.userId
  const tasks = await TasksService.getAllFrom(_userId)
  return res.status(200).json({
    tasks
  })
}

// create a task
exports.create = async (req, res) => {
  const _user = await UserService.findOne({ _id: req.decodedUserId })

  const author = _user._id
  const date = new Date(req.body.date).getTime()
  const type = req.body.type
  const title = req.body.title
  const description = req.body.description
  const subject = req.body.subject
  const city = _user.city
  const grade = _user.grade
  const group = _user.group
  const targets = []

  const task = await TasksService.create(author, date, type, title, description, subject, city, grade, group, targets)
  return res.status(201).json({
    task
  })
}
