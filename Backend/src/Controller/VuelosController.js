import { getVuelos } from "../Model/VuelosModel.js";

const vuelos = async (req, res) => {
    try {
        const resultado = await getVuelos();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { vuelos };