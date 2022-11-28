exports.isBoolean = (req, res, next) => {
  const _value = req.params.value

  if (_value !== 'true' && _value !== 'false') {
    return res.status(412).json({
      message: 'Veuillez spécifier une valeur'
    })
  }

  return next()
}

exports.isValidHexColor = (req, res, next) => {
  const _value = req.params.value

  if (!/^[0-9A-F]{6}$/i.test(_value)) {
    return res.status(412).json({
      message: 'Veuillez spécifier une couleur valide'
    })
  }

  return next()
}
