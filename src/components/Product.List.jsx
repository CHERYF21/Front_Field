import React, { useState, useEffect } from 'react';
import { deleteProducts, listProducts, updateProducts } from '../service/productService';
import { useAuth } from '../Context/AuthContext';
import UpdateProduct from './UpdateProduct';

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const {isAuthen, user} = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
//listar products
  useEffect(() => {
    async function fetchProducts(){
      try{
        const response = await listProducts();
        setProducts(response.data);
      } catch(error){
        console.error('Error al obtener la lista de productos', error);
      }
    }
    fetchProducts();
  }, []);
//eliminar product
  const handleEliminarProduct = (id_product) => {
    deleteProducts(id_product)
    .then(response => {
      setProducts(products.filter(product => product.id_product !== id_product));
      console.log('Venta eliminada con exito');
    })
    .catch(error => {
      console.log('Error al eliminar producto', error);
    })
  };
//actualizar product
  const actualizarProduct = async(productoActualizado) =>{
    try{
      const response = await updateProducts(productoActualizado.id_product, {
        title: productoActualizado.title,
        descripcion: productoActualizado.descripcion,
        price: productoActualizado.price,
        quantity: productoActualizado.quantity,
        img: productoActualizado.img
      });
      console.log('Producto actualizado', response.data);

      const updateProducts = products.map(product => {
        if(product.id_product === productoActualizado.id_product){
          return response.data;
        }
        return product;
      });
      setProducts(updateProducts);
      setModalOpen(false);
    } catch (error) {
      console.log('Error al actualizar producto', error);
    }
  }

  const abrirModalUpdateProduct = (producto) =>{
    setProductoSeleccionado(producto);
    setModalOpen(true);
  }
  const cerrarModal = () =>{
    setModalOpen(false);
  }

  return (
    <div className='container-items'>
      {products.map((product) => (
        <div key={product.id_product} className='item'>
          <figure>
            <img src={`data:image/jpeg;base64,${product.img}`} alt={product.title} />
            <figcaption>
              <div className='info-product'>
                <h1 className='price'> ${product.price.toFixed(3)}</h1>
                <h4>Producto: {product.title}</h4>
                <p className='description'>Descripcion:{product.descripcion}</p>
                <p className='unidad'>Unidad:{product.sales_unit.unidad}</p>
                <p className='category'>Categoria: {product.category.category}</p>
                {/* <button onClick={() => onAddProduct(product)}>Añadir al carrito</button> */}
                {(user.rol === 'Admin' || user.rol === 'Agricultor') && (
                  <button onClick={() => abrirModalUpdateProduct(product)}>
                    Actualizar
                  </button>
                )}
                {(user.rol === 'Admin' || user.rol === 'Agricultor') && (
                  <button onClick={() => handleEliminarProduct(product.id_product)}>
                    Eliminar
                  </button>
                )}
              </div>
            </figcaption>
          </figure>
          <UpdateProduct isOpen={modalOpen} onClose={cerrarModal} product={productoSeleccionado}></UpdateProduct>
        </div>
      ))}

      {/* {showUpdateModal && (
        <UpdateProductForm
          closeModal={() => setShowUpdateModal(false)}
          id_product={selectedid_product}
        />
      )} */}
    </div>
  );
};

export default ProductList;
