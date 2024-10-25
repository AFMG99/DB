import { getConnection, sql } from "../Config/Connection.js";

const getAllAvion = async()=>{
    try {
        const resultadoAvion = await sql.query('SELECT * FROM Vehiculo');
        return resultadoAvion.recordset
    } catch (error) {
        throw error;
    }
}

const insertarAvion = async(vehiculo)=>{
    await getConnection();

    const { Placa, Nombre, Estado, Fecha_adquisicion, Tipo_vehiculo, Cod_aeropuerto} = vehiculo;
    console.log('datos', vehiculo);

    await new sql.Request()
        .input('Placa', sql.VarChar, Placa)
        .input('Nombre', sql.VarChar, Nombre)
        .input('Estado', sql.Text, Estado)
        .input('Fecha_adquisicion', sql.Date, Fecha_adquisicion)
        .input('Tipo_vehiculo', sql.VarChar, Tipo_vehiculo)
        .input('Cod_aeropuerto', sql.Int, Cod_aeropuerto)
        .query('INSERT INTO Vehiculo( Placa, Nombre, Estado, Fecha_adquisicion, Tipo_vehiculo, Cod_aeropuerto ) VALUES (@Placa, @Nombre, @Estado, @Fecha_adquisicion, @Tipo_vehiculo, @Cod_aeropuerto)');

        console.log('Avion insertado correctamente.');
        return { message: 'Avion insertado exitosamente.' };
}

export {getAllAvion, insertarAvion}