const config = require('./config')
const logger = require('./winston')
const mailgun = require('mailgun-js')
const mg = mailgun({ apiKey: config.mailer.api_key, domain: 'mg.calendz.app', host: 'api.eu.mailgun.net' })

exports.sendVerificationEmail = async (to, link) => {
  const data = {
    from: 'Calendz <no-reply@calendz.app>',
    to: to,
    subject: 'Calendz - Confirmation adresse mail',
    text: 'Veuillez confirmer votre adresse mail en cliquant sur le lien suivant : ' + link
  }

  mg.messages().send(data, (error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}
