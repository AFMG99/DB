import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/Services';
import '../assets/css/estilos.css';
import imagen from '../../src/assets/img/nova.jpg';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const result = await loginUser(username, password);
            console.log(result);
            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('username', username);
                if (result.idUsuario) {
                    localStorage.setItem('idUsuario', result.idUsuario);
                }
                setErrorMessage('');
                alert('Inicio de sesión exitoso');
                navigate('/home');
            } else {
                setErrorMessage('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error en el login:', error);
            setErrorMessage('Error en el servidor. Por favor, intente más tarde.');
        }
    };

    const handleNewPassword = (e) =>{
        e.preventDefault();
         if (!username) {
            alert('Por favor,digita el usuario.');
            return;
        }
        navigate('/cambiar-contrasena', { state: { username } });
        
    }

    return (
        <div className="container-fluid login-page">
            <div className="row vh-100">
                <div className="col-md-6 d-md-flex login-image">
                    <img src={imagen} alt="Oficina" />
                </div>

                <div className="col-md-6 d-flex align-items-center justify-content-center div">
                    <div className="login-box">
                        <h2 className="text-center text-success">Agencia de Viajes</h2>

                        <form className='form' onSubmit={handleLogin}>
                            <div className="mb-3 user">
                                <label htmlFor="username" className="form-label">Usuario:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 pass">
                                <label htmlFor="password" className="form-label">Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                            <button type="submit" className="btn btn-success w-100 mb-3">Login</button>

                            <div className="d-flex justify-content-center">
                                <a onClick={handleNewPassword} className='text-success linkNewPassword'>¿Olvidaste tu Contraseña?</a>
                                {/* <Link to="/cambiar-contrasena" className="text-success">¿Olvidaste tu Contraseña?</Link> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;