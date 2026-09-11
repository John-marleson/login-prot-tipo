const alunoModel = require('../1.model/alunoModel')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

async function all({ nome, email, limit, page, createdAt, updateAt}) {
    try {
        const where = {}

        if (nome) {
            where.nome = { [Op.like]: `%${nome}%` }
        }
        if(email){
            where.email = { [Op.like]: `%${email}`}
        }

        const queryOptions = { where }

        if (limit != -1) {
            queryOptions.limit = limit;
            queryOptions.offset = (page - 1) * limit;
        }

        const all = await alunoModel.findAndCountAll(queryOptions)

        return {
            dados: all
        }

    } catch (erro) {
        console.log(`erro no findAll. Erro: ${erro}`)
        return {
            erro: 'erro interno no servidor'
        }
    }
}

async function create(nome, email, senha) {
    try {
        const encontrarEmail = await alunoModel.findOne({ where: { email: email } })

        if (encontrarEmail) {
            return {
                erro: 'email já cadastrado.',
                mensagem: 'por favor insira um email diferente para proseguir com o cadastro.'
            }
        }

        const saltsRounds = await bcrypt.genSalt(10)
        const myplaintestPassword = await bcrypt.hash(senha, saltsRounds)

        const createUser = await alunoModel.create({
            nome: nome,
            email: email,
            senha: myplaintestPassword
        })

        if (!createUser) {
            return {
                erro: 'erro ao criar o usuario',
                mensagem: 'verifique se os atributos nome, email e senha estão preenchidos.'
            }
        }

        return {
            dados: 'usuario criado com sucesso'
        }
    } catch (erro) {
        console.log(`erro no create. Erro: ${erro}`)
        return {
            erro: 'erro interno no servidor'
        }
    }
}

module.exports = {
    all,
    create
}