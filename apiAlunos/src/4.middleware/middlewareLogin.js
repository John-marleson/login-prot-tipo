async function loginMiddleware(req, res, next) {
    try{
        const {email, senha} = req.body;

        if(!email || !senha){
            return res.status(400).json({
            erro: 'informe nome ou email e sua senha'
            })
        }
        
        next()
    }catch(erro){
        console.log(`erro no middleware login - ${erro}`)
        return res.status(500).send('erro no middleware')
    }
}

module.exports = loginMiddleware