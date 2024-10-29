import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import Principal from './Pages/Principal';
import Navegacion from './components/Header/Navegacion';
import Main from './Pages/Main';
import CambiarContrasena from './Pages/CambiarContrasena';
import Usuarios from './Pages/Usuario/Usuarios';
import Empleados from './Pages/Empleados';
import Sedes from './Pages/Sedes';
import Vuelos from './Pages/Vuelos';
import Cliente from './Pages/Cliente';
import Aviones from './Pages/Aviones';
import Mueble from './Pages/Mueble';
import Nomina from './Pages/InformeNomina';
import Ventas from './Pages/Ventas';
import Map from './Pages/Map';
import ApiVuelos from './Pages/ApiVuelos';



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
                <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />
                <Route path='/home' element={<Principal />} />
                <Route path='/usuarios' element={<Usuarios />} />
                <Route path='/empleados' element={<Empleados />} />
                <Route path='/sedes' element={<Sedes />} />
                <Route path='/vuelos' element={<Vuelos />} />
                <Route path='/clientes' element={<Cliente />} />
                <Route path='/muebles' element={<Mueble />} />
                <Route path='/aviones' element={<Aviones/>} />
                <Route path='/nomina' element={<Nomina/>} />
                <Route path='/ventas' element={<Ventas/>} />
                <Route path='/mapa' element={<Map/>} />
                <Route path='/vuelosapi' element={<ApiVuelos/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
