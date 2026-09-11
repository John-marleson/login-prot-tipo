const loginMiddleware = require('../4.middleware/middlewareLogin')
const loginController = require('../3.controller/loginController')
const express = require('express')
const Router = express.Router()

Router.post('/login', loginMiddleware, (req, res)=> loginController.loginController(req, res))

module.exports = Router;