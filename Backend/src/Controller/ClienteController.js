import { getClientes, insertarCliente } from "../Model/ClienteModel";

const clientes = async (req, res) => {
    try {
        const resultado = await getClientes();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const crearCliente = async (req, res) => {
    const {
        Doc_cliente,
        Nombre,
        Contacto
    } = req.body;

    try {
        const resultado = await insertarCliente({
            Doc_cliente,
            Nombre,
            Contacto
        });
        res.json(resultado);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};


export { clientes, crearCliente };