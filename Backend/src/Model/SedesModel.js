import { getConnection, sql } from "../Config/Connection.js";

const getAllSedes = async () => {
    try {
        const resultado = await sql.query('SELECT * FROM Sede');
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

const seleccionarSede = async (idSede) => {
    try {
        const resultado = await new sql.Request()
            .input('idSede', sql.Int, idSede)
            .query('SELECT * FROM Sede WHERE Id_sede = @idSede');
        return resultado.recordset;
    } catch (error) {
        throw error;
    }
};

const insertarSede = async (nuevaSede) => {
    await getConnection();
    const { 
        Id_sede, 
        Nombre, 
        Servicio, 
        Capacidad, 
        Num_empleado, 
        Horario_inicio, 
        Horario_final, 
        NIT 
    } = nuevaSede;

    try {
        const sedeExiste = await new sql.Request()
            .input('Id_sede', sql.BigInt, Id_sede)
            .query('SELECT * FROM Sede WHERE Id_sede = @Id_sede');

        if (sedeExiste.recordset.length > 0) {
            throw new Error('El ID de sede ya existe');
        }

        const empresaExiste = await new sql.Request()
            .input('NIT', sql.BigInt, NIT)
            .query('SELECT * FROM Empresa WHERE NIT = @NIT');

        if (empresaExiste.recordset.length === 0) {
            throw new Error('El Nit no está registrado en la tabla Empresa');
        }

        console.log('Horario Inicio:', Horario_inicio);
        console.log('Horario Final:', Horario_final);

        if (!Horario_inicio || !Horario_final) {
            throw new Error('Los horarios no pueden estar vacíos');
        }

        const formattedHorarioInicio = Horario_inicio ? `1970-01-01T${Horario_inicio}:00.000Z` : null;
        const formattedHorarioFinal = Horario_final ? `1970-01-01T${Horario_final}:00.000Z` : null;
        console.log('Comienza la inserción de datos en la tabla de sede', nuevaSede);

        await new sql.Request()
            .input('Id_sede', sql.BigInt, Id_sede)
            .input('Nombre', sql.VarChar, Nombre)
            .input('Servicio', sql.VarChar, Servicio)
            .input('Capacidad', sql.Int, Capacidad)
            .input('Num_empleado', sql.Int, Num_empleado)
            .input('Horario_inicio', sql.Time, formattedHorarioInicio)
            .input('Horario_final', sql.Time, formattedHorarioFinal)
            .input('NIT', sql.BigInt, NIT)
            .query(`INSERT INTO Sede (Id_sede, Nombre, Servicio, Capacidad, Num_empleado, Horario_inicio, Horario_final, NIT)
                    VALUES (@Id_sede, @Nombre, @Servicio, @Capacidad, @Num_empleado, @Horario_inicio, @Horario_final, @NIT)`);

        return { message: 'Sede insertada correctamente' };
    } catch (error) {
        console.error('Error en la inserción:', error);
        throw error;
    }
};

const actualizarSede = async (sede) => {
    await getConnection();
    const { 
        Id_sede, 
        Nombre, 
        Servicio, 
        Capacidad, 
        Num_empleado, 
        Horario_inicio, 
        Horario_final, 
        NIT 
    } = sede;
    try {
        const empresaExiste = await new sql.Request()
            .input('NIT', sql.BigInt, NIT)
            .query('SELECT * FROM Empresa WHERE NIT = @NIT');

        if (empresaExiste.recordset.length === 0) {
            throw new Error('El Nit no está registrado en la tabla Empresa');
        }  

        console.log('Empieza la actualizacion de los datos', sede);

        await new sql.Request()
            .input('Id_sede', sql.BigInt, Id_sede)
            .input('Nombre', sql.VarChar, Nombre)
            .input('Servicio', sql.VarChar, Servicio)
            .input('Capacidad', sql.Int, Capacidad)
            .input('Num_empleado', sql.Int, Num_empleado)
            .input('Horario_inicio', sql.VarChar, Horario_inicio)
            .input('Horario_final', sql.VarChar, Horario_final)
            .input('NIT', sql.BigInt, NIT)
            .query(`
                UPDATE Sede
                SET Nombre = @Nombre,
                    Servicio = @Servicio,
                    Capacidad = @Capacidad,
                    Num_empleado = @Num_empleado,
                    Horario_inicio = @Horario_inicio,
					Horario_final = @Horario_final,
					NIT = @NIT
                WHERE Id_sede = @Id_sede`
            );

        return { message: 'Sede actualizada correctamente' };
    } catch (error) {
        console.error('Error en actualizar sede:', error);
        throw error;
    }
};

export { getAllSedes, seleccionarSede, insertarSede, actualizarSede };