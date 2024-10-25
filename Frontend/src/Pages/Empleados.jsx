import React, { useState, useEffect, useRef } from "react";
import { crearEmpleado, getAllEmpleados, consultarEmpleado, modificarEmpleado } from '../Service/Services';
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import spanishLanguage from "../assets/datatableSpanish";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faFile, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import '../assets/css/formStyles.css';

const Empleados = () => {
  DataTable.use(DT);
  const btnFinForm = useRef(null);
  const documentoidRef = useRef(null);
  const tipoRef = useRef(null);
  const primerNomRef = useRef(null);
  const segundoNomRef = useRef(null);
  const primerApeRef = useRef(null);
  const segundoApeRef = useRef(null);
  const fechaRef = useRef(null);
  const tableRef = useRef(null);

  const [empleados, setEmpleados] = useState([]);
  const [accion, setAccion] = useState("Nuevo");
  const [btnNewDisabled, setBtnNewDisabled] = useState(false);
  const [btnEditDisabled, setBtnEditDisabled] = useState(true);
  const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
  const [btnSend, setBtnSend] = useState(true);

  const [inputDocumentoId, setInputDocumentoId] = useState('');
  const [inputTipo, setInputTipo] = useState('CC');
  const [inputPrimerNom, setInputPrimerNom] = useState('');
  const [inputSegundoNom, setInputSegundoNom] = useState('');
  const [inputPrimerApe, setInputPrimerApe] = useState('');
  const [inputSegundoApe, setInputSegundoApe] = useState('');
  const [inputFecha, setInputFecha] = useState('');

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const data = await getAllEmpleados();
        const formattedData = data.map(empleado => ({
          ...empleado,
          Fecha_nacimiento: empleado.Fecha_nacimiento.split('T')[0],
        }));
        setEmpleados(formattedData);
      } catch (error) {
        console.log("Error al obtener empleados:", error);
      }
    };
    fetchEmpleados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const empleado = {
        Tipo_doc: inputTipo,
        Id_empleado: inputDocumentoId,
        Primer_nom: inputPrimerNom,
        Segundo_nom: inputSegundoNom,
        Primer_apellido: inputPrimerApe,
        Segundo_apellido: inputSegundoApe,
        Fecha_nacimiento: inputFecha,
      };

      if (accion === 'Nuevo') {
        await crearEmpleado(empleado);
        alert("Empleado agregado exitosamente");
      } else if (accion === 'Editar') {
        await modificarEmpleado(empleado);
        alert("Empleado actualizado exitosamente");
      } 

      const data = await getAllEmpleados();
        const formattedData = data.map(empleado => ({
          ...empleado,
          Fecha_nacimiento: empleado.Fecha_nacimiento.split('T')[0],
        }));
      
        setEmpleados(formattedData);
        handleClickCancel();
    } catch (error) {
      console.error("Error al procesar empleado:", error);
    }
  };

  const handleClickNew = () => {
    setBtnNewDisabled(true);
    setBtnCancelDisabled(false);
    setBtnSend(false);
    setInputTipo('');
    setInputDocumentoId('');
    setInputPrimerNom('');
    setInputSegundoNom('');
    setInputPrimerApe('');
    setInputSegundoApe('');
    setInputFecha('');
    setAccion("Nuevo");
  };

  const handleClickCancel = () => {
    setBtnNewDisabled(false);
    setBtnCancelDisabled(true);
    setBtnEditDisabled(true);
    setBtnSend(true);
    setInputTipo('');
    setInputDocumentoId('');
    setInputPrimerNom('');
    setInputSegundoNom('');
    setInputPrimerApe('');
    setInputSegundoApe('');
    setInputFecha('');
    setAccion("Nuevo");

    const table = $(tableRef.current).DataTable();
    table.rows({ selected: true }).deselect();
    setSelectedData('')
  };

  const handleClickEdit = () => {
    setBtnNewDisabled(true);
    setBtnCancelDisabled(false);
    setBtnSend(false);
    setBtnEditDisabled(true);
    setAccion('Editar')
  };

  const columns = [
    { title: "Tipo Doc", data: "Tipo_doc" },
    { title: "Cedula", data: "Id_empleado" },
    { title: "Primer Nombre", data: "Primer_nom" },
    { title: "Segundo Nombre", data: "Segundo_nom" },
    { title: "Primer Apellido", data: "Primer_apellido" },
    { title: "Segundo Apellido", data: "Segundo_apellido" },
    { title: "Fecha Nacimiento", data: "Fecha_nacimiento" },
  ];

  const handleRowSelect = (event, dt, type, indexes) => {
    const data = dt.data();
    setBtnEditDisabled(false);
    setInputTipo(data.Tipo_doc)
    setInputDocumentoId(data.Id_empleado)
    setInputPrimerNom(data.Primer_nom)
    setInputSegundoNom(data.Segundo_nom)
    setInputPrimerApe(data.Primer_apellido)
    setInputSegundoApe(data.Segundo_apellido)
    setInputFecha(data.Fecha_nacimiento)
  };

  return (
    <>
      <div className="containerPrincipal col-12">
        <div className="containerFormTable col-11">
          <div className="containerPart col-5">
            <div className="containerButton col-12">
              <button
                className="btn btnControlFrom"
                disabled={btnNewDisabled}
                onClick={handleClickNew}
              >
                <FontAwesomeIcon icon={faFile} /> Nuevo
              </button>
              <button
                className="btn btnControlFrom"
                disabled={btnEditDisabled}
                onClick={handleClickEdit}
              >
                <FontAwesomeIcon icon={faPenToSquare} /> Editar
              </button>
              <button
                className="btn btnControlFrom"
                disabled={btnCancelDisabled}
                onClick={handleClickCancel}
              >
                <FontAwesomeIcon icon={faXmark} /> Cancelar
              </button>
            </div>

            <div className="container mt-5">
              <form onSubmit={handleSubmit}>
                <div className="col-12">
                  <label className="form-label">Tipo Doc</label>
                </div>
                <div className="col-12">
                  <select
                    className="form-control inputLogin"
                    disabled={btnCancelDisabled}
                    value={inputTipo}
                    onChange={(e) => setInputTipo(e.target.value)}
                  >
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="NIT">NIT</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Cedula</label>
                </div>
                <div className="col-12">
                  <input
                    ref={documentoidRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese Cedula"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputDocumentoId}
                    onChange={(e) => setInputDocumentoId(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Primer Nombre</label>
                </div>
                <div className="col-12">
                  <input
                    ref={primerNomRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese Primer Nombre"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputPrimerNom}
                    onChange={(e) => setInputPrimerNom(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Segundo Nombre</label>
                </div>
                <div className="col-12">
                  <input
                    ref={segundoNomRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese Segundo Nombre"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputSegundoNom}
                    onChange={(e) => setInputSegundoNom(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Primer Apellido</label>
                </div>
                <div className="col-12">
                  <input
                    ref={primerApeRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese Primer Apellido"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputPrimerApe}
                    onChange={(e) => setInputPrimerApe(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Segundo Apellido</label>
                </div>
                <div className="col-12">
                  <input
                    ref={segundoApeRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese Segundo Apellido"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputSegundoApe}
                    onChange={(e) => setInputSegundoApe(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Fecha de Nacimiento.</label>
                </div>
                <div className="col-12">
                  <input
                    ref={fechaRef}
                    className="form-control inputLogin"
                    type="date"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputFecha}
                    onChange={(e) => setInputFecha(e.target.value)}
                  />
                </div>

                <br />
                <button
                  ref={btnFinForm}
                  type="submit"
                  className="btn w-100 btnGuardar"
                  disabled={btnSend}
                >
                  {(accion == "Editar") ? "Actualizar" : "Agregar"}
                </button>
              </form>
            </div>
          </div>

          <div className="containerPart12 col-7">
            <div className="container">
              <DataTable
                data={empleados}
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
                    <th>Tipo Doc.</th>
                    <th>Cedula</th>
                    <th>Primer Nombre</th>
                    <th>Segundo Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Fecha Nacimiento</th>
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

export default Empleados;