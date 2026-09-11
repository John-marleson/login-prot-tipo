const app = require('./app')

const sequelize = require('./0.config/conectDB')

sequelize.authenticate()
    .then(async () => {
        app.listen(3002, ()=>{
            console.log('servidor funcionando na porta 3002')
            console.log('acesse: http://localhost:3002')
        })
    })
    .catch((erro) => {
        console.log(erro)
    })

module.exports = sequelize;