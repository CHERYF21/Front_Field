import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './Header';
import ProductList from './Product.List';
import AddProduct from './AddProduct';
import { listProducts } from '../service/productService';

function Productos() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listProducts();
        // No establezcas allProducts directamente aquí, para evitar cargar automáticamente en el carrito
         setAllProducts(response.data);  
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    };

    fetchProducts();
  }, []);

  
  const handleProductAdded = (newProduct) => {
    setAllProducts([...allProducts, newProduct]);
    setCountProducts(countProducts + 1);
    setTotal(total + newProduct.price);
  };

  const handleProductDeleted = (id_product) => {
    const updatedProducts = allProducts.filter((product) => product.id_product !== id_product);
    setAllProducts(updatedProducts);
    setCountProducts(countProducts - 1);
    // Calcula el total nuevamente si es necesario
    // forceUpdate(); // No es necesario si estás actualizando el estado directamente
    const newTotal = updatedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    setTotal(newTotal);
  };

  return (
    <>
      <Header
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
      <AddProduct onProductAdded={handleProductAdded} />
      <ProductList
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        onProductDeleted={handleProductDeleted}
      />
    </>
  );
}

export default Productos;
