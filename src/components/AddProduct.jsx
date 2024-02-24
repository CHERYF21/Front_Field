import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DeleteProduct from './DeleteProduct';





const AddProduct = ({ setAllProducts, allProducts }) => {
  const [producto, setProducto] = useState({
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

 

  const handleChange = (e) => {
    const { name, type } = e.target;
    if (type === 'file') {
      setProducto({ ...producto, img: e.target.files[0] });
    } else {
      setProducto({ ...producto, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Valores del producto antes de la validación:', producto);

    // Validar campos obligatorios
    if (
      !producto.category ||
      !producto.quantity ||
      !producto.price ||
      !producto.img ||
      !producto.title ||
      !producto.description ||
      producto.availability === undefined
    ) {
      console.error('Todos los campos obligatorios deben ser completados');
      return;
    }

    const formData = new FormData();
    formData.append('file', producto.img);
    formData.append('title', producto.title);
    formData.append('description', producto.description);
    formData.append('price', producto.price);
    formData.append('category', producto.category);
    formData.append('availability', producto.availability);
    formData.append('quantity', producto.quantity);
    formData.append('opinion', producto.opinion);
    formData.append('ratings', producto.ratings);

    // Agregar campos opcionales si existen
    if (producto.opinion) {
      formData.append('opinion', producto.opinion);
    }
    if (producto.ratings) {
      formData.append('ratings', producto.ratings);
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/products/createProduct',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 201) {
        console.log('Producto agregado con éxito:', response.data);
        setAllProducts([...allProducts, response.data]);
      } else {
        console.error('Error al agregar el producto:', response.data);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }

    // Restablecer el estado del formulario
    setProducto({
      category: '',
      quantity: '',
      price: '',
      img: '',
      title: '',
      description: '',
      opinion: '',
      ratings: '',
    });
  };

  
  // Componente de eliminación separado
const DeleteProduct = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Lógica para eliminar un producto en el backend
      await axios.delete(`http://localhost:8080/api/products/${productId}`);
      onDelete(productId); // Notifica al componente padre que se ha eliminado el producto
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Eliminar</button>
  );
};

  const handleDelete = (productId) => {
    setAllProducts((prevList) =>
      prevList.filter((product) => product._id !== productId)
    );
  };


  

  return (
    <>
      <FormContainer onSubmit={handleSubmit} encType="multipart/form-data">
        <FormGroup>
          <Label htmlFor="category">Categoría</Label>
          <Select
            id="category"
            name="category"
            value={producto.category}
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
            value={producto.quantity}
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
            value={producto.price}
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
            name="file"
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
            value={producto.title}
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
            value={producto.description}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="availability">Disponibilidad:</Label>
          <Select
            id="availability"
            name="availability"
            value={producto.availability}
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
            value={producto.opinion}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="ratings">Calificación:</Label>
          <Input
            type="number"
            id="ratings"
            name="ratings"
            value={producto.ratings}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </FormGroup>
        <SubmitButton type="submit">Agregar</SubmitButton>
      </FormContainer>

      {/* Agregar ProductCard para envolver cada producto */}
      {allProducts && allProducts.map((product) => (
        <ProductCard key={product._id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Cantidad: {product.quantity}</p>
          <p>Precio: {product.price}</p>
          <DeleteProduct productId={product._id} onDelete={handleDelete} />
        </ProductCard>
      ))}
    
    </>
  );
};


const ProductCard = styled.div`
  // Estilos de la tarjeta de producto
`;

const FormContainer = styled.form`
  background-color: #f0f8f0; 
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
`;


const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #006400; 
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #006400; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #004d00; 
  }
`;


// Nuevo estilo para el botón rojo
const DeleteButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff0000; /* Rojo */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px; /* Margen superior para separar del botón "Agregar" */
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #cc0000; /* Rojo más oscuro al pasar el mouse */
  }
`;

export default AddProduct;
