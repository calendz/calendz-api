const convict = require('convict')
const convictFormatWithValidator = require('convict-format-with-validator')
convict.addFormats(convictFormatWithValidator)

require('dotenv').config()

const config = convict({
  node_env: {
    doc: 'The application runtime environment',
    format: ['development', 'production', 'test', 'mock'],
    default: 'development',
    arg: 'node_env',
    env: 'NODE_ENV'
  },
  front_url: {
    doc: `Calendz's front url`,
    format: String,
    default: 'http://localhost:8080',
    arg: 'front_url',
    env: 'FRONT_URL'
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
      default: 'calendz-database',
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
    enabled: {
      doc: `Should mailer send emails`,
      format: Boolean,
      default: true,
      arg: 'mailer_enabled',
      env: 'MAILER_ENABLED'
    },
    port: {
      doc: `nodemailer smpt port`,
      format: String,
      default: 'notAnMailPort',
      arg: 'mailer_port',
      env: 'MAILER_PORT'
    },
    host: {
      doc: `nodemailter smtp host`,
      format: String,
      default: 'notAHost',
      arg: 'mailer_host',
      env: 'MAILER_HOST'
    },
    user:{
      doc: `nodemailter smtp user`,
      format: String,
      default: 'notAUser',
      arg: 'mailer_user',
      env: 'MAILER_USER'
    },
    passwd:{
      doc: `nodemailter smtp passwd`,
      format: String,
      default: 'notAPasswd',
      arg: 'mailer_passwd',
      env: 'MAILER_PASSWD'
    },
    ssl: {
      doc: `nodemailter use tls`,
      format: Boolean,
      default: true,
      arg: 'mailer_use_tls',
      env: 'MAILER_USE_TLS'
    },
    contact: {
      doc: `Email adress`,
      format: 'email',
      default: 'doryan.chaigneau@epsi.fr',
      arg: 'mailer_contact',
      env: 'MAILER_CONTACT'
    }
  },
  cookie: {
    secret: {
      doc: `cookie secret, used to sign cookies`,
      format: String,
      default: 'imasecret',
      arg: 'cookie_secret',
      env: 'COOKIE_SECRET'
    },
    secure: {
      doc: `Whether cookie should require HTTPS or not`,
      format: Boolean,
      default: false,
      arg: 'cookie_secure',
      env: 'COOKIE_SECURE'
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
      doc: `JWT access token expiration time (in seconds)`,
      format: Number,
      default: '900',
      arg: 'jwt_expiration',
      env: 'JWT_EXPIRATION'
    },
    expiration_refresh: {
      doc: `JWT refresh token expiration time (in days)`,
      format: Number,
      default: '30',
      arg: 'jwt_expiration_refresh',
      env: 'JWT_EXPIRATION_REFRESH'
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
