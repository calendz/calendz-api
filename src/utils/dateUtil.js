module.exports = {
  // ============================
  // == Conversions
  // ============================

  // eg: "20/12/2019"
  dateToDayMonthYear (date, separator = '-') {
    date = new Date(date)
    const day = (`0${date.getDate()}`).slice(-2)
    const month = (`0${date.getMonth() + 1}`).slice(-2)
    const year = date.getFullYear().toString().substr(-2)
    return `${day}${separator}${month}${separator}${year}`
  },

  // eg: 'lundi 30 septembre'
  dateToFullString (date) {
    date = new Date(date)
    const day = this.dayNbToString(date.getDay())
    const dayNumber = ('0' + date.getDate()).slice(-2)
    const month = this.monthNbToString(date.getMonth())
    return `${day} ${dayNumber} ${month}`
  },

  // eg: 'lundi'
  dayNbToString (day) {
    switch (day) {
      case 0: return 'dimanche'
      case 1: return 'lundi'
      case 2: return 'mardi'
      case 3: return 'mercredi'
      case 4: return 'jeudi'
      case 5: return 'vendredi'
      case 6: return 'samedi'
    }
  },

  // eg: 'février'
  monthNbToString (month) {
    switch (month) {
      case 0: return 'janvier'
      case 1: return 'février'
      case 2: return 'mars'
      case 3: return 'avril'
      case 4: return 'mai'
      case 5: return 'juin'
      case 6: return 'juillet'
      case 7: return 'août'
      case 8: return 'septembre'
      case 9: return 'octobre'
      case 10: return 'novembre'
      case 11: return 'décembre'
    }
  },

  // eg: new Date()
  timestampToDate (timestamp) {
    const date = new Date(timestamp * 1000 / 1000)
    return date
  },

  // ??
  isDateInDaysRange (date, days = 0) {
    const dateUser = new Date(date * 1000 / 1000)
    dateUser.setHours(0, 0, 0, 0)

    const dateCompare = new Date()
    dateCompare.setDate(dateCompare.getDate() - days)
    dateCompare.setHours(0, 0, 0, 0)

    return (dateUser >= dateCompare)
  }
}
