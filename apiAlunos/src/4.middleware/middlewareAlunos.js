async function createmiddleware(req, res, next) {
    try{
        const {nome, email, senha} = req.body;

        if(!nome || !email || !senha){
            return res.status(400).json({
                erro: 'os atributos de nome, email e senha são obrigatorios para a criação de um usuario.'
            })
        }

        next()
    }catch(erro){
        console.log(`erro no middleware create aluno. erro: ${erro}`)
        return res.status(500).send('erro no middleware')
    }
}

async function loginMiddleware(req, res, next) {
    try{
        const {nome, email, senha} = req.body;

        if(!nome || !email){
            return res.status(404).json({
                erro: 'nome ou email são obrigatorios para ser feito o login'
            })
        }

        next()
    }catch(erro){
        console.log(`erro no middleware login - ${erro}`)
        return res.status(500).send('erro no middleware')
    }
}

module.exports = {
    createmiddleware,
    loginMiddleware
}