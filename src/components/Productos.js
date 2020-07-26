import React, {Fragment, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {obtenerProductosAction } from '../actions/productoActions';

import Producto from './Producto';
const Productos = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        const cargarProductos= () => dispatch(obtenerProductosAction())
        cargarProductos();
        
    }, []);

    // get state

    const productos = useSelector (state => state.productos.productos)
    const error = useSelector (state => state.productos.error)
    const cargando = useSelector (state => state.productos.loading)
    return (
        
        <Fragment>
            <h2 className="text-center my-5" >Listado de productos</h2>
            {error ? <p className="font-weight-bold alert-danger text-center">Error al mostrar los datos</p>:null}
            {cargando ? <p className="font-weight-bold alert-danger text-center">Cargando listado ...</p>:null}

            <table
            className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
<tbody>
    {productos.length===0 ? 'no hay productos' :(
    productos.map(producto => (
        <Producto 
        key={producto.id}
        producto={producto}
        />
        )))
        }
</tbody>
            </table>
        </Fragment>
      );
}
 
export default Productos;