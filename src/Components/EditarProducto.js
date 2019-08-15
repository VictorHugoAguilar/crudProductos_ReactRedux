import React, { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductoEditarAction } from "../actions/productosActions";

const EditarProducto = ({ match }) => {
    // Dispatch para ejecutar la acción principal
    const dispatch = useDispatch();

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

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Producto</h2>
                        <form>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Titulo"
                                    defaultValue={producto.nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Precio"
                                    defaultValue={producto.precio}
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
