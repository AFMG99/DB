import React, { useEffect, useState } from 'react';
import { getPerfilData } from '../../Service/Services';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
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
        <header className="header d-flex align-items-center justify-content-between px-4 py-3 shadow-sm">
            <h1 className="header-title">TdeAAds!</h1>
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
        </header>
    );
};

export default Header;