/* istanbul ignore file */
const config = require('./config')
const logger = require('./winston')
const mailgun = require('mailgun-js')
const mg = mailgun({ apiKey: config.mailer.api_key, domain: config.mailer.domain, host: config.mailer.host })

exports.sendVerificationEmail = async (to, firstname, lastname, link) => {
  if (!config.mailer.enabled || config.node_env === 'test') return logger.warn(`Mail not send (to: ${to}`)

  const data = {
    from: 'Calendz <no-reply@calendz.app>',
    to: to,
    subject: 'Calendz - Confirmation adresse mail',
    template: 'email-confirmation',
    'v:firstname': firstname,
    'v:lastname': lastname,
    'v:link': link
  }

  mg.messages().send(data, (error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}

exports.sendPasswordResetEmail = async (to, firstname, lastname, link) => {
  if (!config.mailer.enabled || config.node_env === 'test') return logger.warn(`Mail not send (to: ${to}`)

  const data = {
    from: 'Calendz <no-reply@calendz.app>',
    to: to,
    subject: 'Calendz - Réinitialisation du mot de passe',
    template: 'password-reset',
    'v:firstname': firstname,
    'v:lastname': lastname,
    'v:link': link
  }

  mg.messages().send(data, (error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}

exports.sendPasswordChangedEmail = async (to, firstname, lastname) => {
  if (!config.mailer.enabled || config.node_env === 'test') return logger.warn(`Mail not send (to: ${to}`)

  const data = {
    from: 'Calendz <no-reply@calendz.app>',
    to: to,
    subject: 'Calendz - Modification de votre mot de passe',
    template: 'password-changed',
    'v:firstname': firstname,
    'v:lastname': lastname
  }

  mg.messages().send(data, (error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}

exports.sendContactEmail = async (to, from, subject, message) => {
  if (!config.mailer.enabled || config.node_env === 'test') return logger.warn(`Mail not send (to: ${to}`)

  const data = {
    from,
    to,
    subject,
    template: 'contact',
    'v:message': message
  }

  mg.messages().send(data, (error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}
