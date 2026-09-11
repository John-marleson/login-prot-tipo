const alunosModel = require('../1.model/alunoModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path')
require('dotenv').config({ path: '../../.env' })

async function login(email, senha){
  try{
    if(!email || !senha){
      return {
        status: 400,
        erro: 'informe seu email e sua senha'
      }
    }

    const aluno = await alunosModel.findOne({
      where: { email: email }
    });

    if(!aluno){
      return {
        status: 401,
        erro: 'email ou senha inválidos'
      }
    }

    const compare = await bcrypt.compare(senha, aluno.senha)

    if(compare){
      const token = jwt.sign(
        { id: aluno.id, nome: aluno.nome, email: aluno.email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      )

      return {
        status: 200,
        token: token,
        mensagem: 'login realizado com sucesso'
      }
    }else{
      return {
        status: 401,
        erro: 'email ou senha inválidos'
      }
    }

  }catch(erro){
    console.log(`erro no login - ${erro}`)
    return {
      status: 500,
      erro: 'erro interno no servidor'
    }
  }
}

module.exports = {
  login
}