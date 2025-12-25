
import { createRoot } from 'react-dom/client';
import "./style/global.css";
import Routes from './routes/routes.jsx';
import { AuthProvider } from './contexts/auth.jsx';


 

createRoot(document.getElementById('root')).render(

   <AuthProvider>
      <Routes/>
   </AuthProvider>
   

)
