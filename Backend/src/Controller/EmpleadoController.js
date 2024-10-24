import { insertarEmpleado, getAllEmpleados, seleccionarEmpleado } from '../Model/EmpleadoModel.js';

const empleados = async (req, res) => {
    try {
        const resultado = await getAllEmpleados();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
};

const consultarEmpleado = async (req, res) => {
    const { cedula } = req.query;
    try {
        const resultado = await seleccionarEmpleado(cedula);
        if (resultado.length > 0) {
            res.json(resultado[0]);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const crearEmpleado = async (req, res) => {
    const { Id_empleado, Tipo_doc, Primer_nom, Segundo_nom, Primer_apellido, Segundo_apellido, Fecha_nacimiento } = req.body;

    console.log('Datos recibidos para inserción de empleado:', req.body);

    if (!Id_empleado || !Tipo_doc || !Primer_nom || !Primer_apellido || !Fecha_nacimiento) {
        return res.status(400).json({ message: 'Por favor complete todos los campos obligatorios.' });
    }

    try {
        const resultado = await insertarEmpleado({ Id_empleado, Tipo_doc, Primer_nom, Segundo_nom, Primer_apellido, Segundo_apellido, Fecha_nacimiento });
        res.json(resultado);
    } catch (error) {
        console.error('Error al insertar empleado:', error);
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export { crearEmpleado, empleados, consultarEmpleado };