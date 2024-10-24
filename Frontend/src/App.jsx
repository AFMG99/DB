import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Principal from './Pages/Principal';
import Navegacion from './components/Header/Navegacion';
import Registro from './Pages/Registro';
import Main from './Pages/Main';
import CambiarContrasena from './Pages/CambiarContrasena';
import Usuarios from './Pages/Usuario/Usuarios';
import Empleados from './Pages/Empleados';
import Sedes from './Pages/Sedes';

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
            {location.pathname !== '/' && location.pathname !== '/cambiar-contrasena' && location.pathname !== '/recuperar' && <Navegacion />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
                <Route path='/home' element={<Principal />} />
                <Route path='/usuarios' element={<Usuarios />} />
                <Route path='/empleados' element={<Empleados />} />
                <Route path='/sedes' element={<Sedes />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
