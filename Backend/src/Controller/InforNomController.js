import {infNomina} from '../Model/InforNomModel.js';

const informeNom = async (req, res)=>{
    const resultado = await infNomina();
    res.json(resultado);
};

export {informeNom};