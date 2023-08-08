const logger = require('./config/winston')
const config = require('./config/config')
const app = require('./config/express')
const initMongo = require('./config/mongoose')
const SysconfService = require('./services/sysconf.service')

// if running unit tests, disable logs
if (config.node_env === 'test') {
  logger.disableLogs()
}

// 1st: establish mongodb connection
initMongo(async () => {
  /* istanbul ignore if */

  // 2nd: init system settings
  await SysconfService.initSettings()

  // 3rd: start the web server
  const port = config.node_env === 'test' ? config.app_port_test : config.app_port
  app.listen(port, () => {
    logger.info('Loaded express.')
    logger.info(`App started in ${config.node_env.toUpperCase()} mode.`)
    logger.info(`Server started on http://localhost:${port}.`)
  })
})

module.exports = app
