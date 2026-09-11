const { Sequelize  } = require('sequelize')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const sequelize = new Sequelize(process.env.NOMEBANCO, process.env.USUARIOBANCO, process.env.SENHABANCO, {
  host: 'localhost',
  dialect: 'mysql',
  loggings: 'false'
})

module.exports = sequelize;