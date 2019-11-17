const TasksService = require('../services/tasks.service')
const UserService = require('../services/user.service')
const NotificationsService = require('../services/notifications.service')
const dateUtil = require('../utils/dateUtil')
const mailer = require('../config/mailgun')

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
  const targets = req.body.targets || []

  // create the task
  const task = await TasksService.create(author, date, type, title, description, subject, city, grade, group, targets)

  // push notifications to every user affected by the task
  let notifDate = dateUtil.dateToFullString(dateUtil.timestampToDate(date))
  let notifTitle = `Une tâche vient d'être ajoutée !`
  let notifMsg = `La tâche ${title} vient d'être ajoutée pour le <b>${notifDate}</b>.`
  let notifIcon = `fas fa-tasks`
  let notifType = `info`

  switch (type) {
    case 'homework':
      notifTitle = `Un devoirs vient d'être ajouté !`
      notifMsg = `Le devoirs "${title}" vient d'être ajouté pour le <b>${notifDate}</b>.`
      notifIcon = `fas fa-book`
      notifType = `primary`
      break
    case 'DS':
      notifTitle = `Un DS a été programmé !`
      notifMsg = `Le DS "${title}" vient d'être ajouté pour le <b>${notifDate}</b>.`
      notifIcon = `fas fa-graduation-cap`
      notifType = `warning`
      break
  }

  // task for whole class
  if (!targets.length && city && grade && group) {
    const users = await UserService.findAll({ city: city, grade: grade, group: group })

    for (const user of users) {
      // don't push notification / mail to self
      if (user._id.toString() === _user._id.toString()) continue

      /* istanbul ignore if */
      // push emails to users that are concerned
      if (user.settings.mail.taskCreate) {
        await mailer.sendTaskCreate(user.email, user.firstname, title, `${_user.firstname} ${_user.lastname}`, notifDate)
      }

      // create notification
      targets.push(user._id)
    }

  // task for targets
  } else {
    // send notifications
    await NotificationsService.createMany(targets, notifTitle, notifMsg, notifIcon, notifType)

    // send mail
    for (const target of targets) {
      const user = await UserService.findOne({ _id: target })
      if (user && user.settings.mail.taskCreate) {
        await mailer.sendTaskCreate(user.email, user.firstname, title, `${_user.firstname} ${_user.lastname}`, notifDate)
      }
    }
  }

  return res.status(201).json({
    task
  })
}

// delete a task
exports.delete = async (req, res) => {
  const _taskId = req.params.taskId
  await TasksService.delete(_taskId)
  return res.status(200).json({
    message: 'La tâche a bien été supprimée'
  })
}

// modify a task
exports.modify = async (req, res) => {
  const _taskId = req.params.taskId
  const _title = req.body.title
  const _type = req.body.type
  const _subject = req.body.subject
  const _date = new Date(req.body.date).getTime()
  const _description = req.body.description

  const task = await TasksService.modify(_taskId, _title, _type, _subject, _date, _description)
  return res.status(200).json({
    task
  })
}

// set task done
exports.setDone = async (req, res) => {
  const _userId = req.params.userId
  const _taskId = req.params.taskId

  await UserService.setTaskDone(_userId, _taskId)
  return res.status(200).json({})
}

// set task not done
exports.setNotDone = async (req, res) => {
  const _userId = req.params.userId
  const _taskId = req.params.taskId

  await UserService.setTaskNotDone(_userId, _taskId)
  return res.status(200).json({})
}
