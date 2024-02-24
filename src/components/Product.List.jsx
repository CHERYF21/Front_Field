import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imagenes from '../assets/imagenes';

const ProductList = ({
    allProducts,
    setAllProducts,
    countProducts,
    setCountProducts,
    total,
    setTotal,
}) => {
    const [apiProducts, setApiProducts] = useState([]);
    const [failedImages, setFailedImages] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products/listProducts');
                console.log('API Response:', response.data);
                setApiProducts(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de productos desde la API', error);
            }
        };

        fetchProducts();
    }, []);

    const onAddProduct = product => {
        if (allProducts.find(item => item.id === product.id)) {
            const products = allProducts.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setTotal(total + product.price * product.quantity);
            setCountProducts(countProducts + product.quantity);
            return setAllProducts([...products]);
        }

        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
    };

    const handleImageError = (e, product) => {
        const reserveImage = imagenes['manzana.png'];
        if (!failedImages.includes(product.id)) {
            e.target.src = reserveImage;
            setFailedImages(prev => [...prev, product.id]);
        }
    };

    return (
        <div className='container-items'>
            {apiProducts.map(product => (
                <div className='item' key={product.id}>
                    <figure>
                        <img
                            src={imagenes[product.img] || product.img}
                            alt={product.title}
                            onError={(e) => handleImageError(e, product)}
                        />
                        <figcaption>
                            <div className='info-product'>
                                <p className='title'>{product.title}</p>
                                <p className='availability'>{product.availability ? 'Disponible' : 'No disponible'}</p>
                                <p className='price'>{product.price}</p>
                                <p className='category'>{product.category}</p>
                                <p className='description'>{product.description}</p>
                                <p className='opinion'>{product.opinion}</p>
                                <p className='rating'>{product.rating}</p>
                                <button onClick={() => onAddProduct(product)}>
                                    Añadir al carrito
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
