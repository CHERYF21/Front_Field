import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './DeleteProduct';
import imagenes from '../assets/imagenes';  


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
  const [selectedid_product, setSelectedid_product] = useState('');
  const [updatedProducts, setUpdatedProducts] = useState([]);

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

  const handleDeleteProduct = async (id_product) => {
    try {
      const deletedProduct = allProducts.find((product) => product.id_product === id_product);

      if (deletedProduct) {
        await axios.delete(`http://localhost:8080/user/${id_product}/delete`);
        setAllProducts((prevProducts) =>
          prevProducts.filter((product) => product.id_product !== id_product)  
        );
         // Vuelve a cargar la lista de productos después de la eliminación
         const response = await axios.get('http://localhost:8080/user/listProducts');
         setAllProducts(response.data);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const handleUpdateProduct = async (id_product, e) => {
  e.preventDefault();
  console.log('Botón Actualizar clicado');
  setSelectedid_product(id_product);
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
 
};
  
 // Agrega una función para actualizar los productos en el estado local
const updateProductsLocally = (updatedProduct) => {
  setAllProducts((prevProducts) =>
    prevProducts.map((product) =>
      product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
    )
  );
};

// Agrega una función para manejar la actualización del producto en el componente ProductList
const handleProductUpdated = (updatedProduct) => {
  try {
    // Actualiza el estado local de los productos
    updateProductsLocally(updatedProduct);

    // Cierra el modal
    setShowModal(false);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
};

  
  const handleImageError = (e, id_product) => {
    const reserveImage = imagenes['manzana.png'];

    if (!failedImages.includes(id_product)) {
      e.target.src = reserveImage;
      setFailedImages((prev) => [...prev, id_product]);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/listProducts');
        setAllProducts(response.data);
        setUpdatedProducts(response.data); // Añade esta línea
      } catch (error) {
        console.error('Error al obtener la lista de productos desde la API', error);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (
      <div className='container-items'>
        {allProducts.map((product) => (
          
          <div key={product.id_product} className='item'>
            <figure>
            <img
        src={`data:image/jpeg;base64,${product.img}`}
        alt={product.title}
        data-product-id={product.id_product}
        onError={(e) => handleImageError(e, product.id_product)}
      />
              <figcaption>
                <div className='info-product'>
                <h1 className='price'>${product.price.toFixed(3)}</h1>
                <h2>{product.title}</h2>
                <h4 className='description'>{product.description}</h4>
              
                  <p className='category'>{product.id_category}</p>
                  <button onClick={() => onAddProduct(product)}>
                    Añadir al carrito
                  </button>
                  <DeleteProduct
                    id_product={product.id_product}
                    onDelete={() => handleDeleteProduct(product.id_product)}
                  />
                  <button onClick={(e) => handleUpdateProduct(product.id_product, e)}>
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
         id_product={selectedid_product}
         onUpdate={handleProductUpdated}
        />
      )}
      </div>
  );
};

export default ProductList;
  