import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Principal from './Pages/Principal';
import Navegacion from './components/Header/Navegacion';
import Header from './components/Header/Header';
import Registro from './Pages/Registro';
import Main from './Pages/Main';
import CambiarContrasena from './Pages/CambiarContrasena';
import Usuarios from './Pages/Usuario/Usuarios';
import Aviones from './Pages/Aviones';
import Mueble from './Pages/Mueble';
import Nomina from './Pages/InformeNomina';



const NotFound = () => {
    return <h1>404 - Página no encontrada</h1>;
};

const App = () => {
    return (
        <Router>
            <MainContent />
        </Router>
    );
};

const MainContent = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname !== '/' && location.pathname !== '/registro' && location.pathname !== '/recuperar' && <Header />}
            {location.pathname !== '/' && location.pathname !== '/registro' && location.pathname !== '/recuperar' && <Navegacion />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
                <Route path='/home' element={<Principal />} />
                <Route path='/usuarios' element={<Usuarios />} />
                <Route path='/muebles' element={<Mueble />} />
                <Route path='/aviones' element={<Aviones/>} />
                <Route path='/nomina' element={<Nomina/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
