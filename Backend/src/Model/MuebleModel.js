import { getConnection, sql } from "../Config/Connection.js";

const getAllMuebles = async () => {
    const result = await sql.query('SELECT * FROM Muebles');
    return result.recordset;
}

const insertarMueble = async (mueble) => {
    await getConnection();

    const { Id_mueble, Nombre, Tipo, Estado, Fecha_adquisicion, Valor_compra, Id_sede } = mueble;

    console.log('datos', mueble);

    await new sql.Request()
        .input('Id_mueble', sql.Int, Id_mueble)
        .input('Nombre', sql.VarChar, Nombre)
        .input('Tipo', sql.VarChar, Tipo)
        .input('Estado', sql.Text, Estado)
        .input('Fecha_adquisicion', sql.Date, Fecha_adquisicion)
        .input('Valor_compra', sql.Decimal, Valor_compra)
        .input('Id_sede', sql.Int, Id_sede)
        .query('INSERT INTO Muebles(Id_mueble, Nombre, Tipo, Estado, Fecha_adquisicion, Valor_compra, Id_sede ) VALUES (@Id_mueble, @Nombre, @Tipo, @Estado, @Fecha_adquisicion, @Valor_compra, @Id_sede)');

    console.log('Mueble insertado correctamente.');
    return { message: 'Mueble insertado exitosamente.' };

};

export { insertarMueble, getAllMuebles };