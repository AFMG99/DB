import { getConnection, sql } from "../Config/Connection";

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
            .input('Doc_cliente', sql.Int, Doc_cliente)
            .input('Nombre', sql.Varchar, Nombre)
            .input('Contacto', sql.Varchar, Contacto)
            .query(`INSERT INTO Cliente(Doc_cliente, Nombre, Contacto) VALUES(@Doc_cliente, @Nombre, @Contacto)`);

        return { message: 'Cliente insertado exitosamente.' };
    } catch (error) {
        throw error;
    }
}

export { getClientes, insertarCliente };