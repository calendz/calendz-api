const config = require('../config/config')
const SendinBlue = require("../config/sendinblue");
const NodeMailer = require("../config/mail");

exports.sendVerificationEmail = async (to, firstname, lastname, link) => {
    if(config.mailer.api_key && config.mailer.contact){
        await SendinBlue.sendVerificationEmail(to, firstname, lastname, link)
    }else{
        await NodeMailer.sendVerificationEmail(to, firstname, lastname, link)
    }
}

exports.sendPasswordResetEmail = async (to, firstname, lastname, link) => {
    if(config.mailer.api_key && config.mailer.contact){
        await SendinBlue.sendPasswordResetEmail(to, firstname, lastname, link)
    }else{
        await NodeMailer.sendPasswordResetEmail(to, firstname, lastname, link)
    }
}

exports.sendPasswordChangedEmail = async (to, firstname, lastname) => {
    if(config.mailer.api_key && config.mailer.contact){
        await SendinBlue.sendPasswordChangedEmail(to, firstname, lastname)
    }else{
        await NodeMailer.sendPasswordChangedEmail(to, firstname, lastname)
    }
}

exports.sendContactEmail = async (to, from, subject, message) => {
    if(config.mailer.api_key && config.mailer.contact){
        await SendinBlue.sendContactEmail(to, from, subject, message)
    }else{
        await NodeMailer.sendContactEmail(to, from, subject, message)
    }
}

exports.sendTaskCreate = async (to, firstname, title, createdBy, dueDate) => {
    if(config.mailer.api_key && config.mailer.contact){
        await SendinBlue.sendTaskCreate(to, firstname, title, createdBy, dueDate)
    }else{
        await NodeMailer.sendTaskCreate(to, firstname, title, createdBy, dueDate)
    }
}

exports.sendMail = async (bcc, subject, title, content, ctaLabel, ctaUrl) => {
    if(config.mailer.api_key && config.mailer.contact){
        await SendinBlue.sendMail(bcc, subject, title, content, ctaLabel, ctaUrl)
    }else{
        await NodeMailer.sendMail(bcc, subject, title, content, ctaLabel, ctaUrl)
    }
}

// module.exports = class MailerService {
//     constructor() {
//         this.libraryConfigured = (config.mailer.enabled && config.mailer.api_key && config.mailer.contact)
//             ? require("../config/sendinblue").prototype
//             : require("../config/mail").prototype
//     }
//
//     sendVerificationEmail = async (to, firstname, lastname, link) => {
//         throw new Error('sendVerificationEmail method not implemented')
//     }
//
//     sendPasswordResetEmail = async (to, firstname, lastname, link) => {
//         throw new Error('sendPasswordResetEmail method not implemented')
//     }
//
//     sendPasswordChangedEmail = async (to, firstname, lastname) => {
//         throw new Error('sendPasswordChangedEmail method not implemented')
//     }
//
//     sendContactEmail = async (to, from, subject, message) => {
//         throw new Error('sendContactEmail method not implemented')
//     }
//
//     sendTaskCreate = async (to, firstname, title, createdBy, dueDate) => {
//         throw new Error('sendTaskCreate method not implemented')
//     }
//
//     sendMail = async (bcc, subject, title, content, ctaLabel, ctaUrl) => {
//         throw new Error('sendMail method not implemented')
//     }
// }
