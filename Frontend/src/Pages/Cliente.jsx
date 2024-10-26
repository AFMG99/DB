import React, { useEffect, useState, useRef } from 'react'
import { clientes, crearCliente, modificarCliente } from '../Service/Services'
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import spanishLanguage from "../assets/datatableSpanish";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faFile, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import '../assets/css/formStyles.css';

const Cliente = () => {
    DataTable.use(DT);
    const btnFinForm = useRef(null);
    const clienteDocRef = useRef(null);
    const nombreRef = useRef(null);
    const contactoRef = useRef(null);
    const tableRef = useRef(null);

    const [dataClientes, setDataClientes] = useState([]);
    const [accion, setAccion] = useState("Nuevo");
    const [btnNewDisabled, setBtnNewDisabled] = useState(false);
    const [btnEditDisabled, setBtnEditDisabled] = useState(true);
    const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
    const [btnSend, setBtnSend] = useState(true);

    const [inputDocCliente, setInputDocCliente] = useState('');
    const [inputNombre, setInputNombre] = useState('');
    const [inputContacto, setInputContacto] = useState('');

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await clientes();
                setDataClientes(data);
            } catch (error) {
                console.log('Error al obtener clientes:', error);
            }
        };
        fetchClientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cliente = {
                Doc_cliente: inputDocCliente,
                Nombre: inputNombre,
                Contacto: inputContacto,
            };

            if (accion === 'Nuevo') {
                await crearCliente(cliente);
                alert('Cliente agregado exitosamente');
            } else if (accion === 'Editar') {
                await modificarCliente(cliente);
                alert('Cliente actualizado exitosamente');
            }

            const data = await clientes();
            setDataClientes(data);
            handleClickCancel();
        } catch (error) {
            console.error("Error al procesar cliente:", error);
        }
    };

    const handleClickNew = () => {
        setBtnNewDisabled(true);
        setBtnCancelDisabled(false);
        setBtnSend(false);
        setInputDocCliente('');
        setInputNombre('');
        setInputContacto('');
        setAccion("Nuevo");
    };

    const handleClickCancel = () => {
        setBtnNewDisabled(false);
        setBtnCancelDisabled(true);
        setBtnEditDisabled(true);
        setBtnSend(true);
        setInputDocCliente('');
        setInputNombre('');
        setInputContacto('');
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
        setAccion('Editar')
    };

    const columns = [
        { title: "Doc cliente", data: "Doc_cliente" },
        { title: "Nombre", data: "Nombre" },
        { title: "Contacto", data: "Contacto" },
    ];

    const handleRowSelect = (event, dt, type, indexes) => {
        const data = dt.data();
        setBtnEditDisabled(false);
        setInputDocCliente(data.Doc_cliente)
        setInputNombre(data.Nombre)
        setInputContacto(data.Contacto)
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
                                    <label className="form-label">Doc Cliente</label>
                                </div>
                                <div className="col-12">
                                    <input
                                        ref={clienteDocRef}
                                        className="form-control inputLogin"
                                        placeholder="Ingrese Doc Cliente"
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputDocCliente}
                                        onChange={(e) => setInputDocCliente(e.target.value)}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Nombre</label>
                                </div>
                                <div className="col-12">
                                    <input
                                        ref={nombreRef}
                                        className="form-control inputLogin"
                                        placeholder="Ingrese Nombre"
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputNombre}
                                        onChange={(e) => setInputNombre(e.target.value)}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Contacto</label>
                                </div>
                                <div className="col-12">
                                    <input
                                        ref={contactoRef}
                                        className="form-control inputLogin"
                                        placeholder="Ingrese Contacto"
                                        disabled={btnCancelDisabled ? true : false}
                                        value={inputContacto}
                                        onChange={(e) => setInputContacto(e.target.value)}
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
                                data={dataClientes}
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
                                        <th>Doc Cliente</th>
                                        <th>Nombre</th>
                                        <th>Contacto</th>
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

export default Cliente
