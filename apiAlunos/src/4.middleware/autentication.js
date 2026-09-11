const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({path: '../../.env'})

async function autentication(req, res, next){
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(404).json({
            erro: 'token não enviado'
        })
    }

    try{
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        req.usuario = decoded;
        next()
    }catch(erro){
        console.log(`erro de autenticação - ${erro}`)
        return res.status(401).json({
            erro: 'token invalido ou expirado'
        })
    }
}