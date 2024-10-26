import { getConnection, sql } from "../Config/Connection.js";

const infNomina = async ()=>{
        //const result = await sql.query("Select * from Nominas");
        const result = await sql.query(`Select Id_nomina, Fecha_nomina, Periodo_pago, Metodo_Pago, sed.Nombre as Nombre_Sede, CONCAT_WS(' ',emp.Primer_nom,emp.Primer_apellido) as Nombre_Empleado from Nominas as nom 
JOIN Empleado as emp on nom.Id_empleado=emp.Id_empleado 
JOIN Sede as sed on nom.id_sede=sed.Id_sede`)
        return result.recordset;
}

export {infNomina};