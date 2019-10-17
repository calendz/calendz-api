const uuidv4 = require('uuid/v4')
const config = require('../config/config')
const mailer = require('../config/mailgun')

const UserService = require('../services/user.service')
const TokenService = require('../services/token.service')
const NotificationModel = require('../models/notification.model')

// send email from calendz-front's contact form
exports.sendContactMail = async (req, res) => {
  // send email to:
  // create an env variable => contact email (string / array of strings)
  // if string:
  //    -> string
  // if array:
  //    -> send to all emails
}
