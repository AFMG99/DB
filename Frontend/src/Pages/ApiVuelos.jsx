import React, { useEffect, useState, useRef } from 'react';
import '../assets/css/formStyles.css';
import "../assets/css/loginStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel,faFilePdf } from "@fortawesome/free-solid-svg-icons";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import spanishLanguage from "../assets/datatableSpanish";
import { vuelosAPI } from '../Service/Services';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';

const ApiVuelos = () => {
    DataTable.use(DT);
    const navigate = useNavigate();
    const tableRef = useRef(null);
    const [dataVuelos, setDataVuelos] = useState([]);
    

    const columns = [
        { title: "Aeronave", data: "Aeronave" },
        { title: "País de Origen", data: "PaisOrigen" },
        { title: "Posición", data: "Posicion" },
        { title: "Velocidad", data: "Velocidad" },
        { title: "Altitud", data: "Altitud" },
    ];
   
    useEffect(() => {
        const fetchVuelos = async () => {
            try {
                const data = await vuelosAPI();
                const vuelos = [];
                 data.map((flight) => {
                    vuelos.push({
                        "Aeronave": flight[1] || "Desconocida",
                        "PaisOrigen": flight[2],
                        "Posicion": `Lat ${flight[6]}, Lon ${flight[5]}`,
                        "Velocidad": `${flight[9]} m/s`,
                        "Altitud": `${flight[13]} m`
                    });
                  });
                    setDataVuelos(vuelos);
            } catch (error) {
                alert(error)
            }
        }
        fetchVuelos();
    }, [])

    const parseCoordinates = (position) => {
        const [latStr, lonStr] = position.split(', ');
        const lat = parseFloat(latStr.replace('Lat ', ''));
        const lon = parseFloat(lonStr.replace('Lon ', ''));
        return [lat, lon];
    };

    const handleRowSelect = (event, dt, type, indexes) => {
        const data = dt.data();
        const coordenadas = parseCoordinates(data.Posicion);
        navigate('/mapa', { state: { position: coordenadas } });
    };


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
                                // onRowClick={handleRowClick}
                                onSelect={handleRowSelect}
                            >
                            </DataTable>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ApiVuelos;
