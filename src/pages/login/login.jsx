import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../../assets/logo.png";
import bg from "../../assets/background.png";



function Login(){

    const navigate = useNavigate();

    function acessar(){
        navigate("/lancamentos")
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
                            <input type="email" className="form-control" id="floatingInput" placeholder="E-mail"/>
                            <label htmlFor="floatingInput">E-mail</label>
                        </div>

                        <div className="form-floating mb-1">
                            <input type="password" className="form-control" id="floatingInput" placeholder="Senha"/>
                            <label htmlFor="floatingInput">Senha</label>
                        </div>

                        <button type="button" onClick={acessar} className="btn btn-purple btn-lg w-100">
                            Acessar
                        </button>

                        
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