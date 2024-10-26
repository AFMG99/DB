import React from 'react'
import '../../src/assets/css/estilos.css'
import imagen from '../../src/assets/img/programacion.jpg'
import { useNavigate } from 'react-router-dom'

const Principal = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* <div className="busqueda">
        <select>
          <option value="">Select</option>
        </select>
        <input className='input-busqueda' type="text" placeholder="Busqueda" />
        <button type="submit"><img className='imgB' src={icono3} alt="Busqueda" /></button>
      </div> */}

      <div className="imagen">
        <img src={imagen} alt="programacion" />
      </div>

      <div className="contenido">
        {/* <div 
          className="cart" 
          onClick={() => navigate('/novedades')}
          style={{cursor: 'pointer'}}
        >
          <img src={icono1} alt="Novedades" />
          <h3>Novedades</h3>
          <p>Vea contenido reciente de la comunidad</p>
        </div> */}
        {/* <div 
          className="cart" 
          onClick={() => navigate('/foro')}
          style={{cursor: 'pointer'}}
        >
          <img src={icono2} alt="Foro" />
          <h3>Foro</h3>
          <p>Conecta con la comunidad académica</p>
        </div> */}
      </div>
    </div>
  )
}

export default Principal
