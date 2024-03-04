// Modal.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import UpdateProduct from './UpdateProduct';

const Modal = ({ closeModal, productId, onUpdate }) => {
  // Estado local para los datos actualizados del formulario
  const [updatedData, setUpdatedData] = useState({
    // Propiedades que coinciden con los campos del formulario
    category: '',
    quantity: '',
    price: '',
    img: null,
    title: '',
    description: '',
    availability: true,
    // ... otras propiedades según tu formulario ...
  });

  const handleUpdate = async () => {
    console.log('Handle Update is called');
    try {
      // Llama a la función onUpdate pasando el productId y los datos actualizados
      await onUpdate(productId, updatedData);

      // Cierra el modal después de una actualización exitosa
      closeModal();
    } catch (error) {
      console.error('Error en la actualización:', error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {/* Pasar setUpdatedData directamente a UpdateProduct para actualizar el estado local */}
        <UpdateProduct
          productId={productId}
          onUpdate={(data) => setUpdatedData(data)}
        />
        <SubmitButton onClick={handleUpdate}>Actualizar</SubmitButton>
        <CloseButton onClick={closeModal}>Cerrar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 8px;
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

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 8px;
  background-color: #cc0000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #990000;
  }
`;

export default Modal;
