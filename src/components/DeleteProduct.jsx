// En el archivo DeleteProduct.jsx
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
      <DeleteButton onClick={handleDelete}>Eliminar</DeleteButton>
    );
    
  };
  
  
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

export default DeleteProduct;
