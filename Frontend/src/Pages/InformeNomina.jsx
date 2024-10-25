import '../assets/css/formStyles.css'

import "../assets/css/loginStyle.css";
// import { Nav } from "../../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBan,
    faFile,
    faPenToSquare,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useCallback, useRef, useState, useEffect } from "react";

import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import spanishLanguage from "../assets/datatableSpanish";
import { infoNomina } from '../Service/Services'

const Nomina = () => {
    DataTable.use(DT);

    const tableRef = useRef(null);
    
    const [dataInforme, setDataInforme] = useState([]);
    const [accion, setAccion] = useState("Nuevo");
    const [btnNewDisabled, setBtnNewDisabled] = useState(false);
    const [btnEditDisabled, setBtnEditDisabled] = useState(true);
    const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
    const [btnSend, setBtnSend] = useState(true);

    const [inputIdNomina, setinputIdNomina] = useState("");
    const [inputFechaNomina, setinputFechaNomina] = useState("");
    const [inputPeriodoPago, setinputPeriodoPago] = useState("");
    const [inputMetodoPago, setinputMetodoPago] = useState("");
    const [inputNombreSede, setinputNombreSede] = useState("");
    const [inputNombreEmpleado, setinputNombreEmpleado] = useState("");


    const columns = [
        {title: 'Id Nomina', data: 'Id_nomina'},
        {title: 'Fecha Nomina', data: 'Fecha_nomina'},
        {title: 'Periodo Pago', data: 'Periodo_pago'},
        {title: 'Metodo Pago', data: 'Metodo_Pago'},
        {title: 'Nombre Sede', data: 'Nombre_Sede'},
        {title: 'Nombre Empleado', data: 'Nombre_Empleado'},
    ]

    const handleRowSelect = (event, dt, type, indexes) => {
        const data = dt.data();
        setBtnEditDisabled(false);
    
        setinputIdNomina(data.Id_nomina);
        setinputFechaNomina(data.Fecha_nomina);
        setinputPeriodoPago(data.Periodo_pago);
        setinputMetodoPago(data.Metodo_pago);
        setinputNombreSede(data.Nombre_Sede);
        setinputNombreEmpleado(data.Nombre_Empleado)
      }

      useEffect(() => {
        const fetchNomina = async ()=>{
          try { 
              const data = await infoNomina()
              const formattedData = data.map(infoNomina => ({
                ...infoNomina,
                Fecha_nomina: infoNomina.Fecha_nomina.split('T')[0],
                Periodo_pago: infoNomina.Periodo_pago.split('T')[0],
              }));
              setDataInforme(formattedData);
          } catch (error) {
            alert(error)
          }
        }
    
        fetchNomina();
      }, [])


      return (
        <>
          {/* <Nav /> */}
    
          <div className="containerPrincipal col-12">
            <div className="containerFormTable col-11">
              <div className="containerPart12 col-12">
                <div className="container">
                  <DataTable
                    data={dataInforme}
                    columns={columns}
                    className="display"
                    options={{
                      responsive: true,
                      select: {
                        select: "single",
                        info: false
                      },
                      language: spanishLanguage,
                      // info: false,
    
                    }}
                    ref={tableRef}
                    onSelect={handleRowSelect}
                  >
                    <thead>
                      <tr>
                        <th>Id nomina </th>
                        <th>Fecha nomina</th>
                        <th>Periodo pago</th>
                        <th>Metodo pago</th>
                        <th>Nombre sede</th>
                        <th>Nombre empleado</th>
                      </tr>
                    </thead>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };
    export default Nomina;

