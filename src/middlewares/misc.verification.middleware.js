// ============================================
// == check if body contains required infos
// ============================================

exports.hasValidContactMailFields = async (req, res, next) => {
  const _subject = req.body.subject
  const _email = req.body.email
  const _message = req.body.message

  // check if fields aren't missing
  const errors = []
  if (!_subject) errors.push('Veuillez indiquer un sujet')
  if (!_email) errors.push('Veuillez indiquer votre adresse mail')
  if (!_message) errors.push('Veuillez indiquer un message')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont manquant',
      errors: errors
    })
  }

  // check if fields are valid
  if (_subject.length > 64) errors.push('Le sujet est trop long')
  if (_email.length > 64) errors.push(`L'adresse mail est trop longue`)
  /* istanbul ignore if */
  if (_message.length > 4000) errors.push('Le message est trop long')
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(_email.toLowerCase())) errors.push('Veuillez indiquer une adresse mail valide')

  if (errors.length) {
    return res.status(412).json({
      message: 'Certains champs requis sont invalides',
      errors: errors
    })
  }

  return next()
}
