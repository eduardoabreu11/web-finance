
import { Navigate } from "react-router-dom";


function PrivateRoute(props){

    const isAuth = localStorage.getItem("sessionToken") ? true : false;


    return isAuth ?  props.children : <Navigate to = "/login" />


    
}


export default PrivateRoute