import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../pages/login/login.jsx';
import Register from '../pages/register/register.jsx';
import Lancamentos from "../pages/lancamentos/lancamentos.jsx";



function RoutesOpen(){

return <BrowserRouter>

        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/lancamentos" element={<Lancamentos />} />
        </Routes>
    
    </BrowserRouter>

}


export default RoutesOpen