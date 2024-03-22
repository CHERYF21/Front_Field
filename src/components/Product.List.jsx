import React, { useState, useEffect } from 'react';
import { deleteProducts, listProducts, updateProducts } from '../service/productService';
import { useAuth } from '../Context/AuthContext';
import UpdateProduct from './UpdateProduct';
import Header from './Header';
 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { isAuthen, user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cart, setCart] = useState([]);


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

  const abrirModalUpdateProduct = (producto) =>{
    setProductoSeleccionado(producto);
    setModalOpen(true);
  }

  const cerrarModal = () =>{
    setModalOpen(false);
  }
  

  const handleAddToCard = (product) =>{
    const productToAdd = {...product, quantity: 1};
    setCart([...cart, productToAdd]);
    setModalOpen(true);
  }

  const handleEmptyCart = () =>{
    setCart([]);
  }


  return (
    <div className='container-items'>
      {products.map((product) => (
        <div key={product.id_product} className='item'>
          <figure className="image-container">
            <img src={`data:image/jpeg;base64,${product.img}`} alt={product.title} />
            <figcaption>
              <div className='info-product'>
                <h1 className='price'> ${product.price.toFixed(3)}</h1>
                <h4>Producto: {product.title}</h4>
                <p className='description'>Descripcion: {product.descripcion}</p>
                <p className='unidad'>Unidad: {product.sales_unit.unidad}</p>
                <p className='category'>Categoria: {product.category.category}</p>
                   {(user?.rol === 'Admin' || user?.rol === 'Agricultor') && (
                  <button onClick={() => abrirModalUpdateProduct(product)}>
                    Actualizar
                  </button>
                )}
                {(user?.rol === 'Admin' || user?.rol === 'Agricultor') && (
                  <button onClick={() => handleEliminarProduct(product.id_product)}>
                    Eliminar
                  </button>
                )}
                {(user?.rol === 'Admin' || user?.rol === 'Comprador') && (
                  <button onClick={() => handleAddToCard(product)}>
                  Añadir al carrito
                </button>
                )}
              
                  
              
              </div>
            </figcaption>
          </figure>
          <UpdateProduct isOpen={modalOpen} onClose={cerrarModal} product={productoSeleccionado}></UpdateProduct>
        </div>
      ))}
      {modalOpen && <Header cart={cart} onClose={() => setModalOpen(false)} handleEmptyCart={handleEmptyCart} />}
      
    </div>
  );
};

export default ProductList;
