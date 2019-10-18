const config = require('../config/config')
const mailer = require('../config/mailgun')

// send email from calendz-front's contact form
exports.sendContactMail = async (req, res) => {
  const to = config.mailer.contact
  const from = req.body.email
  const subject = req.body.subject
  const message = req.body.message

  await mailer.sendContactEmail(to, from, subject, message)

  return res.status(200).json({})
}
