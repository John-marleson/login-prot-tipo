import { useState } from "react"
import logo from '../assets/logo.png'

function FormularioAlunos(){
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ login, setLogin ] = useState('');

    async function reqApi(dados){
        try{
            const consumoApi = await fetch('http://localhost:3002/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            })

            
            const resposta = await consumoApi.json()
            
            if(!consumoApi.ok){
                return resposta
            }

            return resposta
        }catch(erro){
            console.log(`erro na requisição da api - ${erro}`)
        }
    }

    async function submit(event){
        event.preventDefault();

        const respostaApi = await reqApi({
            email: email,
            senha: senha
        })

        setLogin(respostaApi)

        if(respostaApi.token){
            setEmail('')
            setSenha('')
        }
    }

    return( 
    <>
    <div className="card-login">
        <img src={logo} className="logo" alt="logo" />
        <form onSubmit={submit} className="form">
            <legend>acesse sua conta</legend>
            <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} className="card-input"/>
            <input type="password" placeholder="Senha" value={senha} onChange={(e)=> setSenha(e.target.value)} className="card-input"/>
            <div className="acount">
                <a href="" className="link">criar conta</a>
                <a href="" className="link">recuperar senha</a>
            </div>
            <button className="button">acessar</button>
        </form>
        <div>
            {login?.erro && <p style={{color: 'red'}} className="resposta">{login.erro}</p>}
            {login?.mensagem && <p style={{color: 'green'}} className="resposta">{login.mensagem}</p>}
        </div>
    </div>
    </>)
}

export default FormularioAlunos;