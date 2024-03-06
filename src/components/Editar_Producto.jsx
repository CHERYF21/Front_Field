import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


function EditProductModal({ isOpen, onClose, product,reloadProductList  }) {
  const [editedProduct, setEditedProduct] = useState({
    title: '',
    price: 0,
    quantity:'',
    category: '',
    description: '',
    base64Image: ''
  });

  useEffect(() => {
    // Actualizar el estado cuando el producto cambie
    setEditedProduct({
      title: product.title,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      description: product.description,
      base64Image: product.base64Image
    });
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
   
    console.log('ID del producto:', product.id);
    // Enviar al backend
    axios.put(`/user/${product.id}/update`, editedProduct)
      .then(response => {
        window.location.reload();
        console.log('Producto actualizado en el backend:', response.data);
        onClose(); // Cerrar modal después de la actualización
        // Recargar la lista de productos
        reloadProductList();
      })
      .catch(error => {
        console.error('Error al actualizar el producto en el backend:', error);
      });
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
                <Input type="text" name="title" value={editedProduct.title} onChange={handleInputChange} />
              </FormField>
              <FormField>
                <Label>Precio:</Label>
                <Input type="number" name="price" value={editedProduct.price} onChange={handleInputChange} />
              </FormField>
              <FormField>
                <Label>Cantidad:</Label>
                <Input type="number" name="quantity" value={editedProduct.quantity} onChange={handleInputChange} />
              </FormField>
              <FormField>
                <Label>Categoría:</Label>
                <Input type="text" name="category" value={editedProduct.category} onChange={handleInputChange} />
              </FormField>  
              <FormField>
                <Label>Descripción:</Label>
                <TextArea name="description" value={editedProduct.description} onChange={handleInputChange} />
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
