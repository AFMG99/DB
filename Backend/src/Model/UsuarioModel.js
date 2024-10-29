import { getConnection, sql } from "../Config/Connection.js";


const insertarUsuario = async (usuario) => {
    await getConnection();
    const {
        DocumentoID,
        Nombre,
        Password,
        Correo
    } = usuario;

    try {
        await new sql.Request()
            .input('Id_usuario', sql.BigInt, DocumentoID)
            .input('Nombre', sql.VarChar, Nombre)
            .input('Contrasena', sql.VarChar, Password)
            .input('Correo', sql.VarChar, Correo)
            .query(`INSERT INTO Usuario(Id_usuario, Nombre, Contrasena,Correo) VALUES(@Id_usuario, @Nombre, @Contrasena,@Correo)`);

        return { message: 'Usuario insertado exitosamente.' };
    } catch (error) {
        throw error;
    }
};

const actualizarUsuario = async (usuario) => {
    await getConnection();
    const {
        DocumentoID,
        Nombre,
        Password,
        Correo
    } = usuario;

    try {
        await new sql.Request()
            .input('Id_usuario', sql.BigInt, DocumentoID)
            .input('Nombre', sql.VarChar, Nombre)
            .input('Contrasena', sql.VarChar, Password)
            .input('Correo', sql.VarChar, Correo)
            .query(
                `UPDATE Usuario
                SET Nombre = @Nombre,
                Contrasena = @Contrasena,
                Correo = @Correo
                WHERE Id_usuario = @Id_usuario`
            );
        return { message: 'Usuario actualizado exitosamente.' };
    } catch (error) {
        throw error;
    }
};

export { insertarUsuario, actualizarUsuario };