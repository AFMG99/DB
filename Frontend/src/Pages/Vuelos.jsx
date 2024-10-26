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
import { vuelos } from '../Service/Services';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/img/nova.jpg'
import XLSX from 'xlsx-js-style';

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
        { title: "Nombre Aeropuerto", data: "Nombre" },
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
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.addImage(logo, 'PNG', 10, 8, 30, 30);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text("Reporte de Vuelos", pageWidth / 2, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text("NOVA TRAVEL", pageWidth / 2, 28, { align: 'center' });
        doc.text(`Fecha de generación: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth / 2, 35, { align: 'center' });
        doc.setLineWidth(0.5);
        doc.line(10, 40, pageWidth - 10, 40);

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
            startY: 45,
            theme: 'striped',
            headStyles: { fillColor: [51, 0, 102] },
            styles: { halign: 'center' },
            columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 25 },
                2: { cellWidth: 25 },
                3: { cellWidth: 25 },
                4: { cellWidth: 25 },
                5: { cellWidth: 25 },
                6: { cellWidth: 45 },
            },
            margin: { top: 45 },
        });

        doc.setFontSize(10);
        doc.text(`Página ${doc.internal.getNumberOfPages()}`, pageWidth - 10, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
        doc.save('vuelos_reporte.pdf');
    };

    const handleGenerateExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet([]);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.sheet_add_aoa(worksheet, [
            [
                `Reporte de Vuelos\nNOVA TRAVEL\nFecha de generación: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
            ],
            columns.map(col => col.title),
        ], { origin: "A1" });

        worksheet["!merges"] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: columns.length - 1 } },
        ];

        worksheet["A1"].s = {
            alignment: { horizontal: "center", vertical: "center", wrapText: true },
            font: { bold: true, sz: 16 }
        };

        worksheet["!rows"] = [{ hpt: 80 }];

        columns.forEach((col, index) => {
            const cellAddress = `${String.fromCharCode(65 + index)}2`;
            worksheet[cellAddress].s = {
                alignment: { horizontal: "center", vertical: "center" },
                font: { bold: true, sz: 12 },
                fill: { fgColor: { rgb: "DDEBF7" } }
            };
        });

        const dataRows = dataVuelos.map(vuelo => [
            vuelo.Cod_vuelo,
            vuelo.Destino,
            vuelo.Origen,
            vuelo.Fecha_salida,
            vuelo.Fecha_llegada,
            vuelo.Estado,
            vuelo.Nombre
        ]);
        XLSX.utils.sheet_add_aoa(worksheet, dataRows, { origin: "A3" });

        const columnWidths = columns.map((col, index) => {
            const headerWidth = col.title.length;
            const maxDataWidth = Math.max(
                headerWidth,
                ...dataRows.map(row => String(row[index]).length)
            );
            return { wch: maxDataWidth + 2 };
        });
        worksheet["!cols"] = columnWidths;

        XLSX.utils.book_append_sheet(workbook, worksheet, "Vuelos");
        XLSX.writeFile(workbook, "vuelos_reporte.xlsx");
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

                            <div className='d-flex justify-content-center'>
                                <button className="btn btnIconInform" onClick={handleGeneratePDF}>
                                    <FontAwesomeIcon icon={faFilePdf} fontSize={25} />
                                </button>
                                <button className='btn btnIconInform' onClick={handleGenerateExcel}>
                                    <FontAwesomeIcon icon={faFileExcel} fontSize={25}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Vuelos;
