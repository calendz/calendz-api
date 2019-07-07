const convict = require('convict')
require('dotenv').config()

const config = convict({
  node_env: {
    doc: 'The application runtime environment',
    format: ['development', 'production', 'test', 'mock'],
    default: 'development',
    arg: 'node_env',
    env: 'NODE_ENV'
  },
  app_port: {
    doc: 'The API port',
    format: Number,
    default: 3000,
    arg: 'app_port',
    env: 'APP_PORT'
  },
  app_port_test: {
    doc: 'The API port for testing env',
    format: Number,
    default: 3002,
    arg: 'app_port_test',
    env: 'APP_PORT_TEST'
  },
  populate: {
    doc: 'Should populate DB w/ fake dataset?',
    format: Boolean,
    default: false,
    arg: 'populate',
    env: 'POPULATE'
  },
  db: {
    host: {
      doc: 'The MongoDB hostname',
      format: String,
      default: '127.0.0.1',
      arg: 'db_host',
      env: 'DB_HOST'
    },
    port: {
      doc: 'The MongoDB port',
      format: Number,
      default: '27017',
      arg: 'db_port',
      env: 'DB_PORT'
    },
    name: {
      doc: 'The MongoDB database name',
      format: String,
      default: 'calendz',
      arg: 'db_name',
      env: 'DB_NAME'
    },
    user: {
      doc: 'The MongoDB user',
      format: String,
      default: 'username',
      arg: 'db_user',
      env: 'DB_USER'
    },
    password: {
      doc: `The MongoDB user's password`,
      format: String,
      default: 'password',
      arg: 'db_password',
      env: 'DB_PASSWORD'
    }
  },
  mailer: {
    api_key: {
      doc: `Mailgun's API key`,
      format: String,
      default: null,
      arg: 'mailer_api_key',
      env: 'MAILER_API_KEY'
    }
  },
  jwt: {
    secret: {
      doc: `JWT's secret token`,
      format: String,
      default: 'imasecret',
      arg: 'jwt_secret',
      env: 'JWT_SECRET'
    },
    expiration: {
      doc: `JWT's secret token expiration time (in seconds)`,
      format: Number,
      default: '3600',
      arg: 'jwt_expiration',
      env: 'JWT_EXPIRATION'
    },
    raw_token: {
      doc: `Clear jwt token (ONLY USED IN DEV)`,
      format: String,
      default: 'imasecret',
      arg: 'jwt_raw_token',
      env: 'JWT_RAW_TOKEN'
    }
  },
  travis: {
    doc: `Whether the app is running on travis-ci or not`,
    format: Boolean,
    default: false,
    arg: 'travis',
    env: 'TRAVIS'
  }
})

config.validate({ allowed: 'strict' })
module.exports = config.getProperties()
