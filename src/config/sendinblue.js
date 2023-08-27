/* istanbul ignore file */
const config = require('./config')
const logger = require('./winston')
const Sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.MAILER_API_KEY

const from = config.mailer.contact

exports.sendVerificationEmail = async (to, firstname, lastname, link) => {
  if (!config.mailer.enabled || config.node_env === 'test') return logger.warn(`Mail not send (to: ${to}`)

  const tranEmailApi = new Sib.TransactionalEmailsApi()

  const sender = {
    email: from
  }

  const receivers = [
    {
      email: to
    }
  ]

  tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: 'Calendz - Confirmation adresse mail',
    templateId: 2,
    templateName: 'email-confirmation',
    params: {
      firstname: firstname,
      lastname: lastname,
      link: link
    }
  }).catch((error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}

exports.sendPasswordResetEmail = async (to, firstname, lastname, link) => {
  if (!config.mailer.enabled || config.node_env === 'test') return logger.warn(`Mail not send (to: ${to}`)

  const tranEmailApi = new Sib.TransactionalEmailsApi()

  const sender = {
    email: from
  }

  const receivers = [
    {
      email: to
    }
  ]

  tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: 'Calendz - Réinitialisation du mot de passe',
    templateId: 7,
    templateName: 'password-reset',
    params: {
      firstname: firstname,
      lastname: lastname,
      link: link
    }
  }).catch((error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}

exports.sendPasswordChangedEmail = async (to, firstname, lastname) => {
  if (!config.mailer.enabled || config.node_env === 'test') return logger.warn(`Mail not send (to: ${to}`)

  const tranEmailApi = new Sib.TransactionalEmailsApi()

  const sender = {
    email: from
  }

  const receivers = [
    {
      email: to
    }
  ]

  tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: 'Calendz - Modification de votre mot de passe',
    templateId: 6,
    templateName: 'password-changed',
    params: {
      firstname: firstname,
      lastname: lastname
    }
  }).catch((error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}

exports.sendContactEmail = async (to, from, subject, message) => {
  if (!config.mailer.enabled || config.node_env === 'test') return logger.warn(`Mail not send (to: ${to}`)

  const tranEmailApi = new Sib.TransactionalEmailsApi()

  const sender = {
    email: from
  }

  const receivers = [
    {
      email: to
    }
  ]

  tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: subject,
    templateId: 3,
    templateName: 'contact',
    params: {
      message: message
    }
  }).catch((error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}

exports.sendTaskCreate = async (to, firstname, title, createdBy, dueDate) => {
  if (!config.mailer.enabled || config.node_env === 'test') return logger.warn(`Mail not send (to: ${to}`)

  const tranEmailApi = new Sib.TransactionalEmailsApi()

  const sender = {
    email: from
  }

  const receivers = [
    {
      email: to
    }
  ]

  tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: `Calendz - Une tâche vient d'être ajoutée !`,
    templateId: 5,
    templateName: 'new-task',
    params: {
      firstname: firstname,
      title: title,
      created_by: createdBy,
      due_date: dueDate
    }
  }).catch((error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}

exports.sendMail = async (bcc, subject, title, content, ctaLabel, ctaUrl) => {
  const to = config.node_env === 'production'
      ? 'users@calendz.app'
      : 'doryan.chaigneau@epsi.fr'

  if (!config.mailer.enabled || config.node_env === 'test') return logger.warn(`Mail not send (to: ${to}`)

  const tranEmailApi = new Sib.TransactionalEmailsApi()

  const sender = {
    email: from
  }

  const receivers = [
    {
      email: to
    }
  ]

  const bccs = [
    {
      email: bcc
    }
  ]

  tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    bcc: bccs,
    subject: subject,
    templateId: 4,
    templateName: 'custom',
    params: {
      title: title,
      content: content,
      ctaLabel: ctaLabel,
      ctaUrl: ctaUrl
    }
  }).catch((error, body) => {
    if (error) logger.error(error)
    logger.debug(body)
  })
}