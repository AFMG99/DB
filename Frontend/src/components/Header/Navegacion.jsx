import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import icono from '../../assets/img/icono.png';
import '../../assets/css/estilos.css';
import { getPerfilData } from '../../Service/Services';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Navegacion = () => {
    const [perfil, setPerfil] = useState({
        Nombre: 'Cargando...',
        Correo: 'Cargando...',
        imagenUsuario: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchPerfil();
    }, []);

    const fetchPerfil = async () => {
        const idUsuario = localStorage.getItem('idUsuario');
        if (!idUsuario) {
            console.error('No user ID found in localStorage');
            return;
        }

        try {
            const data = await getPerfilData(idUsuario);
            setPerfil(data[0] || {
                Nombre: 'Usuario no encontrado',
                Correo: '',
                imagenUsuario: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
            });
        } catch (error) {
            console.error('Error fetching profile', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('idUsuario');
        navigate('/');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navegacion">
                <div className="container-fluid d-flex justify-content-end align-items-center">
                    <Link className="navbar-brand" to="/home">
                        <img className='imgN' src={icono} alt="Home" />
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={"/usuarios"} className="nav-link">Usuarios</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/mapa"} className="nav-link">Mapa</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/vuelosapi"} className="nav-link">Vuelos Colombia</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Registrar
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link to="/empleados" className="dropdown-item">Empleados</Link>
                                    </li>
                                    <li>
                                        <Link to="/sedes" className="dropdown-item">Sedes</Link>
                                    </li>
                                    <li>
                                        <Link to="/clientes" className="dropdown-item">Clientes</Link>
                                    </li>
                                    <li>
                                        <Link to="/aviones" className="dropdown-item">Aviones</Link>
                                    </li>
                                    <li>
                                        <Link to="/muebles" className="dropdown-item">Muebles</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Informes
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link to="/vuelos" className="dropdown-item">Vuelos</Link>
                                    </li>
                                    <li>
                                        <Link to="/nomina" className="dropdown-item">Nominas</Link>
                                    </li>
                                    <li>
                                        <Link to="/ventas" className="dropdown-item">Ventas</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="perfil d-flex align-items-center">
                        <button
                            className="btn"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#perfilOffcanvas"
                            aria-controls="perfilOffcanvas"
                        >
                            <img
                                src={'https://cdn-icons-png.flaticon.com/512/3135/3135768.png'}
                                alt="Usuario"
                                className="perfil-imagen rounded-circle"
                                style={{ width: '50px', height: '50px' }}
                            />
                        </button>
                    </div>

                </div>
            </nav>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="perfilOffcanvas" aria-labelledby="perfilOffcanvasLabel">
                <div className="offcanvas-header">
                    <h5 id="perfilOffcanvasLabel" className='text-center'>Perfil</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body text-center">
                    <img
                        src={'https://cdn-icons-png.flaticon.com/512/3135/3135768.png'}
                        alt="Usuario"
                        className="rounded-circle mb-3"
                        style={{ width: '100px', height: '100px' }}
                    />
                    <h2 className="perfil-nombre">{perfil.Nombre}</h2>
                    <p><strong>Email:</strong> {perfil.Correo}</p>
                    <button className="btn btn-danger mt-4" onClick={handleLogout}>Log out</button>
                </div>
            </div>
        </div>
    );
};

export default Navegacion;
