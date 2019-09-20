exports.isBoolean = (req, res, next) => {
  const _value = req.params.value

  if (_value !== 'true' && _value !== 'false') {
    return res.status(412).json({
      message: 'Veuillez spécifier une valeur'
    })
  }

  return next()
}
