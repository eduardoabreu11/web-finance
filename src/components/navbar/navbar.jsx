import "./navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-small.png";



function NavBar(){
    return <nav className="navbar bg-purple fixed-top navbar-expand-lg  ps-2 pe-2"  data-bs-theme="dark">
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
                    <Link className="nav-link active" aria-current="page" to="/lancamentos">Lançamentos</Link>
                    </li>

                    <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/categorias">Categorias</Link>
                    </li>
                </ul>

                <div className="dropdown me-5">
                    <a class="btn btn-purple dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Eduardo Abreu
                    </a>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><Link className="dropdown-item" to="#">Meu Perfil</Link ></li>
                        <li><Link  className="dropdown-item" to="#">Alterar Senha</Link ></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link  className="dropdown-item" to="#">Desconectar</Link ></li>
                    </ul>
                </div>

            </div>


        </div>

         

    </nav>
}

export default NavBar