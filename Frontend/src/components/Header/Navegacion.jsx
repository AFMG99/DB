import React from 'react'
import { Link } from 'react-router-dom'
import icono from '../../assets/img/icono.png'
import '../../assets/css/estilos.css'

const Navegacion = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navegacion">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="/home"> 
            <img className='imgN' src={icono} alt="Home" /> 
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/home">Principal</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navegacion
