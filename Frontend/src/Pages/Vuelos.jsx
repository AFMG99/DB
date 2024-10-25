import React, { useEffect, useState, useRef } from 'react';
import '../assets/css/formStyles.css';
import "../assets/css/loginStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import spanishLanguage from "../assets/datatableSpanish";
import { vuelos } from '../Service/Services';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Vuelos = () => {
    DataTable.use(DT);
    const tableRef = useRef(null);
    const [dataVuelos, setDataVuelos] = useState([]);

    const columns = [
        { title: "Cod", data: "Cod_vuelo" },
        { title: "Destino", data: "Destino" },
        { title: "Origen", data: "Origen" },
        { title: "Fecha Salida", data: "Fecha_salida" },
        { title: "Fecha Llegada", data: "Fecha_llegada" },
        { title: "Estado", data: "Estado" },
        { title: "Nom Aeropuerto", data: "Nombre" },
    ];

    const handleRowSelect = (event, dt, type, indexes) => {
        const data = dt.data();
        setBtnEditDisabled(false);
        setinputDocumentoId(data.Id_usuario)
        setinputNombre(data.Nombre)
        setInputContrasena(data.Contrasena)
        setInputCorreo(data.Correo)
    }

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.text("Reporte de Vuelos", 14, 16);
        
        const tableColumn = columns.map(col => col.title);

        const tableRows = dataVuelos.map(vuelo => [
            vuelo.Cod_vuelo,
            vuelo.Destino,
            vuelo.Origen,
            vuelo.Fecha_salida,
            vuelo.Fecha_llegada,
            vuelo.Estado,
            vuelo.Nombre
        ]);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });
        doc.save('vuelos_reporte.pdf');
    };

    useEffect(() => {
        const fetchVuelos = async () => {
            try {
                const data = await vuelos();
                const formattedData = data.map(vuelo => ({
                    ...vuelo,
                    Fecha_salida: vuelo.Fecha_salida.split('T')[0],
                    Fecha_llegada: vuelo.Fecha_llegada.split('T')[0],
                }));
                setDataVuelos(formattedData);
            } catch (error) {
                alert(error)
            }
        }
        fetchVuelos();
    }, [])

    return (
        <>
            <div className="containerPrincipal col-12">
                <div className="containerFormTable col-11">
                    <div className="containerPart12 col-12">
                        <div className="container">
                            <DataTable
                                data={dataVuelos}
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
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <button className="btn btnControlFrom" onClick={handleGeneratePDF}>
                    <FontAwesomeIcon icon={faFile} /> PDF
                </button>
            </div>
        </>
    );
};

export default Vuelos;
