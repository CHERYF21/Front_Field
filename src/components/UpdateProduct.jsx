import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const UpdateProduct = ({ productId, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    category: '',
    quantity: '',
    price: '',
    img: '',
    title: '',
    description: '',
    availability: true,
    opinion: '',
    ratings: '',
  });

  const [ setShowDetails] = useState(false);

  useEffect(() => {
  const fetchProductDetails = async () => {
    try {
      if (productId) {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        setUpdatedProduct(response.data);
      }
    } catch (error) {
      console.error('Error al obtener detalles del producto:', error);
    }
  };

  fetchProductDetails();
}, [productId]);


  const handleChange = (e) => {
    const { name, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];

      setUpdatedProduct({
        ...updatedProduct,
        img: file,
        imgPreview: URL.createObjectURL(file),
      });
    } else {
      setUpdatedProduct({ ...updatedProduct, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append('file', updatedProduct.img);
        formData.append('title', updatedProduct.title);
        formData.append('category', updatedProduct.category);
        formData.append('quantity', updatedProduct.quantity);
        formData.append('price', updatedProduct.price);
        formData.append('description', updatedProduct.description);
        formData.append('availability', updatedProduct.availability);
        formData.append('opinion', updatedProduct.opinion);
        formData.append('ratings', updatedProduct.ratings);

      const response = await axios.put(
        `http://localhost:8080/api/products/${productId}`,
        formData,  // Utiliza el FormData para enviar la información del producto
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        console.log('Producto actualizado con éxito:', response.data);
        onUpdate(response.data);
      } else {
        console.error('Error al actualizar el producto:', response.data);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  return (
    <div>
      <Container>
        <ModalHeader>
          <h2>Actualizar Producto</h2>
          <CloseButton onClick={() => setShowDetails(false)}>&times;</CloseButton>
        </ModalHeader>

        

        <FormContainer onSubmit={handleSubmit} encType="multipart/form-data">
          <FormGroup>
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
          </FormGroup>
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
              required
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
          <FormGroup>
            <Label htmlFor="opinion">Opinión:</Label>
            <Input
              type="text"
              id="opinion"
              name="opinion"
              value={updatedProduct.opinion}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="ratings">Calificación:</Label>
            <Input
              type="number"
              id="ratings"
              name="ratings"
              value={updatedProduct.ratings}
              onChange={handleChange}
              min="1"
              max="5"
            />
          </FormGroup>
          <SubmitButton type="submit">Actualizar Producto</SubmitButton>
        </FormContainer>

        <Line />
      </Container>
    </div>
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
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333333;
`;

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #12DB03;
  top: 0;
  left: 0;
`;

const FormContainer = styled.form`
  display: grid;
  grid-gap: 9px;
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