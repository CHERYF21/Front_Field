// Modal.jsx
import React from 'react';
import styled from 'styled-components';
import UpdateProduct from './UpdateProduct';

const Modal = ({ closeModal, productId, onUpdate }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <UpdateProduct productId={productId} onUpdate={onUpdate} />
        <CloseButton onClick={closeModal}>Cerrar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.form`
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

const ModalContent = styled.form`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`;

const CloseButton = styled.button`
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

export default Modal;
