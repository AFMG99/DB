import '../assets/css/formStyles.css';
import "../assets/css/loginStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faFile, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import spanishLanguage from "../assets/datatableSpanish";
import { getAllSedes, crearSede, modificarSede } from "../Service/Services";

const Sedes = () => {
    DataTable.use(DT);
    const btnFinForm = useRef(null);
    const sedeidRef = useRef(null);
    const nombreRef = useRef(null);
    const servicioRef = useRef(null);
    const capacidadRef = useRef(null);
    const numEmpleadoRef = useRef(null);
    const horarioInicioRef = useRef(null);
    const horarioFinRef = useRef(null);
    const nitRef = useRef(null);
    const tableRef = useRef(null);

    const [dataSedes, setDataSedes] = useState([]);
    const [accion, setAccion] = useState("Nuevo");
    const [btnNewDisabled, setBtnNewDisabled] = useState(false);
    const [btnEditDisabled, setBtnEditDisabled] = useState(true);
    const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
    const [btnSend, setBtnSend] = useState(true);

    const [inputSedeId, setInputSedeId] = useState('');
    const [inputNombre, setInputNombre] = useState('');
    const [inputServicio, setInputServicio] = useState('');
    const [inputCapacidad, setInputCapacidad] = useState('');
    const [inputNumEmpleado, setInputNumEmpleado] = useState('');
    const [inputHorarioInicio, setInputHorarioInicio] = useState('');
    const [inputHorarioFIn, setInputHorarioFin] = useState('');
    const [inputNit, setInputNit] = useState('');

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const datos = await getAllSedes();
                const datosFormateados = datos.map((sede) => ({
                    ...sede,
                    Horario_inicio: formatHour(sede.Horario_inicio),
                    Horario_final: formatHour(sede.Horario_final),
                }));
                setDataSedes(datosFormateados);
            } catch (error) {
                console.log("Error al obtener las sedes:", error);
            }
        };
        fetchSedes();
    }, []);

    const formatHour = (timeString) => {
        if (!timeString) return '00:00:00';

        const date = new Date(timeString);

        if (isNaN(date.getTime())) {
            return '00:00:00';
        }

        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const sede = {
                Id_sede: inputSedeId,
                Nombre: inputNombre,
                Servicio: inputServicio,
                Capacidad: inputCapacidad,
                Num_empleado: inputNumEmpleado,
                Horario_inicio: inputHorarioInicio,
                Horario_final: inputHorarioFIn,
                NIT: inputNit,
            };

            if (accion === 'Nuevo') {
                await crearSede(sede);
                alert('Sede agregada exitosamente');
            } else if (accion === 'Editar') {
                await modificarSede(sede);
                alert('Sede actualizada exitosamente');
            }

            const data = await getAllSedes();
            const formattedData = data.map((sede) => ({
                ...sede,
                Horario_inicio: formatHour(sede.Horario_inicio),
                Horario_final: formatHour(sede.Horario_final),
            }));
            setDataSedes(formattedData);
            handleClickCancel();
        } catch (error) {
            console.log("Error al procesar sede:", error);
        }
    };

    const handleClickNew = () => {
        setBtnNewDisabled(true);
        setBtnCancelDisabled(false);
        setBtnSend(false);
        setInputSedeId('');
        setInputNombre('');
        setInputServicio('');
        setInputCapacidad('');
        setInputNumEmpleado('');
        setInputHorarioInicio('');
        setInputHorarioFin('');
        setInputNit('');
        setAccion("Nuevo");
    };

    const handleClickCancel = () => {
        setBtnNewDisabled(false);
        setBtnCancelDisabled(true);
        setBtnEditDisabled(true);
        setBtnSend(true);
        setInputSedeId('');
        setInputNombre('');
        setInputServicio('');
        setInputCapacidad('');
        setInputNumEmpleado('');
        setInputHorarioInicio('');
        setInputHorarioFin('');
        setInputNit('');
        setAccion("Nuevo");

        const table = $(tableRef.current).DataTable();
        table.rows({ selected: true }).deselect();
        setSelectedData('');
    };

    const handleClickEdit = () => {
        setBtnNewDisabled(true);
        setBtnCancelDisabled(false);
        setBtnSend(false);
        setBtnEditDisabled(true);
        setAccion("Editar");
    };

    const columns = [
        { title: "ID", data: "Id_sede" },
        { title: "Nombre", data: "Nombre" },
        { title: "Servicio", data: "Servicio" },
        { title: "Capacidad", data: "Capacidad" },
        { title: "Número Empleados", data: "Num_empleado" },
        { title: "Hora Inicio", data: "Horario_inicio" },
        { title: "Hora Final", data: "Horario_final" },
        { title: "NIT", data: "NIT" },
    ];

    const handleRowSelect = (event, dt, type, indexes) => {
        const data = dt.data();
        setBtnEditDisabled(false);
        setInputSedeId(data.Id_sede)
        setInputNombre(data.Nombre)
        setInputServicio(data.Servicio)
        setInputCapacidad(data.Capacidad)
        setInputNumEmpleado(data.Num_empleado)
        setInputHorarioInicio(data.Horario_inicio)
        setInputHorarioFin(data.Horario_final)
        setInputNit(data.NIT)
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

                                <div className="row">
                                <div className="col-3">
                                    <label className="form-label">ID Sede</label>
                                    <input
                                        ref={sedeidRef}
                                        className="form-control inputLogin"
                                        placeholder="Ingrese ID"
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputSedeId}
                                        onChange={(e) => setInputSedeId(e.target.value)}
                                    />
                                </div>

                                <div className="col-6">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        ref={nombreRef}
                                        className="form-control inputLogin"
                                        placeholder="Ingrese Nombre"
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputNombre}
                                        onChange={(e) => setInputNombre(e.target.value)}
                                    />
                                </div>

                                <div className="col-3">
                                    <label className="form-label">NIT</label>
                                    <input
                                        ref={nitRef}
                                        className="form-control inputLogin"
                                        placeholder="Ingrese NIT"
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputNit}
                                        onChange={(e) => setInputNit(e.target.value)}
                                    />
                                </div>
                                </div>


                                <div className="col-12">
                                    <label className="form-label">Servicio</label>
                                    <input
                                        ref={servicioRef}
                                        className="form-control inputLogin"
                                        placeholder="Ingrese Servicio"
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputServicio}
                                        onChange={(e) => setInputServicio(e.target.value)}
                                    />
                                </div>

                                <div className="row">
                                <div className="col-3">
                                    <label className="form-label">Capacidad</label>
                                    <input
                                        ref={capacidadRef}
                                        className="form-control inputLogin"
                                        type='number'
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputCapacidad}
                                        onChange={(e) => setInputCapacidad(e.target.value)}
                                    />
                                </div>

                                <div className="col-3">
                                    <label className="form-label">N. Empleados</label>
                                    <input
                                        ref={numEmpleadoRef}
                                        className="form-control inputLogin"
                                        type='number'
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputNumEmpleado}
                                        onChange={(e) => setInputNumEmpleado(e.target.value)}
                                    />
                                </div>

                                <div className="col-3">
                                    <label className="form-label">Hora Inicio</label>
                                    <input
                                        ref={horarioInicioRef}
                                        className="form-control inputLogin"
                                        type="time"
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputHorarioInicio}
                                        onChange={(e) => setInputHorarioInicio(e.target.value)}
                                    />
                                </div>

                                <div className="col-3">
                                    <label className="form-label">Hora Fin</label>
                                    <input
                                        ref={horarioFinRef}
                                        className="form-control inputLogin"
                                        type="time"
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputHorarioFIn}
                                        onChange={(e) => setInputHorarioFin(e.target.value)}
                                    />
                                </div>
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
                                data={dataSedes}
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
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Servicio</th>
                                        <th>Capacidad</th>
                                        <th>Número Empleados</th>
                                        <th>Hora Inicio</th>
                                        <th>Hora Fin</th>
                                        <th>NIT</th>
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

export default Sedes;
