import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCESS,
    ADD_PRODUCT_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    COMENZAR_DESCARGA_PRODUCTOS_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear product
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto());
        try{
            //insert en api
            await clienteAxios.post('/productos', producto);
            
            // todo ok
            dispatch( agregarProductoExito(producto) )

            //alert

            Swal.fire('Correcto','El producto se agrego correctamente',
            'sucess'
            )
        }catch(error)
        {
            console.log(error)
            dispatch( agregarProductoError(true) );

            Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text: 'Hubo un problema al cargar los datos'
            }
            )
        }
    }
}

const agregarProducto = () => ({
    type: ADD_PRODUCT,

})

//sucess
const agregarProductoExito = producto =>({
    type: ADD_PRODUCT_SUCESS,
    payload: producto
})

// 
const agregarProductoError = estado => ({
    type: ADD_PRODUCT_ERROR,
    payload: estado
})

// get products

export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());

        try{
            const respuesta = await clienteAxios.get('/productos')
            console.log(respuesta.data)
            dispatch(descargaProductosExito(respuesta.data))


        } 
        catch{
            dispatch(descargaProductosError())
        }
    }

    
}
const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExito = productos => ({
    type: COMENZAR_DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})
const descargaProductosError = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// select and delete

export function borrarProductAction (id){
    return async(dispatch) =>{
        dispatch(obtenerProductoEliminar(id));

        try{
            await clienteAxios.delete('/productos/${id}');
        dispatch(eliminarProductoExito());
        }catch (error){

        }
    }
}
export const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})