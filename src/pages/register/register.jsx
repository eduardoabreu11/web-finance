import "./register.css";
import logo from "../../assets/logo.png";
import bg from "../../assets/background.png";
import {api, HandleErrors} from "../../constants/api.js";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AuthContext} from "../../contexts/auth.jsx"


function Register(){

    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
    const [nome, setNome] = useState("");

   async function CriarConta(){

        if (senha !== senha2) {
        setMsg("As senhas não conferem");
        return; 
    }
        try {
          setLoading(true)
           const response = await api.post("usuarios/registro", {
                email,
                senha,
                senha2,
                nome
                });

            console.log(response.data);
        
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
                    <h2 className="ms-5 me-5 mt-2">Crie sua conta</h2>
                    <h6 className="mt-5">Preencha os campos</h6>


                    
                </div>

                <form className="form-signin mb-5">

                        <div className="form-floating mb-1">
                            <input onChange={(e)=>setNome(e.target.value)} type="text" className="form-control" id="floatingNome" placeholder="Nome"/>
                            <label htmlFor="floatingNome">nome</label>
                        </div>


                        <div className="form-floating mb-1">
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="floatingEmail" placeholder="E-mail"/>
                            <label htmlFor="floatingEmail">E-mail</label>
                        </div>

                        <div className="form-floating mb-1">
                            <input onChange={(e)=>setSenha(e.target.value)} type="password" className="form-control" id="floatingSenha" placeholder="Senha"/>
                            <label htmlFor="floatingSenha">Senha</label>
                        </div>

                        <div className="form-floating mb-1">
                            <input onChange={(e)=>setSenha2(e.target.value)} type="password" className="form-control" id="floatingSenha2" placeholder="Senha"/>
                            <label htmlFor="floatingSenha2">Confirme sua senha</label>
                        </div>

                        <button disabled={loading} onClick={CriarConta} type="button" className="btn btn-purple btn-lg w-100">
                            {
                                loading ? <div className="d-flex justify-content-center gap-2">

                                <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </div>
                                 <span>criando...</span> 
                                 
                                 </div> : <span>criar conta</span>
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
                            <h6>Ja tenho uma conta.<Link to="/login"> Acessar agora!</Link></h6>
                </div>
        </div>


        <div className="col-sm-6 px-0 d-none d-sm-block ">
            <img className="img-background" src={bg} alt="img-backgound" />
        </div>
    </div>
    
    
    




}


export default Register