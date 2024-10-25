import { getConnection, sql } from "../Config/Connection.js";

const getAllEmpleados = async () => {
    try {
        const resultado = await sql.query('SELECT * FROM Empleado');
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

const seleccionarEmpleado = async (cedula) => {
    try {
        const resultado = await new sql.Request()
            .input('Id_empleado', sql.Int, cedula)
            .query('SELECT * FROM Empleado WHERE Id_empleado = @Id_empleado');
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

const insertarEmpleado = async (empleado) => {
    await getConnection();

    console.log('Iniciando proceso de inserción de empleado.');

    const { 
        Id_empleado, 
        Tipo_doc, 
        Primer_nom, 
        Segundo_nom, 
        Primer_apellido, 
        Segundo_apellido, 
        Fecha_nacimiento 
    } = empleado;

    await new sql.Request()
        .input('Id_empleado', sql.Int, Id_empleado)
        .input('Tipo_doc', sql.VarChar, Tipo_doc)
        .input('Primer_nom', sql.VarChar, Primer_nom)
        .input('Segundo_nom', sql.VarChar, Segundo_nom)
        .input('Primer_apellido', sql.VarChar, Primer_apellido)
        .input('Segundo_apellido', sql.VarChar, Segundo_apellido)
        .input('Fecha_nacimiento', sql.Date, Fecha_nacimiento)
        .query('INSERT INTO Empleado (Id_empleado, Tipo_doc, Primer_nom, Segundo_nom, Primer_apellido, Segundo_apellido, Fecha_nacimiento) VALUES (@Id_empleado, @Tipo_doc, @Primer_nom, @Segundo_nom, @Primer_apellido, @Segundo_apellido, @Fecha_nacimiento)');

    console.log('Empleado insertado correctamente.');
    return { message: 'Empleado insertado exitosamente.' };
};

const actualizarEmpleado = async (empleado) => {
    await getConnection();
    console.log('Iniciando proceso de actulización de empleado.')

    const {
        Id_empleado,
        Tipo_doc, 
        Primer_nom, 
        Segundo_nom, 
        Primer_apellido, 
        Segundo_apellido, 
        Fecha_nacimiento
    } = empleado;

    try {
        const resultado = await new sql.Request()
            .input('Id_empleado', sql.Int, Id_empleado)
            .input('Tipo_doc', sql.VarChar, Tipo_doc)
            .input('Primer_nom', sql.VarChar, Primer_nom)
            .input('Segundo_nom', sql.VarChar, Segundo_nom)
            .input('Primer_apellido', sql.VarChar, Primer_apellido)
            .input('Segundo_apellido', sql.VarChar, Segundo_apellido)
            .input('Fecha_nacimiento', sql.Date, Fecha_nacimiento)
            .query(
                `UPDATE Empleado
                SET Tipo_doc = @Tipo_doc,
                    Primer_nom = @Primer_nom,
                    Segundo_nom = @Segundo_nom,
                    Primer_apellido = @Primer_apellido,
                    Segundo_apellido = @Segundo_apellido,
                    Fecha_nacimiento = @Fecha_nacimiento
                WHERE Id_empleado = @Id_empleado`
            );

        console.log('Empleado actualizado correctamente.');
        return { message: 'Empleado Actualizado' }
    } catch (error) {
        console.error('Error en actualizar empleado:', error);
        throw error;
    }
};

export { insertarEmpleado, getAllEmpleados, seleccionarEmpleado, actualizarEmpleado };