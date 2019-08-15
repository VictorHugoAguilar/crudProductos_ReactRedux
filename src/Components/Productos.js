import React, { useEffect } from "react";

// Importamos componentes
import ProductoU from "./Producto";

// redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAction } from "../actions/productosActions";

const Productos = () => {
    // llamar la accion principal para retornar los productos
    const dispatch = useDispatch();

    useEffect(() => {
        // Productos cuando el componente esta listo
        const cargaProductos = () => dispatch(obtenerProductosAction());
        cargaProductos();
    }, []);

    // Acceder al state
    const loading = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const productos = useSelector(state => state.productos.productos);

    return (
        <React.Fragment>
            {error ? (
                <div className="font-weight-bold alert alert-danger text-center mt-4">
                    Se ha producido un fallo en la consulta
                </div>
            ) : (
                <div>
                    <h2 className="text-center my-5">Listado de Productos</h2>
                    <table className="table table-striped">
                        <thead className="bg-primary table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col" className="text-right pr-5">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(producto => (
                                <ProductoU
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))}
                        </tbody>
                    </table>
                    {loading ? (
                        <div className="text-center">
                            <div
                                className="spinner-border text-secondary"
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </React.Fragment>
    );
};

export default Productos;
