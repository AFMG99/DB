import '../assets/css/formStyles.css'
import "../assets/css/loginStyle.css";
// import { Nav } from "../../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useRef, useState, useEffect } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import spanishLanguage from "../assets/datatableSpanish";
import { infoNomina } from '../Service/Services'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../assets/img/nova.jpg'
import XLSX from 'xlsx-js-style';

const Nomina = () => {
  DataTable.use(DT);

  const tableRef = useRef(null);

  const [dataInforme, setDataInforme] = useState([]);

  const columns = [
    { title: 'Id Nomina', data: 'Id_nomina' },
    { title: 'Fecha Nomina', data: 'Fecha_nomina' },
    { title: 'Periodo Pago', data: 'Periodo_pago' },
    { title: 'Metodo Pago', data: 'Metodo_Pago' },
    { title: 'Nombre Sede', data: 'Nombre_Sede' },
    { title: 'Nombre Empleado', data: 'Nombre_Empleado' },
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

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.addImage(logo, 'PNG', 10, 8, 30, 30);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("Reporte de Nominas", pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("NOVA TRAVEL", pageWidth / 2, 28, { align: 'center' });
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth / 2, 35, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(10, 40, pageWidth - 10, 40);

    const tableColumn = columns.map(col => col.title);

    const tableRows = dataInforme.map(nomina => [
      nomina.Id_nomina,
      nomina.Fecha_nomina,
      nomina.Periodo_pago,
      nomina.Metodo_Pago,
      nomina.Nombre_Sede,
      nomina.Nombre_Empleado
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'striped',
      headStyles: { fillColor: [51, 0, 102] },
      styles: { halign: 'center' },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 45 },
      },
      margin: { top: 45 },
    });

    doc.setFontSize(10);
    doc.text(`Página ${doc.internal.getNumberOfPages()}`, pageWidth - 10, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
    doc.save('nomina_reporte.pdf');
  };

  const handleGenerateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([]);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.sheet_add_aoa(worksheet, [
      [
        `Reporte de Nominas\nNOVA TRAVEL\nFecha de generación: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
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

    const dataRows = dataInforme.map(nomina => [
      nomina.Id_nomina,
      nomina.Fecha_nomina,
      nomina.Periodo_pago,
      nomina.Metodo_Pago,
      nomina.Nombre_Sede,
      nomina.Nombre_Empleado
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "Nomina");
    XLSX.writeFile(workbook, "nomina_reporte.xlsx");
  };

  useEffect(() => {
    const fetchNomina = async () => {
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
              </DataTable>
              <div className='d-flex justify-content-center'>
                <button className="btn btnIconInform" onClick={handleGeneratePDF}>
                  <FontAwesomeIcon icon={faFilePdf} fontSize={25} />
                </button>
                <button className='btn btnIconInform' onClick={handleGenerateExcel}>
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
export default Nomina;

