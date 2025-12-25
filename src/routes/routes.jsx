
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lancamentos from "../pages/lancamentos/lancamentos.jsx";
import Categorias from "../pages/categorias/categorias.jsx";
import Login from '../pages/login/login.jsx';
import Register from '../pages/register/register.jsx';
import PrivateRoute from "../components/private-route/private-route.jsx";



function AppRoutes(){
 return <BrowserRouter>

            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/lancamentos" element={<PrivateRoute><Lancamentos /></PrivateRoute>} />
                <Route exact path="/categorias" element={<PrivateRoute><Categorias /></PrivateRoute>} />


                 <Route exact path="*" element={<Login />} />
            </Routes>
    
    </BrowserRouter>
}




export default AppRoutes