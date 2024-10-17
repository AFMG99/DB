import { sql } from "../Config/Connection.js";

const userProfile = async (idUsuario) => {
    try {
        const request = new sql.Request();
        request.input('idUsuario', sql.Int, idUsuario);

        const resultado = await request.query(`
            SELECT Nombre, Correo 
            FROM Usuario 
            WHERE Id_usuario = @idUsuario
        `);
        
        console.log('Resultado de la consulta', resultado)

        return resultado.recordset;
    } catch (error) {
        throw error
    }
}

export { userProfile };