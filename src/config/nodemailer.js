// const config = require('./config')
// const nodemailer = require('nodemailer')
// const mg = require('nodemailer-mailgun-transport')

const mailgun = require('mailgun-js')
const DOMAIN = 'mg.calendz.app'
const mg = mailgun({ apiKey: 'atoken', domain: DOMAIN, host: 'api.eu.mailgun.net' })
const data = {
  from: 'Calendz <no-reply@calendz.app>',
  to: 'dufourarthur.perso@gmail.com, tuet.alex@gmail.com',
  subject: 'Calendz - Confirmation adresse mail',
  text: 'Veuillez confirmer votre adresse mail en cliquant sur le lien suivant : '
}
mg.messages().send(data, (error, body) => {
  console.error(error)
  console.log(body)
})

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
// const auth = {
//   auth: {
//     api_key: 'atoken',
//     domain: 'mg.calendz.app'
//   }
// }

// var nodemailerMailgun = nodemailer.createTransport(mg(auth))

// nodemailerMailgun.sendMail({
//   from: 'calendz@mg.calendz.app',
//   to: 'dufourarthur.perso@gmail.com', // An array if you have multiple recipients.
//   subject: 'Hey you, awesome!',
//   text: 'Mailgun rocks, pow pow!'
// }, function (err, info) {
//   if (err) {
//     console.log('Error: ' + err)
//   } else {
//     console.log('Response: ' + info)
//   }
// })

// const transporter = nodemailer.createTransport({
//   service: 'Mailgun',
//   auth: {
//     user: 'postmaster@mg.calendz.app',
//     pass: config.mailer.password
//   }
// })

// // async..await is not allowed in global scope, must use a wrapper
// exports.sendVerificationEmail = async (to, link) => {
//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Calendz" <no-reply@mg.calendz.app>', // sender address
//     to: to, // list of receivers
//     subject: 'Calendz - Confirmation adresse mail',
//     text: 'Veuillez confirmer votre adresse mail en cliquant sur le lien suivant : ' + link,
//     html: '<b>Veuillez confirmer votre adresse mail : ' + link + '</b>'
//   })

//   console.log('Message sent: %s', info.messageId)
// }
