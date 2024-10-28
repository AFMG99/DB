import '../assets/css/formStyles.css'
import "../assets/css/loginStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useRef, useState, useEffect } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import spanishLanguage from "../assets/datatableSpanish";
import { ventas } from '../Service/Services'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/img/nova.jpg'
import XLSX from 'xlsx-js-style';

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

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.addImage(logo, 'PNG', 10, 8, 30, 30);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text("Reporte de Ventas", pageWidth / 2, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text("NOVA TRAVEL", pageWidth / 2, 28, { align: 'center' });
        doc.text(`Fecha de generación: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth / 2, 35, { align: 'center' });
        doc.setLineWidth(0.5);
        doc.line(10, 40, pageWidth - 10, 40);

        const tableColumn = columns.map(col => col.title);

        const tableRows = dataVentas.map(venta => [
            venta.Id_venta,
            venta.Origen,
            venta.Destino,
            venta.Descripcion,
            venta.Nombre_Cliente,
            venta.Nombre_Aeropuerto,
            venta.Valor
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
                1: { cellWidth: 22 },
                2: { cellWidth: 22 },
                3: { cellWidth: 30 },
                4: { cellWidth: 30 },
                5: { cellWidth: 45 },
                6: { cellWidth: 15 },
            },
            margin: { top: 45 },
        });

        doc.setFontSize(10);
        doc.text(`Página ${doc.internal.getNumberOfPages()}`, pageWidth - 10, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
        doc.save('ventas_reporte.pdf');
    }

    const handleGenerateExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet([]);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.sheet_add_aoa(worksheet, [
            [
                `Reporte de Ventas\nNOVA TRAVEL\nFecha de generación: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
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

        const dataRows = dataVentas.map(venta => [
            venta.Id_venta,
            venta.Origen,
            venta.Destino,
            venta.Descripcion,
            venta.Nombre_Cliente,
            venta.Nombre_Aeropuerto,
            venta.Valor
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

        XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");
        XLSX.writeFile(workbook, "ventas_reporte.xlsx");
    };

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
                                    <FontAwesomeIcon icon={faFilePdf} fontSize={25} onClick={handleGeneratePDF} />
                                </button>
                                <button className='btn btnIconInform' >
                                    <FontAwesomeIcon icon={faFileExcel} fontSize={25} onClick={handleGenerateExcel} />
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
