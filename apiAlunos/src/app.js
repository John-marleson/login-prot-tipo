const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const rotasAlunos = require('./5.routes/routerAlunos')
const rotaLogin = require('./5.routes/loginRouter')

app.use(rotaLogin)
app.use(rotasAlunos)

module.exports = app;