import { getConnection, sql } from "../Config/Connection.js";

const getVentas = async () => {
    try {
        const resultado = await sql.query(
            `Select Id_venta, vue.Origen, vue.Destino, pas.Descripcion, cli.Nombre as Nombre_Cliente, aero.Nombre as Nombre_Aeropuerto, Valor from Venta as ven JOIN Vuelo as vue ON ven.Cod_vuelo=vue.Cod_vuelo
JOIN Pasaje as pas ON ven.Id_pasaje=pas.Id_pasaje
JOIN Cliente as cli ON ven.Doc_cliente=cli.Doc_cliente
JOIN Aeropuerto as aero ON ven.Cod_aeropuerto=aero.Cod_aeropuerto`
        );
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

export { getVentas };