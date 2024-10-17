import React, { useEffect, useState } from 'react'
import { getAllCiudades } from '../Service/PublicacionServices'

const ListarCiudades = () => {
    const [ciudades, setCiudades] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        fetchCiudad()
    }, [])

    const fetchCiudad = async () => {
        try {
            const data = await getAllCiudades()
            setCiudades(data)
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Código ciudad</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ciudades.map((ciudad) => {
                        <tr>
                        <td>{ciudad.codigoCiudad}</td>
                        <td>{ciudad.nombreC}</td>
                        <td>Editar - Eliminar</td>
                    </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListarCiudades
