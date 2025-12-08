import "./register.css";
import logo from "../../assets/logo.png";
import bg from "../../assets/background.png";
import { Link } from "react-router-dom";


function Register(){




    return <div className="row">
        <div className="col-sm-6 d-flex justify-content-between flex-column  text-center align-items-center">
                <div className="signin mt-5">
                    <img src={logo} alt="logotipo" className="img-logo " />
                    <h2 className="ms-5 me-5 mt-2">Crie sua conta</h2>
                    <h6 className="mt-5">Preencha os campos</h6>


                    
                </div>

                <form className="form-signin mb-5">

                        <div className="form-floating mb-1">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Nome"/>
                            <label htmlFor="floatingInput">nome</label>
                        </div>


                        <div className="form-floating mb-1">
                            <input type="email" className="form-control" id="floatingInput" placeholder="E-mail"/>
                            <label htmlFor="floatingInput">E-mail</label>
                        </div>

                        <div className="form-floating mb-1">
                            <input type="password" className="form-control" id="floatingInput" placeholder="Senha"/>
                            <label htmlFor="floatingInput">Senha</label>
                        </div>

                        <div className="form-floating mb-1">
                            <input type="password" className="form-control" id="floatingInput" placeholder="Senha"/>
                            <label htmlFor="floatingInput">Confirme sua senha</label>
                        </div>

                        <button type="button" className="btn btn-purple btn-lg w-100">
                            Criar minha conta
                            
                        </button>

                        
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