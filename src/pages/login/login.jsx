import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../../assets/logo.png";
import bg from "../../assets/background.png";
import {api, HandleErrors} from "../../constants/api.js";
import { useContext, useState } from "react";
import {AuthContext} from "../../contexts/auth.jsx"



function Login(){

    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);


   async function acessar() {
  try {

    setLoading(true)
    const response = await api.post("usuarios/login", {
      email,
      senha
    });
        
    localStorage.setItem("sessionToken", response.data.token);
    localStorage.setItem("sessionId", response.data.id_usuario);
    localStorage.setItem("sessionNome", response.data.nome);
    localStorage.setItem("sessionEmail", response.data.email);
    setUser({
        nome:response.data.nome,
        email:response.data.email,
        id_usuario:response.data.id_usuario
    });
    
    navigate("/lancamentos");

  } catch (error)  {
    setLoading(false)
    setMsg(HandleErrors(error));
  }
}


    return <div className="row">
        <div className="col-sm-6 d-flex justify-content-between flex-column  text-center align-items-center">
                <div className="signin mt-5">
                    <img src={logo} alt="logotipo" className="img-logo " />
                    <h2 className="ms-5 me-5 mt-2">Gerencias seu dinheiro nunca foi ão facil</h2>
                    <h6  className="mt-5">Acesse sua conta</h6>


                    
                </div>

                <form className="form-signin mb-5">
                        <div className="form-floating mb-1">
                            <input type="email" className="form-control" id="floatingEmail" placeholder="E-mail" 
                            onChange={(e)=>setEmail(e.target.value)}/>
                            <label htmlFor="floatingEmail">E-mail</label>
                        </div>

                        <div className="form-floating mb-1">
                            <input type="password" className="form-control" id="floatingSenha" placeholder="Senha"
                            onChange={(e)=>setSenha(e.target.value)}/>
                            <label htmlFor="floatingSenha">Senha</label>
                        </div>

                        <button disabled={loading} type="button" onClick={acessar} className="btn btn-purple btn-lg w-100">
                            {
                                loading ? <span>enviando...</span> : <span>acessar</span>
                            }
                            
                        </button>

                        {
                         
                          msg.length > 0 &&
                        <div className="alert alert-danger mt-2" role="start">
                            {msg}
                        </div>
                        }

                        
                </form>

                <div className="mb-5" >
                            <h6>Não tem uma conta? <Link to="/register">Criar Agora!</Link></h6>
                </div>
        </div>


        <div className="col-sm-6 px-0 d-none d-sm-block ">
            <img className="img-background" src={bg} alt="img-backgound" />
        </div>
    </div>
    
    
    




}


export default Login