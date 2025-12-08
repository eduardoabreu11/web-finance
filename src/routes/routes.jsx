

import RoutesOpen from "./routesOpen";
import RoutesPrivate from "./routesPrivate.jsx";


const user ={

};


function Routes(){  

    return user.id_usuario ?  <RoutesPrivate/> : <RoutesOpen/>
}


export default Routes