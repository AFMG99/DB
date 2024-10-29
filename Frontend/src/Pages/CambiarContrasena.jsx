import React, { useState } from 'react';
import { password } from '../Service/Services';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import '../assets/css/estilos.css';

function CambiarContrasena() {
    const Token = 'AbcDeFg123456..*##ÑjjjJHasiiqmnnxiop';
    const location = useLocation();
    const navigate = useNavigate();
    const { username: paramUserName } = location.state || {}; 
    const [username, setUsername] = useState(paramUserName || '');
    const [tokenConfirm, setTokenConfirm] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(tokenConfirm != Token){
            setMensaje("El token no es valido")
            return
        }
        if(newPassword != confirmPassword){
            setMensaje('Las constraseñas no coinciden')
            return
        }
        try {
            const response = await password(username, newPassword);
            setMensaje(response.message);
        } catch (error) {
            setMensaje(error.response?.data?.message || 'Error al cambiar la contraseña.');
        }

        setTimeout(() => {
            navigate('/')
        }, 2500);
    };

    return (
        <div className='container-fluid recuperar-page'>
            <div className="recuperar-container">
                <h2 className="text-center mb-4 text-success">Cambiar Contraseña</h2>
                <form className="recuperar-form" onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Nombre de Usuario:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled
                        />
                    </div>
                    <div className='form-group'>
                        <label>Token:</label>
                        <input
                            type='text'
                            className='form-control'
                            value={tokenConfirm}
                            onChange={(e) => setTokenConfirm(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className='form-group my-3'>
                        <label>Nueva Contraseña:</label>
                        <input
                            type='password'
                            className='form-control'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label>Confirma Contraseña:</label>
                        <input
                            type='password'
                            className='form-control'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 mb-3'>Cambiar Contraseña</button>
                    {mensaje && <div className='alert alert-info'>{mensaje}</div>}
                    <p className='text-center'><Link to="/" className="text-success">Volver a Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default CambiarContrasena;
