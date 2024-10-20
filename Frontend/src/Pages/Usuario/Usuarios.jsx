import '../../assets/css/formStyles.css'

import "../../assets/css/loginStyle.css";
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
import spanishLanguage from "../../assets/datatableSpanish";
// import { getAllUsers } from "../../services/userService";

const Usuarios = () => {
  DataTable.use(DT);
  const documentoidRef = useRef(null);
  const nombreRef = useRef(null);
  const usuarioRef = useRef(null);
  const passwordRef = useRef(null);
  const btnFinForm = useRef(null);

  const tableRef = useRef(null);

  const [dataUsers, setDataUsers] = useState()
  const [accion, setAccion ] = useState("Nuevo");
  const [btnNewDisabled, setBtnNewDisabled] = useState(false);
  const [btnEditDisabled, setBtnEditDisabled] = useState(true);
  const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
  const [btnSend, setBtnSend] = useState(true);

  const [inputDocumentoId, setinputDocumentoId] = useState("");
  const [inputNombre, setinputNombre] = useState("");
  const [inputUsuario, setinputUsuario] = useState("");
  const [inputPassword, setinputPassword] = useState("");


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
    setinputDocumentoId("");
    setinputNombre("");
    setinputUsuario("");
    setinputPassword("");
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

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const columns = [
    { title: "Documento", data: "Documento" },
    { title: "Nombre", data: "Nombres" },
    { title: "Usuario", data: "Usuario" },
    { title: "Contraseña", data: "Password" },
  ];

  const handleRowSelect = (event, dt, type, indexes) => {
    const data = dt.data();
    setBtnEditDisabled(false);
    setinputDocumentoId(data.Documento)
    setinputNombre(data.Nombres)
    setinputUsuario(data.Usuario)
    setinputPassword(data.Password)
  }
  
  //   useEffect(() => {
  //   const fetchUsers = async ()=>{
  //     try { 
  //         const datos = await getAllUsers()
  //         setDataUsers(datos)
  //     } catch (error) {
  //       alert(error)
  //     }
  //   }

  //   fetchUsers();
  // }, [])
  



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
                <div className="col-1">
                  <label className="form-label">DocumentoID</label>
                </div>
                <div className="col-12">
                  <input
                    ref={documentoidRef}
                    className="form-control inputLogin"
                    placeholder="Ingresa Documento"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputDocumentoId}
                    onChange={(e) => setinputDocumentoId(e.target.value)}
                    onBlur={handleUserBlur}
                    onKeyDown={handleUserKeyDown}
                  />
                </div>

                <div className="col-1">
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

                <div className="col-1">
                  <label className="form-label">Usuario</label>
                </div>
                <div className="col-12">
                  <input
                  ref={usuarioRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese Usuario"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputUsuario}
                    onChange={(e) => setinputUsuario(e.target.value)}
                  />
                </div>

                <div className="col-1">
                  <label className="form-label">Contraseña</label>
                </div>
                <div className="col-12">
                  <input
                    ref={passwordRef}
                    className="form-control inputLogin"
                    placeholder="Ingrese Contraseña"
                    disabled={btnCancelDisabled ? true : false}
                    value={inputPassword}
                    onChange={(e) => setinputPassword(e.target.value)}
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
                    <th>Documento</th>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Contraseña</th>
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
export default Usuarios;
