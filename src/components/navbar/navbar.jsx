import "./navbar.css";
import { useState,useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-small.png";
import {api, HandleErrors} from "../../constants/api.js";
import Swal from 'sweetalert2';
import {AuthContext} from "../../contexts/auth.jsx"



function NavBar(props){
    const {user, setUser} = useContext(AuthContext);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
    

    const navigate = useNavigate();

    const classMenu = "nav-link";
    const classMenuActive = "nav-link active";



    function openModal(id) {
    const modalElement = document.getElementById(id);
    if (!modalElement) return;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
}

function closeModal(id) {
    const modalElement = document.getElementById(id);
    if (!modalElement) return;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();
}




 async   function editarPerfil(){
        
        try{
            const response = await api.get("/usuarios");
            
            setEmail(response.data.email);
            setNome(response.data.nome);
            
            
            openModal("EditarPerfil");
    
        }catch (error) {
            Swal.fire({
              title: "Ocorreu um erro",
              text: HandleErrors(error),
              icon: "error",
            });
          }

}

 async   function enviarEditPerfil(){

     if (!email) {
        Swal.fire("Atenção", "Email Obrigatorio", "warning");
        return;}
        
     if (!nome) {
        Swal.fire("Atenção", "Nome Obrigatorio", "warning");
        return;}
        
        try{
            const response = await api.put("/usuarios",{
                email,
                nome
            });
            setUser({
                nome,
                email,
                id_usuario: localStorage.getItem("sessionId")
                });

            localStorage.setItem("sessionNome", nome);
            localStorage.setItem("sessionEmail", email);
            
            
            closeModal("EditarPerfil");

            
    
        }catch (error) {
            Swal.fire({
              title: "Ocorreu um erro",
              text: HandleErrors(error),
              icon: "error",
            });
          }

}

async   function editaraSenha(){
    openModal("EditarSenha")
}

async   function enviarSenha(){

     if (!senha) {
        Swal.fire("Atenção", "Senha obrigatoria", "warning");
        return;}
    
         if (senha != senha2) {
        Swal.fire("Atenção", "As senha não conferem", "warning");
        return;}


    try{

          await api.put("/usuarios/password",{
            senha
        });

        closeModal("EditarSenha");

    }catch (error) {
            Swal.fire({
              title: "Ocorreu um erro",
              text: HandleErrors(error),
              icon: "error",
            });
          }


}

 function desconectar(){
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("sessionNome");
    localStorage.removeItem("sessionEmail");
    navigate("/login")
}





    return <>



    <nav className="navbar bg-purple fixed-top navbar-expand-lg  ps-2 pe-2"  data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/lancamentos">
            <img className="img-logo" src={logo}  />
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">

            <span className="navbar-toggler-icon"></span>

            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-3 me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className={props.screen == "lancamentos" ? classMenuActive : classMenu} aria-current="page" to="/lancamentos">Lançamentos</Link>
                    </li>

                    <li className="nav-item">
                    <Link className={props.screen == "categorias" ? classMenuActive : classMenu} aria-current="page" to="/categorias">Categorias</Link>
                    </li>
                </ul>

                <div className="dropdown me-6">
                    <a className="btn btn-purple dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        {
                            user.nome ? user.nome : "..."
                        }
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><button className="dropdown-item" onClick={editarPerfil} >Meu Perfil</button ></li>
                        <li><button className="dropdown-item" onClick={editaraSenha}>Alterar Senha</button ></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><button className="dropdown-item" onClick={desconectar}>Desconectar</button ></li>
                    </ul>
                </div>

            </div>


        </div>

         

    </nav>

    <div className="modal fade" id="EditarPerfil" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Perfil</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <input onChange={(e)=>setNome(e.target.value)} value={nome} className="form-control" id="Nome" type="text" placeholder="Nome" />
                    </div> 

                    <div  className="mb-3">
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className="form-control" id="Email" type="text" placeholder="Email" />
                    </div> 

                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-purple" data-bs-dismiss="modal">Cancelar</button>
                    <button onClick={enviarEditPerfil} type="button" className="btn btn-purple">Salvar</button>
                </div>
                </div>
            </div>
    </div>
    
    <div className="modal fade" id="EditarSenha" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Senha</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                        <input onChange={(e)=>setSenha(e.target.value)} className="form-control" id="senha" type="password" placeholder="Senha" />
                    </div> 

                    <div className="mb-3">
                        <input onChange={(e)=>setSenha2(e.target.value)} className="form-control" id="senha2" type="password" placeholder="Confirme sua Senha" />
                    </div> 

                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-purple" data-bs-dismiss="modal">Cancelar</button>
                    <button  type="button" className="btn btn-purple" onClick={enviarSenha}>Salvar</button>
                </div>
                </div>
            </div>
    </div>
    
    </>
    
}

export default NavBar