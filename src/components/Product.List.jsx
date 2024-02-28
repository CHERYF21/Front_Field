import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './DeleteProduct';
import imagenes from '../assets/imagenes';  
import Modal from './Modal';

const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [failedImages, setFailedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');

  const onAddProduct = (product) => {
    const existingProduct = allProducts.find((item) => item.id === product.id);
  
    if (existingProduct) {
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
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

  const handleDeleteProduct = async (productId) => {
    try {
      const deletedProduct = allProducts.find((product) => product.id === productId);

      if (deletedProduct) {
        await axios.delete(`http://localhost:8080/api/products/${productId}`);
        setAllProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)  
        );
         // Vuelve a cargar la lista de productos después de la eliminación
         const response = await axios.get('http://localhost:8080/api/products/listProducts');
         setAllProducts(response.data);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleUpdateProduct = (productId, e) => {
    console.log('Botón Actualizar clicado');
    e.preventDefault();
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleProductUpdated = (updatedProduct) => {
    const updatedProducts = allProducts.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setAllProducts(updatedProducts);
    setShowModal(false);
  };

  const handleImageError = (e, productId) => {
    const reserveImage = imagenes['manzana.png'];

    if (!failedImages.includes(productId)) {
      e.target.src = reserveImage;
      setFailedImages((prev) => [...prev, productId]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/listProducts');
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de productos desde la API', error);
      }
    };

    fetchProducts();
  }, [setAllProducts]);

  return (
    <form encType="multipart/form-data">
      <div className='container-items'>
        {allProducts.map((product) => (
          <div key={product.id} className='item'>
            <figure>
              <img
                src={product.img}
                alt={product.title}
                data-product-id={product.id}
                onError={(e) => handleImageError(e, product.id)}
              />
              <figcaption>
                <div className='info-product'>
                  <p className='title'>{product.title}</p>
                  <p className='availability'>
                    {product.availability ? 'Disponible' : 'No disponible'}
                  </p>
                  <p className='price'>{product.price}</p>
                  <p className='category'>{product.category}</p>
                  <p className='description'>{product.description}</p>
                  <p className='opinion'>{product.opinion}</p>
                  <p className='rating'>{product.rating}</p>
                  <button onClick={() => onAddProduct(product)}>
                    Añadir al carrito
                  </button>
                  <DeleteProduct
                    productId={product.id}
                    onDelete={() => handleDeleteProduct(product.id)}
                  />
                  <button onClick={(e) => handleUpdateProduct(product.id, e)}>
                     Actualizar
                </button>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
        {showModal && (
          <Modal
            closeModal={closeModal}
            productId={selectedProductId}
            onUpdate={handleProductUpdated}
          />
        )}
      </div>
    </form>
  );
};

export default ProductList;
