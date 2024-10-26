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
// import { getAllUsers } from "../../services/userService";
import { crearMueble, muebles, modificarMueble } from '../Service/Services';

const Mueble = () => {
  DataTable.use(DT);
  const documentoidRef = useRef(null);
  const nombreRef = useRef(null);
  const usuarioRef = useRef(null);
  const passwordRef = useRef(null);
  const btnFinForm = useRef(null);
  const tableRef = useRef(null);

  const [dataUsers, setDataUsers] = useState([]);
  const [accion, setAccion] = useState("Nuevo");
  const [btnNewDisabled, setBtnNewDisabled] = useState(false);
  const [btnEditDisabled, setBtnEditDisabled] = useState(true);
  const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
  const [btnSend, setBtnSend] = useState(true);



  //
  // const [muebles, setMuebles] = useState([]);
  const [inputIdMueble, setinputIdMueble] = useState("");
  const [inputNombre, setinputNombre] = useState("");
  const [inputTipo, setinputTipo] = useState("");
  const [inputEstado, setinputEstado] = useState("");
  const [inputFechaAdquisicion, setinputFechaAdquisicion] = useState("");
  const [inputValorCompra, setinputValorCompra] = useState("");
  const [inputIdSede, setinputIdSede] = useState("");


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


    setinputIdMueble("");
    setinputNombre("");
    setinputTipo("");
    setinputEstado("");
    setinputFechaAdquisicion("");
    setinputValorCompra("");
    setinputIdSede("");

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
      const nuevoMueble = {
        Id_mueble: inputIdMueble,
        Nombre: inputNombre,
        Tipo: inputTipo,
        Estado: inputEstado,
        Fecha_adquisicion: inputFechaAdquisicion,
        Valor_compra: inputValorCompra,
        Id_sede: inputIdSede,
      }

      // alert(accion)

      if (accion === 'Nuevo') {
        await crearMueble(nuevoMueble);
        alert("Mueble creado con éxito");
      } else if (accion === 'Editar') {
        await modificarMueble(nuevoMueble);
        alert("Mueble actualizado con éxito");
      }

      const data = await muebles();
      const formattedData = data.map(mueble => ({
        ...mueble,
        Fecha_adquisicion: mueble.Fecha_adquisicion.split('T')[0],
      }));

      setDataUsers(formattedData);
      handleClickCancel();
    } catch (error) {
      console.log("Error al crear el mueble", error);
    }
  };



  const columns = [
    { title: "Id Mueble", data: "Id_mueble" },
    { title: "Nombre", data: "Nombre" },
    { title: "Tipo", data: "Tipo" },
    { title: "Estado", data: "Estado" },
    { title: "Fecha Adquisicion", data: "Fecha_adquisicion" },
    { title: "Valor Compra", data: "Valor_compra" },
    { title: "Id Sede", data: "Id_sede" },

  ];

  const handleRowSelect = (event, dt, type, indexes) => {
    const data = dt.data();
    setBtnEditDisabled(false);

    setinputIdMueble(data.Id_mueble);
    setinputNombre(data.Nombre);
    setinputTipo(data.Tipo);
    setinputEstado(data.Estado);
    setinputFechaAdquisicion(data.Fecha_adquisicion);
    setinputValorCompra(data.Valor_compra);
    setinputIdSede(data.Id_sede);

  }


  useEffect(() => {


    const fetchUsers = async () => {
      try {
        const data = await muebles()
        const formattedData = data.map(mueble => ({
          ...mueble,
          Fecha_adquisicion: mueble.Fecha_adquisicion.split('T')[0],
        }));
        setDataUsers(formattedData)

      } catch (error) {
        alert(error)
      }
    }

    fetchUsers();
  }, [])




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
              <form onSubmit={handleSubmit} >
                <div className="col-12">
                  <label className="form-label">Id Mueble </label>
                </div>
                <div className="col-8">
                  <input
                    ref={documentoidRef}
                    className="form-control inputLogin"
                    placeholder="Ingresa Id"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputIdMueble}
                    onChange={(e) => setinputIdMueble(e.target.value)}
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
                  <label className="form-label">Tipo</label>
                </div>
                <div className="col-12">
                  <input
                    ref={usuarioRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese el Tipo"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputTipo}
                    onChange={(e) => setinputTipo(e.target.value)}
                  />
                </div>

                <div className="col-10">
                  <label className="form-label">Estado</label>
                </div>
                <div className="col-12">
                  <input
                    ref={passwordRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese el Estado"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputEstado}
                    onChange={(e) => setinputEstado(e.target.value)}
                  />
                </div>

                <div className="col-10">
                  <label className="form-label">Fecha de Adquisicion</label>
                </div>
                <div className="col-12">
                  <input
                    ref={passwordRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese la Fecha de Adquisicion"
                    disabled={btnCancelDisabled ? true : false}
                    type='date'
                    value={inputFechaAdquisicion}
                    onChange={(e) => setinputFechaAdquisicion(e.target.value)}
                  />
                </div>

                <div className="col-10">
                  <label className="form-label">Valor</label>
                </div>
                <div className="col-12">
                  <input
                    ref={passwordRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese el Valor"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputValorCompra}
                    onChange={(e) => setinputValorCompra(e.target.value)}
                  />
                </div>

                <div className="col-10">
                  <label className="form-label">Id Sede</label>
                </div>
                <div className="col-12">
                  <input
                    ref={passwordRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese el Id de la Sede"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputIdSede}
                    onChange={(e) => setinputIdSede(e.target.value)}
                  />
                </div>

                <br />
                <button
                  ref={btnFinForm}
                  type="submit"
                  className="btn w-100 btnGuardar"
                  disabled={btnSend}
                >
                  {(accion == "Editar") ? "Editar" : "Agregar"}
                </button>
              </form>
            </div>
          </div>

          <div className="containerPart12 col-7">
            <div className="container">
              <DataTable
                data={dataUsers}
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
                    <th>Id </th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Fecha Adquisicion</th>
                    <th>Valor Compra</th>
                    <th>Id Sede</th>
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
export default Mueble;
