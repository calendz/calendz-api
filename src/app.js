const logger = require('./config/winston')
const config = require('./config/config')
const app = require('./config/express')
const initMongo = require('./config/mongoose')
const seedData = require('./mock/seedData')
const SysconfService = require('./services/sysconf.service')

// if running unit tests, disable logs
if (config.node_env === 'test') {
  logger.disableLogs()
}

// 1st: establish mongodb connection
initMongo(async () => {
  /* istanbul ignore if */
  // 2nd: if needed: populate db w/ fake dataset
  if (config.populate && config.node_env !== 'test') {
    logger.warn('POPULATE: started dataset')
    await seedData.removeAllData().then(async () => {
      await seedData.seedData().then(() => {
        logger.warn('POPULATE: dataset completed')
      })
    })
  }

  // 3rd: init system settings
  await SysconfService.initSettings()

  // 4th: start the web server
  const port = config.node_env === 'test' ? config.app_port_test : config.app_port
  app.listen(port, () => {
    logger.info('Loaded express.')
    logger.info(`App started in ${config.node_env.toUpperCase()} mode.`)
    logger.info(`Server started on http://localhost:${port}.`)
  })
})

module.exports = app
