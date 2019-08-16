import React, { useEffect, useRef } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
    obtenerProductoEditarAction,
    editarProductoAction
} from "../actions/productosActions";

// importamos componente de validacion
import {
    validarFormularioAction,
    validacionExito,
    validacionError
} from "../actions/validacionActions";

const EditarProducto = ({ history, match }) => {
    // crear los refs
    const nombreRef = useRef("");
    const precioRef = useRef("");

    // Dispatch para ejecutar la acción principal
    const dispatch = useDispatch();

    // crear el alias
    const editarProducto = producto => dispatch(editarProductoAction(producto));

    const validarFormulario = () => {
        dispatch(validarFormularioAction());
    };
    const exitoValidacion = () => {
        dispatch(validacionExito());
    };
    const errorValidacion = () => {
        dispatch(validacionError());
    };
    // obtener el id de editar
    const { id } = match.params;

    useEffect(() => {
        dispatch(obtenerProductoEditarAction(id));
    }, [dispatch, id]);

    // acceder al state
    const producto = useSelector(state => state.productos.producto);
    const error = useSelector(state => state.productos.error);

    // cuando carga la api
    if (!producto) return "cargando...";

    //editar producto
    const submitEditarProducto = e => {
        e.preventDefault();

        // Validar formulario
        // console.log(nombreRef.current.value);
        validarFormulario();

        if (
            nombreRef.current.value.trim() === "" ||
            precioRef.current.value.trim() === ""
        ) {
            errorValidacion();
            return;
        }
        // si no hay error
        exitoValidacion();

        // guardar cambios
        editarProducto({
            id: id,
            nombre: nombreRef.current.value,
            precio: precioRef.current.value
        });

        // redireccionar
        history.push("/");
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Producto</h2>
                        <form onSubmit={submitEditarProducto}>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Titulo"
                                    defaultValue={producto.nombre}
                                    ref={nombreRef}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Precio"
                                    defaultValue={producto.precio}
                                    ref={precioRef}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Guardar Cambios
                            </button>
                        </form>

                        {error ? (
                            <div className="font-weight-bold alert alert-danger text-center mt-4">
                                Todos los campos son obligatorios
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarProducto;
