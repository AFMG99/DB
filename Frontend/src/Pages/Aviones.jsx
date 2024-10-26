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
import { getAllAvion, insertarAvion, modificarAvion } from '../Service/Services';


const Aviones = () => {
  DataTable.use(DT);
  const placaRef = useRef(null);
  const nombreRef = useRef(null);
  const estadoRef = useRef(null);
  const fecha_adquisicionRef = useRef(null);
  const tipo_vehiculoRef = useRef(null);
  const cod_aeropuertoRef = useRef(null);
  const btnFinForm = useRef(null);
  const tableRef = useRef(null);

  const [dataAviones, setDataAviones] = useState()
  const [accion, setAccion ] = useState("Nuevo");
  const [btnNewDisabled, setBtnNewDisabled] = useState(false);
  const [btnEditDisabled, setBtnEditDisabled] = useState(true);
  const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
  const [btnSend, setBtnSend] = useState(true);

  const [inputPlaca, setinputPlaca] = useState("");
  const [inputNombre, setinputNombre] = useState("");
  const [inputEstado, setinputEstado] = useState("");
  const [inputFechaAdquision, setinputFechaAdquision] = useState("");
  const [inputTipoVehiculo, setinputTipoVehiculo] = useState("");
  const [inputCodAeropuerto, setinputCodAeropuerto] = useState("");


  const handleClickNew = () => {
    setBtnNewDisabled(true);
    setBtnCancelDisabled(false);
    setBtnSend(false);
    setAccion("Nuevo");
  };

  const handleClickCancel = () => {
    setBtnNewDisabled(false);
    setBtnCancelDisabled(true);
    setBtnEditDisabled(true);
    setBtnSend(true);
    setinputPlaca("");
    setinputNombre("");
    setinputEstado("");
    setinputFechaAdquision("");
    setinputTipoVehiculo("");
    setinputCodAeropuerto("");
    setAccion("Nuevo")

    const table = $(tableRef.current).DataTable();
    table.rows({ selected: true }).deselect();
    setSelectedData('')
  };

  const handleClickEdit = () => {
    setBtnNewDisabled(true);
    setBtnCancelDisabled(false);
    setBtnSend(false);
    setBtnEditDisabled(true)
    setAccion("Editar")
  };


  
  const handleUserKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nombreRef.current.focus(); 
    }
  };
  const handleUserBlur = () => {
    nombreRef.current.focus(); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevoAvion = {
        Placa: inputPlaca,
        Nombre: inputNombre,
        Estado: inputEstado,
        Fecha_adquisicion: inputFechaAdquision,
        Tipo_vehiculo: inputTipoVehiculo,
        Cod_aeropuerto: inputCodAeropuerto,
      }

      if (accion === 'Nuevo') {
        await insertarAvion(nuevoAvion);
        alert("Avion creado con éxito");
      } else if (accion === 'Editar') {
        await modificarAvion(nuevoAvion);
        alert("Avion actualizado con éxito");
      }

      const data = await getAllAvion();
      const formattedData = data.map(avion => ({
          ...avion,
          Fecha_adquisicion: avion.Fecha_adquisicion.split('T')[0],
      }));

      setDataAviones(formattedData);
      handleClickCancel();
    } catch (error) {
      console.log("Error al crear el avion", error);
    }
  };

  const columns = [
    { title: "Placa", data: "Placa" },
    { title: "Nombre", data: "Nombre" },
    { title: "Estado", data: "Estado" },
    { title: "Fecha Adquisicion", data: "Fecha_adquisicion" },
    { title: "Tipo Vehiculo", data: "Tipo_vehiculo" },
    { title: "Cod. Aeropuerto", data: "Cod_aeropuerto"}
  ];

  const handleRowSelect = (event, dt, type, indexes) => {
    const data = dt.data();
    setBtnEditDisabled(false);

    setinputPlaca(data.Placa)
    setinputNombre(data.Nombre)
    setinputEstado(data.Estado)
    setinputFechaAdquision(data.Fecha_adquisicion)
    setinputTipoVehiculo(data.Tipo_vehiculo)
    setinputCodAeropuerto(data.Cod_aeropuerto)
  }
  
   useEffect(()=>{
      const fetchAviones = async ()=>{
        try {
          const data = await getAllAvion();
          const formattedData = data.map(avion => ({
            ...avion,
            Fecha_adquisicion: avion.Fecha_adquisicion.split('T')[0],
          }));
          setDataAviones(formattedData);
        } catch (error) {
          setError(error);
        }
       }
       fetchAviones();
   }, []);

    
  
  return (
    <>
      {/* <Nav /> */}

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
              <form  onSubmit={handleSubmit} >
                <div className="col-10">
                  <label className="form-label">Placa</label>
                </div>
                <div className="col-12">
                  <input
                    ref={placaRef}
                    className="form-control inputLogin"
                    placeholder="Ingresa Placa"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputPlaca}
                    onChange={(e) => setinputPlaca(e.target.value)}
                    onBlur={handleUserBlur}
                    onKeyDown={handleUserKeyDown}
                  />
                </div>

                <div className="col-10">
                  <label className="form-label">Nombre</label>
                </div>
                <div className="col-12">
                  <input
                    ref={nombreRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese Nombre"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputNombre}
                    onChange={(e) => setinputNombre(e.target.value)}
                  />
                </div>

                <div className="col-10">
                  <label className="form-label">Estado</label>
                </div>
                <div className="col-12">
                  <input
                  ref={estadoRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese el estado"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputEstado}
                    onChange={(e) => setinputEstado(e.target.value)}
                  />
                </div>

                <div className="col-10">
                  <label className="form-label">Fecha Adquisición</label>
                </div>
                <div className="col-12">
                  <input
                    ref={fecha_adquisicionRef}
                    className="form-control inputLogin"
                    placeholder="Fecha"
                    disabled={btnCancelDisabled ? true : false}
                    type='date'
                    value={inputFechaAdquision}
                    onChange={(e) => setinputFechaAdquision(e.target.value)}
                  />
                </div>

                <div className="col-10">
                  <label className="form-label">Tipo Vehiculo</label>
                </div>
                <div className="col-12">
                  <input
                    ref={tipo_vehiculoRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese el tipo de vehiculo"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputTipoVehiculo}
                    onChange={(e) => setinputTipoVehiculo(e.target.value)}
                  />
                </div>

                
                <div className="col-10">
                  <label className="form-label">Codigo de Aeropuerto</label>
                </div>
                <div className="col-12">
                  <input
                    ref={cod_aeropuertoRef}
                    className="form-control inputLogin"
                    placeholder="Codigo"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputCodAeropuerto}
                    onChange={(e) => setinputCodAeropuerto(e.target.value)}
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
                data={dataAviones}
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
                    <th>Placa</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Fecha Adquisición</th>
                    <th>Tipo de vehiculo</th>
                    <th>Codigo del Aeropuerto</th>
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
export default Aviones;
