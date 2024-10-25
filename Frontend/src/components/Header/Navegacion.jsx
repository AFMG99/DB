import React from 'react'
import { Link } from 'react-router-dom'
import icono from '../../assets/img/icono.png'
import '../../assets/css/estilos.css'

const Navegacion = () => {
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

          <div className="collapse navbar-collapse " id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item"><Link to={"/usuarios"} className="nav-link" href="#">Usuarios</Link></li>
                <li className="nav-item"><Link to={"/aviones"} className="nav-link" href="#">Aviones</Link></li>
                <li className="nav-item"><Link to={"/muebles"} className="nav-link" href="#">Muebles</Link></li>
                <li className="nav-item"><Link to={"/nomina"} className="nav-link" href="#">Informe Nomina</Link></li>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  )
}

export default Navegacion
