const assert = require('chai').assert
const dateUtil = require('../../utils/dateUtil')

describe('./utils/dateUtil', () => {
  const date = new Date('08-17-2000')

  // ===============================================
  // == Methods
  // ===============================================
  describe('#dateToDayMonthYear', () => {
    it('should return a string with DD-MM-YY', () => {
      const test = dateUtil.dateToDayMonthYear(date)
      assert.strictEqual(test, '17-08-00')
    })

    it('should return a string with DD-MM-YY with custom separator', () => {
      const test = dateUtil.dateToDayMonthYear(date, '/')
      assert.strictEqual(test, '17/08/00')
    })
  })

  describe('#dateToFullString', () => {
    it('should return a string with date in french', () => {
      const test = dateUtil.dateToFullString(date)
      assert.strictEqual(test, 'jeudi 17 août')
    })
  })

  describe('#dayNbToString', () => {
    it('should return a string with the day name in french', () => {
      assert.strictEqual(dateUtil.dayNbToString(0), 'dimanche')
      assert.strictEqual(dateUtil.dayNbToString(1), 'lundi')
      assert.strictEqual(dateUtil.dayNbToString(2), 'mardi')
      assert.strictEqual(dateUtil.dayNbToString(3), 'mercredi')
      assert.strictEqual(dateUtil.dayNbToString(4), 'jeudi')
      assert.strictEqual(dateUtil.dayNbToString(5), 'vendredi')
      assert.strictEqual(dateUtil.dayNbToString(6), 'samedi')
    })
  })

  describe('#monthNbToString', () => {
    it('should return a string with the month name in french', () => {
      assert.strictEqual(dateUtil.monthNbToString(0), 'janvier')
      assert.strictEqual(dateUtil.monthNbToString(1), 'février')
      assert.strictEqual(dateUtil.monthNbToString(2), 'mars')
      assert.strictEqual(dateUtil.monthNbToString(3), 'avril')
      assert.strictEqual(dateUtil.monthNbToString(4), 'mai')
      assert.strictEqual(dateUtil.monthNbToString(5), 'juin')
      assert.strictEqual(dateUtil.monthNbToString(6), 'juillet')
      assert.strictEqual(dateUtil.monthNbToString(7), 'août')
      assert.strictEqual(dateUtil.monthNbToString(8), 'septembre')
      assert.strictEqual(dateUtil.monthNbToString(9), 'octobre')
      assert.strictEqual(dateUtil.monthNbToString(10), 'novembre')
      assert.strictEqual(dateUtil.monthNbToString(11), 'décembre')
    })
  })
})
