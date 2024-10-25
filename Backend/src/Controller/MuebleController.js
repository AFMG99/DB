import { insertarMueble, getAllMuebles } from '../Model/MuebleModel.js';
import jwt from 'jsonwebtoken';

const muebles = async (req, res) => {
    const resultado = await getAllMuebles();
    res.json(resultado);
};

const crearMueble = async (req, res) => {
    const { Id_mueble, Nombre, Tipo, Estado, Fecha_adquisicion, Valor_compra, Id_sede } = req.body;

    console.log('Datos recibidos para inserción de mueble:', req.body);

    if (!Id_mueble || !Nombre || !Tipo || !Estado || !Fecha_adquisicion || !Valor_compra || !Id_sede) {
        return res.status(400).json({ message: 'Por favor complete todos los campos obligatorios.' });
    }

    try {
        const resultado = await insertarMueble({ Id_mueble, Nombre, Tipo, Estado, Fecha_adquisicion, Valor_compra, Id_sede });
        console.log('resultados', resultado)
        res.json(resultado);


        
    } catch (error) {
        console.error('Error al insertar el mueble:', error);
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }

};


export { crearMueble, muebles };