import React from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
    const navigate = useNavigate();

  return (
    <div className="container-fluid registro-page">
      <form className="registro-form" onSubmit={() => navigate('/')}>
        <h2 className="text-center mb-4 text-success">Registro</h2>

        <div className="form-group mb-3">
          <label htmlFor="username" className="form-label">Usuario:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Ingresa tu nombre de usuario"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Correo:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Ingresa tu correo electrónico"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirma tu contraseña"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default Registro;
