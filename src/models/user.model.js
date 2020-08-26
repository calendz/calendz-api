const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstname: { type: String, minLength: 3, maxlength: 32, required: true },
  lastname: { type: String, minLength: 3, maxlength: 32, required: true },
  email: { type: String, minLength: 12, maxLength: 64, required: true, unique: true },
  password: { type: String, minLength: 6, maxLength: 64, required: true },
  avatarUrl: { type: String, default: 'img/theme/default-pp.png', required: true },
  permissionLevel: { type: String, enum: ['MEMBER', 'ADMIN'], default: 'MEMBER', required: true },
  school: { type: String, enum: ['EPSI', 'WIS'], default: 'EPSI', required: true },
  grade: { type: String, enum: ['B1', 'B2', 'B3', 'I1', 'I2', 'WIS1', 'WIS2', 'WIS3', 'WIS4', 'WIS5'], required: true },
  group: { type: String, enum: ['G1', 'G2', 'G3', 'G1 (dev)', 'G2 (dev)', 'G3 (dev)', 'G1 (infra-réseau)', 'G2 (infra-réseau)', 'G3 (infra-réseau)', 'G1 (ERP)', 'G2 (ERP)'], required: true },
  city: { type: String, enum: ['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Rennes', 'Toulouse', 'Paris', 'Dakar'], required: true },
  bts: { type: Boolean, default: false, required: false },
  isActive: { type: Boolean, default: false, required: true },
  isMigrated: { type: Boolean, default: true, required: true },
  hasInformationMails: { type: Boolean, default: true, required: true },
  creationDate: { type: String, required: true, default: () => Date.now() },
  lastActiveDate: { type: String, required: false, default: () => Date.now() },
  settings: {
    calendarColor: { type: String, default: '172b4d', required: true },
    mail: {
      taskCreate: { type: Boolean, default: false }
    }
  },
  tasks: {
    done: [{ type: Schema.Types.ObjectId, ref: 'Task', required: false }]
  }
})

module.exports = mongoose.model('User', userSchema)
