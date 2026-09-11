const loginService = require('../2.service/loginService')

async function loginController(req, res){
  try{
    const {email, senha} = req.body;

    const respostaService = await loginService.login(email, senha)

    if(respostaService.erro){
      return res.status(respostaService.status).json({
        erro: respostaService.erro
      })
    }

    return res.status(respostaService.status).json({
      token: respostaService.token,
      mensagem: respostaService.mensagem
    })

  }catch(erro){
    console.log(`erro no controller de login - ${erro}`)
    return res.status(500).json({
      erro: 'erro interno no servidor'
    })
  }
}

module.exports = {
  loginController
}