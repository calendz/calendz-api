const config = require('./config')
const logger = require('./winston')
const mailgun = require('mailgun-js')
const mg = mailgun({ apiKey: config.mailer.api_key, domain: config.mailer.domain, host: config.mailer.host })

exports.sendVerificationEmail = async (to, firstname, lastname, link) => {
  /* istanbul ignore if */
  if (!config.mailer.enabled) return logger.warn(`Mail not send (link: ${link}`)

  const data = {
    from: 'Calendz <no-reply@calendz.app>',
    to: to,
    subject: 'Calendz - Confirmation adresse mail',
    template: 'email-confirmation',
    'v:firstname': firstname,
    'v:lastname': lastname,
    'v:link': link
  }

  mg.messages().send(data, /* istanbul ignore next */ (error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}

exports.sendPasswordResetEmail = async (to, firstname, lastname, link) => {
  /* istanbul ignore if */
  if (!config.mailer.enabled) return logger.warn(`Mail not send (link: ${link}`)

  const data = {
    from: 'Calendz <no-reply@calendz.app>',
    to: to,
    subject: 'Calendz - Réinitialisation du mot de passe',
    template: 'password-reset',
    'v:firstname': firstname,
    'v:lastname': lastname,
    'v:link': link
  }

  mg.messages().send(data, /* istanbul ignore next */ (error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}

exports.sendPasswordChangedEmail = async (to, firstname, lastname) => {
  /* istanbul ignore if */
  if (!config.mailer.enabled) return logger.warn(`Mail not send (to: ${to}`)

  const data = {
    from: 'Calendz <no-reply@calendz.app>',
    to: to,
    subject: 'Calendz - Modification de votre mot de passe',
    template: 'password-changed',
    'v:firstname': firstname,
    'v:lastname': lastname
  }

  mg.messages().send(data, /* istanbul ignore next */ (error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}
