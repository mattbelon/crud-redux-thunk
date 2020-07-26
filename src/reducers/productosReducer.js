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
} from '../types'

const initialSate = {
    productos: [],
    error: null,
    loading: false,
    productoeliminar: null
}

export default function(state = initialSate, action){
    switch(action.type){
        case COMENZAR_DESCARGA_PRODUCTOS:
        case ADD_PRODUCT:
            return{
                ...state,
                loading: true
            }
        case ADD_PRODUCT_SUCESS:
                return{
                    ...state,
                    loading: false,
                    productos: [...state.productos, action.payload]
                }
        case COMENZAR_DESCARGA_PRODUCTOS_ERROR:
        case ADD_PRODUCT_ERROR:
                    return{
                    ...state,
                    loading:false,
                    error: action.payload
                    }
        case COMENZAR_DESCARGA_PRODUCTOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoeliminar: action.payload

            }
        case PRODUCTO_ELIMINADO_EXITO:
                return {
                    ...state,
                    productos: state.productos.filter( 
                        producto => producto.id 
                        !== state.productoeliminar),
                        productoeliminar:null
                }
        default:
            return state;
    }
}