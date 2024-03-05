import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        {children}
        <CloseButton onClick={onClose}>X</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const AddCategory= () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState('');

  const handleChange = (e) => {
    setNombreCategoria(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nombre de la categoría:', nombreCategoria);
    setNombreCategoria('');
    setModalAbierto(false);
  };

  return (
    <>
   <OpenModalButton onClick={() => setModalAbierto(true)}>Agregar Categoria </OpenModalButton>
      <Modal isOpen={modalAbierto} onClose={() => setModalAbierto(false)}>
        <FormContainer onSubmit={handleSubmit}>
          <Title>Agregar Categoria</Title>
        <FormGroup>
          <Label htmlFor="nombre">Titulo:</Label>
          <Input type="text" id="nombre" name="nombre" value={nombreCategoria} onChange={handleChange} required />
        </FormGroup>
        <SubmitButton type="submit">Agregar</SubmitButton>
        </FormContainer>
      </Modal>
    </>
  );
};

export default AddCategory;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%; 
  overflow: auto; 
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

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
const OpenModalButton = styled.button`
  background-color: #006400; 
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 300px;
  margin-left: 30px;
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.5);
`;
