import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { updateProducts } from './../service/productService';

const UpdateProduct = ({closeModal, productId, onUpdate, allProducts = [], setAllProducts = () => {} }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    category: '',
    quantity: '',
    price: '',
    img: '',
    title: '',
    description: '',
    availability: true,
  });

  const PRODUCT_BACK = "http://localhost:8080";
  const [products, setProducts] = useState([]);
  const [showDetails, setShowDetails] = useState(false);  // Agrega esta línea
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (productId) {
          const response = await axios.get(`${PRODUCT_BACK}/user/${productId}`);
          setUpdatedProduct(response.data);
        }
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);


  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      const file = e.target.files[0];
      console.log('File selected:', file);
      setUpdatedProduct({
        ...updatedProduct,
        [name]: file,
        imgPreview: URL.createObjectURL(file),
      });
    } else {
      console.log('Field changed:', name, value);
      setUpdatedProduct({
        ...updatedProduct,
        [name]: value,
      });
    }
  };
  

  
  
  
    const handleSubmit = async (e) => {
      window.location.reload();
      try {
        console.log('Submitting update...');

        const formData = new FormData();

        if (updatedProduct.img) {
          console.log('Before FormData creation');
          console.log('FormData content:', formData);
          formData.append('file', updatedProduct.img);
        }
        
        formData.append('title', updatedProduct.title);
        formData.append('category', updatedProduct.category);
        formData.append('quantity', parseInt(updatedProduct.quantity, 10));
        formData.append('price', updatedProduct.price);
        formData.append('description', updatedProduct.description);
        formData.append('availability', updatedProduct.availability === "true");
        console.log('FormData content:', formData);
        
    
        console.log('After FormData creation');
    
        const response = await updateProducts(productId, formData);
    
        console.log('Update Response:', response);
        
        console.log('Updated Product Object:', updatedProduct);


        if (response.status === 200) {
          const updatedProductData = {
            ...response.data,
            price: Number(response.data.price),
            ratings: Number(response.data.ratings),
            quantity: Number(response.data.quantity),
              
          };
          
          console.log(updatedProduct);
          
          const updatedProducts = allProducts ? allProducts.map((product) =>
      product.id === productId ? { ...product, ...updatedProductData, availability: updatedProductData.availability === "true" } : product
      ) : [];


          onUpdate(updatedProductData);
          handleGetProducts();
          console.log(typeof setAllProducts); // Debería imprimir "function"
          setAllProducts(updatedProducts);
        } else {
          console.error('Error al actualizar el producto:', response.data);
          console.log('Update response:', response);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud PUT:', error);
     }
};


    const handleGetProducts = async () => {
      try {
        console.log('Fetching updated products...');
    
        const updatedProducts = await axios.get(`${PRODUCT_BACK}/api/products/listProducts`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
    
        console.log('Updated products:', updatedProducts.data);
        setProducts(updatedProducts.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const handleClose = () => {
      // Cierra el modal sin realizar ninguna acción adicional
      closeModal();
    };
  
    




    return (
        <Container>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <h2>Actualizar Producto</h2>
            <CloseButton onClick={handleClose}>X</CloseButton>
          </ModalHeader>

              <Label htmlFor="category">Categoría:</Label>
              <Select
                id="category"
                name="category"
                value={updatedProduct.category}
                onChange={handleChange}
              >
                <option value="fruta">Fruta</option>
                <option value="verdura">Verdura</option>
              </Select>
        
            <FormGroup>
              <Label htmlFor="quantity">Cantidad:</Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                value={updatedProduct.quantity}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price">Precio:</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                step="0.01"
                min="0.01"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="img">Imagen:</Label>
              <Input
                type="file"
                id="img"
                name="img"
                accept="image/png, image/jpeg"
                onChange={handleChange}
              />
            
            </FormGroup>
            <FormGroup>
              <Label htmlFor="title">Título:</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={updatedProduct.title}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Descripción:</Label>
              <Input
                type="text"
                id="description"
                name="description"
                value={updatedProduct.description}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="availability">Disponibilidad:</Label>
              <Select
                id="availability"
                name="availability"
                value={updatedProduct.availability}
                onChange={handleChange}
              >
                <option value={true}>Disponible</option>
                <option value={false}>No disponible</option>
              </Select>
            </FormGroup>
            <SubmitButton type="submit">Actualizar Producto</SubmitButton>
          </form>

          <Line />
        </Container>
    );
  };

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 80%;
  z-index: 9999;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  `;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #12DB03;
  top: 0;
  left: 0;
`;



const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 8px;
`;

const Input = styled.input`
  padding: 8px;
`;


const SubmitButton = styled.button`
  background-color: #58E274;
  color: #333;
  padding: 10px;
  border: none;
  cursor: pointer;
`;


export default UpdateProduct;