import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITOSA,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from "../types";

import clienteAxios from "../config/axios";
// Importamos sweetaler2
import Swal from "sweetalert2";

// crear un nuevo producto - Funcion principal

export function crearNuevoProductoAction(producto) {
    return dispatch => {
        dispatch(nuevoProducto());

        // Insertar en la API
        clienteAxios
            .post("/Libros", producto)
            .then(respuesta => {
                // console.log(respuesta);
                // Si se inserta correctamente se envia el que devuelve la api como añadido
                dispatch(agregarProductoExito(respuesta.data));
                // mensaje de alerta
                Swal.fire(
                    "Insertado",
                    "El producto se insertado correctamente",
                    "success"
                );
            })
            .catch(error => {
                // console.log(error);
                // si hay un error
                dispatch(agregarProductoError());
                Swal.fire(
                    "Error",
                    `Se ha producido un fallo en el almacenamiento ${error}`,
                    "error"
                );
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

// Obtener el producto a editar

export function obtenerProductoEditarAction(id) {
    return dispatch => {
        dispatch(obtenerProductoAction());

        //obtener producto de la api
        clienteAxios
            .get(`/libros/${id}`)
            .then(respuesta => {
                // console.log(respuesta.data);
                dispatch(editarProductoExito(respuesta.data));
            })
            .catch(error => {
                // console.log(error);
                dispatch(editarProductoError());
            });
    };
}

export const obtenerProductoAction = () => ({
    type: OBTENER_PRODUCTO_EDITAR
});

export const editarProductoExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
});

export const editarProductoError = () => ({
    type: PRODUCTO_EDITAR_ERROR,
    error: true
});

// modifica un producto en la API y state

export function editarProductoAction(producto) {
    return dispatch => {
        dispatch(comenzarEdicionProducto());

        // Consultar API
        clienteAxios
            .put(`/libros/${producto.id}`, producto)
            .then(respuesta => {
                // console.log(respuesta);
                // pasamos la respuesta porque ya vienen con los cambios de la api
                dispatch(editadoProductoExito(respuesta.data));
                Swal.fire(
                    "Modificado",
                    "El producto se modifico correctamente",
                    "success"
                );
            })
            .catch(error => {
                // console.log(error);
                dispatch(editadoProductoError());
                Swal.fire(
                    "Error",
                    `${error}`,
                    "error"
                );
            });
    };
}

export const comenzarEdicionProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
});

export const editadoProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

export const editadoProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    error: true
});
