import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR
} from "../types";

import clienteAxios from "../config/axios";

// crear un nuevo producto - Funcion principal

export function crearNuevoProductoAction(producto) {
    return dispatch => {
        dispatch(nuevoProducto());

        // Insertar en la API
        clienteAxios
            .post("/Libros", producto)
            .then(respuesta => {
                console.log(respuesta);
                // Si se inserta correctamente
                dispatch(agregarProductoExito(producto));
            })
            .catch(error => {
                console.log(error);
                // si hay un error
                dispatch(agregarProductoError());
            });
    };
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

export const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR
});

// Obtener Listado de productos (consultar API)

export function obtenerProductosAction() {
    return dispatch => {
        dispatch(obtenerProductosComienzo());

        // consultar la API
        clienteAxios
            .get("/libros")
            .then(respuesta => {
                // console.log(respuesta);
                dispatch(descargaProductosExitosa(respuesta.data));
            })
            .catch(error => {
                // console.log(error);
                dispatch(descargaProductoError());
            });
    };
}

export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
});

export const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos
});

export const descargaProductoError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
});

// funcion para eliminar un producto especifico

export function borrarProductoAction(id) {
    return dispatch => {
        dispatch(obtenerProductoEliminar());

        // Eliminar en la api
        clienteAxios
            .delete(`/libros/${id}`)
            .then(respuesta => {
                // console.log(respuesta);
                if (respuesta.status === 200 && respuesta.statusText === "OK")
                    dispatch(eliminarProductoExito(id));
            })
            .catch(error => {
                // console.log(error);
                dispatch(eliminarProductoError());
            });
    };
}

export const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
});

export const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
});

export const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    error: true
});
