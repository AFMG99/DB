import { getAllAvion, insertarAvion, actualizarAvion } from '../Model/AvionModel.js';

const aviones = async (req, res) => {
    try {
        const avion = await getAllAvion();
        res.json(avion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const crearAvion = async (req, res) => {
    const { Placa, Nombre, Estado, Fecha_adquisicion, Tipo_vehiculo, Cod_aeropuerto } = req.body;

    console.log('Datos recibidos para inserción de avion:', req.body);

    if (!Placa || !Nombre || !Estado || !Fecha_adquisicion || !Tipo_vehiculo || !Cod_aeropuerto) {
        return res.status(400).json({ message: 'Por favor complete los campos obligatorios' });
    }

    try {
        const resultado = await insertarAvion({ Placa, Nombre, Estado, Fecha_adquisicion, Tipo_vehiculo, Cod_aeropuerto });
        console.log('resultados:', resultado)
        res.json(resultado);
    } catch (error) {
        console.error('Error al insertar el mueble', error);
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }

}

const modificarAvion = async (req, res) => {
    const {
        Placa,
        Nombre,
        Estado,
        Fecha_adquisicion,
        Tipo_vehiculo,
        Cod_aeropuerto
    } = req.body;

    console.log('Datos recibidos para actualización de avion:', req.body);

    if (!Placa || !Nombre || !Estado || !Fecha_adquisicion || !Tipo_vehiculo || !Cod_aeropuerto) {
        return res.status(400).json({ message: 'Por favor complete todos los campos obligatorios.' });
    }

    try {
        const resultado = await actualizarAvion({
            Placa,
            Nombre,
            Estado,
            Fecha_adquisicion,
            Tipo_vehiculo,
            Cod_aeropuerto
        });
        res.json(resultado);
    } catch (error) {
        console.error('Error al actulizar los datos:', error);
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message })
    }

};

export { aviones, crearAvion, modificarAvion };
