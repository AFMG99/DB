import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/Services';
import '../assets/css/estilos.css';
import imagen from '../../src/assets/img/oficina.jpg';
import imagen2 from '../../src/assets/img/facebook.png';
import imagen3 from '../../src/assets/img/x.png';
import imagen4 from '../../src/assets/img/google.png';

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

                            <div className="d-flex justify-content-between">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="remember"
                                    />
                                    <label className="form-check-label" htmlFor="remember">Recordar</label>
                                </div>
                                <Link to="/cambiar-contrasena" className="text-success">¿Olvidaste tu Contraseña?</Link>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <p>¿No tienes cuenta? Ir a <Link to="/registro" className="text-success">Registro</Link></p>
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                            <button className="btn btn-outline-success me-2">
                                <img src={imagen2} alt="facebook" />
                            </button>
                            <button className="btn btn-outline-success me-2">
                                <img src={imagen3} alt="x" />
                            </button>
                            <button className="btn btn-outline-success">
                                <img src={imagen4} alt="google" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;