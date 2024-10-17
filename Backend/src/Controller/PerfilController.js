import { userProfile } from "../Model/PerfilModel.js";

const profile = async (req, res) => {
    const { idUsuario } = req.query;
    try {
        const perfil = await userProfile(idUsuario);
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { profile };
