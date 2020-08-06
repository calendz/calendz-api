module.exports = {
  // TODO: implement tests
  nextGrade (current) {
    switch (current) {
      case 'B1': return 'B2'
      case 'B2': return 'B3'
      case 'B3': return 'I1'
      case 'I1': return 'I2'
      case 'I2': return null
      case 'WIS1': return 'WIS2'
      case 'WIS2': return 'WIS3'
      case 'WIS3': return 'WIS4'
      case 'WIS4': return 'WIS5'
      case 'WIS5': return null
    }
  }
}
