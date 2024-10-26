import { getConnection, sql } from "../Config/Connection.js";

const getClientes = async () => {
    try {
        const resultado = await sql.query(`SELECT * FROM Cliente`);
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

const insertarCliente = async (cliente) => {
    await getConnection();
    const {
        Doc_cliente,
        Nombre,
        Contacto
    } = cliente;

    try {
        await new sql.Request()
            .input('Doc_cliente', sql.BigInt, Doc_cliente)
            .input('Nombre', sql.VarChar, Nombre)
            .input('Contacto', sql.VarChar, Contacto)
            .query(`INSERT INTO Cliente(Doc_cliente, Nombre, Contacto) VALUES(@Doc_cliente, @Nombre, @Contacto)`);

        return { message: 'Cliente insertado exitosamente.' };
    } catch (error) {
        throw error;
    }
};

const actualizarCliente = async (cliente) => {
    await getConnection();
    const {
        Doc_cliente,
        Nombre,
        Contacto
    } = cliente;

    try {
        await new sql.Request()
            .input('Doc_cliente', sql.BigInt, Doc_cliente)
            .input('Nombre', sql.VarChar, Nombre)
            .input('Contacto', sql.VarChar, Contacto)
            .query(
                `UPDATE Cliente
                SET Nombre = @Nombre,
                    Contacto = @Contacto
                WHERE Doc_cliente = @Doc_cliente`
            );
        return { message: 'Cliente actualizado exitosamente.' };
    } catch (error) {
        throw error;
    }
};

export { getClientes, insertarCliente, actualizarCliente };