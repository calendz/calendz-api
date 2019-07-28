const Token = require('../models/token.model')

// ================================================
//  == Methods
// ================================================

exports.create = async (user, value, type) => {
  const token = new Token({
    user,
    value,
    type
  })

  await token.save()
  return token
}

exports.deleteByValue = async (value) => {
  const token = await Token.findOneAndDelete({ value })
  return token
}
