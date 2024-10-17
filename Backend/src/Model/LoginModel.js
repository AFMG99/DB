import { getConnection, sql } from "../Config/Connection.js";

const getAllUsers = async () => {
    try {
        const resultado = await sql.query('SELECT * FROM Usuario');
        return resultado.recordset
    } catch (error) {
        throw error
    }
}

const authenticateUser = async (username, password) => {
    try {
        await getConnection();

        const result = await new sql.Request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM Usuario WHERE Nombre = @username AND Contrasena = @password');

        return result.recordset;
    } catch (error) {
        throw new Error('Error en la consulta SQL: ' + error.message);
    }
};

const updatePassword = async (username, newPassword) => {
    await getConnection();

    console.log('Iniciando proceso de cambio de contraseña para:', username);

    const usuario = await new sql.Request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Usuario WHERE Nombre = @username');

    console.log('Resultado de búsqueda de usuario:', usuario);

    if (usuario.recordset.length === 0) {
        throw new Error('Usuario no encontrado.');
    }

    const idUsuario = usuario.recordset[0].Id_usuario;
    console.log('Actualizando nueva contraseña para ID:', idUsuario);

    await new sql.Request()
        .input('idUsuario', sql.Int, idUsuario)
        .input('newPassword', sql.VarChar,  newPassword)
        .query('UPDATE Usuario SET Contrasena = @newPassword WHERE Id_usuario = @idUsuario');

    console.log('Contraseña actualizada correctamente para el usuario ID:', idUsuario);
    return { message: 'Contraseña cambiada exitosamente.' };
};

export { getAllUsers, authenticateUser, updatePassword };