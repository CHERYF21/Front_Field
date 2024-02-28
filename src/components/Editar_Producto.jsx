import React, { useState } from 'react';
import styled from 'styled-components';
function EditProductModal({ isOpen, onClose, product }) {
  const [editedProduct, setEditedProduct] = useState({
    nombre: product.nombre,
    precio: product.precio,
    categoria: product.categoria,
    descripcion: product.descripcion,
    imagen: product.imagen
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar al backend
    console.log('Datos editados:', editedProduct);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <ModalContainer>
          <ModalContent>
            <ModalCloseButton onClick={onClose}>Cerrar</ModalCloseButton>
            <h2>Editar Producto</h2>
            <Form onSubmit={handleSubmit}>
              <FormField>
                <Label>Nombre:</Label>
                <Input type="text" name="nombre" value={editedProduct.nombre} onChange={handleInputChange} />
              </FormField>
              <FormField>
                <Label>Precio:</Label>
                <Input type="number" name="precio" value={editedProduct.precio} onChange={handleInputChange} />
              </FormField>
              <FormField>
                <Label>Categoría:</Label>
                <Input type="text" name="categoria" value={editedProduct.categoria} onChange={handleInputChange} />
              </FormField>
              <FormField>
                <Label>Descripción:</Label>
                <TextArea name="descripcion" value={editedProduct.descripcion} onChange={handleInputChange} />
              </FormField>
              <FormField>
                <Label>Imagen:</Label>
                <Input type="text" name="imagen" value={editedProduct.imagen} onChange={handleInputChange} />
              </FormField>
              <Button type="submit">Guardar cambios</Button>
            </Form>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}

export default EditProductModal;
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
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