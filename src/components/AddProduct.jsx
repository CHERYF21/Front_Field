import React, { useState } from 'react';
import styled from 'styled-components';

const AddProduct = () => {
  const [producto, setProducto] = useState({
    tipo: '',
    cantidad: '',
    precio: '',
    imagen: '',
    nombre: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Producto:', producto);
   
    setProducto({
      tipo: '',
      cantidad: '',
      precio: '',
      imagen: '',
      nombre: '',
      ubicacion: ''
    });
  };

  return (
    <>
      <h1>Esta es la vista de añadir productos</h1>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Agregar Producto</Title>
        <FormGroup>
          <Label htmlFor="tipo">Categoria</Label>
          <Select id="tipo" name="tipo" value={producto.tipo} onChange={handleChange}>
            <option value="fruta">Fruta</option>
            <option value="verdura">Verdura</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="cantidad">Cantidad:</Label>
          <Input type="number" id="cantidad" name="cantidad" value={producto.cantidad} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="precio">Precio:</Label>
          <Input type="number" id="precio" name="precio" value={producto.precio} onChange={handleChange} step="0.01" min="0.01" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imagen">Imagen:</Label>
          <Input type="file" id="imagen" name="imagen" accept="image/png, image/jpeg" onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nombre">Titulo:</Label>
          <Input type="text" id="nombre" name="nombre" value={producto.nombre} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="descripcion">Descripción:</Label>
          <Input type="text" id="descripcion" name="descripcion" value={producto.descripcipn} onChange={handleChange} />
        </FormGroup>
        <SubmitButton type="submit">Agregar</SubmitButton>
      </FormContainer>
    </>
  );
};

export default AddProduct;

const FormContainer = styled.form`
  background-color: #f0f8f0; 
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #006400; 
  text-align: center;
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
