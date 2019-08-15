import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// redux
import { useDispatch } from "react-redux";
import { borrarProductoAction } from "../actions/productosActions";

const Producto = props => {
    // console.log(props);

    const { id, nombre, precio } = props.producto;

    // Dispatch para ejecutar las funciones
    const dispatch = useDispatch();

    const confirmarEliminarProducto = id => {
        // confirmacion por sweetalert pregunta al usuario
        Swal.fire({
            title: "Estás seguro?",
            text: "No podrás revertir el proceso",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Si, borrarlo!"
        }).then(result => {
            if (result.value) {
                dispatch(borrarProductoAction(id));
                Swal.fire(
                    "Eliminado!",
                    "El producto se ha eliminado.",
                    "success"
                );
            }
        });
        // console.log(id);
    };

    return (
        <tr>
            <td>{nombre}</td>
            <td>{precio} €</td>
            <td className="acciones text-right">
                <Link
                    to={`/productos/editar/${id}`}
                    className="btn btn-primary mr-2"
                >
                    Editar
                </Link>
                <button
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default Producto;
