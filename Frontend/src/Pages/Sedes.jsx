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
import { getAllSedes, crearSede } from "../Service/Services";

const Sedes = () => {
    DataTable.use(DT);
    const tableRef = useRef(null);

    const [dataSedes, setDataSedes] = useState([]);
    const [accion, setAccion] = useState("Nuevo");
    const [btnNewDisabled, setBtnNewDisabled] = useState(false);
    const [btnEditDisabled, setBtnEditDisabled] = useState(true);
    const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
    const [btnSend, setBtnSend] = useState(true);

    const [formData, setFormData] = useState({
        Id_sede: "",
        Nombre: "",
        Servicio: "",
        Capacidad: "",
        Num_empleado: "",
        Horario_inicio: "",
        Horario_final: "",
        NIT: "",
    });

    useEffect(() => {
        const fetchSedes = async () => {
            try {
                const datos = await getAllSedes();
                const datosFormateados = datos.map((sede) => ({
                    ...sede,
                    Horario_inicio: formatHour(sede.Horario_inicio),
                    Horario_final: formatHour(sede.Horario_final),
                }));
                console.log(datosFormateados);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearSede(formData);
            alert("Sede creada con éxito");
            const datosActualizados = await getAllSedes();
            const datosFormateados = datosActualizados.map((sede) => ({
                ...sede,
                Horario_inicio: formatHour(sede.Horario_inicio),
                Horario_final: formatHour(sede.Horario_final),
            }));
            setDataSedes(datosFormateados);
            handleClickCancel();
        } catch (error) {
            console.log("Error al crear sede:", error);
        }
    };

    const handleClickNew = () => {
        setBtnNewDisabled(true);
        setBtnCancelDisabled(false);
        setBtnSend(false);
        setAccion("Nuevo");
        setFormData({
            Id_sede: "",
            Nombre: "",
            Servicio: "",
            Capacidad: "",
            Num_empleado: "",
            Horario_inicio: "",
            Horario_final: "",
            NIT: "",
        });
    };

    const handleClickCancel = () => {
        setBtnNewDisabled(false);
        setBtnCancelDisabled(true);
        setBtnEditDisabled(true);
        setBtnSend(true);
        setAccion("Nuevo");
        setFormData({
            Id_sede: "",
            Nombre: "",
            Servicio: "",
            Capacidad: "",
            Num_empleado: "",
            Horario_inicio: "",
            Horario_final: "",
            NIT: "",
        });
        const table = $(tableRef.current).DataTable();
        table.rows({ selected: true }).deselect();
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

    return (
        <div className="containerPrincipal col-12">
            <div className="containerFormTable col-11">
                <div className="containerPart col-5">
                    <div className="containerButton col-12">
                        <button className="btn btnControlFrom" disabled={btnNewDisabled} onClick={handleClickNew}>
                            <FontAwesomeIcon icon={faFile} /> Nuevo
                        </button>
                        <button className="btn btnControlFrom" disabled={btnEditDisabled} onClick={handleClickEdit}>
                            <FontAwesomeIcon icon={faPenToSquare} /> Editar
                        </button>
                        <button className="btn btnControlFrom" disabled={btnCancelDisabled} onClick={handleClickCancel}>
                            <FontAwesomeIcon icon={faXmark} /> Cancelar
                        </button>
                    </div>

                    <div className="container mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label className="form-label">ID Sede</label>
                                <input
                                    className="form-control inputLogin"
                                    placeholder="Ingrese ID"
                                    name="Id_sede"
                                    value={formData.Id_sede}
                                    onChange={handleInputChange}
                                    disabled={btnCancelDisabled}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Nombre</label>
                                <input
                                    className="form-control inputLogin"
                                    placeholder="Ingrese Nombre"
                                    name="Nombre"
                                    value={formData.Nombre}
                                    onChange={handleInputChange}
                                    disabled={btnCancelDisabled}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Servicio</label>
                                <input
                                    className="form-control inputLogin"
                                    placeholder="Ingrese Servicio"
                                    name="Servicio"
                                    value={formData.Servicio}
                                    onChange={handleInputChange}
                                    disabled={btnCancelDisabled}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Capacidad</label>
                                <input
                                    className="form-control inputLogin"
                                    placeholder="Ingrese Capacidad"
                                    name="Capacidad"
                                    value={formData.Capacidad}
                                    onChange={handleInputChange}
                                    disabled={btnCancelDisabled}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Número de Empleados</label>
                                <input
                                    className="form-control inputLogin"
                                    placeholder="Ingrese Número de Empleados"
                                    name="Num_empleado"
                                    value={formData.Num_empleado}
                                    onChange={handleInputChange}
                                    disabled={btnCancelDisabled}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Hora Inicio</label>
                                <input
                                    className="form-control inputLogin"
                                    type="time"
                                    name="Horario_inicio"
                                    value={formData.Horario_inicio}
                                    onChange={handleInputChange}
                                    disabled={btnCancelDisabled}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Hora Fin</label>
                                <input
                                    className="form-control inputLogin"
                                    type="time"
                                    name="Horario_final"
                                    value={formData.Horario_final}
                                    onChange={handleInputChange}
                                    disabled={btnCancelDisabled}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">NIT</label>
                                <input
                                    className="form-control inputLogin"
                                    placeholder="Ingrese NIT"
                                    name="NIT"
                                    value={formData.NIT}
                                    onChange={handleInputChange}
                                    disabled={btnCancelDisabled}
                                />
                            </div>

                            <div className="containerButton col-12 mt-5">
                                <button className="btn btnControlFrom" disabled={btnSend} type="submit">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-7">
                    <DataTable
                        ref={tableRef}
                        data={dataSedes}
                        columns={columns}
                        options={{
                            language: spanishLanguage,
                            select: true,
                            responsive: true,
                            paging: true,
                            searching: true,
                            ordering: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sedes;
