import React, { useState, useEffect } from 'react';
//import DeleteProduct from './DeleteProduct'; 
import { deleteProducts, listProducts } from '../service/productService';



const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedid_product, setSelectedid_product] = useState('');
  const [updatedProducts, setUpdatedProducts] = useState([]);

  //carrito compra
  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id_product);
    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id_product
          ? { ...item, quantity: item.quantity + 0 }
          : item
      );
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      setAllProducts(updatedProducts);
    } else {
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      setAllProducts([...allProducts, { ...product, quantity: 1 }]);
    }
  };
  //fin carrito


  const handleUpdateProduct = async (id_product, e) => {
  e.preventDefault();
  console.log('Botón Actualizar clicado');
  setSelectedid_product(id_product);
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
 
};

//eliminar producos
const handleDeleteProduct = async (id_product) => {
    try{
      await deleteProducts(id_product);
      setUpdatedProducts(allProducts.filter(product => product.id_product !== id_product));
      console.log('Producto eliminado con exito');
    } catch (error){
      console.log('Error al eliminar producto: ', error)
    }

};
//fin eliminar

// actualizar
const handleProductUpdated = (updatedProduct) => {
  try {
    //updateProductsLocally(updatedProduct);
    setShowModal(false);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
};

  //obtener productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listProducts();
        setAllProducts(response.data);
        setUpdatedProducts(response.data); // Añade esta línea
      } catch (error) {
        console.error('Error al obtener la lista de productos desde la API', error);
      }
    };
  
    fetchProducts();
  }, []);
  //finproductos

  return (
      <div className='container-items'>
        {allProducts.map((product) => (
          
          <div key={product.id_product} className='item'>
            <figure>
            <img
        src={`data:image/jpeg;base64,${product.img}`}
        alt={product.title}
      />
              <figcaption>
                <div className='info-product'>
                <h1 className='price'> ${product.price.toFixed(3)}</h1>
                <h4>Producto: {product.title}</h4>
                <p className='description'>Descripcion:{product.descripcion}</p>
              
                  <p className='category'>Categoria: {product.category.category }</p>
                  <button onClick={() => onAddProduct(product)}>
                    Añadir al carrito
                  </button>
                  <button onClick={(e) => handleUpdateProduct(product.id_product, e)}>
                     Actualizar
                </button>
                <button onClick={() => handleDeleteProduct(product.id_product)}>
                     Eliminar
                </button>
                
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      
      </div>
  );
};

export default ProductList;
  