import { insertarUsuario,actualizarUsuario } from "../Model/UsuarioModel.js";

const crearUsuario = async (req, res) => {
    const {
        DocumentoID,
        Nombre,
        Password,
        Correo
    } = req.body;

    try {
        const resultado = await insertarUsuario({
            DocumentoID,
            Nombre,
            Password,
            Correo
        });
        res.json(resultado);
    } catch (error) {
        console.error("Error en la creación del usuario:", error);
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

const modificarUsuario = async (req, res) => {
    const {
        DocumentoID,
        Nombre,
        Password,
        Correo
    } = req.body;

    try {
        const resultado = await actualizarUsuario({
            DocumentoID,
            Nombre,
            Password,
            Correo
        });
        res.json(resultado);
    } catch (error) {
        console.error("Error en la actualización del usuario :", error);
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export { crearUsuario,modificarUsuario };