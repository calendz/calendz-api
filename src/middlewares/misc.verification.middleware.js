// ============================================
// == check if body contains required infos
// ============================================

exports.hasValidContactMailFields = async (req, res, next) => {
  const _subject = req.body.subject
  const _email = req.body.email
  const _message = req.body.message
  // TODO:
  // check if empty

  // TODO:
  // check if are valid
}
