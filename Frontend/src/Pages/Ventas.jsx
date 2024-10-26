import '../assets/css/formStyles.css'

import "../assets/css/loginStyle.css";
// import { Nav } from "../../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";

import { useCallback, useRef, useState, useEffect } from "react";

import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import spanishLanguage from "../assets/datatableSpanish";
import { ventas } from '../Service/Services'

const Ventas = () => {
    DataTable.use(DT);

    const tableRef = useRef(null);

    const [dataVentas, setDataVentas] = useState([]);

    const columns = [
        { title: 'Id Venta', data: 'Id_venta' },
        { title: 'Punto origen', data: 'Origen' },
        { title: 'Punto destino', data: 'Destino' },
        { title: 'Descripcion', data: 'Descripcion' },
        { title: 'Nombre Cliente', data: 'Nombre_Cliente' },
        { title: 'Nombre Aeropuerto', data: 'Nombre_Aeropuerto' },
        { title: 'Valor', data: 'Valor' }
    ]

    const handleRowSelect = (event, dt, type, indexes) => {
        const data = dt.data();
        setBtnEditDisabled(false);

        setinputIdVenta(data.Id_venta);
        setinputOrigen(data.Origen);
        setinputDestino(data.Destino);
        setinputDescripcion(data.Descripcion);
        setinputNombreCliente(data.Nombre_Cliente);
        setinputNombreAeropuerto(data.Nombre_Aeropuerto)
        setinputValor(data.Valor)
    }

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const data = await ventas()

                setDataVentas(data);
            } catch (error) {
                alert(error)
            }
        }

        fetchVentas();
    }, [])


    return (
        <>
            {/* <Nav /> */}

            <div className="containerPrincipal col-12">
                <div className="containerFormTable col-11">
                    <div className="containerPart12 col-12">
                        <div className="container">
                            <DataTable
                                data={dataVentas}
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
                            </DataTable>
                            <div className='d-flex justify-content-center'>
                                <button className="btn btnIconInform" >
                                    <FontAwesomeIcon icon={faFilePdf} fontSize={25} />
                                </button>
                                <button className='btn btnIconInform' >
                                    <FontAwesomeIcon icon={faFileExcel} fontSize={25} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Ventas;
