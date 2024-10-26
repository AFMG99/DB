import { getVentas } from "../Model/VentasModel.js";

const ventas = async (req, res) => {
    try {
        const resultado = await getVentas();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { ventas };