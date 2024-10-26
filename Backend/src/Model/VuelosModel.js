import { getConnection, sql } from "../Config/Connection.js";

const getVuelos = async () => {
    try {
        const resultado = await sql.query(
            `SELECT v.Cod_vuelo, v.Destino, v.Origen, v.Fecha_salida, v.Fecha_llegada, v.Estado, a.Nombre
            FROM Vuelo v JOIN Aeropuerto a ON a.Cod_aeropuerto = v.Cod_aeropuerto`
        );
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

export { getVuelos };