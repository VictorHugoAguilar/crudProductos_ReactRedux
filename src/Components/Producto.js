import React from "react";
import { Link } from "react-router-dom";

const Producto = props => {
    // console.log(props);

    const { id, nombre, precio } = props.producto;

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
                <button className="btn btn-danger">Eliminar</button>
            </td>
        </tr>
    );
};

export default Producto;
