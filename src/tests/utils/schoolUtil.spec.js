const assert = require('chai').assert
const schoolUtil = require('../../utils/schoolUtil')

describe('./utils/schoolUtil', () => {
  // ===============================================
  // == Methods
  // ===============================================
  describe('#nextGrade', () => {
    it('should return "SN2"', () => {
      const test = schoolUtil.nextGrade('SN1')
      assert.strictEqual(test, 'SN2')
    })

    it('should return "B3"', () => {
      const test = schoolUtil.nextGrade('SN2')
      assert.strictEqual(test, 'B3')
    })

    it('should return "I1"', () => {
      const test = schoolUtil.nextGrade('B3')
      assert.strictEqual(test, 'I1')
    })

    it('should return "I2"', () => {
      const test = schoolUtil.nextGrade('I1')
      assert.strictEqual(test, 'I2')
    })
    it('should return "WIS2"', () => {
      const test = schoolUtil.nextGrade('WIS1')
      assert.strictEqual(test, 'WIS2')
    })

    it('should return "WIS3"', () => {
      const test = schoolUtil.nextGrade('WIS2')
      assert.strictEqual(test, 'WIS3')
    })

    it('should return "WIS4"', () => {
      const test = schoolUtil.nextGrade('WIS3')
      assert.strictEqual(test, 'WIS4')
    })

    it('should return "WIS5"', () => {
      const test = schoolUtil.nextGrade('WIS4')
      assert.strictEqual(test, 'WIS5')
    })

    it('should return null', () => {
      const test1 = schoolUtil.nextGrade('I2')
      const test2 = schoolUtil.nextGrade('WIS5')
      const test3 = schoolUtil.nextGrade('other')
      assert.isNull(test1)
      assert.isNull(test2)
      assert.isNull(test3)
    })
  })
})
