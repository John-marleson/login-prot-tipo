const express = require('express')
const router = express.Router()
const controllers = require('../3.controller/alunoController')
const middleware = require('../4.middleware/middlewareAlunos')

router.get('/alunos', (req, res) => controllers.queryAlunos(req, res))
router.post('/alunos', middleware.createmiddleware, (req, res) => controllers.createAlunos(req, res))

module.exports = router;