const sequelize = require('../0.config/conectDB')
const { DataTypes } = require('sequelize')

const alunos = sequelize.define('usuarios',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
},
{
    tableName: 'usuarios',
    timestamp: true
})

module.exports = alunos;