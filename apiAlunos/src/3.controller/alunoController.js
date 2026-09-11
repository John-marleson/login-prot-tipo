const alunoService = require('../2.service/alunoService')

async function queryAlunos(req, res) {
    try {
        const {
            nome,
            email,
            limit = -1,
            page = 1,
            createdAt,
            updatedAt } = req.query;

        const limiteNumero = Number(limit)
        const pageNumero = Number(page)
        const criadoa = Number(createdAt)
        const atualizadoa = Number(updatedAt)

        if (isNaN(limit) || isNaN(page)) {
            return res.status(400).json({
                erro: 'limite e paginação devem ser numeros'
            })
        }

        const getAlunos = await alunoService.all({ nome: nome, email: email, limit: limiteNumero, page: pageNumero, createdAt: criadoa, updatedAt: atualizadoa })

        if (getAlunos.erro) {
            const statusCode = getAlunos.erro == 'erro interno do servidor' ? 500 : 404
            return res.status(statusCode).json({
                erro: getAlunos.erro
            })
        }
        return res.status(200).json({
            dados: getAlunos.dados
        })
    } catch (erro) {
        return res.status(500).send('erro interno do servidor - controller query')
    }
}

async function createAlunos(req, res) {
    try {
        const { nome, email, senha } = req.body;

        const createUser = await alunoService.create(nome, email, senha)

        if (createUser.erro) {
            const statusCode = createUser.erro == 'erro interno do servidor' ? 500 : 404
            return res.status(statusCode).json({
                erro: createUser.erro,
                mensagem: createUser.mensagem
            })
        }

        return res.status(200).json({
            dados: createUser.dados
        })
    } catch (erro) {
        console.log(`erro no createAlunos. Erro: ${erro}`)
        return res.status(500).send('erro interno no servidor - controller createAlunos')
    }
}

module.exports = {
    queryAlunos,
    createAlunos
}