import { getAllSedes, seleccionarSede, insertarSede } from "../Model/SedesModel.js";

const sedes = async (req, res) => {
    try {
        const resultado = await getAllSedes();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const consultarSede = async (req, res) => {
    const { idSede } = req.query;
    try {
        const resultado = await seleccionarSede(idSede);
        if (resultado.length > 0) {
            res.json(resultado[0]);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const crearSede = async (req, res) => {
    console.log('Datos recibidos para inserción de sede:', req.body);

    const { Id_sede, Nombre, Servicio, Capacidad, Num_empleado, Horario_inicio, Horario_final, NIT } = req.body;

    console.log('NIT recibido:', NIT);
    try {
        const resultado = await insertarSede({ Id_sede, Nombre, Servicio, Capacidad, Num_empleado, Horario_inicio, Horario_final, NIT });
        res.json(resultado);
    } catch (error) {
        console.error('Error al insertar sede:', error);
        res.status(400).json({ message: error.message });
    }
};

export { sedes, consultarSede, crearSede };