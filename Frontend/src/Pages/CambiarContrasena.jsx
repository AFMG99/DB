import React, { useState } from 'react';
import { password } from '../Service/Services';
import { Link } from 'react-router-dom'
import '../assets/css/estilos.css'

function CambiarContrasena() {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await password(username, newPassword);
            setMensaje(response.message);
        } catch (error) {
            setMensaje(error.response?.data?.message || 'Error al cambiar la contraseña.');
        }
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
                    <button type='submit' className='btn btn-success w-100 mb-3'>Cambiar Contraseña</button>
                    {mensaje && <div className='alert alert-info'>{mensaje}</div>}
                    <p className='text-center'><Link to="/" className="text-success">Volver a Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default CambiarContrasena;